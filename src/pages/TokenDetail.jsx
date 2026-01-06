import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import {
    ArrowLeft, ArrowUpRight, ArrowDownLeft, Repeat, ShoppingCart, Building2,
    TrendingUp, TrendingDown, ExternalLink, Copy, CheckCircle
} from 'lucide-react';
import {
    defaultWalletData,
    tokenPriceHistory,
    tokenTransactionHistory,
    tokenDetails
} from '../data/mockData';
import { GAME_TEAMS } from '../config/theme';
import TransferModal from '../components/wallet/TransferModal';
import ReceiveModal from '../components/wallet/ReceiveModal';

const TokenDetail = () => {
    const { tokenId } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('holdings');
    const [timePeriod, setTimePeriod] = useState('1D');
    const [copiedHash, setCopiedHash] = useState(null);

    // Modal states
    const [showTransfer, setShowTransfer] = useState(false);
    const [showReceive, setShowReceive] = useState(false);

    // Get token data based on tokenId
    const getTokenData = () => {
        if (tokenId === 'flips') {
            return {
                id: 'flips',
                name: 'Flips Coins',
                symbol: 'FLIPS',
                balance: defaultWalletData.totalPoints,
                currentPrice: 0.15,
                change24h: 5.2,
                icon: '💎',
                color: 'bg-cyan-500'
            };
        } else if (tokenId === 'tbf') {
            return {
                id: 'tbf',
                name: 'TBF Yacht Club',
                symbol: 'TBFC',
                balance: defaultWalletData.tbfCoins,
                currentPrice: 5.50,
                change24h: 0.8,
                icon: '⚓',
                color: 'bg-blue-800'
            };
        } else {
            // Team tokens
            const team = GAME_TEAMS.find(t => t.id === tokenId);
            if (team) {
                return {
                    id: tokenId,
                    name: team.coinName,
                    symbol: tokenId.toUpperCase(),
                    balance: defaultWalletData.teamCoins[tokenId] || 0,
                    currentPrice: 0.08,
                    change24h: 3.5,
                    icon: team.icon,
                    color: team.bgColor,
                    textColor: team.textColor
                };
            }
        }
        return null;
    };

    const token = getTokenData();
    const priceHistory = tokenPriceHistory[tokenId]?.[timePeriod] || [];
    const transactions = tokenTransactionHistory[tokenId] || [];
    const about = tokenDetails[tokenId] || {};

    // Calculate price change for selected period
    const calculatePriceChange = () => {
        if (priceHistory.length < 2) return 0;
        const firstPrice = priceHistory[0].price;
        const lastPrice = priceHistory[priceHistory.length - 1].price;
        return (((lastPrice - firstPrice) / firstPrice) * 100).toFixed(2);
    };

    const priceChange = calculatePriceChange();
    const isPositive = priceChange >= 0;

    const copyToClipboard = (text, id) => {
        navigator.clipboard.writeText(text);
        setCopiedHash(id);
        setTimeout(() => setCopiedHash(null), 2000);
    };

    const timePeriods = ['1H', '1D', '1W', '1M', '1Y', 'All'];
    const tabs = [
        { id: 'holdings', label: 'Holdings' },
        { id: 'history', label: 'History' },
        { id: 'about', label: 'About' }
    ];

    if (!token) {
        return (
            <div className="max-w-6xl mx-auto px-4 py-8">
                <p className="text-gray-500">Token not found</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-4 md:py-6 pb-24">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <button
                    onClick={() => navigate('/wallet')}
                    className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 text-gray-700" />
                </button>
                <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 ${token.color} rounded-xl flex items-center justify-center text-2xl ${token.textColor || 'text-white'}`}>
                        {token.icon}
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-gray-900">{token.symbol}</h1>
                        <p className="text-sm text-gray-500">{token.name}</p>
                    </div>
                </div>
            </div>

            {/* Price Display */}
            <div className="mb-6">
                <div className="text-4xl font-bold text-gray-900 mb-2">
                    ${token.currentPrice.toFixed(4)}
                </div>
                <div className={`flex items-center gap-2 ${isPositive ? 'text-green-600' : 'text-red-500'}`}>
                    {isPositive ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                    <span className="text-lg font-semibold">
                        {isPositive ? '+' : ''}{priceChange}%
                    </span>
                    <span className="text-sm text-gray-500">({timePeriod})</span>
                </div>
            </div>

            {/* Price Chart */}
            <div className="bg-white rounded-2xl p-4 mb-4 border border-gray-100 shadow-sm">
                <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={priceHistory}>
                        <XAxis
                            dataKey="timestamp"
                            hide
                        />
                        <YAxis
                            domain={['auto', 'auto']}
                            hide
                        />
                        <Tooltip
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    return (
                                        <div className="bg-gray-900 text-white px-3 py-2 rounded-lg text-sm">
                                            <p className="font-bold">${payload[0].value.toFixed(4)}</p>
                                            <p className="text-xs text-gray-400">
                                                {new Date(payload[0].payload.timestamp).toLocaleString()}
                                            </p>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                        <Line
                            type="monotone"
                            dataKey="price"
                            stroke={isPositive ? '#10b981' : '#ef4444'}
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ResponsiveContainer>

                {/* Time Period Filters */}
                <div className="flex gap-2 justify-center mt-4">
                    {timePeriods.map(period => (
                        <button
                            key={period}
                            onClick={() => setTimePeriod(period)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${timePeriod === period
                                ? 'bg-gray-900 text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            {period}
                        </button>
                    ))}
                </div>
            </div>

            {/* Buy Section (Optional - commented out for now) */}
            {/* <div className="bg-white rounded-2xl p-4 mb-4 border border-gray-100">
                <p className="text-sm text-gray-500 mb-3">Buy now</p>
                <div className="flex items-center gap-3">
                    <input
                        type="number"
                        placeholder="0"
                        className="flex-1 text-2xl font-bold bg-transparent outline-none"
                    />
                    <span className="text-sm text-gray-500">THB</span>
                    <button className="px-6 py-3 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600 transition-colors">
                        Buy
                    </button>
                </div>
            </div> */}

            {/* Tab Navigation */}
            <div className="flex gap-2 mb-4 border-b border-gray-200">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex-1 px-4 py-3 text-sm font-semibold transition-colors ${activeTab === tab.id
                            ? 'text-gray-900 border-b-2 border-gray-900'
                            : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="mb-6">
                {/* Holdings Tab */}
                {activeTab === 'holdings' && (
                    <div className="space-y-4">
                        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
                            <p className="text-sm text-gray-500 mb-1">My Balance</p>
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <div className="text-3xl font-bold text-gray-900">
                                        {token.balance.toLocaleString()} <span className="text-lg text-gray-500">{token.symbol}</span>
                                    </div>
                                    <div className="text-sm text-gray-500 mt-1">
                                        ≈ ${(token.balance * token.currentPrice).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD
                                    </div>
                                </div>
                            </div>

                            {/* Earnings (Optional) */}
                            {token.id === 'flips' && (
                                <div className="pt-4 border-t border-gray-300">
                                    <p className="text-xs text-gray-500 mb-2">You could earn up to</p>
                                    <div className="flex items-center justify-between">
                                        <div className="text-2xl font-bold text-green-600">$0.03</div>
                                        <button className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-semibold hover:bg-green-600 transition-colors">
                                            Start earning
                                        </button>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">per year on your balance</p>
                                </div>
                            )}
                        </div>

                        {/* Show balances (for demo purposes) */}
                        {/* <button className="w-full text-green-600 font-semibold text-sm hover:underline">
                            Show balances ↓
                        </button> */}
                    </div>
                )}

                {/* History Tab */}
                {activeTab === 'history' && (
                    <div className="space-y-3">
                        {transactions.length === 0 ? (
                            <div className="text-center py-12">
                                <p className="text-gray-400">No transactions yet</p>
                            </div>
                        ) : (
                            transactions.map(tx => (
                                <div
                                    key={tx.id}
                                    className="bg-white rounded-xl p-4 border border-gray-100 hover:shadow-md transition-shadow"
                                >
                                    <div className="flex items-start justify-between mb-2">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.type === 'receive' ? 'bg-green-100' : 'bg-red-100'
                                                }`}>
                                                {tx.type === 'receive' ? (
                                                    <ArrowDownLeft className="w-5 h-5 text-green-600" />
                                                ) : (
                                                    <ArrowUpRight className="w-5 h-5 text-red-500" />
                                                )}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-900">
                                                    {tx.type === 'receive' ? tx.from : tx.to}
                                                </p>
                                                <p className="text-xs text-gray-400">{tx.date}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className={`font-bold ${tx.type === 'receive' ? 'text-green-600' : 'text-red-500'}`}>
                                                {tx.type === 'receive' ? '+' : ''}{tx.amount.toLocaleString()} {token.symbol}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                ${Math.abs(tx.amount * token.currentPrice).toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                                        <div className="flex items-center gap-2 text-xs text-gray-500">
                                            <code className="bg-gray-100 px-2 py-1 rounded">{tx.txHash}</code>
                                            <button
                                                onClick={() => copyToClipboard(tx.txHash, tx.id)}
                                                className="p-1 hover:bg-gray-100 rounded transition-colors"
                                            >
                                                {copiedHash === tx.id ? (
                                                    <CheckCircle className="w-3 h-3 text-green-600" />
                                                ) : (
                                                    <Copy className="w-3 h-3" />
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}

                {/* About Tab */}
                {activeTab === 'about' && (
                    <div className="space-y-4">
                        {about.description && (
                            <div className="bg-white rounded-xl p-5 border border-gray-100">
                                <h3 className="font-bold text-gray-900 mb-2">About {token.name}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">{about.description}</p>
                            </div>
                        )}

                        {about.features && about.features.length > 0 && (
                            <div className="bg-white rounded-xl p-5 border border-gray-100">
                                <h3 className="font-bold text-gray-900 mb-3">Features</h3>
                                <ul className="space-y-2">
                                    {about.features.map((feature, index) => (
                                        <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Token Stats */}
                        {about.totalSupply && (
                            <div className="bg-white rounded-xl p-5 border border-gray-100">
                                <h3 className="font-bold text-gray-900 mb-3">Token Information</h3>
                                <div className="space-y-3">
                                    {about.totalSupply && (
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-500">Total Supply</span>
                                            <span className="text-sm font-semibold text-gray-900">{about.totalSupply}</span>
                                        </div>
                                    )}
                                    {about.circulatingSupply && (
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-500">Circulating Supply</span>
                                            <span className="text-sm font-semibold text-gray-900">{about.circulatingSupply}</span>
                                        </div>
                                    )}
                                    {about.marketCap && (
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-500">Market Cap</span>
                                            <span className="text-sm font-semibold text-gray-900">{about.marketCap}</span>
                                        </div>
                                    )}
                                    {about.contract && (
                                        <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                                            <span className="text-sm text-gray-500">Contract</span>
                                            <div className="flex items-center gap-2">
                                                <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                                                    {about.contract.substring(0, 10)}...
                                                </code>
                                                <button
                                                    onClick={() => copyToClipboard(about.contract, 'contract')}
                                                    className="p-1 hover:bg-gray-100 rounded transition-colors"
                                                >
                                                    {copiedHash === 'contract' ? (
                                                        <CheckCircle className="w-4 h-4 text-green-600" />
                                                    ) : (
                                                        <Copy className="w-4 h-4 text-gray-500" />
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* External Links */}
                        {(about.website || about.whitepaper) && (
                            <div className="bg-white rounded-xl p-5 border border-gray-100">
                                <h3 className="font-bold text-gray-900 mb-3">Links</h3>
                                <div className="space-y-2">
                                    {about.website && (
                                        <a
                                            href={about.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                        >
                                            <span className="text-sm font-medium text-gray-700">Official Website</span>
                                            <ExternalLink className="w-4 h-4 text-gray-400" />
                                        </a>
                                    )}
                                    {about.whitepaper && (
                                        <a
                                            href={about.whitepaper}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                        >
                                            <span className="text-sm font-medium text-gray-700">Whitepaper</span>
                                            <ExternalLink className="w-4 h-4 text-gray-400" />
                                        </a>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Action Buttons - Fixed at bottom */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
                <div className="max-w-4xl mx-auto grid grid-cols-5 gap-2">
                    <button
                        onClick={() => setShowTransfer(true)}
                        className="flex flex-col items-center gap-1 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                        <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center">
                            <ArrowUpRight className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xs font-medium text-gray-700">Send</span>
                    </button>
                    <button
                        onClick={() => setShowReceive(true)}
                        className="flex flex-col items-center gap-1 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                        <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center">
                            <ArrowDownLeft className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xs font-medium text-gray-700">Receive</span>
                    </button>
                    <button
                        onClick={() => alert('Swap functionality coming soon!')}
                        className="flex flex-col items-center gap-1 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                        <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center">
                            <Repeat className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xs font-medium text-gray-700">Swap</span>
                    </button>
                    <button
                        onClick={() => alert('Buy functionality coming soon!')}
                        className="flex flex-col items-center gap-1 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                        <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                            <ShoppingCart className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xs font-medium text-gray-700">Buy</span>
                    </button>
                    <button
                        onClick={() => alert('Sell functionality coming soon!')}
                        className="flex flex-col items-center gap-1 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                        <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center">
                            <Building2 className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xs font-medium text-gray-700">Sell</span>
                    </button>
                </div>
            </div>

            {/* Modals */}
            <TransferModal
                isOpen={showTransfer}
                onClose={() => setShowTransfer(false)}
                initialToken={{
                    id: token.id,
                    name: token.name,
                    symbol: token.symbol
                }}
            />
            <ReceiveModal
                isOpen={showReceive}
                onClose={() => setShowReceive(false)}
            />
        </div>
    );
};

export default TokenDetail;
