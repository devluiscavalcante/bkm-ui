import { Server, Code } from 'lucide-react';

export default function SpecsSection() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-8">
                <div>
                    <div className="flex items-center space-x-2 mb-4">
                        <Server className="w-5 h-5 text-gray-900" />
                        <h3 className="text-sm font-semibold text-gray-900">Backend</h3>
                    </div>
                    <ul className="space-y-2 text-gray-700 pl-7 list-disc">
                        <li>Java 21 as the primary programming language</li>
                        <li>Spring Boot as the web framework</li>
                        <li>PostgreSQL as an embedded database</li>
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
            </div>

            <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">REST API</h3>
                <div className="bg-gray-50 border border-gray-200 rounded p-4 font-mono text-sm text-gray-700 space-y-1">
                    <div>POST /api/backup/start</div>
                    <div>GET /api/backup/history</div>
                    <div>GET /api/backup/progress</div>
                    <div>POST /api/backup/taskId/pause</div>
                    <div>POST /api/backup/taskId/resume</div>
                    <div>DELETE /api/backup/taskId/cancel</div>
                    <div>POST /api/backup/taskId/status</div>
                </div>
            </div>
        </div>
    );
}