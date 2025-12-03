import React from 'react';
import { DashboardLayout } from '../components/dashboard/DashboardLayout';

export const MetricsPage: React.FC = () => {
    return (
        <DashboardLayout>
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">System Metrics</h2>
                <p className="text-diria-muted">Real-time performance and usage analytics.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {[
                    { label: 'Active Users', value: '1,234', change: '+12%' },
                    { label: 'Queries Today', value: '45.2k', change: '+5%' },
                    { label: 'Avg Response', value: '1.2s', change: '-8%' },
                    { label: 'System Health', value: '99.9%', change: '0%' },
                ].map((stat, idx) => (
                    <div key={idx} className="bg-diria-card p-6 rounded-2xl border border-white/10">
                        <p className="text-diria-muted text-sm mb-2">{stat.label}</p>
                        <div className="flex items-end justify-between">
                            <span className="text-3xl font-bold text-white">{stat.value}</span>
                            <span className={`text-sm font-medium ${stat.change.startsWith('+') ? 'text-green-400' : stat.change.startsWith('-') ? 'text-green-400' : 'text-gray-400'}`}>{stat.change}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-diria-card p-6 rounded-2xl border border-white/10 h-96 flex items-center justify-center text-diria-muted">
                [Chart Placeholder: Usage over time]
            </div>
        </DashboardLayout>
    );
};
