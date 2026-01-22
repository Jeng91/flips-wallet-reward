import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../ui/Card';
import { privilegePackages } from '../../data/mockData';
import { tbfYachts, yachtLocation, memberFractionProgram, fractionOwners, yachtBookings, ticketRedemptions } from '../../data/adminExtendedData';

const AdminTBFVouchers = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('fleet'); // fleet, vouchers

    // Filter TBF privileges from the existing voucher system
    const tbfPrivileges = privilegePackages.filter(p => p.mainCategory === 'tbf');

    const searchFiltered = tbfPrivileges.filter(p =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.titleTh?.includes(searchTerm)
    );

    // Booking statistics
    const pendingBookings = yachtBookings.filter(b => b.status === 'pending').length;
    const confirmedBookings = yachtBookings.filter(b => b.status === 'confirmed').length;

    const handleEditVoucher = (voucher) => {
        navigate(`/admin/vouchers/edit/${voucher.id}`);
    };

    const handleAddVoucher = () => {
        navigate('/admin/vouchers/new?category=tbf');
    };

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900">TBF Yacht Management</h2>
                    <p className="text-gray-600 mt-1">Manage yacht fleet and TBF vouchers</p>
                </div>
                <button
                    onClick={handleAddVoucher}
                    className="px-6 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors font-medium shadow-sm"
                >
                    <i className="fas fa-plus mr-2"></i>
                    Add TBF Voucher
                </button>
            </div>

            {/* Main Tabs */}
            <Card>
                <div className="flex gap-2 overflow-x-auto">
                    {[
                        { id: 'fleet', label: 'Yacht Fleet', icon: 'anchor' },
                        { id: 'vouchers', label: 'TBF Vouchers', icon: 'ticket-alt' }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-6 py-3 rounded-lg font-medium transition-colors whitespace-nowrap flex items-center gap-2 ${activeTab === tab.id
                                ? 'bg-cyan-600 text-white'
                                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            <i className={`fas fa-${tab.icon}`}></i>
                            {tab.label}
                        </button>
                    ))}
                </div>
            </Card>

            {/* FLEET TAB */}
            {activeTab === 'fleet' && (
                <>
                    {/* Fleet Statistics */}
                    <div className="grid md:grid-cols-4 gap-4">
                        <Card className="text-center">
                            <p className="text-3xl font-bold text-cyan-600">{tbfYachts.length}</p>
                            <p className="text-sm text-gray-600">Yachts in Fleet</p>
                        </Card>
                        <Card className="text-center">
                            <p className="text-3xl font-bold text-green-600">{fractionOwners.length}</p>
                            <p className="text-sm text-gray-600">Fraction Owners</p>
                        </Card>
                        <Card className="text-center">
                            <p className="text-3xl font-bold text-blue-600">{fractionOwners.reduce((sum, o) => sum + o.ticketsRemaining, 0)}</p>
                            <p className="text-sm text-gray-600">Active Tickets</p>
                        </Card>
                        <Card className="text-center bg-gradient-to-br from-cyan-500 to-blue-600 text-white">
                            <p className="text-3xl font-bold">฿{memberFractionProgram.pricePerFraction.toLocaleString()}</p>
                            <p className="text-sm opacity-90">Per Fraction</p>
                        </Card>
                    </div>

                    {/* Yacht Fleet Cards */}
                    <div className="grid md:grid-cols-2 gap-6">
                        {tbfYachts.map(yacht => (
                            <Card key={yacht.id} className="overflow-hidden">
                                {/* Yacht Image Header */}
                                <div className="h-48 bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center relative">
                                    <i className="fas fa-ship text-white text-6xl opacity-30"></i>
                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-xs font-bold">
                                            {yacht.brand}
                                        </span>
                                    </div>
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <h3 className="text-2xl font-black text-white mb-1">{yacht.name}</h3>
                                        <p className="text-white/80 text-sm">{yacht.tagline}</p>
                                    </div>
                                </div>

                                {/* Yacht Details */}
                                <div className="p-4">
                                    <div className="grid grid-cols-4 gap-2 mb-4">
                                        <div className="text-center p-2 bg-gray-50 rounded-lg">
                                            <p className="text-lg font-bold text-gray-900">{yacht.specs.lengthFeet}</p>
                                            <p className="text-xs text-gray-500">Length</p>
                                        </div>
                                        <div className="text-center p-2 bg-gray-50 rounded-lg">
                                            <p className="text-lg font-bold text-gray-900">{yacht.specs.cabins}</p>
                                            <p className="text-xs text-gray-500">Cabins</p>
                                        </div>
                                        <div className="text-center p-2 bg-gray-50 rounded-lg">
                                            <p className="text-lg font-bold text-gray-900">{yacht.specs.maxPax}</p>
                                            <p className="text-xs text-gray-500">Max PAX</p>
                                        </div>
                                        <div className="text-center p-2 bg-gray-50 rounded-lg">
                                            <p className="text-lg font-bold text-gray-900">{yacht.specs.power}</p>
                                            <p className="text-xs text-gray-500">Power</p>
                                        </div>
                                    </div>

                                    <p className="text-sm text-gray-600 mb-4">{yacht.description}</p>

                                    {/* Features */}
                                    <div className="flex flex-wrap gap-1 mb-4">
                                        {yacht.features.slice(0, 4).map((feature, idx) => (
                                            <span key={idx} className="px-2 py-1 bg-cyan-50 text-cyan-700 rounded text-xs">
                                                <i className="fas fa-check mr-1"></i>{feature}
                                            </span>
                                        ))}
                                        {yacht.features.length > 4 && (
                                            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                                                +{yacht.features.length - 4} more
                                            </span>
                                        )}
                                    </div>

                                    {/* Status & Actions */}
                                    <div className="flex items-center justify-between pt-3 border-t">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${yacht.status === 'available'
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-orange-100 text-orange-700'
                                            }`}>
                                            {yacht.status === 'available' ? 'Available' : 'In Use'}
                                        </span>
                                        <button className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 text-sm font-medium">
                                            <i className="fas fa-edit mr-1"></i> Edit Yacht
                                        </button>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>

                    {/* Location Card */}
                    <Card>
                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <i className="fas fa-map-marker-alt text-red-500"></i>
                            Fleet Location
                        </h3>
                        <div className="flex items-center gap-4">
                            <div className="flex-1">
                                <p className="font-bold text-gray-900">{yachtLocation.name}</p>
                                <p className="text-sm text-gray-600">{yachtLocation.address}</p>
                                <p className="text-sm text-gray-600">{yachtLocation.city}</p>
                                <div className="flex items-center gap-2 mt-2">
                                    <span className="text-yellow-500">★</span>
                                    <span className="font-medium">{yachtLocation.rating}</span>
                                    <span className="text-gray-400">•</span>
                                    <span className="text-sm text-gray-500">{yachtLocation.reviews} reviews</span>
                                </div>
                            </div>
                            <div className="w-48 h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                                <i className="fas fa-map text-gray-400 text-3xl"></i>
                            </div>
                        </div>
                    </Card>

                    {/* Member Fraction Program Overview */}
                    <Card className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <i className="fas fa-gem"></i>
                            FLIPS Member Fraction Program
                        </h3>
                        <div className="grid md:grid-cols-4 gap-4">
                            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                                <p className="text-3xl font-bold">฿{memberFractionProgram.pricePerFraction.toLocaleString()}</p>
                                <p className="text-sm opacity-80">Per Fraction</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                                <p className="text-3xl font-bold">{memberFractionProgram.ticketsPerYear}</p>
                                <p className="text-sm opacity-80">Tickets/Year</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                                <p className="text-3xl font-bold">{memberFractionProgram.programYears}</p>
                                <p className="text-sm opacity-80">Program Years</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                                <p className="text-3xl font-bold">{memberFractionProgram.totalTickets}</p>
                                <p className="text-sm opacity-80">Total Tickets</p>
                            </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-white/20">
                            <p className="text-sm opacity-90">
                                <i className="fas fa-info-circle mr-2"></i>
                                Each fraction includes {memberFractionProgram.hoursPerTicket}-hour yacht cruises for up to {memberFractionProgram.maxPaxPerTrip} guests.
                                Cash-out available at ฿{(memberFractionProgram.cashOptions?.charterMatch?.pricePerTicket || 9900).toLocaleString()} per ticket with Charter Match.
                            </p>
                        </div>
                    </Card>
                </>
            )}

            {/* VOUCHERS TAB */}
            {activeTab === 'vouchers' && (
                <>
                    {/* Statistics */}
                    <div className="grid md:grid-cols-4 gap-4">
                        <Card className="text-center">
                            <p className="text-2xl font-bold text-cyan-600">{tbfPrivileges.length}</p>
                            <p className="text-sm text-gray-600">Total TBF Vouchers</p>
                        </Card>
                        <Card className="text-center">
                            <p className="text-2xl font-bold text-blue-600">
                                {tbfPrivileges.filter(p => p.voucherType === 'yacht_experience').length}
                            </p>
                            <p className="text-sm text-gray-600">Yacht Experiences</p>
                        </Card>
                        <Card className="text-center">
                            <p className="text-2xl font-bold text-purple-600">
                                {tbfPrivileges.filter(p => p.voucherType === 'yacht_fraction').length}
                            </p>
                            <p className="text-sm text-gray-600">Fraction Programs</p>
                        </Card>
                        <Card className="text-center">
                            <p className="text-2xl font-bold text-green-600">
                                {tbfPrivileges.filter(p => !p.voucherType || p.voucherType === 'standard').length}
                            </p>
                            <p className="text-sm text-gray-600">Standard Vouchers</p>
                        </Card>
                    </div>

                    {/* Search */}
                    <Card>
                        <div className="relative">
                            <i className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                            <input
                                type="text"
                                placeholder="Search TBF vouchers..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                        </div>
                    </Card>

                    {/* Vouchers Grid */}
                    {searchFiltered.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {searchFiltered.map((voucher) => (
                                <Card key={voucher.id} className="hover:shadow-lg transition-shadow">
                                    {/* Voucher Image */}
                                    <div className="aspect-video bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg mb-4 flex items-center justify-center overflow-hidden relative">
                                        {voucher.image ? (
                                            <img
                                                src={voucher.image}
                                                alt={voucher.title}
                                                className="w-full h-full object-cover"
                                                onError={(e) => e.target.src = 'https://placehold.co/400x200/06b6d4/ffffff?text=TBF'}
                                            />
                                        ) : (
                                            <i className="fas fa-ship text-white text-4xl"></i>
                                        )}
                                        {voucher.voucherType && (
                                            <span className="absolute top-2 right-2 px-2 py-1 bg-black/50 text-white rounded text-xs capitalize">
                                                {voucher.voucherType.replace('_', ' ')}
                                            </span>
                                        )}
                                    </div>

                                    {/* Voucher Info */}
                                    <div>
                                        {/* Badges */}
                                        <div className="flex gap-2 mb-2 flex-wrap">
                                            <span className={`px-2 py-1 rounded text-xs font-medium ${voucher.tier === 'gold' ? 'bg-yellow-100 text-yellow-700' :
                                                voucher.tier === 'silver' ? 'bg-gray-100 text-gray-700' :
                                                    'bg-blue-100 text-blue-700'
                                                }`}>
                                                {voucher.tier?.toUpperCase()}
                                            </span>
                                            <span className="px-2 py-1 bg-cyan-100 text-cyan-700 rounded text-xs font-medium">
                                                {voucher.categoryLabel || 'TBF'}
                                            </span>
                                        </div>

                                        <h3 className="font-bold text-gray-900 mb-1">{voucher.titleTh || voucher.title}</h3>
                                        <p className="text-xs text-gray-500 mb-2">{voucher.title}</p>

                                        <p className="text-sm text-gray-700 mb-3 line-clamp-2">
                                            {voucher.descriptionTh || voucher.description}
                                        </p>

                                        {/* Price */}
                                        <div className="flex items-center justify-between mb-3 pt-3 border-t border-gray-100">
                                            <div>
                                                <p className="text-xs text-gray-500">Price</p>
                                                <p className="font-bold text-cyan-600">
                                                    {voucher.price} {voucher.currency}
                                                </p>
                                            </div>
                                            {voucher.fractionConfig && (
                                                <div className="text-right">
                                                    <p className="text-xs text-gray-500">Total Tickets</p>
                                                    <p className="font-bold text-blue-600">
                                                        {voucher.fractionConfig.totalTickets}
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleEditVoucher(voucher)}
                                                className="flex-1 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors text-sm font-medium"
                                            >
                                                <i className="fas fa-edit mr-1"></i>
                                                Edit
                                            </button>
                                            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                                                <i className="fas fa-eye"></i>
                                            </button>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <Card className="text-center py-12">
                            <i className="fas fa-ship text-gray-300 text-5xl mb-4"></i>
                            <h3 className="text-xl font-bold text-gray-700 mb-2">No TBF Vouchers Found</h3>
                            <p className="text-gray-500 mb-4">Create your first TBF voucher to get started</p>
                            <button
                                onClick={handleAddVoucher}
                                className="px-6 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors font-medium"
                            >
                                <i className="fas fa-plus mr-2"></i>
                                Create TBF Voucher
                            </button>
                        </Card>
                    )}
                </>
            )}
        </div>
    );
};

export default AdminTBFVouchers;
