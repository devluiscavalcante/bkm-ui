import React, {useState} from 'react';
import {Database, FileText, FolderTree, History, List, Play, Settings} from 'lucide-react';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import InitialSection from './sections/InitialSection';
import AboutSection from './sections/AboutSection';
import SpecsSection from "./sections/SpecsSection";
import {StructuresSection} from './sections/StructuresSection';
import StartBackupSection from './sections/StartBackupSection';
import HistorySection from './sections/HistorySection';
import LogsSection from './sections/LogsSection';

export default function BKMDocs() {
    const [activeSection, setActiveSection] = useState('inicio');
    const [expandedFolders, setExpandedFolders] = useState(['root', 'src', 'main', 'java', 'bkm', 'resources']);
    const [sources, setSources] = useState([]);
    const [destinations, setDestinations] = useState([]);
    const [logs, setLogs] = useState([]);
    const [backupHistory, setBackupHistory] = useState([]);

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
        const newLog = {
            id: Date.now(),
            timestamp,
            level: 'success',
            message: `Backup executado: ${sources.length} origem(ns) → ${destinations.length} destino(s)`
        };

        const newBackup = {
            id: Date.now(),
            name: `Backup ${timestamp}`,
            date: timestamp,
            size: `${(sources.length * 0.5).toFixed(1)} GB`, // Simulado
            status: 'completed',
            files: sources.length * 100, // Simulado
            duration: `${sources.length + destinations.length}m`
        };

        setLogs([...logs, newLog]);
        setBackupHistory([newBackup, ...backupHistory]);
    };

    const sections = {
        inicio: {
            title: 'Home',
            icon: Database,
            content: <InitialSection/>
        },
        sobre: {
            title: 'About',
            icon: FileText,
            content: <AboutSection/>
        },
        especificacoes: {
            title: 'Specs',
            icon: Settings,
            content: <SpecsSection/>
        },
        estrutura: {
            title: 'Structure',
            icon: FolderTree,
            content: <StructuresSection expandedFolders={expandedFolders} toggleFolder={toggleFolder}/>
        },
        backup: {
            title: 'Backup',
            icon: Play,
            content: <StartBackupSection
                sources={sources}
                destinations={destinations}
                logs={logs}
                addSource={addSource}
                removeSource={removeSource}
                addDestination={addDestination}
                removeDestination={removeDestination}
                executeBackup={executeBackup}
                setSources={setSources}
                setDestinations={setDestinations}
            />
        },
        historico: {
            title: 'History',
            icon: History,
            content: <HistorySection history={backupHistory}/>
        },
        logs: {
            title: 'Logs',
            icon: List,
            content: <LogsSection logs={logs}/>
        }
    };

    const currentSection = sections[activeSection] ?? Object.values(sections)[0];
    return (
        <div className="flex flex-col min-h-screen bg-white">
            <Header/>

            <div className="flex flex-1">
                <Sidebar
                    sections={sections}
                    activeSection={activeSection}
                    onSelect={setActiveSection}
                />

                <main className="flex-1 overflow-auto">
                    <div className="max-w-6xl mx-auto px-8 py-8">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                            {currentSection.title}
                        </h2>
                        {currentSection.content}
                    </div>
                </main>
            </div>
        </div>
    );
}