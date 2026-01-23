import React, { useState, useEffect } from 'react';
import { Calendar, CheckCircle, Clock, Download, AlertCircle, BarChart, RefreshCw } from 'lucide-react';
import { backupApi } from '../services/backupApi';

export default function HistorySection() {
    const [history, setHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadHistory = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const data = await backupApi.getHistory();
            setHistory(data);
        } catch (err) {
            setError('Failed to load backup history');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadHistory();

        const interval = setInterval(loadHistory, 30000);
        return () => clearInterval(interval);
    }, []);

    const getStatusIcon = (status) => {
        switch (status) {
            case 'completed':
                return <CheckCircle className="w-5 h-5 text-gray-600" />;
            case 'cancelled':
                return <AlertCircle className="w-5 h-5 text-yellow-600" />;
            case 'failed':
                return <AlertCircle className="w-5 h-5 text-red-600" />;
            case 'in_progress':
                return <Clock className="w-5 h-5 text-blue-600" />;
            case 'paused':
                return <Clock className="w-5 h-5 text-orange-600" />;
            default:
                return <Clock className="w-5 h-5 text-gray-600" />;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed':
                return 'bg-gray-100 text-gray-800 border border-gray-200';
            case 'cancelled':
                return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
            case 'failed':
                return 'bg-red-100 text-red-800 border border-red-200';
            case 'in_progress':
                return 'bg-blue-100 text-blue-800 border border-blue-200';
            case 'paused':
                return 'bg-orange-100 text-orange-800 border border-orange-200';
            default:
                return 'bg-gray-100 text-gray-800 border border-gray-200';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'completed': return 'Completed';
            case 'cancelled': return 'Cancelled';
            case 'failed': return 'Failed';
            case 'in_progress': return 'In Progress';
            case 'paused': return 'Paused';
            default: return 'Unknown';
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-gray-600">Loading backup history...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-12">
                <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">{error}</h3>
                <button
                    onClick={loadHistory}
                    className="mt-4 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
                >
                    Retry
                </button>
            </div>
        );
    }

    const completedCount = history.filter(h => h.status === 'completed').length;
    const successRate = history.length > 0 ? Math.round((completedCount / history.length) * 100) : 0;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-gray-600">View all backups performed.</p>
                </div>
                <div className="flex space-x-3">
                    <button
                        onClick={loadHistory}
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center space-x-3">
                        <div className="p-2 bg-gray-100 rounded-lg">
                            <BarChart className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                            <div className="text-sm text-gray-600">Total Backups</div>
                            <div className="text-2xl font-bold text-gray-900">{history.length}</div>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center space-x-3">
                        <div className="p-2 bg-gray-100 rounded-lg">
                            <CheckCircle className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                            <div className="text-sm text-gray-600">Success Rate</div>
                            <div className="text-2xl font-bold text-gray-900">
                                {successRate}%
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center space-x-3">
                        <div className="p-2 bg-gray-100 rounded-lg">
                            <Calendar className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                            <div className="text-sm text-gray-600">Last Backup</div>
                            <div className="text-2xl font-bold text-gray-900">
                                {history.length > 0 ? 'Today' : 'None'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                {history.length === 0 ? (
                    <div className="text-center py-12">
                        <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No backup performed</h3>
                        <p className="text-gray-500">Run your first backup to view the history here.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Backup</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Files</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {history.map((backup) => (
                                <tr key={backup.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-medium text-gray-900">{backup.name}</div>
                                        <div className="text-xs text-gray-500">
                                            {backup.source} → {backup.destination}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-600">{backup.date}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-600">{backup.size}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-600">{backup.files}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-600">{backup.duration}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            {getStatusIcon(backup.status)}
                                            <span className={`ml-2 px-2 py-1 text-xs rounded-full ${getStatusColor(backup.status)}`}>
                                                {getStatusText(backup.status)}
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}