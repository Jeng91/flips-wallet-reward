import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';

const AdminTokenManagement = ({ tokens }) => {
    const [selectedToken, setSelectedToken] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [showBurnModal, setShowBurnModal] = useState(false);
    const [tokenToBurn, setTokenToBurn] = useState(null);
    const [selectedTokenFilter, setSelectedTokenFilter] = useState('all');

    // Calculate total tokens sold across all tokens
    const totalTokensSold = tokens.reduce((sum, token) => sum + token.sold, 0);

    // Calculate token distribution by symbol
    const tokenDistribution = tokens.map(token => ({
        symbol: token.tokenSymbol,
        filmName: token.filmName,
        totalAmount: token.sold,
        holderCount: token.holderCount,
        percentage: (token.sold / totalTokensSold) * 100,
        status: token.status
    })).sort((a, b) => b.totalAmount - a.totalAmount);

    // Token colors mapping
    const tokenColors = {
        SLR: { bg: 'bg-blue-500', light: 'bg-blue-100', text: 'text-blue-700' },
        LPJ: { bg: 'bg-purple-500', light: 'bg-purple-100', text: 'text-purple-700' },
        OBR: { bg: 'bg-green-500', light: 'bg-green-100', text: 'text-green-700' },
        PM2: { bg: 'bg-orange-500', light: 'bg-orange-100', text: 'text-orange-700' },
        BKM: { bg: 'bg-cyan-500', light: 'bg-cyan-100', text: 'text-cyan-700' }
    };

    // Filter tokens based on selected filter
    const filteredTokens = selectedTokenFilter === 'all'
        ? tokens
        : tokens.filter(token => token.tokenSymbol === selectedTokenFilter);

    const handlePauseResume = (token) => {
        console.log(`${token.status === 'active' ? 'Pausing' : 'Resuming'} token:`, token.tokenName);
        // In real implementation, this would call an API
        alert(`Token ${token.tokenName} ${token.status === 'active' ? 'paused' : 'resumed'} successfully!`);
    };

    const handleBurnToken = (token) => {
        setTokenToBurn(token);
        setShowBurnModal(true);
    };

    const confirmBurn = () => {
        console.log('Burning tokens:', tokenToBurn);
        alert(`Burn action initiated for ${tokenToBurn.tokenName}`);
        setShowBurnModal(false);
        setTokenToBurn(null);
    };

    const handleViewDetails = (token) => {
        setSelectedToken(token);
        setShowDetailsModal(true);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">Token List Management</h2>
                <Badge variant="info">
                    <i className="fas fa-coins mr-2"></i>
                    {tokens.length} Total Tokens
                </Badge>
            </div>

            {/* Token Distribution Section */}
            <div className="grid md:grid-cols-3 gap-6">
                {/* Token Distribution Chart */}
                <Card className="md:col-span-2">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <i className="fas fa-chart-pie text-primary"></i>
                        Token Distribution Overview
                    </h3>

                    <div className="mb-6">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-gray-700">Total Tokens in Circulation</span>
                            <span className="text-2xl font-bold text-gray-900">
                                {totalTokensSold.toLocaleString()}
                            </span>
                        </div>

                        {/* Stacked Bar Chart */}
                        <div className="w-full h-12 bg-gray-200 rounded-lg overflow-hidden flex">
                            {tokenDistribution.map((token) => (
                                <div
                                    key={token.symbol}
                                    className={`${tokenColors[token.symbol]?.bg || 'bg-gray-500'} flex items-center justify-center text-white text-xs font-medium relative group cursor-pointer`}
                                    style={{ width: `${token.percentage}%` }}
                                    title={`${token.symbol}: ${token.totalAmount.toLocaleString()} (${token.percentage.toFixed(2)}%)`}
                                >
                                    {token.percentage > 5 && <span>{token.percentage.toFixed(1)}%</span>}

                                    {/* Tooltip */}
                                    <div className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-900 text-white text-xs rounded py-1 px-2 whitespace-nowrap z-10">
                                        {token.symbol}: {token.totalAmount.toLocaleString()}
                                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Token Details List */}
                    <div className="space-y-3">
                        {tokenDistribution.map((token) => (
                            <div key={token.symbol} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                <div className="flex items-center gap-3 flex-1">
                                    <div className={`w-4 h-4 ${tokenColors[token.symbol]?.bg || 'bg-gray-500'} rounded`}></div>
                                    <div>
                                        <p className="font-semibold text-gray-900">{token.symbol}</p>
                                        <p className="text-xs text-gray-500">{token.filmName}</p>
                                    </div>
                                </div>
                                <div className="text-right mr-4">
                                    <p className="font-semibold text-gray-900">
                                        {token.totalAmount.toLocaleString()}
                                    </p>
                                    <p className="text-xs text-gray-600">
                                        {token.percentage.toFixed(2)}% of total
                                    </p>
                                </div>
                                <div>
                                    <span className={`px-2 py-1 rounded text-xs font-medium ${token.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                                        }`}>
                                        {token.status === 'active' ? 'Active' : 'Paused'}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Token Filter */}
                <Card>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <i className="fas fa-filter text-primary"></i>
                        Filter by Token
                    </h3>

                    <div className="space-y-2">
                        <button
                            onClick={() => setSelectedTokenFilter('all')}
                            className={`w-full p-3 rounded-lg text-left font-medium transition-all ${selectedTokenFilter === 'all'
                                ? 'bg-primary text-white shadow-md'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            <div className="flex items-center justify-between">
                                <span>All Tokens</span>
                                <span className="text-sm">{tokens.length}</span>
                            </div>
                        </button>

                        {tokenDistribution.map((token) => (
                            <button
                                key={token.symbol}
                                onClick={() => setSelectedTokenFilter(token.symbol)}
                                className={`w-full p-3 rounded-lg text-left font-medium transition-all ${selectedTokenFilter === token.symbol
                                    ? `${tokenColors[token.symbol]?.bg || 'bg-gray-500'} text-white shadow-md`
                                    : `${tokenColors[token.symbol]?.light || 'bg-gray-100'} ${tokenColors[token.symbol]?.text || 'text-gray-700'} hover:shadow-sm`
                                    }`}
                            >
                                <div className="flex items-center justify-between">
                                    <span>{token.symbol}</span>
                                    <span className="text-sm">{token.holderCount}</span>
                                </div>
                                <div className="text-xs opacity-90 mt-1">
                                    {token.totalAmount.toLocaleString()} tokens sold
                                </div>
                            </button>
                        ))}
                    </div>

                    {selectedTokenFilter !== 'all' && (
                        <div className={`mt-4 p-3 rounded-lg ${tokenColors[selectedTokenFilter]?.light || 'bg-gray-100'}`}>
                            <p className="text-xs text-gray-600 mb-1">Showing</p>
                            <p className={`font-semibold ${tokenColors[selectedTokenFilter]?.text || 'text-gray-900'}`}>
                                {selectedTokenFilter} token only
                            </p>
                        </div>
                    )}
                </Card>
            </div>

            {/* Token List Table */}
            <Card>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Token Name</th>
                                <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Price</th>
                                <th className="text-right py-3 px-4 font-semibold text-sm text-gray-700">Total Supply</th>
                                <th className="text-right py-3 px-4 font-semibold text-sm text-gray-700">Sold</th>
                                <th className="text-right py-3 px-4 font-semibold text-sm text-gray-700">Remaining</th>
                                <th className="text-right py-3 px-4 font-semibold text-sm text-gray-700">Burned</th>
                                <th className="text-center py-3 px-4 font-semibold text-sm text-gray-700">Status</th>
                                <th className="text-right py-3 px-4 font-semibold text-sm text-gray-700">Holders</th>
                                <th className="text-right py-3 px-4 font-semibold text-sm text-gray-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTokens.map((token) => (
                                <tr key={token.id} className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="py-4 px-4">
                                        <div>
                                            <p className="font-medium text-gray-900">{token.tokenName}</p>
                                            <p className="text-sm text-gray-500">{token.tokenSymbol}</p>
                                        </div>
                                    </td>
                                    <td className="py-4 px-4 text-gray-900 font-medium">
                                        ${token.price.toFixed(2)}
                                    </td>
                                    <td className="py-4 px-4 text-right text-gray-700">
                                        {token.totalSupply.toLocaleString()}
                                    </td>
                                    <td className="py-4 px-4 text-right">
                                        <span className="text-green-600 font-medium">
                                            {token.sold.toLocaleString()}
                                        </span>
                                    </td>
                                    <td className="py-4 px-4 text-right">
                                        <span className={token.remaining === 0 ? 'text-red-600 font-medium' : 'text-gray-700'}>
                                            {token.remaining.toLocaleString()}
                                        </span>
                                    </td>
                                    <td className="py-4 px-4 text-right text-orange-600">
                                        {token.burned.toLocaleString()}
                                    </td>
                                    <td className="py-4 px-4 text-center">
                                        <Badge variant={token.status === 'active' ? 'success' : 'warning'}>
                                            {token.status === 'active' ? 'Active' : 'Paused'}
                                        </Badge>
                                    </td>
                                    <td className="py-4 px-4 text-right text-gray-700">
                                        {token.holderCount.toLocaleString()}
                                    </td>
                                    <td className="py-4 px-4">
                                        <div className="flex gap-2 justify-end">
                                            <button
                                                onClick={() => handleViewDetails(token)}
                                                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                                                title="View Details"
                                            >
                                                <i className="fas fa-eye"></i>
                                            </button>
                                            <button
                                                onClick={() => handlePauseResume(token)}
                                                className={`${token.status === 'active' ? 'text-orange-600 hover:text-orange-700' : 'text-green-600 hover:text-green-700'
                                                    } text-sm font-medium`}
                                                title={token.status === 'active' ? 'Pause' : 'Resume'}
                                            >
                                                <i className={`fas fa-${token.status === 'active' ? 'pause' : 'play'}`}></i>
                                            </button>
                                            <button
                                                onClick={() => handleBurnToken(token)}
                                                className="text-red-600 hover:text-red-700 text-sm font-medium"
                                                title="Burn Tokens"
                                            >
                                                <i className="fas fa-fire"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* Token Details Modal */}
            {showDetailsModal && selectedToken && (
                <Modal
                    isOpen={showDetailsModal}
                    onClose={() => setShowDetailsModal(false)}
                    title={`${selectedToken.tokenName} Details`}
                >
                    <div className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-500">Film Name</p>
                                <p className="font-medium text-gray-900">{selectedToken.filmName}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Token Symbol</p>
                                <p className="font-medium text-gray-900">{selectedToken.tokenSymbol}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Sale Start Date</p>
                                <p className="font-medium text-gray-900">{selectedToken.saleStartDate}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Sale End Date</p>
                                <p className="font-medium text-gray-900">{selectedToken.saleEndDate}</p>
                            </div>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500 mb-2">Contract Address</p>
                            <p className="font-mono text-xs bg-gray-100 p-2 rounded text-gray-800 break-all">
                                {selectedToken.contractAddress}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500 mb-2">Token Rules</p>
                            <ul className="space-y-1">
                                {selectedToken.tokenRules.map((rule, idx) => (
                                    <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                                        <i className="fas fa-check-circle text-green-600 mt-0.5"></i>
                                        <span>{rule}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                            <div className="text-center">
                                <p className="text-2xl font-bold text-gray-900">
                                    {((selectedToken.sold / selectedToken.totalSupply) * 100).toFixed(1)}%
                                </p>
                                <p className="text-xs text-gray-500">Sold Rate</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold text-gray-900">
                                    {selectedToken.holderCount}
                                </p>
                                <p className="text-xs text-gray-500">Total Holders</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold text-orange-600">
                                    {selectedToken.burned}
                                </p>
                                <p className="text-xs text-gray-500">Burned</p>
                            </div>
                        </div>
                    </div>
                </Modal>
            )}

            {/* Burn Confirmation Modal */}
            {showBurnModal && tokenToBurn && (
                <Modal
                    isOpen={showBurnModal}
                    onClose={() => setShowBurnModal(false)}
                    title="Burn Tokens"
                >
                    <div className="space-y-4">
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                            <div className="flex gap-3">
                                <i className="fas fa-exclamation-triangle text-red-600 text-xl"></i>
                                <div>
                                    <h4 className="font-semibold text-red-900 mb-1">Warning: This action is irreversible!</h4>
                                    <p className="text-sm text-red-700">
                                        You are about to burn tokens for <strong>{tokenToBurn.tokenName}</strong>.
                                        This will permanently remove tokens from circulation.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Amount to Burn
                            </label>
                            <input
                                type="number"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                placeholder="Enter amount"
                                min="1"
                                max={tokenToBurn.remaining}
                            />
                            <p className="text-xs text-gray-500">
                                Maximum: {tokenToBurn.remaining.toLocaleString()} tokens available
                            </p>
                        </div>

                        <div className="flex gap-3 pt-4">
                            <Button
                                onClick={() => setShowBurnModal(false)}
                                className="flex-1 bg-gray-200 text-gray-800 hover:bg-gray-300"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={confirmBurn}
                                className="flex-1 bg-red-600 text-white hover:bg-red-700"
                            >
                                <i className="fas fa-fire mr-2"></i>
                                Confirm Burn
                            </Button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default AdminTokenManagement;
