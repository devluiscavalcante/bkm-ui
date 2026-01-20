import React, { useState } from 'react';
import { Search, Download, AlertCircle, Info, CheckCircle, XCircle, FileText } from 'lucide-react';

export default function LogsSection({ logs }) {
    const [filter, setFilter] = useState('all');

    // Garante que logs seja um array
    const logsArray = Array.isArray(logs) ? logs : [];

    const getLevelIcon = (level) => {
        switch (level) {
            case 'success':
                return <CheckCircle className="w-4 h-4 text-green-500" />;
            case 'warning':
                return <AlertCircle className="w-4 h-4 text-yellow-500" />;
            case 'error':
                return <XCircle className="w-4 h-4 text-red-500" />;
            default:
                return <Info className="w-4 h-4 text-blue-500" />;
        }
    };

    const getLevelColor = (level) => {
        switch (level) {
            case 'success':
                return 'bg-green-100 text-green-800';
            case 'warning':
                return 'bg-yellow-100 text-yellow-800';
            case 'error':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-blue-100 text-blue-800';
        }
    };

    const filteredLogs = filter === 'all'
        ? logsArray
        : logsArray.filter(log => log && log.level === filter);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Logs do Sistema</h1>
                    <p className="text-gray-600">Registro de todas as operações de backup</p>
                </div>
                <div className="flex space-x-3">
                    <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                        <Download className="w-4 h-4" />
                        <span>Exportar</span>
                    </button>
                </div>
            </div>

            {/* Filters and Search */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Buscar em logs..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={() => setFilter('all')}
                        className={`px-3 py-1.5 text-sm rounded-lg ${filter === 'all' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    >
                        Todos
                    </button>
                    <button
                        onClick={() => setFilter('success')}
                        className={`px-3 py-1.5 text-sm rounded-lg ${filter === 'success' ? 'bg-green-100 text-green-800 border border-green-300' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    >
                        Sucesso
                    </button>
                    <button
                        onClick={() => setFilter('warning')}
                        className={`px-3 py-1.5 text-sm rounded-lg ${filter === 'warning' ? 'bg-yellow-100 text-yellow-800 border border-yellow-300' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    >
                        Aviso
                    </button>
                    <button
                        onClick={() => setFilter('error')}
                        className={`px-3 py-1.5 text-sm rounded-lg ${filter === 'error' ? 'bg-red-100 text-red-800 border border-red-300' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    >
                        Erro
                    </button>
                </div>
            </div>

            {/* Logs List */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                {filteredLogs.length === 0 ? (
                    <div className="text-center py-12">
                        <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            {logsArray.length === 0 ? 'Nenhum log encontrado' : 'Nenhum log com este filtro'}
                        </h3>
                        <p className="text-gray-500">
                            {logsArray.length === 0
                                ? 'Execute um backup para ver os logs aqui.'
                                : 'Tente outro filtro.'
                            }
                        </p>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-200">
                        {filteredLogs.map((log) => (
                            log && (
                                <div key={log.id} className="p-4 hover:bg-gray-50">
                                    <div className="flex items-start space-x-3">
                                        {getLevelIcon(log.level || 'info')}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm font-medium text-gray-900">
                                                    {log.message || 'Log sem mensagem'}
                                                </span>
                                                <span className={`px-2 py-1 text-xs rounded-full ${getLevelColor(log.level || 'info')}`}>
                                                    {(log.level || 'info').toUpperCase()}
                                                </span>
                                            </div>
                                            <div className="mt-1">
                                                <span className="text-sm text-gray-500">{log.timestamp || 'Data não disponível'}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}