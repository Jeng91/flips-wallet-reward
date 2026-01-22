import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../ui/Card';
import { colestiaVouchers, ctrlgVouchers, tbfBookings, tbfConfirmedBookings } from '../../data/adminExtendedData';
import { isVoucherExpired, isVoucherExpiringSoon } from '../../utils/voucherHelpers';

const AdminVoucherOverview = () => {
    const navigate = useNavigate();

    // Calculate statistics for each voucher type
    const colestiaStats = {
        total: colestiaVouchers.length,
        products: colestiaVouchers.filter(v => v.type === 'Product').length,
        activities: colestiaVouchers.filter(v => v.type === 'Activity').length,
        totalStock: colestiaVouchers.reduce((sum, v) => sum + v.totalStock, 0),
        redeemed: colestiaVouchers.reduce((sum, v) => sum + v.redeemed, 0),
        remaining: colestiaVouchers.reduce((sum, v) => sum + v.remaining, 0)
    };

    const ctrlgStats = {
        total: ctrlgVouchers.length,
        products: ctrlgVouchers.filter(v => v.type === 'Product').length,
        activities: ctrlgVouchers.filter(v => v.type === 'Activity').length,
        totalStock: ctrlgVouchers.reduce((sum, v) => sum + v.totalStock, 0),
        redeemed: ctrlgVouchers.reduce((sum, v) => sum + v.redeemed, 0),
        remaining: ctrlgVouchers.reduce((sum, v) => sum + v.remaining, 0)
    };

    const tbfStats = {
        pending: tbfBookings.length,
        confirmed: tbfConfirmedBookings.length,
        total: tbfBookings.length + tbfConfirmedBookings.length
    };

    // Overall statistics
    const overallStats = {
        totalVouchers: colestiaStats.total + ctrlgStats.total,
        totalProducts: colestiaStats.products + ctrlgStats.products,
        totalActivities: colestiaStats.activities + ctrlgStats.activities,
        totalRedeemed: colestiaStats.redeemed + ctrlgStats.redeemed,
        totalBookings: tbfStats.total
    };

    const redemptionRate = overallStats.totalVouchers > 0
        ? ((overallStats.totalRedeemed / (colestiaStats.totalStock + ctrlgStats.totalStock)) * 100).toFixed(1)
        : 0;

    // Calculate expired and expiring soon counts (NEW)
    const allVouchers = [...colestiaVouchers, ...ctrlgVouchers];
    const expiredCount = allVouchers.filter(v => isVoucherExpired(v)).length;
    const expiringSoonCount = allVouchers.filter(v => isVoucherExpiringSoon(v)).length;

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div>
                <h2 className="text-3xl font-bold text-gray-900">Voucher & Reward - Overview</h2>
                <p className="text-gray-600 mt-1">Summary of all Vouchers and Rewards</p>
            </div>

            {/* Overall Statistics */}
            <div className="grid md:grid-cols-6 gap-4">
                <Card className="text-center">
                    <p className="text-2xl font-bold text-purple-600">{overallStats.totalVouchers}</p>
                    <p className="text-sm text-gray-600">Total Vouchers</p>
                </Card>
                <Card className="text-center">
                    <p className="text-2xl font-bold text-blue-600">{overallStats.totalProducts}</p>
                    <p className="text-sm text-gray-600">Products & Gifts</p>
                </Card>
                <Card className="text-center">
                    <p className="text-2xl font-bold text-green-600">{overallStats.totalActivities}</p>
                    <p className="text-sm text-gray-600">Services & Activities</p>
                </Card>
                <Card className="text-center">
                    <p className="text-2xl font-bold text-orange-600">{redemptionRate}%</p>
                    <p className="text-sm text-gray-600">Redemption Rate</p>
                </Card>
                {/* NEW: Expired Count */}
                <Card className="text-center border-red-200 bg-red-50">
                    <p className="text-2xl font-bold text-red-600">{expiredCount}</p>
                    <p className="text-sm text-red-600">หมดอายุแล้ว</p>
                </Card>
                {/* NEW: Expiring Soon Count */}
                <Card className="text-center border-orange-200 bg-orange-50">
                    <p className="text-2xl font-bold text-orange-600">{expiringSoonCount}</p>
                    <p className="text-sm text-orange-600">ใกล้หมดอายุ</p>
                </Card>
            </div>

            {/* Colestia Section */}
            <Card>
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                            <i className="fas fa-film text-white text-xl"></i>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900">Colestia - Movies</h3>
                            <p className="text-sm text-gray-600">Vouchers for Thai films</p>
                        </div>
                    </div>
                    <button
                        onClick={() => navigate('/admin/vouchers/colestia')}
                        className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors font-medium"
                    >
                        <i className="fas fa-arrow-right mr-2"></i>
                        View Details
                    </button>
                </div>

                <div className="grid grid-cols-5 gap-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-2xl font-bold text-gray-900">{colestiaStats.total}</p>
                        <p className="text-xs text-gray-600">Total Items</p>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <p className="text-2xl font-bold text-blue-600">{colestiaStats.products}</p>
                        <p className="text-xs text-gray-600">Products</p>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                        <p className="text-2xl font-bold text-green-600">{colestiaStats.activities}</p>
                        <p className="text-xs text-gray-600">Activities</p>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                        <p className="text-2xl font-bold text-purple-600">{colestiaStats.redeemed}</p>
                        <p className="text-xs text-gray-600">Redeemed</p>
                    </div>
                    <div className="text-center p-3 bg-orange-50 rounded-lg">
                        <p className="text-2xl font-bold text-orange-600">{colestiaStats.remaining}</p>
                        <p className="text-xs text-gray-600">Remaining</p>
                    </div>
                </div>
            </Card>

            {/* CtrlG Section */}
            <Card>
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                            <i className="fas fa-gamepad text-white text-xl"></i>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900">CtrlG - Gaming & Entertainment</h3>
                            <p className="text-sm text-gray-600">Vouchers for international movies and gaming</p>
                        </div>
                    </div>
                    <button
                        onClick={() => navigate('/admin/vouchers/ctrlg')}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                    >
                        <i className="fas fa-arrow-right mr-2"></i>
                        View Details
                    </button>
                </div>

                <div className="grid grid-cols-5 gap-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-2xl font-bold text-gray-900">{ctrlgStats.total}</p>
                        <p className="text-xs text-gray-600">Total Items</p>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <p className="text-2xl font-bold text-blue-600">{ctrlgStats.products}</p>
                        <p className="text-xs text-gray-600">Products</p>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                        <p className="text-2xl font-bold text-green-600">{ctrlgStats.activities}</p>
                        <p className="text-xs text-gray-600">Activities</p>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                        <p className="text-2xl font-bold text-purple-600">{ctrlgStats.redeemed}</p>
                        <p className="text-xs text-gray-600">Redeemed</p>
                    </div>
                    <div className="text-center p-3 bg-orange-50 rounded-lg">
                        <p className="text-2xl font-bold text-orange-600">{ctrlgStats.remaining}</p>
                        <p className="text-xs text-gray-600">Remaining</p>
                    </div>
                </div>
            </Card>

            {/* TBF Section */}
            <Card>
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
                            <i className="fas fa-ship text-white text-xl"></i>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900">TBF - Boat Booking</h3>
                            <p className="text-sm text-gray-600">Boat booking management</p>
                        </div>
                    </div>
                    <button
                        onClick={() => navigate('/admin/vouchers/tbf')}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                        <i className="fas fa-arrow-right mr-2"></i>
                        View Details
                    </button>
                </div>

                <div className="grid grid-cols-5 gap-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-2xl font-bold text-gray-900">{tbfStats.total}</p>
                        <p className="text-xs text-gray-600">Total Bookings</p>
                    </div>
                    <div className="text-center p-3 bg-orange-50 rounded-lg">
                        <p className="text-2xl font-bold text-orange-600">{tbfStats.pending}</p>
                        <p className="text-xs text-gray-600">Pending</p>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                        <p className="text-2xl font-bold text-green-600">{tbfStats.confirmed}</p>
                        <p className="text-xs text-gray-600">Confirmed</p>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <p className="text-2xl font-bold text-blue-600">3</p>
                        <p className="text-xs text-gray-600">Total Boats</p>
                    </div>
                    <div className="text-center p-3 bg-cyan-50 rounded-lg">
                        <p className="text-2xl font-bold text-cyan-600">3</p>
                        <p className="text-xs text-gray-600">Available</p>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default AdminVoucherOverview;
