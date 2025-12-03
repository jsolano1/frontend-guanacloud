import React from 'react';
import { DashboardLayout } from '../components/dashboard/DashboardLayout';

export const AdminPage: React.FC = () => {
    return (
        <DashboardLayout>
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">Admin Panel</h2>
                <p className="text-diria-muted">Manage users, agents, and system configurations.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-diria-card p-6 rounded-2xl border border-white/10">
                    <h3 className="text-lg font-bold text-white mb-4">User Management</h3>
                    <div className="h-32 bg-white/5 rounded-xl flex items-center justify-center text-diria-muted">
                        List of users...
                    </div>
                </div>
                <div className="bg-diria-card p-6 rounded-2xl border border-white/10">
                    <h3 className="text-lg font-bold text-white mb-4">Agent Configuration</h3>
                    <div className="h-32 bg-white/5 rounded-xl flex items-center justify-center text-diria-muted">
                        Agent settings...
                    </div>
                </div>
                <div className="bg-diria-card p-6 rounded-2xl border border-white/10">
                    <h3 className="text-lg font-bold text-white mb-4">System Logs</h3>
                    <div className="h-32 bg-white/5 rounded-xl flex items-center justify-center text-diria-muted">
                        Recent logs...
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};
