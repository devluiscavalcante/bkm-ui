export default function Sidebar({ sections, activeSection, onSelect }) {

    return (
        <aside className="w-56 border-r border-gray-200 p-6 flex flex-col">
            <nav className="flex-1 space-y-0.5">
                {Object.entries(sections).map(([key, section]) => {
                    const Icon = section.icon || null;

                    return (
                        <button
                            key={key}
                            type="button"
                            onClick={() => onSelect(key)}
                            className={`w-full text-left px-2 py-1.5 rounded text-sm flex items-center space-x-2 ${
                                activeSection === key
                                    ? 'bg-gray-100 text-gray-900'
                                    : 'text-gray-600 hover:text-gray-900'
                            }`}
                        >
                            {Icon && <Icon className="w-4 h-4" />}
                            <span>{section.title}</span>
                        </button>
                    );
                })}
            </nav>
        </aside>
    );
}
