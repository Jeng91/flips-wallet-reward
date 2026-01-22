import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../ui/Card';
import { users } from '../../data/adminExtendedData';
import { walletHolders, redemptionQueue } from '../../data/adminMockData';
import {
    colestiaMovies,
    colestiaVouchers,
    ctrlgMovies,
    ctrlgVouchers,
    tbfBoats,
    tbfBookings,
    fractionalBookings
} from '../../data/adminExtendedData';

const AdminDashboard = () => {
    const navigate = useNavigate();

    // Calculate statistics
    const totalUsers = users.length;
    const newUsers = users.filter(u => {
        const regDate = new Date(u.registrationDate);
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return regDate > weekAgo;
    }).length;

    const totalWallets = walletHolders.length;
    const totalVouchers = colestiaVouchers.length + ctrlgVouchers.length;
    const totalRedemptions = redemptionQueue.length
        ;
    const pendingRedemptions = redemptionQueue.filter(r => r.status === 'pending').length;

    const pendingBoatBookings = tbfBookings.length + fractionalBookings.length;

    // Recent activity - combine different sources
    const recentActivity = [
        ...users.slice(-5).map(u => ({
            id: `user-${u.id}`,
            type: 'user',
            icon: 'fa-user-plus',
            color: 'blue',
            message: `${u.name} registered`,
            time: u.registrationDate
        })),
        ...redemptionQueue.slice(-3).map(r => ({
            id: `redemption-${r.id}`,
            type: 'redemption',
            icon: 'fa-gift',
            color: r.status === 'pending' ? 'orange' : r.status === 'approved' ? 'green' : 'red',
            message: `${r.userName} redeemed ${r.rewardTitle}`,
            time: r.requestDate,
            status: r.status
        })),
        ...tbfBookings.slice(-2).map(b => ({
            id: `booking-${b.id}`,
            type: 'booking',
            icon: 'fa-ship',
            color: 'purple',
            message: `${b.customerName} booked ${b.boatName}`,
            time: b.requestDate,
            status: b.status
        }))
    ].sort((a, b) => new Date(b.time) - new Date(a.time)).slice(0, 8);

    // Notifications/Alerts
    const notifications = [
        { id: 1, type: 'pending', icon: 'fa-clock', message: `${pendingRedemptions} redemptions pending approval`, count: pendingRedemptions, action: () => navigate('/admin/redemptions') },
        { id: 2, type: 'pending', icon: 'fa-ship', message: `${pendingBoatBookings} boat bookings pending confirmation`, count: pendingBoatBookings, action: () => navigate('/admin/vouchers/tbf') },
        { id: 3, type: 'info', icon: 'fa-user-plus', message: `${newUsers} new users this week`, count: newUsers, action: () => navigate('/admin/users/new') }
    ];

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            {/* Page Header */}
            <div>
                <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
                <p className="text-gray-600 mt-1">Overview of FLIPS management system</p>
            </div>

            {/* Statistics Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/admin/users')}>
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                        <i className="fas fa-users text-blue-600 text-xl"></i>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">{totalUsers}</p>
                    <p className="text-sm text-gray-500">Total Users</p>
                    {newUsers > 0 && (
                        <p className="text-xs text-blue-600 font-medium mt-1">+{newUsers} new this week</p>
                    )}
                </Card>

                <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/admin/wallet/monitoring')}>
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                        <i className="fas fa-wallet text-green-600 text-xl"></i>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">{totalWallets}</p>
                    <p className="text-sm text-gray-500">Wallet Holders</p>
                </Card>

                <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/admin/vouchers')}>
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                        <i className="fas fa-ticket text-purple-600 text-xl"></i>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">{totalVouchers}</p>
                    <p className="text-sm text-gray-500">Vouchers & Rewards</p>
                </Card>

                <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/admin/vouchers/tbf')}>
                    <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                        <i className="fas fa-ship text-cyan-600 text-xl"></i>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">{tbfBoats.length}</p>
                    <p className="text-sm text-gray-500">Boat Listings</p>
                    {pendingBoatBookings > 0 && (
                        <p className="text-xs text-orange-600 font-medium mt-1">{pendingBoatBookings} pending</p>
                    )}
                </Card>
            </div>

            {/* Notifications/Alerts Section */}
            <Card>
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <i className="fas fa-bell text-primary"></i>
                    Notifications
                </h3>
                <div className="space-y-3">
                    {notifications.map((notif) => (
                        <div
                            key={notif.id}
                            onClick={notif.action}
                            className="flex items-center justify-between p-4 bg-orange-50 border border-orange-200 rounded-xl hover:border-orange-400 transition-colors cursor-pointer"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                                    <i className={`fas ${notif.icon} text-orange-600`}></i>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">{notif.message}</p>
                                    <p className="text-sm text-gray-600">Click to view details</p>
                                </div>
                            </div>
                            <i className="fas fa-chevron-right text-gray-400"></i>
                        </div>
                    ))}
                </div>
            </Card>

            {/* Recent Activity */}
            <Card>
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <i className="fas fa-clock text-primary"></i>
                    Recent Activity
                </h3>
                <div className="space-y-3">
                    {recentActivity.map((activity) => (
                        <div key={activity.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                            <div className={`w-10 h-10 bg-${activity.color}-100 rounded-full flex items-center justify-center`}>
                                <i className={`fas ${activity.icon} text-${activity.color}-600`}></i>
                            </div>
                            <div className="flex-1">
                                <p className="font-medium text-gray-900">{activity.message}</p>
                                <p className="text-sm text-gray-500">{activity.time}</p>
                            </div>
                            {activity.status && (
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${activity.status === 'pending' ? 'bg-orange-100 text-orange-700' :
                                    activity.status === 'approved' || activity.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                                        'bg-red-100 text-red-700'
                                    }`}>
                                    {activity.status === 'pending' ? 'Pending' :
                                        activity.status === 'approved' ? 'Approved' :
                                            activity.status === 'confirmed' ? 'Confirmed' : 'Rejected'}
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            </Card>

            {/* Quick Actions */}
            <Card>
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <i className="fas fa-bolt text-primary"></i>
                    Quick Actions
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <button
                        onClick={() => navigate('/admin/vouchers')}
                        className="p-4 border-2 border-purple-200 rounded-lg hover:border-purple-400 hover:bg-purple-50 transition-all text-left"
                    >
                        <i className="fas fa-plus-circle text-purple-600 text-2xl mb-2"></i>
                        <p className="font-semibold text-gray-900">Add Voucher</p>
                        <p className="text-sm text-gray-600">Manage new vouchers</p>
                    </button>

                    <button
                        onClick={() => navigate('/admin/users/new')}
                        className="p-4 border-2 border-blue-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all text-left"
                    >
                        <i className="fas fa-user-plus text-blue-600 text-2xl mb-2"></i>
                        <p className="font-semibold text-gray-900">New Users</p>
                        <p className="text-sm text-gray-600">{newUsers} this week</p>
                    </button>

                    <button
                        onClick={() => navigate('/admin/vouchers/tbf')}
                        className="p-4 border-2 border-cyan-200 rounded-lg hover:border-cyan-400 hover:bg-cyan-50 transition-all text-left"
                    >
                        <i className="fas fa-check-circle text-cyan-600 text-2xl mb-2"></i>
                        <p className="font-semibold text-gray-900">Confirm Bookings</p>
                        <p className="text-sm text-gray-600">{pendingBoatBookings} pending</p>
                    </button>

                    <button
                        onClick={() => navigate('/admin/reports')}
                        className="p-4 border-2 border-green-200 rounded-lg hover:border-green-400 hover:bg-green-50 transition-all text-left"
                    >
                        <i className="fas fa-download text-green-600 text-2xl mb-2"></i>
                        <p className="font-semibold text-gray-900">Download Report</p>
                        <p className="text-sm text-gray-600">CSV / Excel</p>
                    </button>
                </div>
            </Card>
        </div>
    );
};

export default AdminDashboard;
