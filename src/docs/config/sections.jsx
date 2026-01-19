import {
    Box,
    Clock,
    Code,
    Database,
    FileText,
    FolderTree,
    HardDrive,
    Layers,
    Package,
    Play,
    Plus,
    Server,
    Settings,
    Shield,
    Trash2,
    Zap
} from 'lucide-react';

import FolderItem from '../components/tree/FolderItem';
import FileItem from '../components/tree/FileItem';

export function createSections({
                                   expandedFolders,
                                   toggleFolder,
                                   sources,
                                   destinations,
                                   logs,
                                   addSource,
                                   addDestination,
                                   removeSource,
                                   removeDestination,
                                   executeBackup,
                                   setSources,
                                   setDestinations
                               }) {
    return {
        inicio: {
            title: 'Backup Manager',
            icon: Database,
            content: (
                <div className="space-y-12">
                    <div className="flex items-start justify-between">
                        <div className="flex-1 pr-12">
                            <h1 className="text-5xl font-bold text-gray-900 mb-6">
                                Backup Manager
                            </h1>
                            <p className="text-xl text-gray-600 mb-8">
                                A minimalist solution for automated backup management.
                            </p>
                            <p className="text-gray-700 mb-4">
                                BKM allows you to create backups from multiple sources to multiple destinations.
                            </p>
                            <p className="text-gray-700">
                                Clean interface, simple operation, full control over your data.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-6 pt-8">
                        <Feature icon={Zap} title="Fast" description="Incremental and efficient backups" />
                        <Feature icon={Shield} title="Secure" description="Integrity checks and detailed logs" />
                        <Feature icon={Package} title="Flexible" description="Multiple configurable sources and destinations" />
                    </div>
                </div>
            )
        },

        estrutura: {
            title: 'Structure',
            icon: FolderTree,
            content: (
                <div className="space-y-8">
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
                                            name="com/bkm"
                                            path="bkm"
                                            isExpanded={expandedFolders.includes('bkm')}
                                            onToggle={() => toggleFolder('bkm')}
                                            level={4}
                                        >
                                            <FileItem name="controller/" level={5} />
                                            <FileItem name="service/" level={5} />
                                            <FileItem name="repository/" level={5} />
                                            <FileItem name="model/" level={5} />
                                        </FolderItem>
                                    </FolderItem>
                                </FolderItem>
                            </FolderItem>
                        </FolderItem>
                    </div>
                </div>
            )
        },

        backup: {
            title: 'Run Backup',
            icon: Play,
            content: (
                <div className="space-y-8">
                    <SectionList
                        title="Sources"
                        icon={FolderTree}
                        items={sources}
                        onAdd={addSource}
                        onRemove={removeSource}
                        onChange={(id, value) =>
                            setSources(sources.map(s => s.id === id ? { ...s, path: value } : s))
                        }
                        placeholder="/path/to/source"
                    />

                    <SectionList
                        title="Destinations"
                        icon={Database}
                        items={destinations}
                        onAdd={addDestination}
                        onRemove={removeDestination}
                        onChange={(id, value) =>
                            setDestinations(destinations.map(d => d.id === id ? { ...d, path: value } : d))
                        }
                        placeholder="/path/to/destination"
                    />

                    <div className="flex justify-end">
                        <button
                            onClick={executeBackup}
                            className="px-6 py-2.5 bg-gray-900 text-white rounded"
                        >
                            Execute Backup
                        </button>
                    </div>

                    <Logs logs={logs} />
                </div>
            )
        }
    };
}

/* --- small helpers --- */

function Feature({ icon: Icon, title, description }) {
    return (
        <div className="flex items-start space-x-3">
            <Icon className="w-5 h-5 text-gray-900 mt-0.5" />
            <div>
                <h3 className="font-semibold text-gray-900">{title}</h3>
                <p className="text-sm text-gray-600">{description}</p>
            </div>
        </div>
    );
}
