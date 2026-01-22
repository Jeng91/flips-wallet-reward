import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { privilegePackages } from '../../data/mockData';

const AdminColestiaVouchers = () => {
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);

    // Filter Colestia privileges
    const colestiaPrivileges = privilegePackages.filter(p => p.mainCategory === 'colestai');

    // Group privileges by movie (exclude items without movieId - these are universal rewards)
    const movieGroups = colestiaPrivileges
        .filter(priv => priv.movieId) // Only include items with movieId
        .reduce((acc, priv) => {
            const movieId = priv.movieId;
            const movieName = priv.movieName || 'Unknown Movie';
            const movieNameTh = priv.movieNameTh || 'ไม่ทราบชื่อ';

            if (!acc[movieId]) {
                acc[movieId] = {
                    movieId,
                    movieName,
                    movieNameTh,
                    vouchers: []
                };
            }
            acc[movieId].vouchers.push(priv);
            return acc;
        }, {});

    // Convert to array for display
    const movies = Object.values(movieGroups);

    // Filter movies by search
    const filteredMovies = movies.filter(movie =>
        movie.movieName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.movieNameTh.includes(searchTerm)
    );

    // Get vouchers for selected movie
    const selectedMovieVouchers = selectedMovie ? selectedMovie.vouchers : [];

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900">Colestia - Manage Vouchers</h2>
                    <p className="text-gray-600 mt-1">Manage rewards for Thai films</p>
                </div>
                {selectedMovie && (
                    <button
                        onClick={() => setSelectedMovie(null)}
                        className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <i className="fas fa-arrow-left mr-2"></i>
                        Back to Movie List
                    </button>
                )}
            </div>

            {!selectedMovie ? (
                <>
                    {/* Statistics */}
                    <div className="grid md:grid-cols-4 gap-4">
                        <Card className="text-center">
                            <p className="text-2xl font-bold text-cyan-600">{movies.length}</p>
                            <p className="text-sm text-gray-600">Total Movies</p>
                        </Card>
                        <Card className="text-center">
                            <p className="text-2xl font-bold text-green-600">{movies.filter(m => m.vouchers.length > 0).length}</p>
                            <p className="text-sm text-gray-600">Has Vouchers</p>
                        </Card>
                        <Card className="text-center">
                            <p className="text-2xl font-bold text-orange-600">{movies.filter(m => m.vouchers.length === 0).length}</p>
                            <p className="text-sm text-gray-600">No Vouchers Yet</p>
                        </Card>
                        <Card className="text-center">
                            <p className="text-2xl font-bold text-purple-600">{colestiaPrivileges.filter(p => p.movieId).length}</p>
                            <p className="text-sm text-gray-600">Total Vouchers</p>
                        </Card>
                    </div>

                    {/* Search */}
                    <Card>
                        <div className="relative">
                            <i className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                            <input
                                type="text"
                                placeholder="Search movies..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                        </div>
                    </Card>

                    {/* Movies Grid */}
                    <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {filteredMovies.map((movie) => (
                            <Card
                                key={movie.movieId}
                                className="hover:shadow-lg transition-shadow cursor-pointer"
                                onClick={() => setSelectedMovie(movie)}
                            >
                                {/* Movie Poster Placeholder */}
                                <div className="aspect-[3/4] bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg mb-3 flex items-center justify-center relative overflow-hidden">
                                    <i className="fas fa-film text-white text-4xl opacity-50"></i>
                                    {movie.vouchers.length === 0 && (
                                        <div className="absolute top-2 right-2">
                                            <span className="px-2 py-1 bg-orange-500 text-white rounded-full text-xs font-bold animate-pulse">
                                                <i className="fas fa-exclamation-triangle mr-1"></i>
                                                No Vouchers
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Movie Info */}
                                <div>
                                    <h3 className="text-base font-bold text-gray-900 mb-1">{movie.movieNameTh}</h3>
                                    <p className="text-xs text-gray-600 mb-2">{movie.movieName}</p>

                                    {/* Voucher Count Badge */}
                                    <div className="flex items-center gap-2 mb-2">
                                        {movie.vouchers.length > 0 ? (
                                            <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium flex items-center gap-1">
                                                <i className="fas fa-check-circle text-xs"></i>
                                                Has {movie.vouchers.length} vouchers
                                            </span>
                                        ) : (
                                            <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium flex items-center gap-1">
                                                <i className="fas fa-exclamation-circle text-xs"></i>
                                                No vouchers yet
                                            </span>
                                        )}
                                    </div>

                                    {/* Voucher Types Preview */}
                                    {movie.vouchers.length > 0 && (
                                        <div className="mb-2">
                                            <p className="text-xs text-gray-500 mb-1">Type:</p>
                                            <div className="flex flex-wrap gap-1">
                                                {[...new Set(movie.vouchers.map(v => v.categoryLabel))].map((cat, idx) => (
                                                    <span key={idx} className="px-2 py-0.5 bg-cyan-50 text-cyan-700 rounded text-xs">
                                                        {cat}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Action Button */}
                                    <button
                                        className="w-full px-3 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors text-xs font-medium"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedMovie(movie);
                                        }}
                                    >
                                        <i className="fas fa-eye mr-1"></i>
                                        View Details
                                    </button>
                                </div>
                            </Card>
                        ))}
                    </div>

                    {filteredMovies.length === 0 && (
                        <Card className="text-center py-12">
                            <i className="fas fa-inbox text-gray-300 text-5xl mb-4"></i>
                            <p className="text-gray-500">No movies found</p>
                        </Card>
                    )}
                </>
            ) : (
                /* Movie Detail View with Vouchers */
                <div className="space-y-6">
                    {/* Movie Info Card */}
                    <Card>
                        <div className="flex gap-6">
                            {/* Movie Poster */}
                            <div className="w-48 h-72 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                <i className="fas fa-film text-white text-6xl opacity-50"></i>
                            </div>

                            {/* Movie Details */}
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold text-gray-900 mb-1">{selectedMovie.movieNameTh}</h2>
                                <p className="text-gray-600 mb-4">{selectedMovie.movieName}</p>

                                <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                                    <div>
                                        <p className="text-gray-600">Movie ID</p>
                                        <p className="font-medium text-gray-900">{selectedMovie.movieId}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">Vouchers</p>
                                        <p className="font-medium text-gray-900">{selectedMovie.vouchers.length} items</p>
                                    </div>
                                </div>

                                {/* Voucher Stats */}
                                <div className="grid grid-cols-3 gap-3">
                                    <div className="bg-blue-50 p-3 rounded-lg">
                                        <p className="text-xs text-gray-600">Movie Tickets</p>
                                        <p className="text-lg font-bold text-blue-600">
                                            {selectedMovie.vouchers.filter(v => v.category === 'movie-tickets').length}
                                        </p>
                                    </div>
                                    <div className="bg-green-50 p-3 rounded-lg">
                                        <p className="text-xs text-gray-600">Meet & Greet</p>
                                        <p className="text-lg font-bold text-green-600">
                                            {selectedMovie.vouchers.filter(v => v.category === 'meet-greet' || v.category === 'behind-scenes').length}
                                        </p>
                                    </div>
                                    <div className="bg-purple-50 p-3 rounded-lg">
                                        <p className="text-xs text-gray-600">Merchandise</p>
                                        <p className="text-lg font-bold text-purple-600">
                                            {selectedMovie.vouchers.filter(v => v.category === 'merchandise' || v.category === 'credits').length}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Add Voucher Button */}
                    <div className="flex justify-end">
                        <button
                            onClick={() => setShowAddModal(true)}
                            className="px-6 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors font-medium shadow-sm"
                        >
                            <i className="fas fa-plus mr-2"></i>
                            Add New Voucher
                        </button>
                    </div>

                    {/* Vouchers List */}
                    {selectedMovieVouchers.length > 0 ? (
                        <div className="grid md:grid-cols-2 gap-6">
                            {selectedMovieVouchers.map((voucher) => (
                                <Card key={voucher.id} className="hover:shadow-md transition-shadow">
                                    {/* Voucher Image */}
                                    <div className="aspect-video bg-gray-200 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                                        {voucher.image ? (
                                            <img
                                                src={voucher.image}
                                                alt={voucher.title}
                                                className="w-full h-full object-cover"
                                                onError={(e) => e.target.src = 'https://placehold.co/400x200/e5e7eb/9ca3af?text=No+Image'}
                                            />
                                        ) : (
                                            <i className="fas fa-ticket-alt text-gray-400 text-4xl"></i>
                                        )}
                                    </div>

                                    {/* Voucher Info */}
                                    <div>
                                        {/* Badges */}
                                        <div className="flex gap-2 mb-2 flex-wrap">
                                            <span className={`px-2 py-1 rounded text-xs font-medium ${voucher.tier === 'gold' ? 'bg-yellow-100 text-yellow-700' :
                                                voucher.tier === 'silver' ? 'bg-gray-100 text-gray-700' :
                                                    voucher.tier === 'platinum' ? 'bg-purple-100 text-purple-700' :
                                                        'bg-blue-100 text-blue-700'
                                                }`}>
                                                {voucher.tier?.toUpperCase()}
                                            </span>
                                            <span className="px-2 py-1 bg-cyan-100 text-cyan-700 rounded text-xs font-medium">
                                                {voucher.categoryLabel}
                                            </span>
                                            {voucher.isPhysical && (
                                                <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs font-medium">
                                                    <i className="fas fa-box mr-1"></i>Physical
                                                </span>
                                            )}
                                        </div>

                                        <h3 className="font-bold text-gray-900 mb-1">{voucher.titleTh}</h3>
                                        <p className="text-xs text-gray-500 mb-2">{voucher.title}</p>

                                        <p className="text-sm text-gray-700 mb-3 line-clamp-2">
                                            {voucher.descriptionTh}
                                        </p>

                                        {/* Price & Rating */}
                                        <div className="flex items-center justify-between mb-3 pt-3 border-t border-gray-100">
                                            <div>
                                                <p className="text-xs text-gray-500">Price</p>
                                                <p className="font-bold text-cyan-600">
                                                    {voucher.price} {voucher.currency}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <div className="flex items-center gap-1">
                                                    <i className="fas fa-star text-yellow-500 text-xs"></i>
                                                    <span className="text-sm font-medium">{voucher.rating}</span>
                                                </div>
                                                <p className="text-xs text-gray-500">{voucher.reviews} reviews</p>
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex gap-2">
                                            <button className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                                                Edit
                                            </button>
                                            <button className="flex-1 px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium">
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        /* No Vouchers Warning */
                        <Card className="text-center py-12 border-2 border-dashed border-orange-200 bg-orange-50">
                            <div className="animate-bounce mb-4">
                                <i className="fas fa-exclamation-triangle text-orange-500 text-5xl"></i>
                            </div>
                            <h3 className="text-xl font-bold text-orange-900 mb-2">No vouchers for this movie yet</h3>
                            <p className="text-orange-700 mb-4">Please add vouchers so users can redeem rewards</p>
                            <button
                                onClick={() => setShowAddModal(true)}
                                className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium"
                            >
                                <i className="fas fa-plus mr-2"></i>
                                Add First Voucher
                            </button>
                        </Card>
                    )}
                </div>
            )}

            {/* Add Voucher Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            {/* Modal Header */}
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-2xl font-bold text-gray-900">Add New Voucher</h3>
                                <button
                                    onClick={() => setShowAddModal(false)}
                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    <i className="fas fa-times text-gray-500"></i>
                                </button>
                            </div>

                            {selectedMovie && (
                                <div className="mb-6 p-4 bg-cyan-50 rounded-lg">
                                    <p className="text-sm text-gray-600">Add for movie:</p>
                                    <p className="font-bold text-gray-900">{selectedMovie.movieNameTh}</p>
                                    <p className="text-sm text-gray-600">{selectedMovie.movieName}</p>
                                </div>
                            )}

                            {/* Form Fields Placeholder */}
                            <div className="space-y-4 mb-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Voucher Type</label>
                                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                                        <option>Movie Tickets</option>
                                        <option>Meet & Greet</option>
                                        <option>Merchandise</option>
                                        <option>Movie Credits</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Name (Thai)</label>
                                    <input
                                        type="text"
                                        placeholder="Enter voucher name in Thai"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">ชื่อ (English)</label>
                                    <input
                                        type="text"
                                        placeholder="Enter voucher name in English"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                    <textarea
                                        rows={3}
                                        placeholder="Describe voucher details"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                                        <input
                                            type="number"
                                            placeholder="0"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Tier</label>
                                        <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                                            <option>Gold</option>
                                            <option>Silver</option>
                                            <option>Platinum</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-4">
                                <button
                                    onClick={() => {
                                        // Handle save
                                        alert('Save system is not yet available');
                                        setShowAddModal(false);
                                    }}
                                    className="flex-1 px-6 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors font-medium"
                                >
                                    <i className="fas fa-save mr-2"></i>
                                    Save
                                </button>
                                <button
                                    onClick={() => setShowAddModal(false)}
                                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminColestiaVouchers;
