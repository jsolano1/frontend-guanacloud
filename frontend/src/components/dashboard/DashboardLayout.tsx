import React, { ReactNode } from 'react';
import { Sidebar } from './Sidebar';

export const DashboardLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <div className="flex h-screen bg-diria-darker text-white overflow-hidden">
            <Sidebar />
            <main className="flex-1 overflow-y-auto relative">
                {/* Header placeholder if needed */}
                <header className="h-16 border-b border-white/5 flex items-center justify-between px-8 bg-diria-darker/50 backdrop-blur-md sticky top-0 z-10">
                    <h1 className="font-heading font-bold text-xl">Dashboard</h1>
                    <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-diria-neonGreen/20 border border-diria-neonGreen/50 flex items-center justify-center text-diria-neonGreen text-xs font-bold">
                            JS
                        </div>
                    </div>
                </header>
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
};
