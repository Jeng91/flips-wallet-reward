import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

const AdminRedemptionQueue = ({ redemptions }) => {
    const [filterFilm, setFilterFilm] = useState('all');
    const [filterRewardType, setFilterRewardType] = useState('all');

    // Get unique values for filters
    const uniqueFilms = [...new Set(redemptions.map(r => r.filmName))];
    const uniqueRewardTypes = [...new Set(redemptions.map(r => r.rewardType))];

    // Apply filters
    const filteredRedemptions = redemptions.filter(redemption => {
        const filmMatch = filterFilm === 'all' || redemption.filmName === filterFilm;
        const typeMatch = filterRewardType === 'all' || redemption.rewardType === filterRewardType;
        return filmMatch && typeMatch;
    });



    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">Redemption Management</h2>
                <Badge variant="info">
                    <i className="fas fa-list mr-2"></i>
                    {redemptions.length} Total Redemptions
                </Badge>
            </div>

            {/* Filters */}
            <Card>
                <div className="flex flex-wrap gap-4 items-center">
                    <div className="flex items-center gap-2">
                        <i className="fas fa-filter text-gray-500"></i>
                        <span className="text-sm font-medium text-gray-700">Filters:</span>
                    </div>

                    <div className="flex-1 min-w-[200px]">
                        <select
                            value={filterFilm}
                            onChange={(e) => setFilterFilm(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-sm"
                        >
                            <option value="all">All Films</option>
                            {uniqueFilms.map(film => (
                                <option key={film} value={film}>{film}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex-1 min-w-[200px]">
                        <select
                            value={filterRewardType}
                            onChange={(e) => setFilterRewardType(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-sm"
                        >
                            <option value="all">All Reward Types</option>
                            {uniqueRewardTypes.map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>

                    {(filterFilm !== 'all' || filterRewardType !== 'all') && (
                        <button
                            onClick={() => {
                                setFilterFilm('all');
                                setFilterRewardType('all');
                            }}
                            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                        >
                            Clear Filters
                        </button>
                    )}
                </div>
            </Card>

            {/* Redemption Queue Table */}
            <Card>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">ID</th>
                                <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">User</th>
                                <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Film</th>
                                <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Reward</th>
                                <th className="text-right py-3 px-4 font-semibold text-sm text-gray-700">Tokens Used</th>
                                <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Request Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredRedemptions.length > 0 ? (
                                filteredRedemptions.map((redemption) => (
                                    <tr key={redemption.id} className="border-b border-gray-100 hover:bg-gray-50">
                                        <td className="py-4 px-4">
                                            <span className="font-mono text-sm text-gray-600">#{redemption.id}</span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div>
                                                <p className="font-medium text-gray-900">{redemption.userName}</p>
                                                <p className="text-sm text-gray-500">{redemption.userId}</p>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div>
                                                <p className="font-medium text-gray-900">{redemption.filmName}</p>
                                                <p className="text-sm text-gray-500">{redemption.filmSymbol}</p>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div>
                                                <p className="font-medium text-gray-900">{redemption.rewardTitle}</p>
                                                <p className="text-sm text-gray-500">{redemption.rewardType}</p>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 text-right">
                                            <span className="font-semibold text-primary">
                                                {redemption.tokensUsed.toLocaleString()}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className="text-sm text-gray-600">{redemption.requestDate}</span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="py-8 text-center text-gray-500">
                                        <i className="fas fa-inbox text-3xl mb-2"></i>
                                        <p>No redemptions found matching your filters.</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default AdminRedemptionQueue;
