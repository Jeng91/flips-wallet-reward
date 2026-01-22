import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ArrowUpRight, ArrowDownLeft, Plus, QrCode, Ticket,
    Ship, Flame, Ghost, Bolt, Zap, TrendingUp,
    LayoutDashboard, History, Gift, X, Copy, ExternalLink, Package, Truck,
    PieChart, Wallet as WalletIcon, BarChart3, ChevronLeft, ChevronRight
} from 'lucide-react';
import {
    defaultWalletData,
    tokens,
    transactions,
    myVouchers,
    investments
} from '../data/mockData';
import { GAME_TEAMS } from '../config/theme';
import { STATUS } from '../config/constants';
import { getStatusStyle, REWARD_TYPE_STYLES } from '../config/styles';
import { getCarrierTrackingUrlByName, isPhysicalReward, handleImageError } from '../utils/dataHelpers';
import TransferModal from '../components/wallet/TransferModal';
import ReceiveModal from '../components/wallet/ReceiveModal';
import DepositModal from '../components/wallet/DepositModal';
import SelectNetworkModal from '../components/wallet/SelectNetworkModal';
import { Button } from '../components/ui/Button';
import PortfolioSummary from '../components/wallet/PortfolioSummary';
import InvestmentCard from '../components/wallet/InvestmentCard';

