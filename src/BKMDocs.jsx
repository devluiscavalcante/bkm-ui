import React, {useState} from 'react';
import {
    Box,
    Clock,
    Code,
    Database,
    FileText,
    FolderTree,
    HardDrive,
    Layers,
    Play,
    Plus,
    Server,
    Settings,
    Trash2
} from 'lucide-react';
import FolderItem from './components/tree/FolderItem';
import FileItem from './components/tree/FileItem';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import InitialSection from './sections/InitialSection';
import AboutSection from './sections/AboutSection';
import SpecsSection from "./sections/SpecsSection.jsx";


export default function BKMDocs() {
    const [activeSection, setActiveSection] = useState('inicio');
    const [expandedFolders, setExpandedFolders] = useState(['root', 'src', 'main', 'java', 'bkm', 'resources']);
    const [sources, setSources] = useState([]);
    const [destinations, setDestinations] = useState([]);
    const [logs, setLogs] = useState([]);

    const toggleFolder = (path) => {
        setExpandedFolders(prev =>
            prev.includes(path)
                ? prev.filter(p => p !== path)
                : [...prev, path]
        );
    };

    const addSource = () => {
        setSources([...sources, {id: Date.now(), path: ''}]);
    };

    const addDestination = () => {
        setDestinations([...destinations, {id: Date.now(), path: ''}]);
    };

    const removeSource = (id) => {
        setSources(sources.filter(s => s.id !== id));
    };

    const removeDestination = (id) => {
        setDestinations(destinations.filter(d => d.id !== id));
    };

    const executeBackup = () => {
        if (sources.length === 0 || destinations.length === 0) {
            alert('Adicione ao menos uma origem e um destino');
            return;
        }
        const timestamp = new Date().toLocaleString();
        setLogs([...logs, {
            id: Date.now(),
            timestamp,
            status: 'success',
            message: `Backup executado: ${sources.length} origem(ns) → ${destinations.length} destino(s)`
        }]);
    };


    const sections = {
        inicio: {
            title: 'Backup Manager',
            icon: Database,
            content: <InitialSection/>
        },

        sobre: {
            title: 'About',
            icon: FileText,
            content: <AboutSection/>
        },

        Specs: {
            title: 'Specs',
            icon: Settings,
            content: <SpecsSection/>

        },
        estrutura: {
            title: 'Estrutura',
            icon: FolderTree,
            content: (
                <div className="space-y-8">
                    <p className="text-gray-700 leading-relaxed">
                        Arquitetura em camadas bem definida para manutenibilidade e escalabilidade.
                    </p>

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
                                                name="com/bkm"
                                                path="bkm"
                                                isExpanded={expandedFolders.includes('bkm')}
                                                onToggle={() => toggleFolder('bkm')}
                                                level={4}
                                            >
                                                <FileItem name="controller/" level={5}/>
                                                <FileItem name="service/" level={5}/>
                                                <FileItem name="repository/" level={5}/>
                                                <FileItem name="model/" level={5}/>
                                                <FileItem name="config/" level={5}/>
                                                <FileItem name="util/" level={5}/>
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

                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 mb-4">Camadas</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center space-x-2 mb-2">
                                    <Layers className="w-4 h-4 text-gray-900"/>
                                    <p className="text-gray-900 font-medium">Controller</p>
                                </div>
                                <p className="text-gray-600 text-sm">Gerencia requisições HTTP e coordena operações</p>
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
            )
        },
        backup: {
            title: 'Executar Backup',
            icon: Play,
            content: (
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
                    <div className="flex justify-end">
                        <button
                            onClick={executeBackup}
                            className="flex items-center space-x-2 px-6 py-2.5 bg-gray-900 text-white rounded hover:bg-gray-800 transition-colors"
                        >
                            <Play className="w-4 h-4"/>
                            <span>Executar Backup</span>
                        </button>
                    </div>

                    {/* Logs */}
                    <div>
                        <div className="flex items-center space-x-2 mb-4">
                            <Clock className="w-5 h-5 text-gray-900"/>
                            <h3 className="text-sm font-semibold text-gray-900">Histórico</h3>
                        </div>
                        <div className="border border-gray-200 rounded">
                            {logs.length === 0 ? (
                                <div className="text-center py-8 text-gray-500 text-sm bg-gray-50">
                                    Nenhum backup executado ainda
                                </div>
                            ) : (
                                <div className="divide-y divide-gray-200">
                                    {logs.map(log => (
                                        <div key={log.id} className="px-4 py-3 hover:bg-gray-50">
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <p className="text-sm text-gray-900">{log.message}</p>
                                                    <p className="text-xs text-gray-500 mt-1">{log.timestamp}</p>
                                                </div>
                                                <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">
                          Sucesso
                        </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )
        }
    };

    const currentSection = sections[activeSection] ?? Object.values(sections)[0];
    return (
        <div className="flex flex-col min-h-screen bg-white">
            {/* Top Bar */}
            <Header/>


            <div className="flex flex-1">
                {/* Sidebar */}
                <Sidebar
                    sections={sections}
                    activeSection={activeSection}
                    onSelect={setActiveSection}
                />


                {/* Main Content */}
                <main className="flex-1">
                    <div className="max-w-4xl mx-auto px-8 py-16">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-8">
                            {currentSection.title}
                        </h2>
                        {currentSection.content}
                    </div>
                </main>
            </div>
        </div>
    );
}
