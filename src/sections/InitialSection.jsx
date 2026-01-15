import { Database, Zap, Shield, Package } from 'lucide-react';

export default function InicioSection() {
    return (
        <div className="space-y-12">
            {/* Hero Section */}
            <div className="flex items-start justify-between">
                <div className="flex-1 pr-12">
                    <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
                        Backup Manager
                    </h1>
                    <p className="text-xl text-gray-600 leading-relaxed mb-8">
                        Uma solução minimalista para gerenciamento de backups automáticos.
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-4">
                        O BKM permite criar cópias de segurança de múltiplas origens para diversos destinos de
                        forma automatizada e eficiente.
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-8">
                        Interface limpa, operação simples e controle total sobre seus dados.
                    </p>
                </div>

                {/* Logo SVG */}
                <div className="shrink-0">
                    <svg width="280" height="280" viewBox="0 0 200 200" className="text-gray-900">
                        <g transform="translate(100, 60)">
                            <path d="M-60,0 L-60,60 L-30,75 L-30,15 Z" fill="currentColor" opacity="0.9"/>
                            <path d="M-60,0 L-30,15 L0,0 L-30,-15 Z" fill="currentColor"/>
                            <path d="M0,0 L0,60 L-30,75 L-30,15 Z" fill="currentColor" opacity="0.7"/>

                            <path d="M10,0 L10,60 L25,52.5 L25,-7.5 Z" fill="currentColor" opacity="0.9"/>
                            <path d="M25,-7.5 L40,-15 L55,-7.5 L40,0 Z" fill="currentColor"/>
                            <path d="M40,0 L55,-7.5 L55,52.5 L40,60 Z" fill="currentColor" opacity="0.7"/>

                            <path d="M65,0 L65,60 L80,52.5 L80,-7.5 Z" fill="currentColor" opacity="0.9"/>
                            <path d="M80,-7.5 L95,-15 L110,-7.5 L95,0 Z" fill="currentColor"/>
                            <path d="M95,0 L110,-7.5 L110,52.5 L95,60 Z" fill="currentColor" opacity="0.7"/>
                        </g>
                    </svg>
                </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-6 pt-8">
                <Feature icon={Zap} title="Rápido" text="Backups incrementais e compactação eficiente" />
                <Feature icon={Shield} title="Seguro" text="Verificação de integridade e logs detalhados" />
                <Feature icon={Package} title="Flexível" text="Múltiplas origens e destinos configuráveis" />
            </div>
        </div>
    );
}

function Feature({ icon: Icon, title, text }) {
    return (
        <div className="flex items-start space-x-3">
            <Icon className="w-5 h-5 text-gray-900 shrink-0 mt-0.5" />
            <div>
                <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
                <p className="text-sm text-gray-600">{text}</p>
            </div>
        </div>
    );
}
