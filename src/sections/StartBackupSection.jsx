import React, {useState} from 'react';
import {Database, FolderTree, Play, Plus, Trash2} from 'lucide-react';
import {BackupProgressModal} from './BackupProgressModal';

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

    // Simular o progresso do backup
    const handleExecuteBackup = () => {
        // Inicia o backup
        setIsBackupRunning(true);
        setBackupProgress(0);
        setFilesProcessed(0);

        // Simular o backup com 10 arquivos
        const simulatedTotalFiles = 10;
        setTotalFiles(simulatedTotalFiles);
        setCurrentFile('Iniciando backup...');

        let currentProgress = 0;
        let currentFileIndex = 0;
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

        const interval = setInterval(() => {
            currentProgress += 10;
            setBackupProgress(currentProgress);
            setFilesProcessed(Math.floor(currentProgress / 10));

            // Atualizar arquivo atual
            if (currentFileIndex < fileNames.length) {
                setCurrentFile(fileNames[currentFileIndex]);
                currentFileIndex++;
            }

            if (currentProgress >= 100) {
                clearInterval(interval);
                setCurrentFile('Finalizando backup...');

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
    };

    // Função para fechar o modal manualmente
    const handleCloseModal = () => {
        setIsBackupRunning(false);
        // Feature para cancelar (futura)
    };

    return (
        <>
            <div className="space-y-8">
                {/* Sources */}
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                            <FolderTree className="w-5 h-5 text-gray-900"/>
                            <h3 className="text-sm font-semibold text-gray-900">Origens</h3>
                        </div>
                        <button
                            onClick={addSource}
                            className="flex items-center space-x-1 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded border border-gray-200"
                        >
                            <Plus className="w-4 h-4"/>
                            <span>Adicionar</span>
                        </button>
                    </div>
                    <div className="space-y-2">
                        {sources.length === 0 ? (
                            <div
                                className="text-center py-8 text-gray-500 text-sm border border-gray-200 rounded bg-gray-50">
                                Nenhuma origem selecionada
                            </div>
                        ) : (
                            sources.map(source => (
                                <div key={source.id} className="flex items-center space-x-2">
                                    <input
                                        type="text"
                                        placeholder="/caminho/para/origem"
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
                            <h3 className="text-sm font-semibold text-gray-900">Destinos</h3>
                        </div>
                        <button
                            onClick={addDestination}
                            className="flex items-center space-x-1 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded border border-gray-200"
                        >
                            <Plus className="w-4 h-4"/>
                            <span>Adicionar</span>
                        </button>
                    </div>
                    <div className="space-y-2">
                        {destinations.length === 0 ? (
                            <div
                                className="text-center py-8 text-gray-500 text-sm border border-gray-200 rounded bg-gray-50">
                                Nenhum destino selecionado
                            </div>
                        ) : (
                            destinations.map(dest => (
                                <div key={dest.id} className="flex items-center space-x-2">
                                    <input
                                        type="text"
                                        placeholder="/caminho/para/destino"
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
                                ? 'Backup em Andamento...'
                                : (sources.length === 0 || destinations.length === 0)
                                    ? 'Adicione origens e destinos'
                                    : 'Executar Backup'
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
                />
            )}
        </>
    );
}