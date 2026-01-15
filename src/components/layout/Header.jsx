import { Database, Github } from 'lucide-react';

export default function Header() {
    return (
        <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
            <div className="flex items-center justify-between px-6 py-3">
                <div className="flex items-center space-x-2">
                    <Database className="w-5 h-5 text-gray-900" />
                    <span className="text-sm font-semibold text-gray-900">
            Backup Manager (BKM)
          </span>
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
    );
}
