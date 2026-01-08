import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { users } from '../../data/adminExtendedData';

const AdminUsers = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [tokenFilter, setTokenFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Filter users
    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.phone.includes(searchTerm);
        const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
        const matchesToken = tokenFilter === 'all' ||
            (tokenFilter === 'has' && user.hasTokens) ||
            (tokenFilter === 'none' && !user.hasTokens);
        return matchesSearch && matchesStatus && matchesToken;
    });

    // Pagination
    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    const paginatedUsers = filteredUsers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div>
                <h2 className="text-3xl font-bold text-gray-900">จัดการผู้ใช้</h2>
                <p className="text-gray-600 mt-1">รายชื่อผู้ใช้ทั้งหมดในระบบ</p>
            </div>

            {/* Statistics Cards */}
            <div className="grid md:grid-cols-4 gap-4">
                <Card className="text-center">
                    <p className="text-2xl font-bold text-blue-600">{users.length}</p>
                    <p className="text-sm text-gray-600">ผู้ใช้ทั้งหมด</p>
                </Card>
                <Card className="text-center">
                    <p className="text-2xl font-bold text-green-600">{users.filter(u => u.status === 'active').length}</p>
                    <p className="text-sm text-gray-600">ใช้งานอยู่</p>
                </Card>
                <Card className="text-center">
                    <p className="text-2xl font-bold text-orange-600">{users.filter(u => !u.hasTokens).length}</p>
                    <p className="text-sm text-gray-600">ไม่มี Tokens</p>
                </Card>
                <Card className="text-center">
                    <p className="text-2xl font-bold text-purple-600">{users.filter(u => u.hasTokens).length}</p>
                    <p className="text-sm text-gray-600">มี Tokens</p>
                </Card>
            </div>

            {/* Filters and Search */}
            <Card>
                <div className="grid md:grid-cols-4 gap-4">
                    {/* Search */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            <i className="fas fa-search mr-2"></i>ค้นหา
                        </label>
                        <input
                            type="text"
                            placeholder="ชื่อ, อีเมล, หรือเบอร์โทร..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                    </div>

                    {/* Status Filter */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            สถานะ
                        </label>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        >
                            <option value="all">ทั้งหมด</option>
                            <option value="active">ใช้งานอยู่</option>
                            <option value="inactive">ไม่ได้ใช้งาน</option>
                        </select>
                    </div>

                    {/* Token Filter */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Token
                        </label>
                        <select
                            value={tokenFilter}
                            onChange={(e) => setTokenFilter(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        >
                            <option value="all">ทั้งหมด</option>
                            <option value="has">มี Tokens</option>
                            <option value="none">ไม่มี Tokens</option>
                        </select>
                    </div>
                </div>
            </Card>

            {/* Users Table */}
            <Card>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="text-left py-3 px-4 font-semibold text-gray-700">ID</th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-700">ชื่อ</th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-700">อีเมล</th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-700">โทรศัพท์</th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-700">วันที่ลงทะเบียน</th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-700">กิจกรรมล่าสุด</th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-700">Tokens</th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-700">สถานะ</th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-700">การกระทำ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedUsers.length > 0 ? (
                                paginatedUsers.map((user) => (
                                    <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                                        <td className="py-3 px-4 text-gray-900">{user.id}</td>
                                        <td className="py-3 px-4 font-medium text-gray-900">{user.name}</td>
                                        <td className="py-3 px-4 text-gray-600">{user.email}</td>
                                        <td className="py-3 px-4 text-gray-600">{user.phone}</td>
                                        <td className="py-3 px-4 text-gray-600">{user.registrationDate}</td>
                                        <td className="py-3 px-4 text-gray-600">{user.lastActivity}</td>
                                        <td className="py-3 px-4">
                                            <span className={`px-2 py-1 rounded text-xs font-medium ${user.hasTokens ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                                                }`}>
                                                {user.hasTokens ? `${user.totalTokens} tokens` : 'ไม่มี'}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${user.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                                                }`}>
                                                {user.status === 'active' ? 'ใช้งานอยู่' : 'ไม่ได้ใช้งาน'}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4">
                                            <button className="text-primary hover:text-primary-dark mr-3">
                                                <i className="fas fa-eye"></i>
                                            </button>
                                            <button className="text-blue-600 hover:text-blue-800">
                                                <i className="fas fa-wallet"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="9" className="py-8 text-center text-gray-500">
                                        ไม่พบผู้ใช้ที่ตรงกับเงื่อนไข
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="mt-4 flex items-center justify-between">
                        <p className="text-sm text-gray-600">
                            แสดง {((currentPage - 1) * itemsPerPage) + 1} ถึง {Math.min(currentPage * itemsPerPage, filteredUsers.length)} จาก {filteredUsers.length} รายการ
                        </p>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                ก่อนหน้า
                            </button>
                            <span className="px-4 py-2 border border-gray-300 rounded-lg bg-primary text-white">
                                {currentPage} / {totalPages}
                            </span>
                            <button
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                ถัดไป
                            </button>
                        </div>
                    </div>
                )}
            </Card>
        </div>
    );
};

export default AdminUsers;
