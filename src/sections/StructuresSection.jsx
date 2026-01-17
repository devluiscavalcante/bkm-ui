import React from 'react';
import {Box, HardDrive, Layers, Settings} from 'lucide-react';
import FolderItem from '../components/tree/FolderItem';
import FileItem from '../components/tree/FileItem';

export function StructuresSection({expandedFolders, toggleFolder}) {
    return (<div className="space-y-8">
        <p1 className="text-gray-700 leading-relaxed">
            Well-defined layered architecture for maintainability and scalability. </p1>
        <div>
            <div className="bg-gray-50 border border-gray-200 rounded p-4">
                <FolderItem
                    name="backup-manager"
                    path="root"
                    isExpanded={expandedFolders.includes("root")}
                    onToggle={() => toggleFolder("root")}
                >
                    <FolderItem
                        name="src"
                        path="src"
                        isExpanded={expandedFolders.includes("src")}
                        onToggle={() => toggleFolder("src", true)} // colapso recursivo
                        level={1}
                    >

                        <FolderItem
                            name="main"
                            path="main"
                            isExpanded={expandedFolders.includes("main")}
                            onToggle={() => toggleFolder("main")}
                            level={2}
                        >
                            <FolderItem
                                name="java"
                                path="java"
                                isExpanded={expandedFolders.includes("java")}
                                onToggle={() => toggleFolder("java")}
                                level={3}
                            >
                                <FolderItem
                                    name="com.backup_manager"
                                    path="backup_manager"
                                    isExpanded={expandedFolders.includes("backup_manager")}
                                    onToggle={() => toggleFolder("backup_manager")}
                                    level={4}
                                >

                                    <FolderItem
                                        name="application"
                                        path="application"
                                        isExpanded={expandedFolders.includes("application")}
                                        onToggle={() => toggleFolder("application")}
                                        level={5}
                                    >
                                        <FolderItem
                                            name="controller"
                                            path="application/controller"
                                            isExpanded={expandedFolders.includes("application/controller")}
                                            onToggle={() => toggleFolder("application/controller")}
                                            level={6}
                                        />
                                        <FolderItem
                                            name="dto"
                                            path="application/dto"
                                            isExpanded={expandedFolders.includes("application/dto")}
                                            onToggle={() => toggleFolder("application/dto")}
                                            level={6}
                                        />
                                        <FolderItem
                                            name="progress"
                                            path="application/progress"
                                            isExpanded={expandedFolders.includes("application/progress")}
                                            onToggle={() => toggleFolder("application/progress")}
                                            level={6}
                                        />
                                        <FolderItem
                                            name="service"
                                            path="application/service"
                                            isExpanded={expandedFolders.includes("application/service")}
                                            onToggle={() => toggleFolder("application/service")}
                                            level={6}
                                        />
                                    </FolderItem>

                                    <FolderItem
                                        name="domain"
                                        path="domain"
                                        isExpanded={expandedFolders.includes("domain")}
                                        onToggle={() => toggleFolder("domain")}
                                        level={5}
                                    >
                                        <FolderItem
                                            name="model"
                                            path="domain/model"
                                            isExpanded={expandedFolders.includes("domain/model")}
                                            onToggle={() => toggleFolder("domain/model")}
                                            level={6}
                                        />
                                        <FolderItem
                                            name="service"
                                            path="domain/service"
                                            isExpanded={expandedFolders.includes("domain/service")}
                                            onToggle={() => toggleFolder("domain/service")}
                                            level={6}
                                        />
                                        <FolderItem
                                            name="exception"
                                            path="domain/exception"
                                            isExpanded={expandedFolders.includes("domain/exception")}
                                            onToggle={() => toggleFolder("domain/exception")}
                                            level={6}
                                        >
                                            <FolderItem
                                                name="handler"
                                                path="domain/exception/handler"
                                                isExpanded={expandedFolders.includes(
                                                    "domain/exception/handler"
                                                )}
                                                onToggle={() =>
                                                    toggleFolder("domain/exception/handler")
                                                }
                                                level={7}
                                            />
                                        </FolderItem>
                                    </FolderItem>

                                    <FolderItem
                                        name="infrastructure"
                                        path="infrastructure"
                                        isExpanded={expandedFolders.includes("infrastructure")}
                                        onToggle={() => toggleFolder("infrastructure")}
                                        level={5}
                                    >
                                        <FolderItem
                                            name="persistence"
                                            path="infrastructure/persistence"
                                            isExpanded={expandedFolders.includes(
                                                "infrastructure/persistence"
                                            )}
                                            onToggle={() =>
                                                toggleFolder("infrastructure/persistence")
                                            }
                                            level={6}
                                        />
                                        <FolderItem
                                            name="logging"
                                            path="infrastructure/logging"
                                            isExpanded={expandedFolders.includes(
                                                "infrastructure/logging"
                                            )}
                                            onToggle={() => toggleFolder("infrastructure/logging")}
                                            level={6}
                                        />
                                    </FolderItem>
                                </FolderItem>
                            </FolderItem>

                            <FolderItem
                                name="resources"
                                path="resources"
                                isExpanded={expandedFolders.includes("resources")}
                                onToggle={() => toggleFolder("resources")}
                                level={3}
                            >
                                <FolderItem
                                    name="static"
                                    path="resources/static"
                                    isExpanded={expandedFolders.includes("resources/static")}
                                    onToggle={() => toggleFolder("resources/static")}
                                    level={4}
                                />
                                <FolderItem
                                    name="templates"
                                    path="resources/templates"
                                    isExpanded={expandedFolders.includes("resources/templates")}
                                    onToggle={() => toggleFolder("resources/templates")}
                                    level={4}
                                />
                                <FileItem name="application.properties" level={4} />
                            </FolderItem>
                        </FolderItem>

                        <FolderItem
                            name="test"
                            path="test"
                            isExpanded={expandedFolders.includes("test")}
                            onToggle={() => toggleFolder("test")}
                            level={2}
                        >
                            <FolderItem
                                name="java"
                                path="test/java"
                                isExpanded={expandedFolders.includes("test/java")}
                                onToggle={() => toggleFolder("test/java")}
                                level={3}
                            >
                                <FolderItem
                                    name="com.backup_manager"
                                    path="test/java/com.backup_manager"
                                    isExpanded={expandedFolders.includes(
                                        "test/java/com.backup_manager"
                                    )}
                                    onToggle={() =>
                                        toggleFolder("test/java/com.backup_manager")
                                    }
                                    level={4}
                                />
                            </FolderItem>
                        </FolderItem>
                    </FolderItem>
                </FolderItem>
            </div>
        </div>


        <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Camadas</h3>
            <div className="grid grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                        <Layers className="w-4 h-4 text-gray-900"/>
                        <p className="text-gray-900 font-medium">Controller</p>
                    </div>
                    <p className="text-gray-600 text-sm">
                        Manage HTTP requests and coordinate operations.
                    </p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                        <Settings className="w-4 h-4 text-gray-900"/>
                        <p className="text-gray-900 font-medium">Service</p>
                    </div>
                    <p className="text-gray-600 text-sm">Business logic and backup engine</p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                        <HardDrive className="w-4 h-4 text-gray-900"/>
                        <p className="text-gray-900 font-medium">Repository</p>
                    </div>
                    <p className="text-gray-600 text-sm">Persistence operations in the database
                    </p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                        <Box className="w-4 h-4 text-gray-900"/>
                        <p className="text-gray-900 font-medium">Model</p>
                    </div>
                    <p className="text-gray-600 text-sm">Domain Entities</p>
                </div>
            </div>
        </div>
    </div>);
}
