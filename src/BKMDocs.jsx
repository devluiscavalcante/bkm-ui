import React, { useState } from 'react';
import { ChevronRight, Database, Settings, FileText, FolderTree, Github, Zap, Shield, Package, Code, Layers, Server, HardDrive, Box, Play, ChevronDown, Folder, File, Plus, Trash2, Clock } from 'lucide-react';
import FolderItem from './components/tree/FolderItem';
import FileItem from './components/tree/FileItem';

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
        setSources([...sources, { id: Date.now(), path: '' }]);
    };

    const addDestination = () => {
        setDestinations([...destinations, { id: Date.now(), path: '' }]);
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
            content: (
                <div className="space-y-12">
                    {/* Hero Section */}
                    <div className="flex items-start justify-between">
                        <div className="flex-1 pr-12">
                            <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
                                Backup Manager
                            </h1>
                            <p className="text-xl text-gray-600 leading-relaxed mb-8">
                                Uma solução minimalista para gerenciamento de backups automáticos.
                            </p>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                O BKM permite criar cópias de segurança de múltiplas origens para diversos destinos de forma automatizada e eficiente.
                            </p>
                            <p className="text-gray-700 leading-relaxed mb-8">
                                Interface limpa, operação simples e controle total sobre seus dados.
                            </p>
                        </div>

                        {/* Logo SVG */}
                        <div className="shrink-0">
                            <svg width="280" height="280" viewBox="0 0 200 200" className="text-gray-900">
                                {/* Isometric BKM Logo */}
                                <g transform="translate(100, 60)">
                                    {/* B */}
                                    <path d="M-60,0 L-60,60 L-30,75 L-30,15 Z" fill="currentColor" opacity="0.9"/>
                                    <path d="M-60,0 L-30,15 L0,0 L-30,-15 Z" fill="currentColor"/>
                                    <path d="M0,0 L0,60 L-30,75 L-30,15 Z" fill="currentColor" opacity="0.7"/>

                                    {/* K */}
                                    <path d="M10,0 L10,60 L25,52.5 L25,-7.5 Z" fill="currentColor" opacity="0.9"/>
                                    <path d="M25,-7.5 L40,-15 L55,-7.5 L40,0 Z" fill="currentColor"/>
                                    <path d="M40,0 L55,-7.5 L55,52.5 L40,60 Z" fill="currentColor" opacity="0.7"/>

                                    {/* M */}
                                    <path d="M65,0 L65,60 L80,52.5 L80,-7.5 Z" fill="currentColor" opacity="0.9"/>
                                    <path d="M80,-7.5 L95,-15 L110,-7.5 L95,0 Z" fill="currentColor"/>
                                    <path d="M95,0 L110,-7.5 L110,52.5 L95,60 Z" fill="currentColor" opacity="0.7"/>
                                </g>
                            </svg>
                        </div>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-3 gap-6 pt-8">
                        <div className="flex items-start space-x-3">
                            <Zap className="w-5 h-5 text-gray-900 shrink-0 mt-0.5" />
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-1">Rápido</h3>
                                <p className="text-sm text-gray-600">Backups incrementais e compactação eficiente</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-3">
                            <Shield className="w-5 h-5 text-gray-900 shrink-0 mt-0.5" />
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-1">Seguro</h3>
                                <p className="text-sm text-gray-600">Verificação de integridade e logs detalhados</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-3">
                            <Package className="w-5 h-5 text-gray-900 shrink-0 mt-0.5" />
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-1">Flexível</h3>
                                <p className="text-sm text-gray-600">Múltiplas origens e destinos configuráveis</p>
                            </div>
                        </div>
                    </div>
                </div>
            )
        },
        sobre: {
            title: 'Sobre',
            icon: FileText,
            content: (
                <div className="space-y-8">
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 mb-4">Como funciona</h3>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="flex items-start space-x-3">
                                <Settings className="w-5 h-5 text-gray-900 shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-gray-700 leading-relaxed">
                                        Configure as origens que deseja proteger - diretórios ou arquivos específicos.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-3">
                                <Database className="w-5 h-5 text-gray-900 shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-gray-700 leading-relaxed">
                                        Defina os destinos onde os backups serão armazenados com segurança.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-3">
                                <Zap className="w-5 h-5 text-gray-900 shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-gray-700 leading-relaxed">
                                        Execute manualmente ou configure execução automática programada.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-3">
                                <FileText className="w-5 h-5 text-gray-900 shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-gray-700 leading-relaxed">
                                        Monitore através do histórico e logs detalhados de cada operação.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 mb-3">Recursos</h3>
                        <div className="space-y-2 text-gray-700">
                            <p>Backup incremental para otimização de espaço</p>
                            <p>Compactação automática de arquivos</p>
                            <p>Histórico completo de operações</p>
                            <p>Interface minimalista e intuitiva</p>
                            <p>Logs detalhados para auditoria</p>
                        </div>
                    </div>
                </div>
            )
        },
        especificacoes: {
            title: 'Especificações',
            icon: Settings,
            content: (
                <div className="space-y-8">
                    <div>
                        <div className="flex items-center space-x-2 mb-4">
                            <Server className="w-5 h-5 text-gray-900" />
                            <h3 className="text-sm font-semibold text-gray-900">Backend</h3>
                        </div>
                        <ul className="space-y-2 text-gray-700 pl-7 list-disc">
                            <li>Java 17+ como linguagem principal</li>
                            <li>Spring Boot como framework web</li>
                            <li>SQLite para banco de dados embarcado</li>
                            <li>Maven para gerenciamento de dependências</li>
                        </ul>
                    </div>

                    <div>
                        <div className="flex items-center space-x-2 mb-4">
                            <Code className="w-5 h-5 text-gray-900" />
                            <h3 className="text-sm font-semibold text-gray-900">Frontend</h3>
                        </div>
                        <ul className="space-y-2 text-gray-700 pl-7 list-disc">
                            <li>HTML5 e CSS3 para estrutura e estilo</li>
                            <li>JavaScript para interatividade</li>
                            <li>Design minimalista e responsivo</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 mb-3">Requisitos</h3>
                        <ul className="space-y-2 text-gray-700 list-disc pl-5">
                            <li>Java Runtime Environment 17 ou superior</li>
                            <li>Mínimo de 512MB de RAM</li>
                            <li>Compatível com Windows, Linux e macOS</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 mb-3">API REST</h3>
                        <div className="bg-gray-50 border border-gray-200 rounded p-4 font-mono text-sm text-gray-700 space-y-1">
                            <div>POST /api/backup/execute</div>
                            <div>GET /api/backup/history</div>
                            <div>GET /api/backup/status</div>
                            <div>PUT /api/config</div>
                        </div>
                    </div>
                </div>
            )
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
                                                <FileItem name="controller/" level={5} />
                                                <FileItem name="service/" level={5} />
                                                <FileItem name="repository/" level={5} />
                                                <FileItem name="model/" level={5} />
                                                <FileItem name="config/" level={5} />
                                                <FileItem name="util/" level={5} />
                                            </FolderItem>
                                        </FolderItem>
                                        <FolderItem
                                            name="resources"
                                            path="resources"
                                            isExpanded={expandedFolders.includes('resources')}
                                            onToggle={() => toggleFolder('resources')}
                                            level={3}
                                        >
                                            <FileItem name="static/" level={4} />
                                            <FileItem name="templates/" level={4} />
                                            <FileItem name="application.yml" level={4} />
                                        </FolderItem>
                                    </FolderItem>
                                </FolderItem>
                                <FileItem name="backups/" level={1} />
                                <FileItem name="logs/" level={1} />
                                <FileItem name="database/" level={1} />
                            </FolderItem>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 mb-4">Camadas</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center space-x-2 mb-2">
                                    <Layers className="w-4 h-4 text-gray-900" />
                                    <p className="text-gray-900 font-medium">Controller</p>
                                </div>
                                <p className="text-gray-600 text-sm">Gerencia requisições HTTP e coordena operações</p>
                            </div>

                            <div className="border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center space-x-2 mb-2">
                                    <Settings className="w-4 h-4 text-gray-900" />
                                    <p className="text-gray-900 font-medium">Service</p>
                                </div>
                                <p className="text-gray-600 text-sm">Lógica de negócio e motor de backup</p>
                            </div>

                            <div className="border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center space-x-2 mb-2">
                                    <HardDrive className="w-4 h-4 text-gray-900" />
                                    <p className="text-gray-900 font-medium">Repository</p>
                                </div>
                                <p className="text-gray-600 text-sm">Operações de persistência no banco de dados</p>
                            </div>

                            <div className="border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center space-x-2 mb-2">
                                    <Box className="w-4 h-4 text-gray-900" />
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
                                <FolderTree className="w-5 h-5 text-gray-900" />
                                <h3 className="text-sm font-semibold text-gray-900">Origens</h3>
                            </div>
                            <button
                                onClick={addSource}
                                className="flex items-center space-x-1 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded border border-gray-200"
                            >
                                <Plus className="w-4 h-4" />
                                <span>Adicionar</span>
                            </button>
                        </div>
                        <div className="space-y-2">
                            {sources.length === 0 ? (
                                <div className="text-center py-8 text-gray-500 text-sm border border-gray-200 rounded bg-gray-50">
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
                                            <Trash2 className="w-4 h-4" />
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
                                <Database className="w-5 h-5 text-gray-900" />
                                <h3 className="text-sm font-semibold text-gray-900">Destinos</h3>
                            </div>
                            <button
                                onClick={addDestination}
                                className="flex items-center space-x-1 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded border border-gray-200"
                            >
                                <Plus className="w-4 h-4" />
                                <span>Adicionar</span>
                            </button>
                        </div>
                        <div className="space-y-2">
                            {destinations.length === 0 ? (
                                <div className="text-center py-8 text-gray-500 text-sm border border-gray-200 rounded bg-gray-50">
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
                                            <Trash2 className="w-4 h-4" />
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
                            <Play className="w-4 h-4" />
                            <span>Executar Backup</span>
                        </button>
                    </div>

                    {/* Logs */}
                    <div>
                        <div className="flex items-center space-x-2 mb-4">
                            <Clock className="w-5 h-5 text-gray-900" />
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

    return (
        <div className="flex flex-col min-h-screen bg-white">
            {/* Top Bar */}
            <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
                <div className="flex items-center justify-between px-6 py-3">
                    <div className="flex items-center space-x-2">
                        <Database className="w-5 h-5 text-gray-900" />
                        <span className="text-sm font-semibold text-gray-900">Backup Manager (BKM)</span>
                    </div>
                    <a
                        href="https://github.com/devluiscavalcante/backup-manager"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
                    >
                        <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center">
                            <Github className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-sm">BKM on Github</span>
                    </a>
                </div>
            </header>

            <div className="flex flex-1">
                {/* Sidebar */}
                <aside className="w-56 border-r border-gray-200 p-6 flex flex-col">
                    <nav className="flex-1 space-y-0.5">
                        {Object.entries(sections).map(([key, section]) => {
                            const Icon = section.icon;
                            return (
                                <button
                                    key={key}
                                    onClick={() => setActiveSection(key)}
                                    className={`w-full text-left px-2 py-1.5 rounded text-sm transition-colors flex items-center space-x-2 ${
                                        activeSection === key
                                            ? 'bg-gray-100 text-gray-900'
                                            : 'text-gray-600 hover:text-gray-900'
                                    }`}
                                >
                                    <Icon className="w-4 h-4" />
                                    <span>{section.title}</span>
                                </button>
                            );
                        })}
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1">
                    <div className="max-w-4xl mx-auto px-8 py-16">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-8">
                            {sections[activeSection].title}
                        </h2>
                        {sections[activeSection].content}
                    </div>
                </main>
            </div>
        </div>
    );
}