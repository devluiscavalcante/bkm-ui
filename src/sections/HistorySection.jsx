import React from 'react';
import { Calendar, CheckCircle, Clock, Download, AlertCircle, BarChart } from 'lucide-react';

export default function HistorySection({ history }) {

    const historyArray = Array.isArray(history) ? history : [];

    const getStatusIcon = (status) => {
        switch (status) {
            case 'completed':
                return <CheckCircle className="w-5 h-5 text-gray-600" />;
            case 'failed':
                return <AlertCircle className="w-5 h-5 text-gray-600" />;
            default:
                return <Clock className="w-5 h-5 text-gray-600" />; // Cinza
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed':
                return 'bg-gray-100 text-gray-800 border border-gray-200';
            case 'failed':
                return 'bg-gray-100 text-gray-800 border border-gray-200';
            default:
                return 'bg-gray-100 text-gray-800 border border-gray-200';
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-gray-600">View all backups performed.</p>
                </div>
                <div className="flex space-x-3">
                    <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                        <Calendar className="w-4 h-4 text-gray-600" />
                        <span className="text-gray-700">Filter</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800">
                        <Download className="w-4 h-4" />
                        <span>Export</span>
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
                            <div className="text-2xl font-bold text-gray-900">{historyArray.length}</div>
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
                                {historyArray.length > 0
                                    ? `${Math.round((historyArray.filter(h => h.status === 'completed').length / historyArray.length) * 100)}%`
                                    : '0%'
                                }
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
                                {historyArray.length > 0 ? 'Today' : 'None'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                {historyArray.length === 0 ? (
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
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {historyArray.map((backup) => (
                                backup && (
                                    <tr key={backup.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{backup.name || 'Backup sem nome'}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-600">{backup.date || 'Data não disponível'}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-600">{backup.size || '0 GB'}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-600">{backup.files || 0}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-600">{backup.duration || '0m'}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                {getStatusIcon(backup.status || 'completed')}
                                                <span className={`ml-2 px-2 py-1 text-xs rounded-full ${getStatusColor(backup.status || 'completed')}`}>
                                                        {backup.status === 'completed' ? 'Completed' : 'Failed'}
                                                    </span>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}