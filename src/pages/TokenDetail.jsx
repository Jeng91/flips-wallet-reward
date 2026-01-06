import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import {
    ArrowLeft, ArrowUpRight, ArrowDownLeft, Repeat, ShoppingCart, Building2,
    TrendingUp, TrendingDown, ExternalLink, Copy, CheckCircle, BarChart3, TrendingUpIcon
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

// Custom Candlestick Renderer - TradingView Style
const CandlestickBar = (props) => {
    const { fill, x, y, width, height, payload } = props;

    if (!payload || width <= 0) return null;

    const { open, high, low, close } = payload;
    const isUp = close >= open;

    // TradingView colors
    const upColor = '#26a69a';
    const downColor = '#ef5350';
    const color = isUp ? upColor : downColor;

    // Calculate positions
    const centerX = x + width / 2;
    const bodyWidth = Math.max(width * 0.7, 2);
    const bodyX = x + (width - bodyWidth) / 2;

    // Using height and y from Recharts
    // Recharts provides y and height based on the data value
    // For candles, we need to calculate based on OHLC

    // We'll render relative to the bar's position
    const maxPrice = Math.max(open, close);
    const minPrice = Math.min(open, close);

    // Since Recharts uses the 'high' value for positioning,
    // we calculate relative positions
    const range = high - low;
    if (range === 0) return null;

    // Normalize positions (0-1) within the bar's allocated space
    const highPos = 0;
    const lowPos = height;
    const openPos = height * (high - open) / range;
    const closePos = height * (high - close) / range;

    const candleTop = Math.min(openPos, closePos);
    const candleHeight = Math.abs(openPos - closePos) || 1;

    return (
        <g>
            {/* Upper Wick */}
            <line
                x1={centerX}
                y1={y + highPos}
                x2={centerX}
                y2={y + candleTop}
                stroke={color}
                strokeWidth={1.5}
            />
            {/* Candle Body */}
            <rect
                x={bodyX}
                y={y + candleTop}
                width={bodyWidth}
                height={candleHeight}
                fill={color}
                stroke="none"
            />
            {/* Lower Wick */}
            <line
                x1={centerX}
                y1={y + candleTop + candleHeight}
                x2={centerX}
                y2={y + lowPos}
                stroke={color}
                strokeWidth={1.5}
            />
        </g>
    );
};

const TokenDetail = () => {
    const { tokenId } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('holdings');
    const [timePeriod, setTimePeriod] = useState('1D');
    const [copiedHash, setCopiedHash] = useState(null);
    const [chartType, setChartType] = useState('line');

    const [showTransfer, setShowTransfer] = useState(false);
    const [showReceive, setShowReceive] = useState(false);

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

    // Generate candle data
    const candleData = priceHistory.map((point, idx) => {
        const basePrice = point.price;
        const variation = basePrice * 0.015;
        const open = idx > 0 ? priceHistory[idx - 1].price : basePrice * (1 - 0.005);
        const close = basePrice;
        const high = Math.max(open, close) * (1 + Math.random() * 0.01);
        const low = Math.min(open, close) * (1 - Math.random() * 0.01);

        return {
            timestamp: point.timestamp,
            open: parseFloat(open.toFixed(6)),
            high: parseFloat(high.toFixed(6)),
            low: parseFloat(low.toFixed(6)),
            close: parseFloat(close.toFixed(6)),
            volume: point.volume
        };
    });

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
                {/* Chart Type Toggle */}
                <div className="flex justify-end mb-3">
                    <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
                        <button
                            onClick={() => setChartType('line')}
                            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors flex items-center gap-1.5 ${chartType === 'line'
                                ? 'bg-white text-gray-900 shadow-sm'
                                : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            <TrendingUpIcon className="w-4 h-4" />
                            <span>Line</span>
                        </button>
                        <button
                            onClick={() => setChartType('candle')}
                            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors flex items-center gap-1.5 ${chartType === 'candle'
                                ? 'bg-white text-gray-900 shadow-sm'
                                : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            <BarChart3 className="w-4 h-4" />
                            <span>Candle</span>
                        </button>
                    </div>
                </div>

                <ResponsiveContainer width="100%" height={250}>
                    {chartType === 'line' ? (
                        <LineChart data={priceHistory}>
                            <XAxis dataKey="timestamp" hide />
                            <YAxis domain={['dataMin - 0.02', 'dataMax + 0.02']} hide />
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
                    ) : (
                        <BarChart data={candleData} barGap={0} barCategoryGap="5%">
                            <XAxis dataKey="timestamp" hide />
                            <YAxis domain={['dataMin', 'dataMax']} hide />
                            <Tooltip
                                content={({ active, payload }) => {
                                    if (active && payload && payload.length) {
                                        const data = payload[0].payload;
                                        const { open, high, low, close } = data;
                                        const candleIsUp = close >= open;
                                        return (
                                            <div className="bg-gray-900 text-white px-3 py-2 rounded-lg text-sm">
                                                <p className="text-xs text-gray-400 mb-2">
                                                    {new Date(data.timestamp).toLocaleString()}
                                                </p>
                                                <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs">
                                                    <span className="text-gray-400">O:</span>
                                                    <span className="font-semibold">${open?.toFixed(4)}</span>
                                                    <span className="text-gray-400">H:</span>
                                                    <span className="font-semibold text-cyan-400">${high?.toFixed(4)}</span>
                                                    <span className="text-gray-400">L:</span>
                                                    <span className="font-semibold text-red-400">${low?.toFixed(4)}</span>
                                                    <span className="text-gray-400">C:</span>
                                                    <span className={`font-semibold ${candleIsUp ? 'text-green-400' : 'text-red-400'}`}>
                                                        ${close?.toFixed(4)}
                                                    </span>
                                                </div>
                                            </div>
                                        );
                                    }
                                    return null;
                                }}
                            />
                            <Bar dataKey="high" shape={<CandlestickBar />} />
                        </BarChart>
                    )}
                </ResponsiveContainer>

                {/* Time Period Filters */}
                <div className="flex gap-2 justify-center mt-4 flex-wrap">
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
                    </div>
                )}

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

            {/* Action Buttons */}
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
