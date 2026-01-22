import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { fractionalBoat, fractionalOwners, fractionalBookings, fractionalConfirmedBookings } from '../../data/adminExtendedData';

const AdminFractionalTBF = () => {
    const [activeTab, setActiveTab] = useState('all'); // all, pending, confirmed
    const [searchTerm, setSearchTerm] = useState('');

    // Combine all bookings
    const allBookings = [
        ...fractionalBookings.map(b => ({ ...b, status: 'pending' })),
        ...fractionalConfirmedBookings.map(b => ({ ...b, status: 'confirmed' }))
    ];

    // Filter bookings based on active tab
    const filteredByTab = activeTab === 'all'
        ? allBookings
        : allBookings.filter(b => b.status === activeTab);

    // Filter by search term
    const filteredBookings = filteredByTab.filter(booking =>
        booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.customerPhone.includes(searchTerm) ||
        booking.boatName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div>
                <h2 className="text-3xl font-bold text-gray-900">TBF - Ownership Management</h2>
                <p className="text-gray-600 mt-1">Manage boat bookings for Fractional Ownership</p>
            </div>

            {/* Boat Information Card */}
            <Card>
                <div className="flex items-start gap-6">
                    {/* Boat Image Placeholder */}
                    <div className="w-48 h-32 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <i className="fas fa-ship text-white text-5xl opacity-50"></i>
                    </div>

                    {/* Boat Details */}
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{fractionalBoat.nameTh}</h3>
                        <p className="text-gray-600 mb-3">{fractionalBoat.name}</p>

                        <div className="grid grid-cols-4 gap-4 text-sm">
                            <div>
                                <p className="text-gray-500">Type</p>
                                <p className="font-medium text-gray-900">{fractionalBoat.type}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Capacity</p>
                                <p className="font-medium text-gray-900">{fractionalBoat.capacity} persons</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Total Shares</p>
                                <p className="font-medium text-gray-900">{fractionalBoat.totalShares}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Shares Sold</p>
                                <p className="font-medium text-gray-900">{fractionalBoat.sharesSold}/{fractionalBoat.totalShares}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Statistics */}
            <div className="grid md:grid-cols-4 gap-4">
                <Card className="text-center">
                    <p className="text-2xl font-bold text-blue-600">{allBookings.length}</p>
                    <p className="text-sm text-gray-600">Total Bookings</p>
                </Card>
                <Card className="text-center">
                    <p className="text-2xl font-bold text-orange-600">{fractionalBookings.length}</p>
                    <p className="text-sm text-gray-600">Pending</p>
                </Card>
                <Card className="text-center">
                    <p className="text-2xl font-bold text-green-600">{fractionalConfirmedBookings.length}</p>
                    <p className="text-sm text-gray-600">Confirmed</p>
                </Card>
                <Card className="text-center">
                    <p className="text-2xl font-bold text-purple-600">{fractionalOwners.length}</p>
                    <p className="text-sm text-gray-600">Co-Owners</p>
                </Card>
            </div>

            {/* Tabs */}
            <Card>
                <div className="flex gap-2">
                    <button
                        onClick={() => setActiveTab('all')}
                        className={`px-6 py-2 rounded-lg font-medium transition-colors ${activeTab === 'all' ? 'bg-gray-200 text-gray-900' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        All ({allBookings.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('pending')}
                        className={`px-6 py-2 rounded-lg font-medium transition-colors ${activeTab === 'pending' ? 'bg-orange-100 text-orange-700' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        Pending ({fractionalBookings.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('confirmed')}
                        className={`px-6 py-2 rounded-lg font-medium transition-colors ${activeTab === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        Confirmed ({fractionalConfirmedBookings.length})
                    </button>
                </div>
            </Card>

            {/* Search */}
            <Card>
                <div className="relative">
                    <i className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                    <input
                        type="text"
                        placeholder="Search by name, email, phone, or boat name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                </div>
            </Card>

            {/* Bookings Table */}
            <Card>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">ID</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Boat Owner</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Boat Name</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Booking Date</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Full Name</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Phone</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Email</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Status</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredBookings.length > 0 ? (
                                filteredBookings.map((booking, index) => (
                                    <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            #{booking.id}
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                                            {booking.ownerName}
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                                            <div className="flex items-center gap-2">
                                                <i className="fas fa-ship text-blue-600"></i>
                                                {booking.boatName}
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                                            <div>
                                                <p className="font-medium">{booking.bookingDate}</p>
                                                <p className="text-xs text-gray-500">{booking.startTime} - {booking.endTime}</p>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                                            <div className="flex items-center gap-2">
                                                <i className="fas fa-user text-gray-400"></i>
                                                {booking.customerName}
                                            </div>
                                            {booking.isOwner && (
                                                <span className="text-xs text-purple-600 font-medium">
                                                    <i className="fas fa-crown mr-1"></i>Owner
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                                            <div className="flex items-center gap-2">
                                                <i className="fas fa-phone text-gray-400 text-xs"></i>
                                                {booking.customerPhone}
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-700">
                                            <div className="flex items-center gap-2">
                                                <i className="fas fa-envelope text-gray-400 text-xs"></i>
                                                <span className="truncate max-w-xs">{booking.customerEmail}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm">
                                            {booking.status === 'confirmed' ? (
                                                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                                                    <i className="fas fa-check-circle mr-1"></i>
                                                    Confirmed
                                                </span>
                                            ) : (
                                                <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">
                                                    <i className="fas fa-clock mr-1"></i>
                                                    Pending
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    className="px-3 py-1 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                    title="View Details"
                                                >
                                                    <i className="fas fa-eye"></i>
                                                </button>
                                                {booking.status === 'pending' && (
                                                    <>
                                                        <button
                                                            className="px-3 py-1 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                                            title="Approve"
                                                        >
                                                            <i className="fas fa-check"></i>
                                                        </button>
                                                        <button
                                                            className="px-3 py-1 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                            title="Reject"
                                                        >
                                                            <i className="fas fa-times"></i>
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="9" className="px-4 py-12 text-center">
                                        <i className="fas fa-inbox text-gray-300 text-5xl mb-4"></i>
                                        <p className="text-gray-500">No bookings found</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* Fractional Owners Section */}
            <Card>
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                    <i className="fas fa-users mr-2 text-purple-600"></i>
                    Fractional Owners
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                    {fractionalOwners.map((owner) => (
                        <div key={owner.id} className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 transition-colors">
                            <div className="flex items-start justify-between mb-2">
                                <div>
                                    <p className="font-medium text-gray-900">{owner.name}</p>
                                    <p className="text-sm text-gray-600">{owner.email}</p>
                                    <p className="text-sm text-gray-600">{owner.phone}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-lg font-bold text-purple-600">{owner.shares} shares</p>
                                    <p className="text-xs text-gray-500">{owner.percentage}%</p>
                                </div>
                            </div>
                            <div className="text-xs text-gray-500 mt-2 pt-2 border-t border-gray-100">
                                Purchase Date: {owner.purchaseDate}
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
};

export default AdminFractionalTBF;
