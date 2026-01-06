import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import AdminTokenManagement from '../components/admin/AdminTokenManagement';
import AdminWalletMonitoring from '../components/admin/AdminWalletMonitoring';
import AdminRedemptionQueue from '../components/admin/AdminRedemptionQueue';
import AdminReports from '../components/admin/AdminReports';
import AdminRolesPermissions from '../components/admin/AdminRolesPermissions';
import {
    filmTokens,
    walletHolders,
    redemptionQueue,
    fundingReports,
    adminRoles,
    adminUsers
} from '../data/adminMockData';

const Admin = () => {
    const [activeTab, setActiveTab] = useState('overview');

    // Calculate overview statistics
    const totalUsers = walletHolders.length;
    const totalTokensIssued = filmTokens.reduce((sum, token) => sum + token.sold, 0);
    const totalRedemptions = redemptionQueue.length;
    const pendingRedemptions = redemptionQueue.filter(r => r.status === 'pending').length;
    const totalFundsRaised = fundingReports.reduce((sum, report) => sum + report.raisedFund, 0);

    // Tab configuration
    const tabs = [
        { id: 'overview', label: 'Overview', icon: 'fa-dashboard' },
        { id: 'tokens', label: 'Token Management', icon: 'fa-coins' },
        { id: 'wallets', label: 'Wallet Monitoring', icon: 'fa-wallet' },
        { id: 'redemptions', label: 'Redemptions', icon: 'fa-gift' },
        { id: 'reports', label: 'Reports & Export', icon: 'fa-chart-bar' },
        { id: 'roles', label: 'Roles & Permissions', icon: 'fa-user-shield' }
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                    <i className="fas fa-user-shield text-primary"></i>
                    Admin Console
                </h1>
                <p className="text-gray-600">Comprehensive management dashboard for FLIPS platform</p>
            </div>

            {/* Tab Navigation */}
            <div className="mb-6 border-b border-gray-200 overflow-x-auto">
                <div className="flex gap-1 min-w-max">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-4 py-3 font-medium text-sm whitespace-nowrap transition-colors ${activeTab === tab.id
                                    ? 'text-primary border-b-2 border-primary'
                                    : 'text-gray-600 hover:text-gray-900 border-b-2 border-transparent hover:border-gray-300'
                                }`}
                        >
                            <i className={`fas ${tab.icon} mr-2`}></i>
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tab Content */}
            <div className="animate-fadeIn">
                {activeTab === 'overview' && (
                    <div className="space-y-6">
                        {/* Statistics Cards */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <Card className="text-center hover:shadow-lg transition-shadow">
                                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                                    <i className="fas fa-users text-blue-600"></i>
                                </div>
                                <p className="text-3xl font-bold text-gray-900">{totalUsers}</p>
                                <p className="text-sm text-gray-500">Total Wallet Users</p>
                            </Card>

                            <Card className="text-center hover:shadow-lg transition-shadow">
                                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                                    <i className="fas fa-coins text-green-600"></i>
                                </div>
                                <p className="text-3xl font-bold text-gray-900">{totalTokensIssued.toLocaleString()}</p>
                                <p className="text-sm text-gray-500">Total Tokens Issued</p>
                            </Card>

                            <Card className="text-center hover:shadow-lg transition-shadow">
                                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                                    <i className="fas fa-ticket text-purple-600"></i>
                                </div>
                                <p className="text-3xl font-bold text-gray-900">{totalRedemptions}</p>
                                <p className="text-sm text-gray-500">Total Redemptions</p>
                                {pendingRedemptions > 0 && (
                                    <p className="text-xs text-orange-600 font-medium mt-1">
                                        {pendingRedemptions} pending review
                                    </p>
                                )}
                            </Card>

                            <Card className="text-center hover:shadow-lg transition-shadow">
                                <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                                    <i className="fas fa-dollar-sign text-cyan-600"></i>
                                </div>
                                <p className="text-3xl font-bold text-gray-900">
                                    ${(totalFundsRaised / 1000000).toFixed(2)}M
                                </p>
                                <p className="text-sm text-gray-500">Total Funds Raised</p>
                            </Card>
                        </div>

                        {/* Film Tokens Summary */}
                        <Card>
                            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <i className="fas fa-film text-primary"></i>
                                Film Tokens Overview
                            </h2>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {filmTokens.map(token => (
                                    <div
                                        key={token.id}
                                        className="p-4 border border-gray-200 rounded-lg hover:border-primary transition-colors"
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h3 className="font-semibold text-gray-900">{token.filmName}</h3>
                                                <p className="text-sm text-gray-500">{token.tokenSymbol}</p>
                                            </div>
                                            <span className={`px-2 py-1 rounded text-xs font-medium ${token.status === 'active'
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-orange-100 text-orange-700'
                                                }`}>
                                                {token.status === 'active' ? 'Active' : 'Paused'}
                                            </span>
                                        </div>
                                        <div className="space-y-1 text-sm">
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Sold:</span>
                                                <span className="font-medium text-gray-900">
                                                    {token.sold.toLocaleString()} / {token.totalSupply.toLocaleString()}
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Holders:</span>
                                                <span className="font-medium text-gray-900">{token.holderCount}</span>
                                            </div>
                                            <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
                                                <div
                                                    className="h-full bg-primary rounded-full"
                                                    style={{ width: `${(token.sold / token.totalSupply) * 100}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        {/* Recent Activity */}
                        <Card>
                            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <i className="fas fa-clock text-primary"></i>
                                Recent Activity
                            </h2>
                            <div className="space-y-3">
                                {redemptionQueue.slice(0, 5).map((redemption) => (
                                    <div key={redemption.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${redemption.status === 'pending' ? 'bg-orange-100' :
                                                    redemption.status === 'approved' ? 'bg-green-100' :
                                                        'bg-red-100'
                                                }`}>
                                                <i className={`fas ${redemption.status === 'pending' ? 'fa-clock text-orange-600' :
                                                        redemption.status === 'approved' ? 'fa-check text-green-600' :
                                                            'fa-times text-red-600'
                                                    }`}></i>
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">
                                                    {redemption.userName} redeemed {redemption.rewardTitle}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    {redemption.filmName} • {redemption.tokensUsed} tokens • {redemption.requestDate}
                                                </p>
                                            </div>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${redemption.status === 'pending' ? 'bg-orange-100 text-orange-700' :
                                                redemption.status === 'approved' ? 'bg-green-100 text-green-700' :
                                                    'bg-red-100 text-red-700'
                                            }`}>
                                            {redemption.status.charAt(0).toUpperCase() + redemption.status.slice(1)}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        {/* Quick Actions */}
                        <Card>
                            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <i className="fas fa-bolt text-primary"></i>
                                Quick Actions
                            </h2>
                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <button
                                    onClick={() => setActiveTab('redemptions')}
                                    className="p-4 border-2 border-orange-200 rounded-lg hover:border-orange-400 hover:bg-orange-50 transition-all text-left"
                                >
                                    <i className="fas fa-exclamation-circle text-orange-600 text-2xl mb-2"></i>
                                    <p className="font-semibold text-gray-900">Review Pending</p>
                                    <p className="text-sm text-gray-600">{pendingRedemptions} redemptions waiting</p>
                                </button>

                                <button
                                    onClick={() => setActiveTab('tokens')}
                                    className="p-4 border-2 border-blue-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all text-left"
                                >
                                    <i className="fas fa-coins text-blue-600 text-2xl mb-2"></i>
                                    <p className="font-semibold text-gray-900">Manage Tokens</p>
                                    <p className="text-sm text-gray-600">{filmTokens.length} active films</p>
                                </button>

                                <button
                                    onClick={() => setActiveTab('reports')}
                                    className="p-4 border-2 border-green-200 rounded-lg hover:border-green-400 hover:bg-green-50 transition-all text-left"
                                >
                                    <i className="fas fa-download text-green-600 text-2xl mb-2"></i>
                                    <p className="font-semibold text-gray-900">Export Reports</p>
                                    <p className="text-sm text-gray-600">Generate CSV/Excel</p>
                                </button>

                                <button
                                    onClick={() => setActiveTab('wallets')}
                                    className="p-4 border-2 border-purple-200 rounded-lg hover:border-purple-400 hover:bg-purple-50 transition-all text-left"
                                >
                                    <i className="fas fa-users text-purple-600 text-2xl mb-2"></i>
                                    <p className="font-semibold text-gray-900">View Wallets</p>
                                    <p className="text-sm text-gray-600">{totalUsers} wallet holders</p>
                                </button>
                            </div>
                        </Card>
                    </div>
                )}

                {activeTab === 'tokens' && <AdminTokenManagement tokens={filmTokens} />}
                {activeTab === 'wallets' && <AdminWalletMonitoring wallets={walletHolders} />}
                {activeTab === 'redemptions' && <AdminRedemptionQueue redemptions={redemptionQueue} />}
                {activeTab === 'reports' && <AdminReports reports={fundingReports} />}
                {activeTab === 'roles' && <AdminRolesPermissions roles={adminRoles} adminUsers={adminUsers} />}
            </div>
        </div>
    );
};

export default Admin;
