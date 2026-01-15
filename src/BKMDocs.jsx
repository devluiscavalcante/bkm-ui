import React, {useState} from 'react';
import {Database, FileText, FolderTree, Play, Settings} from 'lucide-react';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import InitialSection from './sections/InitialSection';
import AboutSection from './sections/AboutSection';
import SpecsSection from "./sections/SpecsSection";
import {StructuresSection} from './sections/StructuresSection';
import StartBackupSection from './sections/StartBackupSection';

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
        Initial: {
            title: 'Home',
            icon: Database,
            content: <InitialSection/>
        },

        About: {
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
            title: 'Structure',
            icon: FolderTree,
            content: <StructuresSection expandedFolders={expandedFolders} toggleFolder={toggleFolder}/>
        },
        backup: {
            title: 'Executar Backup',
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
