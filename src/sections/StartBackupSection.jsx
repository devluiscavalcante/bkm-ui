// src/sections/StartBackupSection.jsx
import React from 'react';
import { FolderTree, Database, Play, Clock, Plus, Trash2 } from 'lucide-react';

export default function StartBackupSection({
                                               sources,
                                               destinations,
                                               logs,
                                               addSource,
                                               removeSource,
                                               addDestination,
                                               removeDestination,
                                               executeBackup,
                                               setSources,
                                               setDestinations
                                           }) {
    return (
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
    );
}
