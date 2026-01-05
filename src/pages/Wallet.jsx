import React, { useState } from 'react';
import {
    ArrowUpRight, ArrowDownLeft, Plus, QrCode, Ticket,
    Ship, Flame, Ghost, Bolt, Zap, TrendingUp,
    LayoutDashboard, History, Gift, X,
    PieChart, Wallet as WalletIcon, BarChart3
} from 'lucide-react';
import {
    defaultWalletData,
    tokens,
    transactions,
    myVouchers,
    investments
} from '../data/mockData';
import { GAME_TEAMS } from '../config/theme';
import TransferModal from '../components/wallet/TransferModal';
import ReceiveModal from '../components/wallet/ReceiveModal';
import DepositModal from '../components/wallet/DepositModal';
import SelectNetworkModal from '../components/wallet/SelectNetworkModal';
import { Button } from '../components/ui/Button';
import PortfolioSummary from '../components/wallet/PortfolioSummary';
import InvestmentCard from '../components/wallet/InvestmentCard';

const Wallet = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [showTransfer, setShowTransfer] = useState(false);
    const [showReceive, setShowReceive] = useState(false);
    const [showDeposit, setShowDeposit] = useState(false);
    const [showSelectNetwork, setShowSelectNetwork] = useState(false);
    const [selectedToken, setSelectedToken] = useState(tokens[0]);
    const [selectedVoucher, setSelectedVoucher] = useState(null);
    const [showQrModal, setShowQrModal] = useState(false);

    const getTeamIcon = (teamId) => {
        const icons = { phoenix: Flame, shadow: Ghost, thunder: Bolt, dragon: Zap };
        return icons[teamId] || Flame;
    };

    const handleSelectToken = (token) => setSelectedToken(token);
    const handleShowQr = (voucher) => { setSelectedVoucher(voucher); setShowQrModal(true); };

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

                    {/* Token Balances */}
                    <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <i className="fas fa-coins text-primary"></i> My Tokens
                    </h2>
                    <div className="space-y-3 mb-8">
                        {/* FLIPS Token */}
                        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center justify-between hover:border-primary/30 hover:shadow-md transition-all">
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
                        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center justify-between hover:border-primary/30 hover:shadow-md transition-all">
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

                        {/* Team Coins */}
                        {GAME_TEAMS.map((team) => {
                            const Icon = getTeamIcon(team.id);
                            const balance = defaultWalletData.teamCoins[team.id] || 0;
                            return (
                                <div key={team.id} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center justify-between hover:border-primary/30 hover:shadow-md transition-all">
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

                        {/* Investment Tokens */}
                        {investments.map((inv) => (
                            <div key={inv.id} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center justify-between hover:border-primary/30 hover:shadow-md transition-all">
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
                    </div>

                    {/* Recent Transactions Preview */}
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                            <History className="w-5 h-5 text-primary" /> Recent Activity
                        </h2>
                        <button onClick={() => setActiveTab('history')} className="text-sm text-primary font-medium hover:underline">
                            View All
                        </button>
                    </div>
                    <div className="space-y-2">
                        {transactions.slice(0, 3).map((tx) => (
                            <div key={tx.id} className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.amount > 0 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'}`}>
                                        {tx.amount > 0 ? <ArrowDownLeft className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-800">{tx.title}</p>
                                        <p className="text-xs text-gray-400">{tx.date}</p>
                                    </div>
                                </div>
                                <p className={`font-bold ${tx.amount > 0 ? 'text-green-600' : 'text-red-500'}`}>
                                    {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString()} {tx.currency}
                                </p>
                            </div>
                        ))}
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
                            <div className="text-4xl font-bold mb-2">
                                ฿{investments.reduce((sum, inv) => sum + inv.invested, 0).toLocaleString()}
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1 text-primary">
                                    <TrendingUp className="w-4 h-4" />
                                    <span>+185% avg ROI</span>
                                </div>
                                <span className="text-white/50">•</span>
                                <span className="text-white/70">{investments.length} active investments</span>
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
                        <p className="text-gray-500">Your redeemed rewards with QR codes</p>
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
                            {myVouchers.map(voucher => (
                                <div key={voucher.id} className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
                                    <div className="relative h-36">
                                        <img src={voucher.image} alt={voucher.title} className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                        <div className="absolute bottom-3 left-3">
                                            <span className="px-2 py-1 bg-white/90 rounded-full text-xs font-medium text-gray-700">{voucher.partner}</span>
                                        </div>
                                        {voucher.status === 'Active' && (
                                            <span className="absolute top-3 right-3 w-3 h-3 rounded-full bg-green-500 animate-pulse"></span>
                                        )}
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-bold text-gray-900 mb-1">{voucher.title}</h3>
                                        <p className="text-xs text-gray-400 mb-4">Redeemed on {voucher.purchaseDate}</p>
                                        <Button
                                            className="w-full bg-gray-900 text-white flex items-center justify-center gap-2"
                                            onClick={() => handleShowQr(voucher)}
                                        >
                                            <QrCode className="w-4 h-4" /> Show QR Code
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* HISTORY TAB */}
            {activeTab === 'history' && (
                <div>
                    <div className="flex items-center justify-between mb-6">
                        <p className="text-gray-500">All transactions</p>
                        <div className="flex gap-2">
                            <button className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium">All</button>
                            <button className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 text-sm hover:bg-gray-200">Earned</button>
                            <button className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 text-sm hover:bg-gray-200">Spent</button>
                        </div>
                    </div>

                    <div className="space-y-3">
                        {transactions.map((tx) => (
                            <div key={tx.id} className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100 hover:shadow-md transition-all">
                                <div className="flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.amount > 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-500'}`}>
                                        {tx.amount > 0 ? <ArrowDownLeft className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-800">{tx.title}</p>
                                        <p className="text-xs text-gray-400">{tx.date}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className={`font-bold ${tx.amount > 0 ? 'text-green-600' : 'text-red-500'}`}>
                                        {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString()} {tx.currency}
                                    </p>
                                    <span className={`text-xs px-2 py-0.5 rounded-full ${tx.status === 'Success' ? 'bg-green-100 text-green-700' :
                                        tx.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                                        }`}>{tx.status}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Points History */}
                    <h3 className="font-bold text-gray-800 mt-8 mb-4">Rewards History</h3>
                    <div className="space-y-3">
                        {defaultWalletData.transactions.map((tx, i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100">
                                <div className="flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.type === 'earn' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-500'}`}>
                                        {tx.type === 'earn' ? <ArrowDownLeft className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-800">{tx.description}</p>
                                        <p className="text-xs text-gray-400">{tx.date}</p>
                                    </div>
                                </div>
                                <p className={`font-bold ${tx.type === 'earn' ? 'text-green-600' : 'text-red-500'}`}>
                                    {tx.type === 'earn' ? '+' : '-'}{tx.amount.toLocaleString()} Flips
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Modals */}
            <TransferModal isOpen={showTransfer} onClose={() => setShowTransfer(false)} initialToken={selectedToken} onChangeAsset={() => { setShowTransfer(false); setShowSelectNetwork(true); }} />
            <ReceiveModal isOpen={showReceive} onClose={() => setShowReceive(false)} />
            <DepositModal isOpen={showDeposit} onClose={() => setShowDeposit(false)} />
            <SelectNetworkModal isOpen={showSelectNetwork} onClose={() => setShowSelectNetwork(false)} onSelect={(token) => { handleSelectToken(token); setShowSelectNetwork(false); setShowTransfer(true); }} />

            {/* QR Modal */}
            {showQrModal && selectedVoucher && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-white rounded-3xl p-6 w-full max-w-sm relative shadow-2xl animate-scale-up">
                        <button onClick={() => setShowQrModal(false)} className="absolute right-4 top-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                            <X className="w-4 h-4" />
                        </button>
                        <div className="text-center mb-6">
                            <h3 className="font-bold text-gray-900 text-lg">{selectedVoucher.partner}</h3>
                            <p className="text-gray-500 text-sm">{selectedVoucher.title}</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl border-2 border-dashed border-gray-200 mb-6 flex justify-center">
                            <div className="w-48 h-48 bg-gray-900 p-3 rounded-lg">
                                <div className="w-full h-full bg-white rounded flex items-center justify-center">
                                    <div className="text-center">
                                        <QrCode className="w-24 h-24 mx-auto text-gray-900" />
                                        <p className="text-xs text-gray-400 mt-2">Scan to redeem</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="bg-gray-50 py-2 px-4 rounded-lg inline-block">
                                <p className="text-xs text-gray-400">VOUCHER CODE</p>
                                <p className="font-mono font-bold text-lg tracking-widest text-gray-900">{selectedVoucher.code}</p>
                            </div>
                            <p className="text-xs text-gray-400 mt-4">Show this QR code to staff</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Wallet;
