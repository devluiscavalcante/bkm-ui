import React, { useState, useEffect } from 'react';
import { Search, Download, AlertCircle, Info, CheckCircle, XCircle, FileText, RefreshCw } from 'lucide-react';
import { backupApi } from '../services/backupApi';

export default function LogsSection() {
    const [logs, setLogs] = useState([]);
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadLogs = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const data = await backupApi.getLogs();
            setLogs(data);
        } catch (err) {
            setError('Failed to load logs');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadLogs();

        const interval = setInterval(loadLogs, 10000);
        return () => clearInterval(interval);
    }, []);

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
        ? logs
        : logs.filter(log => log && log.level === filter);

    const searchedLogs = search
        ? filteredLogs.filter(log =>
            log.message.toLowerCase().includes(search.toLowerCase()) ||
            log.source.toLowerCase().includes(search.toLowerCase())
        )
        : filteredLogs;

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-gray-600">Loading logs...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-12">
                <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">{error}</h3>
                <button
                    onClick={loadLogs}
                    className="mt-4 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-gray-600">Log of all backup operations</p>
                </div>
                <div className="flex space-x-3">
                    <button
                        onClick={loadLogs}
                        className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                        <RefreshCw className="w-4 h-4 text-gray-600" />
                        <span className="text-gray-700">Refresh</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                        <Download className="w-4 h-4 text-gray-600" />
                        <span className="text-gray-700">Export</span>
                    </button>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search the logs..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={() => setFilter('all')}
                        className={`px-3 py-1.5 text-sm rounded-lg ${filter === 'all' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    >
                        All
                    </button>
                    <button
                        onClick={() => setFilter('success')}
                        className={`px-3 py-1.5 text-sm rounded-lg ${filter === 'success' ? 'bg-green-100 text-green-800 border border-green-300' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    >
                        Success
                    </button>
                    <button
                        onClick={() => setFilter('warning')}
                        className={`px-3 py-1.5 text-sm rounded-lg ${filter === 'warning' ? 'bg-yellow-100 text-yellow-800 border border-yellow-300' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    >
                        Warnings
                    </button>
                    <button
                        onClick={() => setFilter('error')}
                        className={`px-3 py-1.5 text-sm rounded-lg ${filter === 'error' ? 'bg-red-100 text-red-800 border border-red-300' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    >
                        Error
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                {searchedLogs.length === 0 ? (
                    <div className="text-center py-12">
                        <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            {logs.length === 0 ? 'No logs found' : 'No logs matching this filter.'}
                        </h3>
                        <p className="text-gray-500">
                            {logs.length === 0
                                ? 'Perform a backup to view the logs here.'
                                : 'Try another filter or search term.'
                            }
                        </p>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-200">
                        {searchedLogs.map((log) => (
                            <div key={log.id} className="p-4 hover:bg-gray-50">
                                <div className="flex items-start space-x-3">
                                    {getLevelIcon(log.level || 'info')}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium text-gray-900">
                                                {log.message || 'Log message not available'}
                                            </span>
                                            <span className={`px-2 py-1 text-xs rounded-full ${getLevelColor(log.level || 'info')}`}>
                                                {(log.level || 'info').toUpperCase()}
                                            </span>
                                        </div>
                                        <div className="mt-1 flex items-center space-x-4">
                                            <span className="text-sm text-gray-500">{log.timestamp}</span>
                                            <span className="text-sm text-gray-400">Source: {log.source}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}