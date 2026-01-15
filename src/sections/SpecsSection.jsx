import { Server, Code } from 'lucide-react';

export default function SpecsSection() {
    return (
        <div className="space-y-8">
            <div>
                <div className="flex items-center space-x-2 mb-4">
                    <Server className="w-5 h-5 text-gray-900" />
                    <h3 className="text-sm font-semibold text-gray-900">Backend</h3>
                </div>
                <ul className="space-y-2 text-gray-700 pl-7 list-disc">
                    <li>Java 17+ as the primary programming language</li>
                    <li>Spring Boot as the web framework</li>
                    <li>SQLite as an embedded database</li>
                    <li>Maven for dependency management</li>
                </ul>
            </div>

            <div>
                <div className="flex items-center space-x-2 mb-4">
                    <Code className="w-5 h-5 text-gray-900" />
                    <h3 className="text-sm font-semibold text-gray-900">Frontend</h3>
                </div>
                <ul className="space-y-2 text-gray-700 pl-7 list-disc">
                    <li>HTML5 and CSS3 for structure and styling</li>
                    <li>JavaScript for interactivity</li>
                    <li>Minimalist and responsive design</li>
                </ul>
            </div>

            <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Requirements</h3>
                <ul className="space-y-2 text-gray-700 list-disc pl-5">
                    <li>Java Runtime Environment 17 or higher</li>
                    <li>Minimum of 512MB RAM</li>
                    <li>Compatible with Windows, Linux, and macOS</li>
                </ul>
            </div>

            <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">REST API</h3>
                <div className="bg-gray-50 border border-gray-200 rounded p-4 font-mono text-sm text-gray-700 space-y-1">
                    <div>POST /api/backup/start</div>
                    <div>GET /api/backup/history</div>
                    <div>GET /api/backup/progress</div>
                </div>
            </div>
        </div>
    );
}
