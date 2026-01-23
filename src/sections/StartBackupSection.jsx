import React, { useState, useEffect, useRef } from 'react';
import { Database, FolderTree, Play, Plus, Trash2 } from 'lucide-react';
import { BackupProgressModal } from './BackupProgressModal';
import { backupApi, BackupProgressStream } from '../services/backupApi';

export default function StartBackupSection({
                                               sources,
                                               destinations,
                                               addSource,
                                               removeSource,
                                               addDestination,
                                               removeDestination,
                                               executeBackup,
                                               setSources,
                                               setDestinations
                                           }) {
    // Estados para controlar o backup
    const [isBackupRunning, setIsBackupRunning] = useState(false);
    const [backupProgress, setBackupProgress] = useState(0);
    const [currentFile, setCurrentFile] = useState('');
    const [filesProcessed, setFilesProcessed] = useState(0);
    const [totalFiles, setTotalFiles] = useState(0);
    const [isBackupPaused, setIsBackupPaused] = useState(false);
    const [activeTaskIds, setActiveTaskIds] = useState([]);

    // Referências
    const progressStreamRef = useRef(null);

    // Inicializar stream de progresso
    useEffect(() => {
        progressStreamRef.current = new BackupProgressStream();

        progressStreamRef.current.on('progress', (data) => {
            if (data.taskId && activeTaskIds.includes(data.taskId)) {
                setBackupProgress(data.percentage || 0);
                setFilesProcessed(data.filesProcessed || 0);
                setTotalFiles(data.totalFiles || 0);
                setCurrentFile(data.currentFile || '');
            }
        });

        progressStreamRef.current.on('error', (error) => {
            console.error('Progress stream error:', error);
        });

        progressStreamRef.current.connect();

        return () => {
            if (progressStreamRef.current) {
                progressStreamRef.current.disconnect();
            }
        };
    }, [activeTaskIds]);

    // Função para iniciar backup real
    const handleExecuteBackup = async () => {
        if (sources.length === 0 || destinations.length === 0) {
            alert('Please add at least one origin and one destination');
            return;
        }

        try {
            setIsBackupRunning(true);
            setIsBackupPaused(false);

            // Chama API do backend
            const result = await backupApi.startBackup(sources, destinations);

            // Armazena IDs das tarefas ativas
            if (result.taskIds && Array.isArray(result.taskIds)) {
                setActiveTaskIds(result.taskIds);
            }

            // Atualiza histórico via função do pai
            if (executeBackup) {
                executeBackup({
                    status: 'in_progress',
                    message: result.message || 'Backup started'
                });
            }

        } catch (error) {
            console.error('Backup failed:', error);
            alert(`Backup failed: ${error.message}`);
            setIsBackupRunning(false);
            setActiveTaskIds([]);
        }
    };

    // Função para pausar/retomar backup
    const handlePauseResume = async () => {
        if (activeTaskIds.length === 0) return;

        try {
            if (isBackupPaused) {
                // Retoma todos os backups pausados
                for (const taskId of activeTaskIds) {
                    await backupApi.resumeBackup(taskId);
                }
                setIsBackupPaused(false);
            } else {
                // Pausa todos os backups ativos
                for (const taskId of activeTaskIds) {
                    await backupApi.pauseBackup(taskId);
                }
                setIsBackupPaused(true);
            }
        } catch (error) {
            console.error('Pause/Resume failed:', error);
            alert(`Operation failed: ${error.message}`);
        }
    };

    // Função para cancelar backup
    const handleCancel = async () => {
        if (activeTaskIds.length === 0) return;

        if (!window.confirm('Are you sure you want to cancel the backup?')) {
            return;
        }

        try {
            // Cancela todos os backups ativos
            for (const taskId of activeTaskIds) {
                await backupApi.cancelBackup(taskId);
            }

            // Cria registro de cancelamento
            const cancelledBackup = {
                id: Date.now(),
                name: 'Backup Cancelled',
                date: new Date().toLocaleString(),
                size: '0 GB',
                status: 'cancelled',
                files: filesProcessed,
                duration: '0m'
            };

            // Atualiza histórico
            if (executeBackup) {
                executeBackup(cancelledBackup);
            }

            // Limpa estados
            setIsBackupRunning(false);
            setIsBackupPaused(false);
            setActiveTaskIds([]);
            setBackupProgress(0);
            setFilesProcessed(0);
            setCurrentFile('');

        } catch (error) {
            console.error('Cancel failed:', error);
            alert(`Cancel failed: ${error.message}`);
        }
    };

    // Função para fechar o modal manualmente
    const handleCloseModal = () => {
        handleCancel();
    };

    // Monitora status das tarefas ativas
    useEffect(() => {
        if (activeTaskIds.length === 0) return;

        const checkTaskStatus = async () => {
            try {
                let allCompleted = true;
                let anyFailed = false;

                for (const taskId of activeTaskIds) {
                    const status = await backupApi.getTaskStatus(taskId);

                    if (status.status === 'EM_ANDAMENTO' || status.status === 'PAUSADO') {
                        allCompleted = false;
                    }

                    if (status.status === 'FALHA') {
                        anyFailed = true;
                    }

                    // Atualiza progresso específico da tarefa
                    if (status.fileCount && status.totalSizeMB) {
                        const estimatedTotalFiles = 1000;
                        const progress = Math.min(100, (status.fileCount / estimatedTotalFiles) * 100);
                        setBackupProgress(prev => Math.max(prev, progress));
                        setFilesProcessed(status.fileCount);
                        setTotalFiles(estimatedTotalFiles);
                    }
                }

                // Se todas as tarefas completaram
                if (allCompleted) {
                    setTimeout(() => {
                        setIsBackupRunning(false);
                        setActiveTaskIds([]);
                        setBackupProgress(100);

                        // Atualiza histórico com sucesso
                        if (executeBackup && !anyFailed) {
                            executeBackup();
                        }
                    }, 2000);
                }

            } catch (error) {
                console.error('Failed to check task status:', error);
            }
        };

        const interval = setInterval(checkTaskStatus, 3000);
        return () => clearInterval(interval);
    }, [activeTaskIds, executeBackup]);

    return (
        <>
            <div className="space-y-8">
                {/* Sources Section */}
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                            <FolderTree className="w-5 h-5 text-gray-900" />
                            <h3 className="text-sm font-semibold text-gray-900">Origins</h3>
                        </div>
                        <button
                            onClick={addSource}
                            className="flex items-center space-x-1 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded border border-gray-200"
                        >
                            <Plus className="w-4 h-4" />
                            <span>Add</span>
                        </button>
                    </div>

                    <div className="space-y-2">
                        {sources.length === 0 ? (
                            <div className="text-center py-8 text-gray-500 text-sm border border-gray-200 rounded bg-gray-50">
                                No origin selected
                            </div>
                        ) : (
                            sources.map(source => (
                                <div key={source.id} className="flex items-center space-x-2">
                                    <input
                                        type="text"
                                        placeholder="/path/to/origin"
                                        className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded focus:outline-none focus:border-gray-400"
                                        value={source.path}
                                        onChange={(e) => {
                                            setSources(sources.map(s =>
                                                s.id === source.id ? { ...s, path: e.target.value } : s
                                            ));
                                        }}
                                    />
                                    <button
                                        onClick={() => removeSource(source.id)}
                                        className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Destinations Section */}
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                            <Database className="w-5 h-5 text-gray-900" />
                            <h3 className="text-sm font-semibold text-gray-900">Destinations</h3>
                        </div>
                        <button
                            onClick={addDestination}
                            className="flex items-center space-x-1 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded border border-gray-200"
                        >
                            <Plus className="w-4 h-4" />
                            <span>Add</span>
                        </button>
                    </div>

                    <div className="space-y-2">
                        {destinations.length === 0 ? (
                            <div className="text-center py-8 text-gray-500 text-sm border border-gray-200 rounded bg-gray-50">
                                No destination selected
                            </div>
                        ) : (
                            destinations.map(dest => (
                                <div key={dest.id} className="flex items-center space-x-2">
                                    <input
                                        type="text"
                                        placeholder="/path/to/destination"
                                        className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded focus:outline-none focus:border-gray-400"
                                        value={dest.path}
                                        onChange={(e) => {
                                            setDestinations(destinations.map(d =>
                                                d.id === dest.id ? { ...d, path: e.target.value } : d
                                            ));
                                        }}
                                    />
                                    <button
                                        onClick={() => removeDestination(dest.id)}
                                        className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Execute Button */}
                <div className="flex justify-end pt-4">
                    <button
                        onClick={handleExecuteBackup}
                        disabled={isBackupRunning || sources.length === 0 || destinations.length === 0}
                        className={`flex items-center space-x-2 px-6 py-2.5 text-white rounded transition-colors ${isBackupRunning
                            ? 'bg-gray-400 cursor-not-allowed'
                            : (sources.length === 0 || destinations.length === 0)
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-gray-900 hover:bg-gray-800'
                        }`}
                    >
                        <Play className="w-4 h-4" />
                        <span>
                            {isBackupRunning
                                ? 'Backup in progress...'
                                : (sources.length === 0 || destinations.length === 0)
                                    ? 'Add origins and destinations'
                                    : 'Run Backup'
                            }
                        </span>
                    </button>
                </div>
            </div>

            {/* Modal de Progresso */}
            {isBackupRunning && (
                <BackupProgressModal
                    progress={backupProgress}
                    currentFile={currentFile}
                    filesProcessed={filesProcessed}
                    totalFiles={totalFiles}
                    onClose={handleCloseModal}
                    onPauseResume={handlePauseResume}
                    onCancel={handleCancel}
                    isPaused={isBackupPaused}
                />
            )}
        </>
    );
}