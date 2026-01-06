import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

const AdminWalletMonitoring = ({ wallets }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedTokenFilter, setSelectedTokenFilter] = useState('all');
    const itemsPerPage = 10;

    // Calculate top holders based on total tokens
    const topHolders = [...wallets]
        .sort((a, b) => b.totalTokens - a.totalTokens)
        .slice(0, 10);

    const totalTokensInCirculation = wallets.reduce((sum, w) => sum + w.totalTokens, 0);

    // Calculate token distribution by type
    const tokenDistribution = wallets.reduce((acc, wallet) => {
        Object.entries(wallet.filmTokens).forEach(([symbol, amount]) => {
            if (!acc[symbol]) {
                acc[symbol] = {
                    symbol,
                    totalAmount: 0,
                    holderCount: 0,
                    holders: []
                };
            }
            acc[symbol].totalAmount += amount;
            acc[symbol].holderCount += 1;
            acc[symbol].holders.push({
                userId: wallet.userId,
                walletAddress: wallet.walletAddress,
                amount: amount
            });
        });
        return acc;
    }, {});

    // Sort holders by amount for each token
    Object.values(tokenDistribution).forEach(token => {
        token.holders.sort((a, b) => b.amount - a.amount);
    });

    const sortedTokens = Object.keys(tokenDistribution).sort();

    // Token colors mapping
    const tokenColors = {
        SLR: { bg: 'bg-blue-500', light: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-500' },
        LPJ: { bg: 'bg-purple-500', light: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-500' },
        OBR: { bg: 'bg-green-500', light: 'bg-green-100', text: 'text-green-700', border: 'border-green-500' },
        PM2: { bg: 'bg-orange-500', light: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-500' },
        BKM: { bg: 'bg-cyan-500', light: 'bg-cyan-100', text: 'text-cyan-700', border: 'border-cyan-500' }
    };

    // Filter wallets based on search and token type
    const filteredWallets = wallets.filter(wallet => {
        const searchMatch = wallet.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
            wallet.walletAddress.toLowerCase().includes(searchTerm.toLowerCase());

        const tokenMatch = selectedTokenFilter === 'all' ||
            (wallet.filmTokens[selectedTokenFilter] && wallet.filmTokens[selectedTokenFilter] > 0);

        return searchMatch && tokenMatch;
    });

    // Pagination
    const totalPages = Math.ceil(filteredWallets.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedWallets = filteredWallets.slice(startIndex, startIndex + itemsPerPage);

    const formatAddress = (address) => {
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    };

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        const now = new Date();
        const diffHours = Math.floor((now - date) / (1000 * 60 * 60));

        if (diffHours < 1) return 'Just now';
        if (diffHours < 24) return `${diffHours}h ago`;
        const diffDays = Math.floor(diffHours / 24);
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays}d ago`;
        return date.toLocaleDateString();
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">Wallet & Holder Monitoring</h2>
                <Badge variant="info">
                    <i className="fas fa-users mr-2"></i>
                    {wallets.length} Total Wallets
                </Badge>
            </div>

            {/* Token Holdings Analysis */}
            <div className="grid md:grid-cols-4 gap-6">
                {/* Token Filter Buttons */}
                <Card>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <i className="fas fa-filter text-primary"></i>
                        Filter by Token
                    </h3>

                    <div className="space-y-2">
                        <button
                            onClick={() => {
                                setSelectedTokenFilter('all');
                                setCurrentPage(1);
                            }}
                            className={`w-full p-3 rounded-lg text-left font-medium transition-all ${selectedTokenFilter === 'all'
                                ? 'bg-primary text-white shadow-md'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            <div className="flex items-center justify-between">
                                <span>All Tokens</span>
                                <span className="text-sm">{wallets.length}</span>
                            </div>
                        </button>

                        {sortedTokens.map((tokenSymbol) => {
                            const token = tokenDistribution[tokenSymbol];
                            return (
                                <button
                                    key={tokenSymbol}
                                    onClick={() => {
                                        setSelectedTokenFilter(tokenSymbol);
                                        setCurrentPage(1);
                                    }}
                                    className={`w-full p-3 rounded-lg text-left font-medium transition-all ${selectedTokenFilter === tokenSymbol
                                        ? `${tokenColors[tokenSymbol]?.bg || 'bg-gray-500'} text-white shadow-md`
                                        : `${tokenColors[tokenSymbol]?.light || 'bg-gray-100'} ${tokenColors[tokenSymbol]?.text || 'text-gray-700'} hover:shadow-sm`
                                        }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <span>{tokenSymbol}</span>
                                        <span className="text-sm">{token.holderCount}</span>
                                    </div>
                                    <div className="text-xs opacity-90 mt-1">
                                        {token.totalAmount.toLocaleString()} tokens
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {selectedTokenFilter !== 'all' && (
                        <div className={`mt-4 p-3 rounded-lg ${tokenColors[selectedTokenFilter]?.light || 'bg-gray-100'}`}>
                            <p className="text-xs text-gray-600 mb-1">Showing wallets with</p>
                            <p className={`font-semibold ${tokenColors[selectedTokenFilter]?.text || 'text-gray-900'}`}>
                                {selectedTokenFilter} tokens only
                            </p>
                        </div>
                    )}
                </Card>

                {/* Token Holdings Breakdown */}
                <Card className="md:col-span-3">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <i className="fas fa-users text-primary"></i>
                        Token Holdings Breakdown
                    </h3>

                    <div className="space-y-4">
                        {sortedTokens.map((tokenSymbol) => {
                            const token = tokenDistribution[tokenSymbol];
                            const topTokenHolders = token.holders.slice(0, 5);

                            return (
                                <div key={tokenSymbol} className={`border-2 ${tokenColors[tokenSymbol]?.border || 'border-gray-300'} rounded-lg p-4`}>
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-3 h-3 ${tokenColors[tokenSymbol]?.bg || 'bg-gray-500'} rounded`}></div>
                                            <div>
                                                <h4 className="font-semibold text-gray-900">{tokenSymbol}</h4>
                                                <p className="text-xs text-gray-600">
                                                    {token.holderCount} holders • {token.totalAmount.toLocaleString()} total tokens
                                                </p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => {
                                                setSelectedTokenFilter(tokenSymbol);
                                                setCurrentPage(1);
                                            }}
                                            className={`px-3 py-1 ${tokenColors[tokenSymbol]?.light || 'bg-gray-100'} ${tokenColors[tokenSymbol]?.text || 'text-gray-700'} rounded-lg text-sm font-medium hover:shadow-sm transition-shadow`}
                                        >
                                            View All
                                        </button>
                                    </div>

                                    <div className="space-y-2">
                                        <p className="text-xs font-semibold text-gray-500 mb-2">Top 5 Holders:</p>
                                        {topTokenHolders.map((holder, idx) => (
                                            <div key={idx} className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded">
                                                <div className="flex items-center gap-2">
                                                    {idx < 3 && (
                                                        <i className={`fas fa-medal text-sm ${idx === 0 ? 'text-yellow-500' :
                                                            idx === 1 ? 'text-gray-400' :
                                                                'text-orange-600'
                                                            }`}></i>
                                                    )}
                                                    <span className="text-sm font-medium text-gray-900">{holder.userId}</span>
                                                    <span className="text-xs text-gray-500 font-mono">
                                                        ({holder.walletAddress.slice(0, 6)}...{holder.walletAddress.slice(-4)})
                                                    </span>
                                                </div>
                                                <div className="text-right">
                                                    <span className="text-sm font-semibold text-gray-900">
                                                        {holder.amount.toLocaleString()}
                                                    </span>
                                                    <span className="text-xs text-gray-500 ml-2">
                                                        ({((holder.amount / token.totalAmount) * 100).toFixed(2)}%)
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </Card>
            </div>

            {/* Top Holders Section */}
            <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <i className="fas fa-trophy text-yellow-500"></i>
                    Top 10 Holders
                </h3>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Rank</th>
                                <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Wallet Address</th>
                                <th className="text-right py-3 px-4 font-semibold text-sm text-gray-700">Token Amount</th>
                                <th className="text-right py-3 px-4 font-semibold text-sm text-gray-700">% of Supply</th>
                            </tr>
                        </thead>
                        <tbody>
                            {topHolders.map((holder, index) => (
                                <tr key={holder.id} className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="py-3 px-4">
                                        <div className="flex items-center gap-2">
                                            {index < 3 ? (
                                                <i className={`fas fa-medal ${index === 0 ? 'text-yellow-500' :
                                                    index === 1 ? 'text-gray-400' :
                                                        'text-orange-600'
                                                    }`}></i>
                                            ) : null}
                                            <span className="font-medium text-gray-900">#{index + 1}</span>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4">
                                        <div>
                                            <p className="font-mono text-sm text-gray-900">{formatAddress(holder.walletAddress)}</p>
                                            <p className="text-xs text-gray-500">{holder.userId}</p>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4 text-right">
                                        <span className="font-semibold text-gray-900">
                                            {holder.totalTokens.toLocaleString()}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 text-right">
                                        <Badge variant="info">
                                            {((holder.totalTokens / totalTokensInCirculation) * 100).toFixed(2)}%
                                        </Badge>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* All Wallets Section */}
            <Card>
                <div className="mb-4 flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-900">All Wallets</h3>
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search by User ID or Address..."
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setCurrentPage(1);
                                }}
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary w-80"
                            />
                            <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">User ID</th>
                                <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Wallet Address</th>
                                <th className="text-right py-3 px-4 font-semibold text-sm text-gray-700">Total Tokens</th>
                                <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Token Holdings</th>
                                <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Last Activity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedWallets.length > 0 ? (
                                paginatedWallets.map((wallet) => (
                                    <tr key={wallet.id} className="border-b border-gray-100 hover:bg-gray-50">
                                        <td className="py-4 px-4">
                                            <span className="font-medium text-gray-900">{wallet.userId}</span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="flex items-center gap-2">
                                                <span className="font-mono text-sm text-gray-700">
                                                    {formatAddress(wallet.walletAddress)}
                                                </span>
                                                <button
                                                    onClick={() => navigator.clipboard.writeText(wallet.walletAddress)}
                                                    className="text-gray-400 hover:text-gray-600"
                                                    title="Copy full address"
                                                >
                                                    <i className="fas fa-copy text-xs"></i>
                                                </button>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 text-right">
                                            <span className="font-semibold text-gray-900">
                                                {wallet.totalTokens.toLocaleString()}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="flex flex-wrap gap-1">
                                                {Object.entries(wallet.filmTokens).map(([symbol, amount]) => (
                                                    <span
                                                        key={symbol}
                                                        className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${tokenColors[symbol]?.light || 'bg-gray-100'} ${tokenColors[symbol]?.text || 'text-gray-800'}`}
                                                    >
                                                        {symbol}: {amount.toLocaleString()}
                                                    </span>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className="text-sm text-gray-600">
                                                {formatDate(wallet.lastActivity)}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="py-8 text-center text-gray-500">
                                        <i className="fas fa-search text-3xl mb-2"></i>
                                        <p>No wallets found matching your search.</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-4">
                        <p className="text-sm text-gray-600">
                            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredWallets.length)} of {filteredWallets.length} wallets
                        </p>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                disabled={currentPage === 1}
                                className="px-3 py-1 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <i className="fas fa-chevron-left"></i>
                            </button>
                            <span className="px-3 py-1 text-sm font-medium text-gray-700">
                                Page {currentPage} of {totalPages}
                            </span>
                            <button
                                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                disabled={currentPage === totalPages}
                                className="px-3 py-1 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <i className="fas fa-chevron-right"></i>
                            </button>
                        </div>
                    </div>
                )}
            </Card>
        </div>
    );
};

export default AdminWalletMonitoring;
