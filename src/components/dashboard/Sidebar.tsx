import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, MessageSquare, Settings, BarChart3, LogOut } from 'lucide-react';

export const Sidebar: React.FC = () => {
    const location = useLocation();

    const links = [
        { name: 'Console', path: '/console', icon: MessageSquare },
        { name: 'Metrics', path: '/console/metrics', icon: BarChart3 },
        { name: 'Admin', path: '/console/admin', icon: LayoutDashboard },
        { name: 'Settings', path: '/console/settings', icon: Settings },
    ];

    return (
        <div className="w-64 bg-diria-card border-r border-white/10 h-screen flex flex-col">
            <div className="p-6 flex items-center gap-3 border-b border-white/5">
                <img src="/img/guana_logo_dark.png" alt="Logo" className="h-8 w-auto" />
                <span className="font-heading font-bold text-lg text-white">DirIA Console</span>
            </div>

            <nav className="flex-1 p-4 space-y-2">
                {links.map((link) => {
                    const Icon = link.icon;
                    const isActive = location.pathname === link.path;
                    return (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                                    ? 'bg-diria-neonGreen/10 text-diria-neonGreen border border-diria-neonGreen/20'
                                    : 'text-diria-muted hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            <Icon size={20} />
                            <span className="font-medium">{link.name}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-white/5">
                <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-400 hover:bg-red-500/10 transition">
                    <LogOut size={20} />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </div>
    );
};
