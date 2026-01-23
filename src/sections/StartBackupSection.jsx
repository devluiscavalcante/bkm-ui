import React, { useState, useRef } from 'react';
import { Database, FolderTree, Play, Plus, Trash2 } from 'lucide-react';
import { BackupProgressModal } from './BackupProgressModal';

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

    // Referência para acessar o estado atual dentro do intervalo
    const isBackupPausedRef = useRef(false);
    const backupIntervalRef = useRef(null);
    const currentProgressRef = useRef(0);
    const currentFileIndexRef = useRef(0);

    // Atualiza a referência quando o estado muda
    React.useEffect(() => {
        isBackupPausedRef.current = isBackupPaused;
    }, [isBackupPaused]);

    // Função para fechar o modal manualmente
    const handleCloseModal = () => {
        handleCancel();
    };

    // Função para pausar/retomar o backup
    const handlePauseResume = () => {
        setIsBackupPaused(!isBackupPaused);
    };

    // Função para cancelar o backup
    // ... imports e estados permanecem iguais até a função handleCancel

// Função para cancelar o backup
    // Função para cancelar o backup
    const handleCancel = () => {
        if (backupIntervalRef.current) {
            clearInterval(backupIntervalRef.current);
            backupIntervalRef.current = null;
        }

        // Cria um registro de backup cancelado
        const timestamp = new Date().toLocaleString();
        const cancelledBackup = {
            id: Date.now(),
            name: `Backup ${timestamp}`,
            date: timestamp,
            size: `${Math.round((currentProgressRef.current / 100) * 2.4)} GB`,
            status: 'cancelled', // ← STATUS CORRETO
            files: Math.floor(currentProgressRef.current / 10),
            duration: `${Math.floor(currentProgressRef.current / 20)}m`
        };

        // Chama uma função específica para backup cancelado
        if (executeBackup) {
            // Passa um parâmetro indicando que é cancelado
            executeBackup(cancelledBackup);
        }

        setIsBackupRunning(false);
        setIsBackupPaused(false);
        setBackupProgress(0);
        setFilesProcessed(0);
        setCurrentFile('');
        currentProgressRef.current = 0;
        currentFileIndexRef.current = 0;
    };

// ... resto do código permanece igual

    // Simular o progresso do backup
    const handleExecuteBackup = () => {
        // Inicia o backup
        setIsBackupRunning(true);
        setIsBackupPaused(false);
        isBackupPausedRef.current = false;
        setBackupProgress(0);
        setFilesProcessed(0);
        currentProgressRef.current = 0;
        currentFileIndexRef.current = 0;

        // Simular o backup com 10 arquivos
        const simulatedTotalFiles = 10;
        setTotalFiles(simulatedTotalFiles);
        setCurrentFile('Starting backup...');

        const fileNames = [
            'configuracoes.json',
            'documentos.docx',
            'planilha.xlsx',
            'imagens.zip',
            'database.sql',
            'logs.txt',
            'backup_antigo.tar',
            'fotos.jpg',
            'videos.mp4',
            'arquivos_finais.rar'
        ];

        // Limpa qualquer intervalo existente
        if (backupIntervalRef.current) {
            clearInterval(backupIntervalRef.current);
        }

        const interval = setInterval(() => {
            // Verifica se está pausado usando a referência
            if (isBackupPausedRef.current) {
                return; // Pausado - não faz nada
            }

            // Incrementa o progresso
            currentProgressRef.current += 10;
            const newProgress = currentProgressRef.current;

            setBackupProgress(newProgress);
            setFilesProcessed(Math.floor(newProgress / 10));

            // Atualizar arquivo atual
            if (currentFileIndexRef.current < fileNames.length) {
                setCurrentFile(fileNames[currentFileIndexRef.current]);
                currentFileIndexRef.current++;
            }

            // Verifica se terminou
            if (newProgress >= 100) {
                clearInterval(interval);
                setCurrentFile('Starting backup...');

                // Mantém o modal visível por mais 2 segundos antes de fechar
                setTimeout(() => {
                    setIsBackupRunning(false);
                    // Chamar a função real de backup
                    if (executeBackup) {
                        executeBackup();
                    }
                }, 2000);
            }
        }, 500);

        backupIntervalRef.current = interval;
    };

    return (
        <>
            <div className="space-y-8">
                {/* Sources */}
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                            <FolderTree className="w-5 h-5 text-gray-900"/>
                            <h3 className="text-sm font-semibold text-gray-900">Origins</h3>
                        </div>
                        <button
                            onClick={addSource}
                            className="flex items-center space-x-1 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded border border-gray-200"
                        >
                            <Plus className="w-4 h-4"/>
                            <span>To Add</span>
                        </button>
                    </div>
                    <div className="space-y-2">
                        {sources.length === 0 ? (
                            <div
                                className="text-center py-8 text-gray-500 text-sm border border-gray-200 rounded bg-gray-50">
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
                                                s.id === source.id ? {...s, path: e.target.value} : s
                                            ));
                                        }}
                                    />
                                    <button
                                        onClick={() => removeSource(source.id)}
                                        className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded"
                                    >
                                        <Trash2 className="w-4 h-4"/>
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Destinations */}
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                            <Database className="w-5 h-5 text-gray-900"/>
                            <h3 className="text-sm font-semibold text-gray-900">Destinations</h3>
                        </div>
                        <button
                            onClick={addDestination}
                            className="flex items-center space-x-1 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded border border-gray-200"
                        >
                            <Plus className="w-4 h-4"/>
                            <span>To Add</span>
                        </button>
                    </div>
                    <div className="space-y-2">
                        {destinations.length === 0 ? (
                            <div
                                className="text-center py-8 text-gray-500 text-sm border border-gray-200 rounded bg-gray-50">
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
                                                d.id === dest.id ? {...d, path: e.target.value} : d
                                            ));
                                        }}
                                    />
                                    <button
                                        onClick={() => removeDestination(dest.id)}
                                        className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded"
                                    >
                                        <Trash2 className="w-4 h-4"/>
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
                        className={`flex items-center space-x-2 px-6 py-2.5 text-white rounded transition-colors ${
                            isBackupRunning
                                ? 'bg-gray-400 cursor-not-allowed'
                                : (sources.length === 0 || destinations.length === 0)
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-gray-900 hover:bg-gray-800'
                        }`}
                    >
                        <Play className="w-4 h-4"/>
                        <span>
                            {isBackupRunning
                                ? 'Backup in progress...'
                                : (sources.length === 0 || destinations.length === 0)
                                    ? 'Add origins and destinations.'
                                    : 'Run Backup'
                            }
                        </span>
                    </button>
                </div>
            </div>

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