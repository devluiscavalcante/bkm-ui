import { useState, useEffect } from 'react';
import { Minimize2, Maximize2, X, CheckCircle } from 'lucide-react';

export function BackupProgressModal({
                                        progress,
                                        currentFile = '',
                                        filesProcessed = 0,
                                        totalFiles = 0,
                                        onClose
                                    }) {
    const [isMinimized, setIsMinimized] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);

    // Monitor when progress reaches 100%
    useEffect(() => {
        if (progress >= 100 && !isCompleted) {
            // Wait 1 second before showing completion screen
            const timer = setTimeout(() => {
                setIsCompleted(true);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [progress, isCompleted]);

    useEffect(() => {
        if (!isMinimized) {
            document.body.classList.add('backup-modal-open');
        } else {
            document.body.classList.remove('backup-modal-open');
        }

        return () => {
            document.body.classList.remove('backup-modal-open');
        };
    }, [isMinimized]);

    // If minimized, show compact version
    if (isMinimized) {
        return (
            <div className="fixed bottom-4 right-4 z-50">
                <div className="w-80 bg-white rounded-lg shadow-lg border border-gray-200">
                    <div className="p-3">
                        <div className="flex items-center justify-between gap-2">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-sm font-medium text-gray-900">
                                        {isCompleted ? 'Backup Completed' : 'Backup in Progress'}
                                    </span>
                                    {!isCompleted && (
                                        <span className="text-sm text-gray-600">{progress}%</span>
                                    )}
                                </div>
                                {!isCompleted ? (
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-gray-800 h-2 rounded-full transition-all duration-300"
                                            style={{ width: `${progress}%` }}
                                        />
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <CheckCircle className="w-4 h-4 text-green-500" />
                                        <span>Completed successfully</span>
                                    </div>
                                )}
                            </div>
                            <div className="flex gap-1">
                                <button
                                    onClick={() => setIsMinimized(false)}
                                    className="h-8 w-8 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded"
                                >
                                    <Maximize2 className="w-4 h-4" />
                                </button>
                                {onClose && (
                                    <button
                                        onClick={onClose}
                                        className="h-8 w-8 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Completion screen when backup finishes
    if (isCompleted) {
        return (
            <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                <div className="w-full max-w-md bg-white rounded-lg shadow-xl border border-gray-200">
                    <div className="p-8">
                        {/* Centered title */}
                        <h2 className="text-2xl font-semibold text-gray-900 text-center mb-8">
                            Backup Completed
                        </h2>

                        {/* Success message - no file count */}
                        <div className="text-center mb-8">
                            <p className="text-base text-gray-700">
                                Backup finished successfully
                            </p>
                        </div>

                        {/* Close button */}
                        <div className="mt-8 flex justify-center">
                            {onClose && (
                                <button
                                    onClick={onClose}
                                    className="px-6 py-3 text-base bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                                >
                                    Close
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Normal progress screen
    return (
        <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow-xl border border-gray-200">
                <div className="p-6 pb-4">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-gray-900">
                            Backup in Progress
                        </h2>
                        <div className="flex gap-1">
                            <button
                                onClick={() => setIsMinimized(true)}
                                className="h-8 w-8 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded"
                            >
                                <Minimize2 className="w-4 h-4" />
                            </button>
                            {onClose && (
                                <button
                                    onClick={onClose}
                                    className="h-8 w-8 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Files processed - only shown during progress */}
                    {totalFiles > 0 && (
                        <div className="mb-6">
                            <div className="text-sm text-gray-600 mb-1">Files</div>
                            <div className="text-lg font-medium text-gray-900">
                                {filesProcessed} of {totalFiles} files
                            </div>
                        </div>
                    )}

                    {/* Progress bar */}
                    <div className="mb-6">
                        <div className="flex justify-between items-center mb-2">
                            <div className="text-sm text-gray-600">Progress</div>
                            <div className="text-lg font-medium text-gray-900">{progress}%</div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                            <div
                                className="bg-gray-800 h-3 rounded-full transition-all duration-300"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>

                    {/* Current file */}
                    {currentFile && (
                        <div className="mb-2">
                            <div className="text-sm text-gray-600 mb-1">Current file</div>
                            <p className="text-sm font-medium text-gray-900 truncate">
                                {currentFile}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}