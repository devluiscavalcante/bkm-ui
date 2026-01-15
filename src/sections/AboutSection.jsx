import { Database, FileText, Settings, Zap } from 'lucide-react';

export default function AboutSection() {
    return (
        <div className="space-y-8">
            <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-4">
                    How it works
                </h3>

                <div className="grid grid-cols-2 gap-6">
                    <div className="flex items-start space-x-3">
                        <Settings className="w-5 h-5 text-gray-900 shrink-0 mt-0.5" />
                        <p className="text-gray-700 leading-relaxed">
                            Configure the sources you want to protect — directories or specific files.
                        </p>
                    </div>

                    <div className="flex items-start space-x-3">
                        <Database className="w-5 h-5 text-gray-900 shrink-0 mt-0.5" />
                        <p className="text-gray-700 leading-relaxed">
                            Define secure destinations where backups will be stored.
                        </p>
                    </div>

                    <div className="flex items-start space-x-3">
                        <Zap className="w-5 h-5 text-gray-900 shrink-0 mt-0.5" />
                        <p className="text-gray-700 leading-relaxed">
                            Run backups manually or configure scheduled automatic execution.
                        </p>
                    </div>

                    <div className="flex items-start space-x-3">
                        <FileText className="w-5 h-5 text-gray-900 shrink-0 mt-0.5" />
                        <p className="text-gray-700 leading-relaxed">
                            Monitor operations through history and detailed logs.
                        </p>
                    </div>
                </div>
            </div>

            <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">
                    Features
                </h3>

                <div className="space-y-2 text-gray-700">
                    <p>Incremental backup for storage optimization</p>
                    <p>Automatic file compression</p>
                    <p>Complete operation history</p>
                    <p>Minimalist and intuitive interface</p>
                    <p>Detailed logs for auditing</p>
                </div>
            </div>
        </div>
    );
}
