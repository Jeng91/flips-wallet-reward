import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../ui/Card';
import { privilegePackages } from '../../data/mockData';

const AdminCtrlGVouchers = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('all'); // all, game-merchandise, game-meet-greet, game-items, early-access

    // Filter CtrlG privileges
    const ctrlgPrivileges = privilegePackages.filter(p => p.mainCategory === 'ctrlg');

    // Filter by active tab
    const filteredPrivileges = activeTab === 'all'
        ? ctrlgPrivileges
        : ctrlgPrivileges.filter(p => p.category === activeTab);

    const searchFiltered = filteredPrivileges.filter(p =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.titleTh.includes(searchTerm)
    );

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900">CtrlG - จัดการ Vouchers</h2>
                    <p className="text-gray-600 mt-1">จัดการ rewards สำหรับ Gaming และ Entertainment</p>
                </div>
                <button
                    onClick={() => navigate('/admin/vouchers/new?category=ctrlg')}
                    className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium shadow-sm"
                >
                    <i className="fas fa-plus mr-2"></i>
                    Add Voucher
                </button>
            </div>

            {/* Statistics */}
            <div className="grid md:grid-cols-4 gap-4">
                <Card className="text-center">
                    <p className="text-2xl font-bold text-indigo-600">{ctrlgPrivileges.length}</p>
                    <p className="text-sm text-gray-600">Rewards ทั้งหมด</p>
                </Card>
                <Card className="text-center">
                    <p className="text-2xl font-bold text-purple-600">{ctrlgPrivileges.filter(p => p.category === 'game-merchandise').length}</p>
                    <p className="text-sm text-gray-600">สินค้าเกม</p>
                </Card>
                <Card className="text-center">
                    <p className="text-2xl font-bold text-pink-600">{ctrlgPrivileges.filter(p => p.category === 'game-meet-greet').length}</p>
                    <p className="text-sm text-gray-600">พบนักแข่ง</p>
                </Card>
                <Card className="text-center">
                    <p className="text-2xl font-bold text-blue-600">{ctrlgPrivileges.filter(p => p.category === 'game-items' || p.category === 'early-access').length}</p>
                    <p className="text-sm text-gray-600">ไอเทมในเกม</p>
                </Card>
            </div>

            {/* Tabs */}
            <Card>
                <div className="flex gap-2 overflow-x-auto">
                    <button
                        onClick={() => setActiveTab('all')}
                        className={`px-6 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${activeTab === 'all' ? 'bg-gray-200 text-gray-900' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        All Privileges
                    </button>
                    <button
                        onClick={() => setActiveTab('game-merchandise')}
                        className={`px-6 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${activeTab === 'game-merchandise' ? 'bg-gray-200 text-gray-900' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        Game Merchandise
                    </button>
                    <button
                        onClick={() => setActiveTab('game-meet-greet')}
                        className={`px-6 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${activeTab === 'game-meet-greet' ? 'bg-gray-200 text-gray-900' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        Meet Players
                    </button>
                    <button
                        onClick={() => setActiveTab('game-items')}
                        className={`px-6 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${activeTab === 'game-items' ? 'bg-gray-200 text-gray-900' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        In-Game Items
                    </button>
                    <button
                        onClick={() => setActiveTab('early-access')}
                        className={`px-6 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${activeTab === 'early-access' ? 'bg-gray-200 text-gray-900' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        Early Access
                    </button>
                </div>
            </Card>

            {/* Search */}
            <Card>
                <div className="relative">
                    <i className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                    <input
                        type="text"
                        placeholder="Search privileges..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                </div>
            </Card>

            {/* Statistics Cards Row */}
            <div className="grid grid-cols-4 gap-4">
                <Card className="text-center">
                    <p className="text-sm text-gray-600">รายการทั้งหมด</p>
                    <p className="text-xl font-bold text-gray-900">{searchFiltered.length}</p>
                </Card>
                <Card className="text-center">
                    <p className="text-sm text-gray-600">ระดับ Gold</p>
                    <p className="text-xl font-bold text-gray-900">{searchFiltered.filter(p => p.tier === 'gold').length}</p>
                </Card>
                <Card className="text-center">
                    <p className="text-sm text-gray-600">ระดับ Silver</p>
                    <p className="text-xl font-bold text-gray-900">{searchFiltered.filter(p => p.tier === 'silver').length}</p>
                </Card>
                <Card className="text-center">
                    <p className="text-sm text-gray-600">สินค้าจริง</p>
                    <p className="text-xl font-bold text-gray-900">{searchFiltered.filter(p => p.isPhysical).length}</p>
                </Card>
            </div>

            {/* Privileges Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchFiltered.map((privilege) => (
                    <Card key={privilege.id} className="hover:shadow-lg transition-shadow">
                        {/* Privilege Image */}
                        <div className="aspect-video bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                            {privilege.image ? (
                                <img
                                    src={privilege.image}
                                    alt={privilege.title}
                                    className="w-full h-full object-cover"
                                    onError={(e) => e.target.src = 'https://placehold.co/400x200/6366f1/ffffff?text=CTRL+G'}
                                />
                            ) : (
                                <i className="fas fa-gamepad text-white text-4xl"></i>
                            )}
                        </div>

                        {/* Privilege Info */}
                        <div>
                            {/* Badges */}
                            <div className="flex gap-2 mb-2 flex-wrap">
                                <span className={`px-2 py-1 rounded text-xs font-medium ${privilege.tier === 'gold' ? 'bg-yellow-100 text-yellow-700' :
                                    privilege.tier === 'silver' ? 'bg-gray-100 text-gray-700' :
                                        'bg-blue-100 text-blue-700'
                                    }`}>
                                    {privilege.tier?.toUpperCase()}
                                </span>
                                <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-xs font-medium">
                                    {privilege.categoryLabel}
                                </span>
                                {privilege.isPhysical && (
                                    <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs font-medium">
                                        <i className="fas fa-box mr-1"></i>Physical
                                    </span>
                                )}
                            </div>

                            <h3 className="font-bold text-gray-900 mb-1">{privilege.titleTh}</h3>
                            <p className="text-xs text-gray-500 mb-2">{privilege.title}</p>

                            {privilege.teamName && (
                                <p className="text-xs text-gray-600 mb-2">
                                    <i className="fas fa-users mr-1"></i>
                                    {privilege.teamNameTh || privilege.teamName}
                                </p>
                            )}

                            {privilege.gameName && (
                                <p className="text-xs text-gray-600 mb-2">
                                    <i className="fas fa-gamepad mr-1"></i>
                                    {privilege.gameNameTh || privilege.gameName}
                                </p>
                            )}

                            <p className="text-sm text-gray-700 mb-3 line-clamp-2">
                                {privilege.descriptionTh}
                            </p>

                            {/* Price & Rating */}
                            <div className="flex items-center justify-between mb-3 pt-3 border-t border-gray-100">
                                <div>
                                    <p className="text-xs text-gray-500">ราคา</p>
                                    <p className="font-bold text-indigo-600">
                                        {privilege.price} {privilege.coinType?.toUpperCase() || 'CTRL G'}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <div className="flex items-center gap-1">
                                        <i className="fas fa-star text-yellow-500 text-xs"></i>
                                        <span className="text-sm font-medium">{privilege.rating}</span>
                                    </div>
                                    <p className="text-xs text-gray-500">{privilege.reviews} reviews</p>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-2">
                                <button
                                    onClick={() => navigate(`/admin/vouchers/edit/${privilege.id}`)}
                                    className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
                                >
                                    <i className="fas fa-edit mr-1"></i>
                                    แก้ไข
                                </button>
                                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                                    <i className="fas fa-eye"></i>
                                </button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {searchFiltered.length === 0 && (
                <Card className="text-center py-12">
                    <i className="fas fa-inbox text-gray-300 text-5xl mb-4"></i>
                    <p className="text-gray-500">ไม่พบรายการที่ค้นหา</p>
                </Card>
            )}
        </div>
    );
};

export default AdminCtrlGVouchers;
