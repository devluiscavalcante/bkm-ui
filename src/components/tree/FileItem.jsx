import { File } from 'lucide-react';

export default function FileItem({ name, level = 0 }) {
    return (
        <div
            className="flex items-center space-x-1 py-1 px-1"
            style={{ paddingLeft: `${level * 16 + 16}px` }}
        >
            <File className="w-4 h-4 text-gray-600" />
            <span className="text-sm text-gray-700 font-mono">{name}</span>
        </div>
    );
}
