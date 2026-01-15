import React from 'react';
import { Layers, Settings, HardDrive, Box } from 'lucide-react';
import FolderItem from '../components/tree/FolderItem';
import FileItem from '../components/tree/FileItem';

export function StructuresSection({expandedFolders, toggleFolder}) {
    return (
        <div className="space-y-8">
            <p className="text-gray-700 leading-relaxed">
                Well-defined layered architecture for maintainability and scalability.            </p>

            {/* Estrutura de pastas */}
            <div>
                <div className="bg-gray-50 border border-gray-200 rounded p-4">
                    <FolderItem
                        name="backup-manager"
                        path="root"
                        isExpanded={expandedFolders.includes('root')}
                        onToggle={() => toggleFolder('root')}
                    >
                        <FolderItem
                            name="src"
                            path="src"
                            isExpanded={expandedFolders.includes('src')}
                            onToggle={() => toggleFolder('src')}
                            level={1}
                        >
                            <FolderItem
                                name="main"
                                path="main"
                                isExpanded={expandedFolders.includes('main')}
                                onToggle={() => toggleFolder('main')}
                                level={2}
                            >
                                <FolderItem
                                    name="java"
                                    path="java"
                                    isExpanded={expandedFolders.includes('java')}
                                    onToggle={() => toggleFolder('java')}
                                    level={3}
                                >
                                    <FolderItem
                                        name="com.backup_manager"
                                        path="bkm"
                                        isExpanded={expandedFolders.includes('bkm')}
                                        onToggle={() => toggleFolder('bkm')}
                                        level={4}
                                    >
                                        <FolderItem name="application" level={5}/>
                                        <FileItem name="domain/" level={5}/>
                                        <FileItem name="infrastructure/" level={5}/>
                                    </FolderItem>
                                </FolderItem>
                                <FolderItem
                                    name="resources"
                                    path="resources"
                                    isExpanded={expandedFolders.includes('resources')}
                                    onToggle={() => toggleFolder('resources')}
                                    level={3}
                                >
                                    <FileItem name="static/" level={4}/>
                                    <FileItem name="templates/" level={4}/>
                                    <FileItem name="application.yml" level={4}/>
                                </FolderItem>
                            </FolderItem>
                        </FolderItem>
                        <FileItem name="backups/" level={1}/>
                        <FileItem name="logs/" level={1}/>
                        <FileItem name="database/" level={1}/>
                    </FolderItem>
                </div>
            </div>

            {/* Camadas */}
            <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Camadas</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-2">
                            <Layers className="w-4 h-4 text-gray-900"/>
                            <p className="text-gray-900 font-medium">Controller</p>
                        </div>
                        <p className="text-gray-600 text-sm">
                            Gerencia requisições HTTP e coordena operações
                        </p>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-2">
                            <Settings className="w-4 h-4 text-gray-900"/>
                            <p className="text-gray-900 font-medium">Service</p>
                        </div>
                        <p className="text-gray-600 text-sm">Lógica de negócio e motor de backup</p>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-2">
                            <HardDrive className="w-4 h-4 text-gray-900"/>
                            <p className="text-gray-900 font-medium">Repository</p>
                        </div>
                        <p className="text-gray-600 text-sm">Operações de persistência no banco de dados</p>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-2">
                            <Box className="w-4 h-4 text-gray-900"/>
                            <p className="text-gray-900 font-medium">Model</p>
                        </div>
                        <p className="text-gray-600 text-sm">Entidades do domínio</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