const Wallet = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('dashboard');
    const [showTransfer, setShowTransfer] = useState(false);
    const [showReceive, setShowReceive] = useState(false);
    const [showDeposit, setShowDeposit] = useState(false);
    const [showSelectNetwork, setShowSelectNetwork] = useState(false);
    const [selectedToken, setSelectedToken] = useState(tokens[0]);
    const [selectedVoucher, setSelectedVoucher] = useState(null);
    const [showQrModal, setShowQrModal] = useState(false);
    const [copiedTrackingId, setCopiedTrackingId] = useState(false);
    // History tab state
    const [selectedHistoryToken, setSelectedHistoryToken] = useState(null);
    const [historyFilter, setHistoryFilter] = useState('all');
    // Token filter state
    const [tokenFilter, setTokenFilter] = useState('all');

    const getTeamIcon = (teamId) => {
        const icons = { phoenix: Flame, shadow: Ghost, thunder: Bolt, dragon: Zap };
        return icons[teamId] || Flame;
    };

    const handleSelectToken = (token) => setSelectedToken(token);
    const handleShowQr = (voucher) => { setSelectedVoucher(voucher); setShowQrModal(true); setCopiedTrackingId(false); };

    const copyTrackingId = (trackingId) => {
        navigator.clipboard.writeText(trackingId);
        setCopiedTrackingId(true);
        setTimeout(() => setCopiedTrackingId(false), 2000);
    };

    const tabs = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'investments', label: 'Investments', icon: PieChart },
        { id: 'vouchers', label: 'My Vouchers', icon: Gift },
        { id: 'history', label: 'History', icon: History },
    ];

    return (
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/30">
                        <WalletIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">My Wallet</h1>
                        <p className="text-sm text-gray-500">Manage your tokens and investments</p>
                    </div>
                </div>

                {/* Tab Navigation */}
                <div className="bg-gray-100 p-1 rounded-xl flex gap-1 overflow-x-auto">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${activeTab === tab.id ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'
                                    }`}
                            >
                                <Icon className="w-4 h-4" />
                                <span className="hidden sm:inline">{tab.label}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* DASHBOARD TAB */}
            {activeTab === 'dashboard' && (
                <>
                    {/* Components - Softcoded */}
                    <PortfolioSummary />

                    {/* Action Buttons */}
                    <div className="flex gap-3 mb-6">
                        <button onClick={() => setShowTransfer(true)} className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/30">
                            <ArrowUpRight className="w-5 h-5" /> Transfer
                        </button>
                        <button onClick={() => setShowReceive(true)} className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
                            <ArrowDownLeft className="w-5 h-5" /> Receive
                        </button>
                        <button onClick={() => setShowDeposit(true)} className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
                            <Plus className="w-5 h-5" /> Deposit
                        </button>
                    </div>

                    {/* My Tokens Section */}
                    <div className="mb-8">
                        {/* Header with Filter */}
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                <i className="fas fa-coins text-primary"></i> My Tokens
                            </h2>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setTokenFilter('all')}
                                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${tokenFilter === 'all' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                                >
                                    All
                                </button>
                                <button
                                    onClick={() => setTokenFilter('utility')}
                                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${tokenFilter === 'utility' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                                >
                                    Utility
                                </button>
                                <button
                                    onClick={() => setTokenFilter('investment')}
                                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${tokenFilter === 'investment' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                                >
                                    Investment
                                </button>
                            </div>
                        </div>



                        {/* Token List */}
                        <div className="space-y-3">
                            {/* Utility Tokens Section */}
                            {(tokenFilter === 'all' || tokenFilter === 'utility') && (
                                <>
                                    <div className="flex items-center gap-2 mt-4 mb-2">
                                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Utility Tokens</span>
                                        <div className="flex-1 h-px bg-gray-200"></div>
                                    </div>

                                    {/* FLIPS Token */}
                                    <div
                                        onClick={() => navigate('/token/flips')}
                                        className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center justify-between hover:border-primary/30 hover:shadow-md transition-all cursor-pointer"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-cyan-50 rounded-xl flex items-center justify-center">
                                                <img src="/images/flips_token.png" alt="Flips" className="w-8 h-8 object-contain" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-900">Flips Coins</p>
                                                <p className="text-sm text-gray-400">Universal Reward Token</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xl font-bold text-gray-900">{defaultWalletData.totalPoints.toLocaleString()}</p>
                                            <p className="text-xs text-gray-400">FLIPS</p>
                                        </div>
                                    </div>

                                    {/* TBF Token */}
                                    <div
                                        onClick={() => navigate('/token/tbf')}
                                        className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center justify-between hover:border-primary/30 hover:shadow-md transition-all cursor-pointer"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                                                <Ship className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-900">TBF Yacht Club</p>
                                                <p className="text-sm text-gray-400">Partner Token</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xl font-bold text-gray-900">{defaultWalletData.tbfCoins.toLocaleString()}</p>
                                            <p className="text-xs text-gray-400">TBF</p>
                                        </div>
                                    </div>

                                    {/* CTRL G Team Tokens */}
                                    <div className="flex items-center gap-2 mt-6 mb-2">
                                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">CTRL G Team Tokens</span>
                                        <div className="flex-1 h-px bg-gray-200"></div>
                                    </div>

                                    {GAME_TEAMS.map((team) => {
                                        const Icon = getTeamIcon(team.id);
                                        const balance = defaultWalletData.teamCoins[team.id] || 0;
                                        return (
                                            <div
                                                key={team.id}
                                                onClick={() => navigate(`/token/${team.id}`)}
                                                className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center justify-between hover:border-primary/30 hover:shadow-md transition-all cursor-pointer"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-12 h-12 ${team.bgColor} rounded-xl flex items-center justify-center ${team.textColor}`}>
                                                        <Icon className="w-6 h-6" />
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-gray-900">{team.coinName}</p>
                                                        <p className="text-sm text-gray-400">CTRL G Team Token</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-xl font-bold text-gray-900">{balance.toLocaleString()}</p>
                                                    <p className="text-xs text-gray-400">{team.id.toUpperCase()}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </>
                            )}

                            {/* Investment Tokens Section */}
                            {(tokenFilter === 'all' || tokenFilter === 'investment') && (
                                <>
                                    <div className="flex items-center gap-2 mt-6 mb-2">
                                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Movie Investment Tokens</span>
                                        <div className="flex-1 h-px bg-gray-200"></div>
                                    </div>

                                    {investments.map((inv) => (
                                        <div
                                            key={inv.id}
                                            onClick={() => navigate(`/token/${inv.tokenId}`)}
                                            className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center justify-between hover:border-primary/30 hover:shadow-md transition-all cursor-pointer"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 overflow-hidden">
                                                    <img src={inv.image} alt={inv.name} className="w-full h-full object-cover" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-900">{inv.tokenSymbol} Token</p>
                                                    <p className="text-sm text-gray-400">{inv.name}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xl font-bold text-gray-900">{inv.tokenBalance?.toLocaleString() || 0}</p>
                                                <p className="text-xs text-gray-400">{inv.tokenSymbol}</p>
                                            </div>
                                        </div>
                                    ))}
                                </>
                            )}
                        </div>
                    </div>


                </>
            )}

            {/* INVESTMENTS TAB */}
            {activeTab === 'investments' && (
                <div>
                    {/* Investment Summary */}
                    <div className="bg-gradient-to-br from-primary-dark via-brand-navy to-primary-dark rounded-3xl p-6 md:p-8 mb-6 text-white shadow-xl shadow-blue-900/10 relative overflow-hidden">
                        <div className="absolute -top-16 -right-16 w-48 h-48 bg-primary/10 rounded-full blur-2xl"></div>
                        <div className="relative z-10">
                            <p className="text-white/70 text-sm mb-1">Total Investment Value</p>
                            <div className="text-4xl font-bold mb-4">
                                ฿{investments.reduce((sum, inv) => sum + (inv.tokenBalance * inv.tokenPrice), 0).toLocaleString()}
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm">
                                    <p className="text-white/70 text-xs mb-1">Active Projects</p>
                                    <p className="text-2xl font-bold">{investments.filter(inv => inv.funding?.progress === 100).length}</p>
                                    <p className="text-white/50 text-xs mt-1">Fully Funded</p>
                                </div>
                                <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm">
                                    <p className="text-white/70 text-xs mb-1">Total Investors</p>
                                    <p className="text-2xl font-bold">{investments.reduce((sum, inv) => sum + (inv.funding?.totalInvestors || 0), 0).toLocaleString()}</p>
                                    <p className="text-white/50 text-xs mt-1">Community</p>
                                </div>
                                <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm">
                                    <p className="text-white/70 text-xs mb-1">Rewards</p>
                                    <p className="text-2xl font-bold">{investments.reduce((sum, inv) => sum + (inv.rewards?.stats.totalAvailable || 0), 0)}</p>
                                    <p className="text-white/50 text-xs mt-1">Available</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Investment Cards - Componentized */}
                    <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-primary" /> My Investments
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {investments.map((inv) => (
                            <InvestmentCard key={inv.id} inv={inv} />
                        ))}
                    </div>
                </div>
            )}

            {/* MY VOUCHERS TAB */}
            {activeTab === 'vouchers' && (
                <div>
                    <div className="mb-6">
                        <p className="text-gray-500">Your redeemed rewards</p>
                    </div>

                    {myVouchers.length === 0 ? (
                        <div className="text-center py-20">
                            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Ticket className="w-10 h-10 text-gray-300" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-400">No vouchers yet</h3>
                            <p className="text-gray-400 mt-2">Redeem rewards to see them here!</p>
                            <a href="/" className="inline-block mt-4 px-6 py-2 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark transition-colors">
                                Browse Rewards
                            </a>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {myVouchers.map(voucher => {
                                // Soft-coded reward type detection
                                const isPhysical = voucher.isPhysical || voucher.rewardType === 'physical';
                                const isShipping = voucher.status === 'Shipping';
                                const isProcessing = voucher.status === 'Processing';
                                const isDelivered = voucher.status === 'Delivered';

                                return (
                                    <div key={voucher.id} className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-lg transition-all">
                                        <div className="relative h-36 bg-gray-100">
                                            <img
                                                src={voucher.image}
                                                alt={voucher.title}
                                                className="w-full h-full object-cover"
                                                onError={(e) => handleImageError(e, 'Reward')}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                                            {/* Partner Badge */}
                                            <div className="absolute bottom-3 left-3">
                                                <span className="px-2 py-1 bg-white/90 rounded-full text-xs font-medium text-gray-700">{voucher.partner}</span>
                                            </div>

                                            {/* Type Badge */}
                                            <div className={`absolute top-3 left-3 px-2 py-0.5 rounded text-[9px] font-bold uppercase ${isPhysical ? 'bg-purple-500 text-white' : 'bg-blue-500 text-white'
                                                }`}>
                                                {isPhysical ? '📦 Physical' : '🎫 Digital'}
                                            </div>

                                            {/* Status Dot */}
                                            {isShipping && <span className="absolute top-3 right-3 w-3 h-3 rounded-full bg-cyan-500 animate-pulse"></span>}
                                            {isProcessing && <span className="absolute top-3 right-3 w-3 h-3 rounded-full bg-yellow-500 animate-pulse"></span>}
                                            {isDelivered && <span className="absolute top-3 right-3 w-3 h-3 rounded-full bg-green-500"></span>}
                                            {voucher.status === 'Active' && !isPhysical && <span className="absolute top-3 right-3 w-3 h-3 rounded-full bg-green-500 animate-pulse"></span>}
                                        </div>
                                        <div className="p-4">
                                            <h3 className="font-bold text-gray-900 mb-1">{voucher.title}</h3>
                                            <p className="text-xs text-gray-400 mb-2">Redeemed on {voucher.purchaseDate}</p>

                                            {/* Variant Label */}
                                            {voucher.variantLabel && (
                                                <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200 inline-block mb-2">
                                                    ✓ {voucher.variantLabel}
                                                </span>
                                            )}

                                            {/* Status Badge Inline */}
                                            {isPhysical && (
                                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md inline-block mb-3 ${isShipping ? 'bg-cyan-100 text-cyan-700' :
                                                    isProcessing ? 'bg-amber-100 text-amber-700' :
                                                        isDelivered ? 'bg-green-100 text-green-700' :
                                                            'bg-gray-100 text-gray-600'
                                                    }`}>
                                                    {voucher.status}
                                                </span>
                                            )}

                                            {/* ONE Universal Button */}
                                            <Button
                                                className="w-full bg-gray-900 text-white"
                                                onClick={() => handleShowQr(voucher)}
                                            >
                                                View Details
                                            </Button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            )}

            {/* HISTORY TAB */}
            {activeTab === 'history' && (
                <div>
                    {/* Token List View - When no token is selected */}
                    {!selectedHistoryToken ? (
                        <>
                            <div className="mb-6">
                                <p className="text-gray-500">Select a token to view transaction history</p>
                            </div>

                            <div className="space-y-3">
                                {/* TRX Token */}
                                <div
                                    onClick={() => setSelectedHistoryToken({ id: 'trx', name: 'Tron', symbol: 'TRX', balance: 24582, color: 'bg-red-500', textColor: 'text-white' })}
                                    className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center justify-between hover:border-primary/30 hover:shadow-md transition-all cursor-pointer"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center text-white font-bold">
                                            TRX
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900">TRX</p>
                                            <p className="text-sm text-gray-400">Tron</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="text-right">
                                            <p className="text-xl font-bold text-gray-900">24,582</p>
                                            <p className="text-xs text-gray-400">$2,704.02</p>
                                        </div>
                                        <ChevronRight className="w-5 h-5 text-gray-400" />
                                    </div>
                                </div>

                                {/* FLIPS Token */}
                                <div
                                    onClick={() => setSelectedHistoryToken({ id: 'flips', name: 'FLIPS Token', symbol: 'FLIPS', balance: defaultWalletData.totalPoints, color: 'bg-cyan-500', textColor: 'text-white' })}
                                    className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center justify-between hover:border-primary/30 hover:shadow-md transition-all cursor-pointer"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-cyan-50 rounded-xl flex items-center justify-center">
                                            <img src="/images/flips_token.png" alt="Flips" className="w-8 h-8 object-contain" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900">FLIPS</p>
                                            <p className="text-sm text-gray-400">FLIPS Token</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="text-right">
                                            <p className="text-xl font-bold text-gray-900">{defaultWalletData.totalPoints.toLocaleString()}</p>
                                            <p className="text-xs text-gray-400">${(defaultWalletData.totalPoints * 0.15).toLocaleString()}</p>
                                        </div>
                                        <ChevronRight className="w-5 h-5 text-gray-400" />
                                    </div>
                                </div>

                                {/* TBFC Token */}
                                <div
                                    onClick={() => setSelectedHistoryToken({ id: 'tbf', name: 'TBFC (Yacht Club)', symbol: 'TBFC', balance: defaultWalletData.tbfCoins, color: 'bg-blue-800', textColor: 'text-white' })}
                                    className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center justify-between hover:border-primary/30 hover:shadow-md transition-all cursor-pointer"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-blue-800 rounded-xl flex items-center justify-center text-white">
                                            <Ship className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900">TBFC</p>
                                            <p className="text-sm text-gray-400">TBFC Yacht Club</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="text-right">
                                            <p className="text-xl font-bold text-gray-900">{defaultWalletData.tbfCoins.toLocaleString()}</p>
                                            <p className="text-xs text-gray-400">$0</p>
                                        </div>
                                        <ChevronRight className="w-5 h-5 text-gray-400" />
                                    </div>
                                </div>

                                {/* Team Coins */}
                                {GAME_TEAMS.map((team) => {
                                    const Icon = getTeamIcon(team.id);
                                    const balance = defaultWalletData.teamCoins[team.id] || 0;
                                    return (
                                        <div
                                            key={team.id}
                                            onClick={() => setSelectedHistoryToken({ id: team.id, name: team.coinName, symbol: team.id.toUpperCase(), balance: balance, color: team.bgColor, textColor: team.textColor, icon: Icon })}
                                            className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center justify-between hover:border-primary/30 hover:shadow-md transition-all cursor-pointer"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className={`w-12 h-12 ${team.bgColor} rounded-xl flex items-center justify-center ${team.textColor}`}>
                                                    <Icon className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-900">{team.coinName}</p>
                                                    <p className="text-sm text-gray-400">CTRL G Team Token</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="text-right">
                                                    <p className="text-xl font-bold text-gray-900">{balance.toLocaleString()}</p>
                                                    <p className="text-xs text-gray-400">$0</p>
                                                </div>
                                                <ChevronRight className="w-5 h-5 text-gray-400" />
                                            </div>
                                        </div>
                                    );
                                })}

                                {/* Investment Tokens */}
                                {investments.slice(0, 2).map((inv) => (
                                    <div
                                        key={inv.id}
                                        onClick={() => setSelectedHistoryToken({ id: inv.tokenId, name: inv.name, symbol: inv.tokenSymbol, balance: inv.tokenBalance || 0, color: 'bg-indigo-500', textColor: 'text-white', image: inv.image })}
                                        className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center justify-between hover:border-primary/30 hover:shadow-md transition-all cursor-pointer"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center overflow-hidden">
                                                <img src={inv.image} alt={inv.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-900">{inv.tokenSymbol}</p>
                                                <p className="text-sm text-gray-400">{inv.name}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="text-right">
                                                <p className="text-xl font-bold text-gray-900">{(inv.tokenBalance || 0).toLocaleString()}</p>
                                                <p className="text-xs text-gray-400">${((inv.tokenBalance || 0) * inv.tokenPrice).toLocaleString()}</p>
                                            </div>
                                            <ChevronRight className="w-5 h-5 text-gray-400" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        /* Token History View - When a token is selected */
                        <>
                            {/* Back Button and Token Header */}
                            <div className="flex items-center gap-4 mb-6">
                                <button
                                    onClick={() => { setSelectedHistoryToken(null); setHistoryFilter('all'); }}
                                    className="p-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
                                >
                                    <ChevronLeft className="w-5 h-5 text-gray-600" />
                                </button>
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 ${selectedHistoryToken.color || 'bg-primary'} rounded-xl flex items-center justify-center ${selectedHistoryToken.textColor || 'text-white'}`}>
                                        {selectedHistoryToken.image ? (
                                            <img src={selectedHistoryToken.image} alt={selectedHistoryToken.name} className="w-full h-full object-cover rounded-xl" />
                                        ) : selectedHistoryToken.icon ? (
                                            <selectedHistoryToken.icon className="w-5 h-5" />
                                        ) : (
                                            <span className="text-xs font-bold">{selectedHistoryToken.symbol?.slice(0, 3)}</span>
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">{selectedHistoryToken.symbol} History</h3>
                                        <p className="text-sm text-gray-500">Balance: {selectedHistoryToken.balance?.toLocaleString()} {selectedHistoryToken.symbol}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Filter Buttons */}
                            <div className="flex items-center justify-between mb-6">
                                <p className="text-gray-500">Transaction history</p>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setHistoryFilter('all')}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${historyFilter === 'all' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                                    >
                                        All
                                    </button>
                                    <button
                                        onClick={() => setHistoryFilter('earned')}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${historyFilter === 'earned' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                                    >
                                        Earned
                                    </button>
                                    <button
                                        onClick={() => setHistoryFilter('spent')}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${historyFilter === 'spent' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                                    >
                                        Spent
                                    </button>
                                </div>
                            </div>

                            {/* Transaction List */}
                            <div className="space-y-3">
                                {transactions
                                    .filter(tx => tx.tokenId === selectedHistoryToken.id)
                                    .filter(tx => {
                                        if (historyFilter === 'all') return true;
                                        if (historyFilter === 'earned') return tx.amount > 0;
                                        if (historyFilter === 'spent') return tx.amount < 0;
                                        return true;
                                    })
                                    .map((tx) => (
                                        <div key={tx.id} className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100 hover:shadow-md transition-all">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.amount > 0 ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-500'}`}>
                                                    {tx.amount > 0 ? <ArrowDownLeft className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-800">{tx.title}</p>
                                                    <p className="text-xs text-gray-400">{tx.date}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className={`font-bold ${tx.amount > 0 ? 'text-green-600' : 'text-orange-500'}`}>
                                                    {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString()} {tx.currency}
                                                </p>
                                                <span className={`text-xs px-2 py-0.5 rounded-full ${tx.status === 'Success' ? 'bg-green-100 text-green-700' :
                                                    tx.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                                                    }`}>{tx.status}</span>
                                            </div>
                                        </div>
                                    ))}

                                {/* Empty State */}
                                {transactions.filter(tx => tx.tokenId === selectedHistoryToken.id).filter(tx => {
                                    if (historyFilter === 'all') return true;
                                    if (historyFilter === 'earned') return tx.amount > 0;
                                    if (historyFilter === 'spent') return tx.amount < 0;
                                    return true;
                                }).length === 0 && (
                                        <div className="text-center py-12">
                                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <History className="w-8 h-8 text-gray-300" />
                                            </div>
                                            <h3 className="text-lg font-bold text-gray-400">No transactions</h3>
                                            <p className="text-sm text-gray-400 mt-1">No {historyFilter !== 'all' ? historyFilter : ''} transactions found for {selectedHistoryToken.symbol}</p>
                                        </div>
                                    )}
                            </div>
                        </>
                    )}
                </div>
            )}

            {/* Modals */}
            <TransferModal isOpen={showTransfer} onClose={() => setShowTransfer(false)} initialToken={selectedToken} onChangeAsset={() => { setShowTransfer(false); setShowSelectNetwork(true); }} />
            <ReceiveModal isOpen={showReceive} onClose={() => setShowReceive(false)} />
            <DepositModal isOpen={showDeposit} onClose={() => setShowDeposit(false)} />
            <SelectNetworkModal isOpen={showSelectNetwork} onClose={() => setShowSelectNetwork(false)} onSelect={(token) => { handleSelectToken(token); setShowSelectNetwork(false); setShowTransfer(true); }} />

            {/* SMART DETAIL MODAL */}
            {showQrModal && selectedVoucher && (() => {
                const isPhysical = isPhysicalReward(selectedVoucher);
                const carrierUrl = getCarrierTrackingUrlByName(selectedVoucher.carrier, selectedVoucher.trackingId);

                return (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
                        <div className="bg-white rounded-3xl w-full max-w-md relative shadow-2xl animate-scale-up overflow-hidden">
                            {/* Hero Image Header */}
                            <div className="relative h-40 overflow-hidden">
                                <img
                                    src={selectedVoucher.image}
                                    alt=""
                                    className="w-full h-full object-cover"
                                    onError={(e) => handleImageError(e, selectedVoucher.title)}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

                                {/* Close Button */}
                                <button onClick={() => setShowQrModal(false)} className="absolute right-3 top-3 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/40 transition-all">
                                    <X className="w-4 h-4 text-white" />
                                </button>

                                {/* Title on Image */}
                                <div className="absolute bottom-0 left-0 right-0 p-4">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-[10px] font-bold uppercase text-white/70 bg-white/20 px-2 py-0.5 rounded backdrop-blur-sm">
                                            {selectedVoucher.partner}
                                        </span>
                                        <span className="text-[10px] font-bold uppercase text-white/70 bg-white/20 px-2 py-0.5 rounded backdrop-blur-sm">
                                            {selectedVoucher.category}
                                        </span>
                                    </div>
                                    <h3 className="font-bold text-xl text-white drop-shadow-lg">{selectedVoucher.title}</h3>
                                </div>
                            </div>

                            <div className="p-5">
                                {/* Variant Label */}
                                {selectedVoucher.variantLabel && (
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
                                            ✓ Selected: <span className="text-primary">{selectedVoucher.variantLabel}</span>
                                        </span>
                                    </div>
                                )}

                                {isPhysical ? (
                                    /* PHYSICAL ITEM - Shipping Info */
                                    <div>
                                        {/* Status Badge */}
                                        <div className={`rounded-2xl p-4 mb-4 ${selectedVoucher.status === 'Shipping' ? 'bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-100' :
                                            selectedVoucher.status === 'Processing' ? 'bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100' :
                                                selectedVoucher.status === 'Delivered' ? 'bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100' :
                                                    'bg-gray-50 border border-gray-100'
                                            }`}>
                                            <div className="flex items-center gap-3">
                                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${selectedVoucher.status === 'Shipping' ? 'bg-cyan-100' :
                                                    selectedVoucher.status === 'Processing' ? 'bg-amber-100' :
                                                        selectedVoucher.status === 'Delivered' ? 'bg-green-100' : 'bg-gray-100'
                                                    }`}>
                                                    <Truck className={`w-6 h-6 ${selectedVoucher.status === 'Shipping' ? 'text-cyan-600' :
                                                        selectedVoucher.status === 'Processing' ? 'text-amber-600' :
                                                            selectedVoucher.status === 'Delivered' ? 'text-green-600' : 'text-gray-600'
                                                        }`} />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-lg text-gray-900">{selectedVoucher.status}</p>
                                                    {selectedVoucher.deliveredDate ? (
                                                        <p className="text-sm text-green-600">✓ Delivered on {selectedVoucher.deliveredDate}</p>
                                                    ) : selectedVoucher.status === 'Shipping' ? (
                                                        <p className="text-sm text-cyan-600">Your package is on the way</p>
                                                    ) : (
                                                        <p className="text-sm text-gray-500">Preparing your order</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Tracking Number Card */}
                                        {selectedVoucher.trackingId && (
                                            <div className="bg-slate-800 rounded-2xl p-4 mb-4 text-white">
                                                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-2">📦 Tracking Number</p>
                                                <div className="flex items-center justify-between gap-2">
                                                    <div>
                                                        <p className="font-mono font-bold text-xl tracking-wider">{selectedVoucher.trackingId}</p>
                                                        <p className="text-sm text-slate-400 mt-1">{selectedVoucher.carrier}</p>
                                                    </div>
                                                    <button
                                                        onClick={() => copyTrackingId(selectedVoucher.trackingId)}
                                                        className={`p-3 rounded-xl transition-all ${copiedTrackingId ? 'bg-green-500 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
                                                    >
                                                        {copiedTrackingId ? '✓' : <Copy className="w-5 h-5" />}
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                        {/* Track on Carrier Button */}
                                        {carrierUrl && (
                                            <a
                                                href={carrierUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-full flex items-center justify-center gap-2 px-4 py-4 bg-gradient-to-r from-primary to-cyan-600 text-white rounded-xl font-bold hover:opacity-90 transition-all shadow-lg shadow-primary/30"
                                            >
                                                <ExternalLink className="w-5 h-5" />
                                                Track on {selectedVoucher.carrier}
                                            </a>
                                        )}

                                        {/* Shipping Address */}
                                        {selectedVoucher.addressLabel && (
                                            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-3">
                                                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                                                    <Package className="w-5 h-5 text-slate-500" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-400 uppercase font-bold">Shipping to</p>
                                                    <p className="font-semibold text-gray-800">{selectedVoucher.addressLabel}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    /* DIGITAL ITEM - QR Code */
                                    <div>
                                        <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-2xl mb-4 flex flex-col items-center">
                                            <div className="w-44 h-44 bg-white p-3 rounded-xl shadow-lg">
                                                <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center">
                                                    <QrCode className="w-24 h-24 text-gray-900" />
                                                </div>
                                            </div>
                                            <p className="text-slate-400 text-xs mt-3">Scan to verify authenticity</p>
                                        </div>

                                        {selectedVoucher.code && (
                                            <div className="text-center bg-gradient-to-r from-slate-50 to-gray-50 py-4 px-4 rounded-xl mb-4 border border-slate-200">
                                                <p className="text-[10px] text-slate-400 mb-1 uppercase font-bold tracking-wider">Voucher Code</p>
                                                <p className="font-mono font-bold text-2xl tracking-widest text-gray-900">{selectedVoucher.code}</p>
                                            </div>
                                        )}

                                        {selectedVoucher.eventDate && (
                                            <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                                                        <span className="text-2xl">📅</span>
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-purple-900">{selectedVoucher.eventDate}</p>
                                                        {selectedVoucher.venue && <p className="text-sm text-purple-600">{selectedVoucher.venue}</p>}
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        <p className="text-xs text-gray-400 text-center mt-4 bg-gray-50 py-2 rounded-lg">
                                            🎫 Show this to staff to redeem your reward
                                        </p>
                                    </div>
                                )}

                                {/* Purchase Info Footer */}
                                <div className="mt-4 pt-4 border-t border-gray-100 text-center">
                                    <p className="text-xs text-gray-400">Redeemed on {selectedVoucher.purchaseDate}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })()}
        </div>
    );
};

export default Wallet;