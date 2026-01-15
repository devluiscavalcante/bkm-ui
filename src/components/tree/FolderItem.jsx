import { ChevronRight, Folder } from 'lucide-react';

export default function FolderItem({
                                       name,
                                       isExpanded,
                                       onToggle,
                                       level = 0,
                                       children
                                   }) {
    return (
        <div>
            <div
                className="flex items-center space-x-1 py-1 cursor-pointer hover:bg-gray-100 rounded px-1"
                style={{ paddingLeft: `${level * 16}px` }}
                onClick={onToggle}
            >
                <ChevronRight
                    className={`w-3 h-3 text-gray-600 transition-transform ${
                        isExpanded ? 'rotate-90' : ''
                    }`}
                />
                <Folder className="w-4 h-4 text-gray-700" />
                <span className="text-sm text-gray-900 font-mono">{name}</span>
            </div>

            {isExpanded && children}
        </div>
    );
}
