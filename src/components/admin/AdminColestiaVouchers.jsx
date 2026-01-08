import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { colestiaMovies, colestiaNewMovies, colestiaVouchers } from '../../data/adminExtendedData';

const AdminColestiaVouchers = () => {
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedVoucher, setSelectedVoucher] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [activeTab, setActiveTab] = useState('all'); // all, new, existing

    const allMovies = [...colestiaMovies, ...colestiaNewMovies];

    // Filter movies
    const filteredMovies = allMovies.filter(movie => {
        const matchesSearch = movie.title.includes(searchTerm) || movie.titleEn.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesTab = activeTab === 'all' ||
            (activeTab === 'new' && !movie.hasVouchers) ||
            (activeTab === 'existing' && movie.hasVouchers);
        return matchesSearch && matchesTab;
    });

    // Get vouchers for selected movie
    const movieVouchers = selectedMovie ? colestiaVouchers.filter(v => v.movieId === selectedMovie.id) : [];

    const handleAddVoucher = (movieId) => {
        const movie = allMovies.find(m => m.id === movieId);
        setSelectedMovie(movie);
        setShowAddModal(true);
    };

    const handleEditVoucher = (voucher) => {
        setSelectedVoucher(voucher);
        setShowEditModal(true);
    };

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900">Colestia - จัดการ Vouchers</h2>
                    <p className="text-gray-600 mt-1">จัดการ vouchers สำหรับภาพยนตร์ Colestia</p>
                </div>
                {selectedMovie && (
                    <button
                        onClick={() => setSelectedMovie(null)}
                        className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <i className="fas fa-arrow-left mr-2"></i>
                        กลับไปรายการภาพยนตร์
                    </button>
                )}
            </div>

            {!selectedMovie ? (
                <>
                    {/* Statistics */}
                    <div className="grid md:grid-cols-4 gap-4">
                        <Card className="text-center">
                            <p className="text-2xl font-bold text-blue-600">{allMovies.length}</p>
                            <p className="text-sm text-gray-600">ภาพยนตร์ทั้งหมด</p>
                        </Card>
                        <Card className="text-center">
                            <p className="text-2xl font-bold text-green-600">{colestiaMovies.length}</p>
                            <p className="text-sm text-gray-600">มี Vouchers แล้ว</p>
                        </Card>
                        <Card className="text-center">
                            <p className="text-2xl font-bold text-orange-600">{colestiaNewMovies.length}</p>
                            <p className="text-sm text-gray-600">ยังไม่มี Vouchers</p>
                        </Card>
                        <Card className="text-center">
                            <p className="text-2xl font-bold text-purple-600">{colestiaVouchers.length}</p>
                            <p className="text-sm text-gray-600">Vouchers ทั้งหมด</p>
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
                                All
                            </button>
                            <button
                                onClick={() => setActiveTab('existing')}
                                className={`px-6 py-2 rounded-lg font-medium transition-colors ${activeTab === 'existing' ? 'bg-gray-200 text-gray-900' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                                    }`}
                            >
                                Product
                            </button>
                            <button
                                onClick={() => setActiveTab('new')}
                                className={`px-6 py-2 rounded-lg font-medium transition-colors ${activeTab === 'new' ? 'bg-gray-200 text-gray-900' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                                    }`}
                            >
                                Activity
                            </button>
                        </div>
                    </Card>

                    {/* Search */}
                    <Card>
                        <div className="relative">
                            <i className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                            <input
                                type="text"
                                placeholder="Search"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                        </div>
                    </Card>

                    {/* Statistics Cards Row */}
                    <div className="grid grid-cols-5 gap-4">
                        <Card className="text-center">
                            <p className="text-sm text-gray-600">จำนวนรายการ</p>
                            <p className="text-xl font-bold text-gray-900">{colestiaNewMovies.length}</p>
                        </Card>
                        <Card className="text-center">
                            <p className="text-sm text-gray-600">สินค้าและของชอ</p>
                            <p className="text-xl font-bold text-gray-900">132</p>
                        </Card>
                        <Card className="text-center">
                            <p className="text-sm text-gray-600">รอบบริการและ</p>
                            <p className="text-xl font-bold text-gray-900">22</p>
                        </Card>
                        <Card className="text-center">
                            <p className="text-sm text-gray-600">ช่วงเวลาเพิ่มชอI</p>
                            <p className="text-xl font-bold text-gray-900">{colestiaNewMovies.length}</p>
                        </Card>
                        <Card className="text-center">
                            <p className="text-sm text-gray-600">หมดหรือปลว</p>
                            <p className="text-xl font-bold text-gray-900">0</p>
                        </Card>
                    </div>

                    {/* Movies Grid */}
                    <div className="grid md:grid-cols-2 gap-6">
                        {filteredMovies.map((movie) => (
                            <Card key={movie.id} className="hover:shadow-lg transition-shadow">
                                <div className="flex gap-4">
                                    {/* Movie Poster */}
                                    <div className="w-32 h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                                        <i className="fas fa-film text-gray-400 text-4xl"></i>
                                    </div>

                                    {/* Movie Details */}
                                    <div className="flex-1">
                                        <h3 className="text-lg font-bold text-gray-900">{movie.title}</h3>
                                        <p className="text-sm text-gray-600 mb-2">{movie.titleEn}</p>

                                        <div className="space-y-1 text-sm text-gray-600 mb-4">
                                            <p><strong>หมวดหมู่:</strong> {movie.genre}</p>
                                            <p><strong>กำกับโดย:</strong> {movie.director}</p>
                                            <p><strong>วันฉาย:</strong> {movie.releaseDate}</p>
                                        </div>

                                        <div className="flex items-center gap-2 mb-3">
                                            {movie.hasVouchers ? (
                                                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                                                    มี {movie.voucherCount} vouchers
                                                </span>
                                            ) : (
                                                <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">
                                                    ยังไม่มี vouchers
                                                </span>
                                            )}
                                        </div>

                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => setSelectedMovie(movie)}
                                                className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                                            >
                                                แก้ไข
                                            </button>
                                            <button
                                                onClick={() => handleAddVoucher(movie.id)}
                                                className="flex-1 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
                                            >
                                                ลบ
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </>
            ) : (
                /* Movie Detail View with Vouchers */
                <div className="space-y-6">
                    <Card>
                        <div className="flex gap-6">
                            <div className="w-48 h-72 bg-gray-200 rounded-lg flex items-center justify-center">
                                <i className="fas fa-film text-gray-400 text-6xl"></i>
                            </div>
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold text-gray-900">{selectedMovie.title}</h2>
                                <p className="text-gray-600 mb-4">{selectedMovie.titleEn}</p>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <p className="text-gray-600">หมวดหมู่</p>
                                        <p className="font-medium text-gray-900">{selectedMovie.genre}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">ผู้กำกับ</p>
                                        <p className="font-medium text-gray-900">{selectedMovie.director}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">วันฉาย</p>
                                        <p className="font-medium text-gray-900">{selectedMovie.releaseDate}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">Vouchers</p>
                                        <p className="font-medium text-gray-900">{movieVouchers.length} รายการ</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Add Voucher Button */}
                    <div className="flex justify-end">
                        <button
                            onClick={() => setShowAddModal(true)}
                            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium"
                        >
                            <i className="fas fa-plus mr-2"></i>
                            เพิ่มของชอยเซอร์ใหม่
                        </button>
                    </div>

                    {/* Vouchers List */}
                    <div className="space-y-4">
                        {movieVouchers.length > 0 ? (
                            movieVouchers.map((voucher) => (
                                <Card key={voucher.id} className="hover:shadow-md transition-shadow">
                                    <div className="flex gap-6">
                                        {/* Voucher Image */}
                                        <div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                                            <i className="fas fa-image text-gray-400 text-3xl"></i>
                                        </div>

                                        {/* Voucher Info */}
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-2">
                                                <h4 className="text-lg font-bold text-gray-900">{voucher.name}</h4>
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => handleEditVoucher(voucher)}
                                                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                                                    >
                                                        แก้ไข
                                                    </button>
                                                    <button className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm">
                                                        ลบ
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="flex gap-2 mb-2">
                                                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                                                    Product
                                                </span>
                                                <span className="text-sm text-gray-600">หมวดหมู่: {voucher.category}</span>
                                            </div>

                                            <p className="text-sm text-gray-700 mb-3">
                                                รายละเอียดเงื่อนไขเกณดัฐี:
                                            </p>
                                            <ul className="text-sm text-gray-700 space-y-1 mb-3">
                                                {voucher.conditions.map((cond, idx) => (
                                                    <li key={idx}><i className="fas fa-check text-green-600 mr-2"></i>{cond}</li>
                                                ))}
                                            </ul>

                                            <div className="grid grid-cols-3 gap-4 text-sm">
                                                <div>
                                                    <p className="text-gray-600">วันหมดอายุ</p>
                                                    <p className="font-medium text-orange-600">{voucher.expiryDate}วันที่สร้างการก: {voucher.createdDate}</p>
                                                </div>
                                                <div>
                                                    <p className="text-gray-600">ทบนข้องน้องชอย</p>
                                                    <p className="font-medium text-gray-900">{voucher.totalStock}</p>
                                                </div>
                                                <div>
                                                    <p className="text-gray-600">รับเเล้ว</p>
                                                    <p className="font-medium text-gray-900">{voucher.redeemed}</p>
                                                </div>
                                                <div>
                                                    <p className="text-gray-600">ช่างของบค</p>
                                                    <p className="font-medium text-gray-900">{voucher.remaining}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            ))
                        ) : (
                            <Card className="text-center py-12">
                                <i className="fas fa-inbox text-gray-300 text-5xl mb-4"></i>
                                <p className="text-gray-500">ยังไม่มี vouchers สำหรับภาพยนตร์นี้</p>
                                <button
                                    onClick={() => setShowAddModal(true)}
                                    className="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                                >
                                    เพิ่ม Voucher แรก
                                </button>
                            </Card>
                        )}
                    </div>
                </div>
            )}

            {/* Add/Edit Voucher Modal */}
            <VoucherModal
                isOpen={showAddModal || showEditModal}
                onClose={() => {
                    setShowAddModal(false);
                    setShowEditModal(false);
                    setSelectedVoucher(null);
                }}
                voucher={selectedVoucher}
                movieTitle={selectedMovie?.title}
                isEdit={showEditModal}
            />
        </div>
    );
};

