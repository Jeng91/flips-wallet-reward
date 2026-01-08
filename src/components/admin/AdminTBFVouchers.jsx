import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { tbfBoats, tbfBookings, tbfConfirmedBookings } from '../../data/adminExtendedData';

const AdminTBFVouchers = () => {
    const [selectedBoat, setSelectedBoat] = useState(null);
    const [activeTab, setActiveTab] = useState('pending'); // pending, confirmed

    const handleApprove = (bookingId) => {
        if (window.confirm('ยืนยันการจองหรือไม่?')) {
            alert(`อนุมัติการจอง ID: ${bookingId}`);
            // Implement approve logic
        }
    };

    const handleReject = (bookingId) => {
        if (window.confirm('ปฏิเสธการจองหรือไม่?')) {
            alert(`ปฏิเสธการจอง ID: ${bookingId}`);
            // Implement reject logic
        }
    };

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900">TBF - จัดการ Boat Booking</h2>
                    <p className="text-gray-600 mt-1">จัดการการจองเรือ TBF</p>
                </div>
                {selectedBoat && (
                    <button
                        onClick={() => setSelectedBoat(null)}
                        className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <i className="fas fa-arrow-left mr-2"></i>
                        กลับไปรายการเรือ
                    </button>
                )}
            </div>

            {!selectedBoat ? (
                <>
                    {/* Statistics */}
                    <div className="grid md:grid-cols-4 gap-4">
                        <Card className="text-center">
                            <p className="text-2xl font-bold text-cyan-600">{tbfBoats.length}</p>
                            <p className="text-sm text-gray-600">เรือทั้งหมด</p>
                        </Card>
                        <Card className="text-center">
                            <p className="text-2xl font-bold text-orange-600">{tbfBookings.length}</p>
                            <p className="text-sm text-gray-600">การจองรอยืนยัน</p>
                        </Card>
                        <Card className="text-center">
                            <p className="text-2xl font-bold text-green-600">{tbfConfirmedBookings.length}</p>
                            <p className="text-sm text-gray-600">การจองที่ยืนยันแล้ว</p>
                        </Card>
                        <Card className="text-center">
                            <p className="text-2xl font-bold text-purple-600">{tbfBoats.filter(b => b.status === 'available').length}</p>
                            <p className="text-sm text-gray-600">เรือพร้อมให้บริการ</p>
                        </Card>
                    </div>

                    {/* Boats List */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {tbfBoats.map((boat) => {
                            const boatBookings = tbfBookings.filter(b => b.boatId === boat.id);
                            const boatConfirmed = tbfConfirmedBookings.filter(b => b.boatId === boat.id);

                            return (
                                <Card key={boat.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedBoat(boat)}>
                                    <div className="aspect-video bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                                        <i className="fas fa-ship text-gray-400 text-5xl"></i>
                                    </div>

                                    <h3 className="text-lg font-bold text-gray-900 mb-1">{boat.name}</h3>
                                    <p className="text-sm text-gray-600 mb-3">{boat.nameTh}</p>

                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-xs font-medium">
                                            {boat.type}
                                        </span>
                                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                                            {boat.status === 'available' ? 'พร้อมใช้งาน' : 'ไม่พร้อม'}
                                        </span>
                                    </div>

                                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                                        <p><i className="fas fa-users mr-2 text-gray-400"></i>รองรับ {boat.capacity} คน</p>
                                        <p><i className="fas fa-dollar-sign mr-2 text-gray-400"></i>฿{boat.pricePerDay.toLocaleString()}/วัน</p>
                                    </div>

                                    <div className="pt-3 border-t border-gray-200">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">การจองรอยืนยัน</span>
                                            <span className={`font-medium ${boatBookings.length > 0 ? 'text-orange-600' : 'text-gray-400'}`}>
                                                {boatBookings.length} รายการ
                                            </span>
                                        </div>
                                        <div className="flex justify-between text-sm mt-1">
                                            <span className="text-gray-600">การจองที่ยืนยันแล้ว</span>
                                            <span className="font-medium text-green-600">{boatConfirmed.length} รายการ</span>
                                        </div>
                                    </div>
                                </Card>
                            );
                        })}
                    </div>
                </>
            ) : (
                /* Boat Detail with Bookings */
                <div className="space-y-6">
                    {/* Boat Info */}
                    <Card>
                        <div className="flex gap-6">
                            <div className="w-64 h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                                <i className="fas fa-ship text-gray-400 text-6xl"></i>
                            </div>
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold text-gray-900 mb-1">{selectedBoat.name}</h2>
                                <p className="text-lg text-gray-600 mb-4">{selectedBoat.nameTh}</p>

                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <p className="text-sm text-gray-600">ประเภท</p>
                                        <p className="font-medium text-gray-900">{selectedBoat.type}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">รองรับผู้โดยสาร</p>
                                        <p className="font-medium text-gray-900">{selectedBoat.capacity} คน</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">ราคา</p>
                                        <p className="font-medium text-gray-900">฿{selectedBoat.pricePerDay.toLocaleString()}/วัน</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">สถานะ</p>
                                        <p className="font-medium text-green-600">{selectedBoat.status === 'available' ? 'พร้อมให้บริการ' : 'ไม่พร้อม'}</p>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-600 mb-2">สิ่งอำนวยความสะดวก</p>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedBoat.facilities.map((facility, idx) => (
                                            <span key={idx} className="px-3 py-1 bg-blue-50 text-blue-700 rounded text-xs">
                                                {facility}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Tabs */}
                    <div className="flex gap-2">
                        <button
                            onClick={() => setActiveTab('pending')}
                            className={`px-6 py-3 rounded-lg font-medium transition-colors ${activeTab === 'pending' ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            รอยืนยัน ({tbfBookings.filter(b => b.boatId === selectedBoat.id).length})
                        </button>
                        <button
                            onClick={() => setActiveTab('confirmed')}
                            className={`px-6 py-3 rounded-lg font-medium transition-colors ${activeTab === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            ยืนยันแล้ว ({tbfConfirmedBookings.filter(b => b.boatId === selectedBoat.id).length})
                        </button>
                    </div>

                    {/* Bookings Table */}
                    <Card>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-200">
                                        <th className="text-left py-3 px-4 font-semibold text-gray-700">ID</th>
                                        <th className="text-left py-3 px-4 font-semibold text-gray-700">ชื่อเจ้าของเรือ</th>
                                        <th className="text-left py-3 px-4 font-semibold text-gray-700">วันที่จอง</th>
                                        <th className="text-left py-3 px-4 font-semibold text-gray-700">ชื่อ-นามสกุล</th>
                                        <th className="text-left py-3 px-4 font-semibold text-gray-700">เบอร์โทร</th>
                                        <th className="text-left py-3 px-4 font-semibold text-gray-700">อีเมล</th>
                                        <th className="text-left py-3 px-4 font-semibold text-gray-700">จำนวนแขก</th>
                                        {activeTab === 'pending' && (
                                            <th className="text-left py-3 px-4 font-semibold text-gray-700">การกระทำ</th>
                                        )}
                                        {activeTab === 'confirmed' && (
                                            <th className="text-left py-3 px-4 font-semibold text-gray-700">ยืนยันโดย</th>
                                        )}
                                    </tr>
                                </thead>
                                <tbody>
                                    {activeTab === 'pending' ? (
                                        tbfBookings.filter(b => b.boatId === selectedBoat.id).map((booking) => (
                                            <tr key={booking.id} className="border-b border-gray-100 hover:bg-gray-50">
                                                <td className="py-3 px-4">{booking.id}</td>
                                                <td className="py-3 px-4 font-medium">{booking.ownerName}</td>
                                                <td className="py-3 px-4">{booking.bookingDate} ({booking.startTime}-{booking.endTime})</td>
                                                <td className="py-3 px-4">{booking.customerName}</td>
                                                <td className="py-3 px-4">{booking.customerPhone}</td>
                                                <td className="py-3 px-4">{booking.customerEmail}</td>
                                                <td className="py-3 px-4">{booking.numberOfGuests}</td>
                                                <td className="py-3 px-4">
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => handleApprove(booking.id)}
                                                            className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-sm"
                                                        >
                                                            อนุมัติ
                                                        </button>
                                                        <button
                                                            onClick={() => handleReject(booking.id)}
                                                            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm"
                                                        >
                                                            ปฏิเสธ
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        tbfConfirmedBookings.filter(b => b.boatId === selectedBoat.id).map((booking) => (
                                            <tr key={booking.id} className="border-b border-gray-100 hover:bg-gray-50">
                                                <td className="py-3 px-4">{booking.id}</td>
                                                <td className="py-3 px-4 font-medium">{booking.ownerName}</td>
                                                <td className="py-3 px-4">{booking.bookingDate} ({booking.startTime}-{booking.endTime})</td>
                                                <td className="py-3 px-4">{booking.customerName}</td>
                                                <td className="py-3 px-4">{booking.customerPhone}</td>
                                                <td className="py-3 px-4">{booking.customerEmail}</td>
                                                <td className="py-3 px-4">{booking.numberOfGuests}</td>
                                                <td className="py-3 px-4">
                                                    <span className="text-sm text-gray-600">{booking.confirmedBy}</span>
                                                    <p className="text-xs text-gray-500">{booking.confirmedDate}</p>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {((activeTab === 'pending' && tbfBookings.filter(b => b.boatId === selectedBoat.id).length === 0) ||
                            (activeTab === 'confirmed' && tbfConfirmedBookings.filter(b => b.boatId === selectedBoat.id).length === 0)) && (
                                <div className="text-center py-8 text-gray-500">
                                    ไม่มีรายการ{activeTab === 'pending' ? 'รอยืนยัน' : 'ที่ยืนยันแล้ว'}
                                </div>
                            )}
                    </Card>
                </div>
            )}
        </div>
    );
};

export default AdminTBFVouchers;
