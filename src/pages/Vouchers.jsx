import React, { useState } from 'react';
import { Search, Tag, QrCode, Ticket, Gem, Anchor, Clapperboard, X, Truck } from 'lucide-react';
import { vouchers, myVouchers } from '../data/mockData';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { STATUS } from '../config/constants';
import { getStatusStyle, REWARD_TYPE_STYLES } from '../config/styles';
import { isPhysicalReward, handleImageError } from '../utils/dataHelpers';

const Vouchers = () => {
    const [activeTab, setActiveTab] = useState('my-vouchers');
    const [qrModalOpen, setQrModalOpen] = useState(false);
    const [selectedVoucher, setSelectedVoucher] = useState(null);

    const handleOpenQr = (voucher) => {
        setSelectedVoucher(voucher);
        setQrModalOpen(true);
    };

    const getCurrencyIcon = (currency) => {
        switch (currency) {
            case 'FLIPS': return <Gem className="w-4 h-4" />;
            case 'TBFC': return <Anchor className="w-4 h-4" />;
            case 'BG2': return <Clapperboard className="w-4 h-4" />;
            default: return <Gem className="w-4 h-4" />;
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-4 mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Rewards Center</h2>
                    <p className="text-gray-500 text-sm">Manage your vouchers and redeem exclusive partner rewards.</p>
                </div>

                {/* Main Tabs */}
                <div className="bg-gray-100 p-1 rounded-xl flex gap-1">
                    <button
                        onClick={() => setActiveTab('my-vouchers')}
                        className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'my-vouchers'
                            ? 'bg-white text-gray-900 shadow-sm'
                            : 'text-gray-500 hover:text-gray-900'
                            }`}
                    >
                        My Vouchers
                    </button>
                    <button
                        onClick={() => setActiveTab('store')}
                        className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'store'
                            ? 'bg-white text-gray-900 shadow-sm'
                            : 'text-gray-500 hover:text-gray-900'
                            }`}
                    >
                        Redeem Rewards
                    </button>
                </div>
            </div>

            {/* MY VOUCHERS TAB */}
            {activeTab === 'my-vouchers' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {myVouchers.length === 0 && (
                        <div className="col-span-full py-20 text-center">
                            <Ticket className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-gray-400">No vouchers yet</h3>
                            <p className="text-gray-400">Go to the store to redeem rewards!</p>
                            <Button className="mt-4" onClick={() => setActiveTab('store')}>Go to Store</Button>
                        </div>
                    )}


                    {myVouchers.map(voucher => {
                        // Using centralized helpers
                        const isPhysical = isPhysicalReward(voucher);
                        const statusStyle = getStatusStyle(voucher.status);

                        return (
                            <Card key={voucher.id} padding="p-0" className="overflow-hidden bg-white border border-gray-200 hover:shadow-lg transition-shadow">
                                <div className="flex h-full">
                                    {/* Left Side (Image) */}
                                    <div className="w-1/3 relative bg-gray-100">
                                        <img
                                            src={voucher.image}
                                            alt={voucher.title}
                                            className="w-full h-full object-cover"
                                            onError={(e) => handleImageError(e, 'Reward')}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>

                                        {/* Reward Type Badge */}
                                        <div className={`absolute bottom-2 left-2 text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider ${isPhysical ? REWARD_TYPE_STYLES.physical.badge : REWARD_TYPE_STYLES.digital.badge}`}>
                                            {isPhysical ? REWARD_TYPE_STYLES.physical.icon + ' Physical' : REWARD_TYPE_STYLES.digital.icon + ' Digital'}
                                        </div>
                                    </div>

                                    {/* Right Side (Info) */}
                                    <div className="w-2/3 p-4 flex flex-col justify-between">
                                        <div>
                                            <div className="flex justify-between items-start mb-1">
                                                <Badge className="bg-blue-50 text-blue-700 border-blue-100 text-[10px] px-1.5 py-0.5">
                                                    {voucher.partner}
                                                </Badge>

                                                {/* Status Indicator - using style map */}
                                                <span className={`w-2 h-2 rounded-full ${statusStyle.dot} ${voucher.status !== STATUS.DELIVERED ? 'animate-pulse' : ''}`} title={voucher.status}></span>
                                            </div>

                                            <h3 className="font-bold text-gray-900 text-sm leading-tight mb-1">{voucher.title}</h3>
                                            <p className="text-xs text-gray-400 mb-2">Redeemed on {voucher.purchaseDate}</p>

                                            {/* Variant Label (if selected variant) */}
                                            {voucher.variantLabel && (
                                                <div className="mb-2">
                                                    <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
                                                        ✓ {voucher.variantLabel}
                                                    </span>
                                                </div>
                                            )}

                                            {/* Physical Item Status */}
                                            {isPhysical && (
                                                <div className={`rounded-lg p-2 mt-1 ${isShipping ? 'bg-orange-50 border border-orange-100' :
                                                    isProcessing ? 'bg-yellow-50 border border-yellow-100' :
                                                        isDelivered ? 'bg-green-50 border border-green-100' :
                                                            'bg-gray-50 border border-gray-100'
                                                    }`}>
                                                    <div className={`flex items-center gap-1.5 font-bold text-[10px] uppercase tracking-wide ${isShipping ? 'text-orange-700' :
                                                        isProcessing ? 'text-yellow-700' :
                                                            isDelivered ? 'text-green-700' :
                                                                'text-gray-600'
                                                        }`}>
                                                        <Truck className="w-3 h-3" />
                                                        {voucher.status}
                                                    </div>
                                                    {voucher.trackingId && (
                                                        <p className="text-[10px] text-gray-500 mt-0.5 font-mono">
                                                            {voucher.carrier && `${voucher.carrier}: `}#{voucher.trackingId}
                                                        </p>
                                                    )}
                                                    {isDelivered && voucher.deliveredDate && (
                                                        <p className="text-[10px] text-green-600 mt-0.5">
                                                            Delivered on {voucher.deliveredDate}
                                                        </p>
                                                    )}
                                                </div>
                                            )}

                                            {/* Event Info (for event tickets) */}
                                            {voucher.rewardType === 'event' && voucher.eventDate && (
                                                <div className="bg-purple-50 border border-purple-100 rounded-lg p-2 mt-1">
                                                    <p className="text-[10px] text-purple-700 font-medium">
                                                        📅 {voucher.eventDate} • {voucher.venue}
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        {/* Action Button - Conditional based on reward type */}
                                        {isPhysical ? (
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => handleOpenQr(voucher)}
                                                className={`w-full mt-2 text-xs ${isShipping ? 'border-orange-200 text-orange-700 hover:bg-orange-50' :
                                                    isDelivered ? 'border-green-200 text-green-700 hover:bg-green-50' :
                                                        'border-gray-200 text-gray-700 hover:bg-gray-50'
                                                    }`}
                                            >
                                                {isShipping ? 'Track Order' : isDelivered ? 'View Details' : 'View Status'}
                                            </Button>
                                        ) : (
                                            <Button
                                                size="sm"
                                                className="w-full mt-3 bg-gray-900 text-white flex items-center justify-center gap-2 text-xs"
                                                onClick={() => handleOpenQr(voucher)}
                                            >
                                                <QrCode className="w-3 h-3" />
                                                Show QR Code
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </Card>
                        );
                    })}
                </div>
            )}

            {/* STORE TAB */}
            {activeTab === 'store' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {vouchers.map(voucher => (
                        <Card key={voucher.id} padding="p-0" className="overflow-hidden flex flex-col h-full hover:shadow-lg transition-shadow border-gray-100 group">
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={voucher.image}
                                    alt={voucher.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute top-3 left-3">
                                    <Badge className="bg-white/90 text-gray-900 border-0 shadow-sm backdrop-blur-sm font-bold flex items-center gap-1">
                                        <Tag className="w-3 h-3" /> {voucher.partner}
                                    </Badge>
                                </div>
                            </div>

                            <div className="p-5 flex flex-col flex-1">
                                <h3 className="font-bold text-gray-900 text-lg mb-1 leading-tight">{voucher.title}</h3>
                                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                                    <div>
                                        <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Requires</p>
                                        <div className={`flex items-center gap-1.5 font-bold text-lg ${voucher.currency === 'FLIPS' ? 'text-cyan-600' :
                                            voucher.currency === 'TBFC' ? 'text-blue-800' : 'text-indigo-600'
                                            }`}>
                                            {getCurrencyIcon(voucher.currency)}
                                            <span>{voucher.priceAmount} {voucher.currency}</span>
                                        </div>
                                    </div>
                                    <Button size="sm" variant="outline">Redeem</Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}

            {/* Detail / QR Modal */}
            {qrModalOpen && selectedVoucher && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity">
                    <div className="bg-white rounded-3xl p-6 w-full max-w-sm relative shadow-2xl animate-scale-up overflow-hidden">
                        <button
                            onClick={() => setQrModalOpen(false)}
                            className="absolute right-4 top-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 text-gray-500 transition-colors z-10"
                        >
                            <X className="w-4 h-4" />
                        </button>

                        {/* CONDITIONAL RENDER: Physical vs Digital */}
                        {selectedVoucher.isPhysical || selectedVoucher.rewardType === 'physical' ? (
                            // PHYSICAL ITEM DETAIL VIEW
                            <div>
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-md flex-shrink-0 border border-gray-100 bg-gray-100">
                                        <img
                                            src={selectedVoucher.image}
                                            alt=""
                                            className="w-full h-full object-cover"
                                            onError={(e) => handleImageError(e, selectedVoucher.title)}
                                        />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900 leading-tight mb-1">{selectedVoucher.title}</h3>
                                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold border uppercase tracking-wide ${selectedVoucher.status === 'Shipping' ? 'bg-orange-50 text-orange-700 border-orange-100' :
                                            selectedVoucher.status === 'Processing' ? 'bg-yellow-50 text-yellow-700 border-yellow-100' :
                                                selectedVoucher.status === 'Delivered' ? 'bg-green-50 text-green-700 border-green-100' :
                                                    'bg-gray-50 text-gray-700 border-gray-100'
                                            }`}>
                                            <Truck className="w-3 h-3" /> {selectedVoucher.status}
                                        </span>
                                    </div>
                                </div>

                                {/* Tracking Box */}
                                <div className="bg-slate-50 rounded-xl p-4 mb-5 border border-slate-100 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-2 opacity-5">
                                        <Truck className="w-24 h-24" />
                                    </div>
                                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1">Tracking Number</p>
                                    <div className="flex justify-between items-center relative z-10">
                                        <p className="font-mono font-bold text-xl text-slate-800 tracking-wide">{selectedVoucher.trackingId || 'Preparing...'}</p>
                                    </div>
                                    <div className="mt-3 pt-3 border-t border-slate-200 relative z-10">
                                        <div className="flex justify-between text-xs">
                                            <span className="text-slate-500">Carrier</span>
                                            <span className="font-bold text-slate-700">{selectedVoucher.carrier || 'Pending Assignment'}</span>
                                        </div>
                                        {selectedVoucher.status === 'Delivered' && selectedVoucher.deliveredDate && (
                                            <div className="flex justify-between text-xs mt-2">
                                                <span className="text-slate-500">Delivered</span>
                                                <span className="font-bold text-green-600">{selectedVoucher.deliveredDate}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Order Details */}
                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between text-sm py-2 border-b border-slate-50">
                                        <span className="text-slate-500">Selected Option</span>
                                        <span className="font-bold text-slate-800">{selectedVoucher.variantLabel || '-'}</span>
                                    </div>
                                    <div className="flex justify-between text-sm py-2 border-b border-slate-50">
                                        <span className="text-slate-500">Shipping To</span>
                                        <span className="font-medium text-slate-800 text-right">{selectedVoucher.addressLabel || 'Default Address'}</span>
                                    </div>
                                    <div className="flex justify-between text-sm py-2 border-b border-slate-50">
                                        <span className="text-slate-500">Redeemed On</span>
                                        <span className="font-medium text-slate-800">{selectedVoucher.purchaseDate}</span>
                                    </div>
                                </div>

                                <Button onClick={() => setQrModalOpen(false)} className="w-full bg-slate-900 text-white rounded-xl py-3 font-bold shadow-lg hover:bg-slate-800">
                                    Close Details
                                </Button>
                            </div>
                        ) : (
                            // DIGITAL QR VIEW
                            <div>
                                <div className="text-center mb-6 pt-2">
                                    <h3 className="font-bold text-gray-900 text-lg">{selectedVoucher.partner}</h3>
                                    <p className="text-gray-500 text-sm">{selectedVoucher.title}</p>
                                </div>

                                <div className="bg-white p-4 rounded-xl border-2 border-dashed border-gray-200 mb-6 flex justify-center shadow-[inset_0_2px_10px_rgba(0,0,0,0.05)]">
                                    <div className="w-48 h-48 bg-gray-900 p-2 relative rounded-lg">
                                        <div className="w-full h-full bg-white flex items-center justify-center rounded-md overflow-hidden">
                                            <div className="grid grid-cols-6 gap-0.5 w-40 h-40">
                                                {[...Array(36)].map((_, i) => (
                                                    <div key={i} className={`bg-black ${Math.random() > 0.5 ? 'opacity-100' : 'opacity-0'}`}></div>
                                                ))}
                                            </div>
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="bg-white p-1.5 rounded-full shadow-lg">
                                                    {selectedVoucher.partner === 'Colestia' ? <Gem className="w-6 h-6 text-cyan-500" /> : <Ticket className="w-6 h-6 text-gray-900" />}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-center space-y-2">
                                    <div className="bg-gray-50 py-2 px-6 rounded-lg inline-block border border-gray-100">
                                        <p className="text-[10px] text-gray-400 font-mono mb-1">VOUCHER CODE</p>
                                        <p className="font-mono font-bold text-xl tracking-[0.2em] text-gray-900">{selectedVoucher.code}</p>
                                    </div>
                                    <p className="text-xs text-gray-400 mt-4 max-w-[200px] mx-auto">Show this QR code to the staff at the venue to redeem.</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Footer */}
            <footer className="py-8 mt-12 border-t border-gray-200">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <img src="/images/logo_new.png" alt="Flips ID" className="h-10 w-auto" />
                    <p className="text-slate-500 text-xs text-center">
                        © 2024 FLIPS ID Corporation. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Vouchers;