// Voucher Modal Component (Add/Edit)
const VoucherModal = ({ isOpen, onClose, voucher, movieTitle, isEdit }) => {
    const [formData, setFormData] = useState({
        type: voucher?.type || 'Product',
        name: voucher?.name || '',
        description: voucher?.description || '',
        startDate: voucher?.startDate || '',
        expiryDate: voucher?.expiryDate || '',
        rewardType: voucher?.rewardType || '',
        totalStock: voucher?.totalStock || '',
        redeemed: voucher?.redeemed || '',
        remaining: voucher?.remaining || ''
    });

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    {/* Modal Header */}
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">
                        {isEdit ? 'แก้ไวของชอยเซอร์ใหม่' : 'เพิ่มของชอยเซอร์ใหม่'}
                    </h3>

                    {/* Type Selection */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">หมวดหมู่</label>
                        <div className="flex gap-4">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="type"
                                    value="Product"
                                    checked={formData.type === 'Product'}
                                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                    className="mr-2"
                                />
                                Product
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="type"
                                    value="Activity"
                                    checked={formData.type === 'Activity'}
                                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                    className="mr-2"
                                />
                                Activity
                            </label>
                        </div>
                    </div>

                    {/* Image Upload */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">ชื่อสินค้า/บริการ</label>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors">
                                <i className="fas fa-image text-gray-400 text-2xl"></i>
                            </div>
                            <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors">
                                <i className="fas fa-image text-gray-400 text-2xl"></i>
                            </div>
                            <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors border-2 border-dashed border-gray-300">
                                <i className="fas fa-plus text-gray-400 text-2xl"></i>
                            </div>
                        </div>
                    </div>

                    {/* Name Field */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">ชื่อสิ๊นค้า/บริการ</label>
                        <input
                            type="text"
                            placeholder="กรอกชื่อสินค้า/บริการ"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                    </div>

                    {/* Description */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">รายละเอียด</label>
                        <textarea
                            placeholder="กรอกรายละเอียด..."
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            rows={3}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                    </div>

                    {/* Dates */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">วันที่เริ่มรางานน</label>
                            <input
                                type="text"
                                placeholder="29 ธันวาคม 2569..."
                                value={formData.startDate}
                                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">วันหมดอายุ</label>
                            <input
                                type="text"
                                placeholder="29 ธันวาคม 2569..."
                                value={formData.expiryDate}
                                onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                        </div>
                    </div>

                    {/* Reward Type */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">หมวดหมู่</label>
                        <input
                            type="text"
                            placeholder="ใส่..."
                            value={formData.rewardType}
                            onChange={(e) => setFormData({ ...formData, rewardType: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                    </div>

                    {/* Stock Info */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">จำนวนสหต็น</label>
                            <input
                                type="number"
                                value={formData.totalStock}
                                onChange={(e) => setFormData({ ...formData, totalStock: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">จำนวนรับเเล้ว</label>
                            <input
                                type="number"
                                value={formData.redeemed}
                                onChange={(e) => setFormData({ ...formData, redeemed: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">ค้างของบา</label>
                            <input
                                type="number"
                                value={formData.remaining}
                                onChange={(e) => setFormData({ ...formData, remaining: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4">
                        <button
                            onClick={() => {
                                // Handle save
                                onClose();
                            }}
                            className="flex-1 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
                        >
                            เพิิ่มของมอย
                        </button>
                        <button
                            onClick={onClose}
                            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                        >
                            ยกเลิก
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminColestiaVouchers;
