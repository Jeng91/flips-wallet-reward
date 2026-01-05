import React, { useState, useEffect } from 'react';
import { X, MapPin, Calendar, Star, Shield, Check, Package, Truck, ChevronRight, AlertCircle, Plus } from 'lucide-react';
import { defaultWalletData, userProfile } from '../../data/mockData';

const PrivilegeDetailModal = ({ isOpen, onClose, privilege }) => {
    // Single Page Flow: 'detail' (includes all inputs) -> 'success'
    const [step, setStep] = useState('detail');
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [tempAddresses, setTempAddresses] = useState(userProfile.addresses || []);

    // Reset state when modal opens
    useEffect(() => {
        if (isOpen) {
            setStep('detail');
            setSelectedVariant(null);
            // Default to first address
            const def = userProfile.addresses?.find(a => a.isDefault);
            setSelectedAddressId(def ? def.id : (userProfile.addresses?.[0]?.id || null));
            setTempAddresses(userProfile.addresses || []);
        }
    }, [isOpen]);

    if (!isOpen || !privilege) return null;

    // Calculate Price
    const basePrice = privilege.price;
    const variantPrice = selectedVariant ? (selectedVariant.priceModifier || 0) : 0;
    const totalPrice = basePrice + variantPrice;

    const canAfford = defaultWalletData.totalPoints >= totalPrice;
    const balanceAfter = defaultWalletData.totalPoints - totalPrice;

    // Validation
    const needsVariant = privilege.variants && privilege.variants.length > 0;
    const isVariantSelected = !needsVariant || selectedVariant;
    const needsAddress = privilege.isPhysical;
    const isAddressSelected = !needsAddress || selectedAddressId;
    const isValid = isVariantSelected && isAddressSelected && canAfford;

    const handleRedeem = () => {
        if (isValid) {
            setStep('success');
        }
    };

    const closeAll = () => {
        setStep('detail');
        onClose();
    };

    // Render Logic
    if (step === 'success') {
        return (
            <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={closeAll}></div>
                <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden animate-scale-up">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 via-blue-500 to-purple-500"></div>
                    <div className="p-8 text-center animate-bounce-in">
                        <div className="relative w-24 h-24 mx-auto mb-6">
                            <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-20"></div>
                            <div className="relative w-full h-full bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center shadow-lg shadow-green-200">
                                <Check className="w-12 h-12 text-white" />
                            </div>
                        </div>

                        <h2 className="text-2xl font-black text-slate-800 mb-2">Redemption Successful!</h2>
                        <p className="text-slate-500 mb-6">
                            {privilege.isPhysical
                                ? "Your reward is being processed for shipment."
                                : "Your reward is now available in 'My Rewards'."}
                        </p>

                        {privilege.isPhysical && (
                            <div className="bg-orange-50 rounded-xl p-4 mb-6 border border-orange-100 inline-flex items-center gap-3 text-left w-full">
                                <div className="bg-white p-2 rounded-lg shadow-sm">
                                    <Truck className="w-5 h-5 text-orange-500" />
                                </div>
                                <div>
                                    <p className="font-bold text-orange-800 text-sm">Tracking Status</p>
                                    <p className="text-orange-600 text-xs">Processing Order...</p>
                                </div>
                            </div>
                        )}

                        <button
                            onClick={closeAll}
                            className="w-full py-3.5 rounded-xl bg-slate-900 text-white font-bold shadow-xl hover:bg-slate-800 hover:scale-[1.02] transition-all"
                        >
                            View My Rewards
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={closeAll}></div>
            <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-5xl overflow-hidden flex flex-col md:flex-row h-[85vh] animate-slide-up">

                {/* LEFT COLUMN: Hero & Details (Scrollable) */}
                <div className="w-full md:w-5/12 h-full overflow-y-auto custom-scrollbar border-r border-slate-100 bg-slate-50 relative">
                    {/* Hero Image */}
                    <div className="relative h-64 sticky top-0 z-10">
                        <img src={privilege.image} alt={privilege.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                        <div className="absolute bottom-4 left-6 right-6">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="px-2 py-0.5 rounded-md bg-white/20 backdrop-blur-md text-white text-[10px] font-bold border border-white/10">
                                    {privilege.categoryLabel}
                                </span>
                                {privilege.isPhysical && (
                                    <span className="px-2 py-0.5 rounded-md bg-orange-500/80 backdrop-blur-md text-white text-[10px] font-bold flex items-center gap-1">
                                        <Package className="w-3 h-3" /> Physical Item
                                    </span>
                                )}
                            </div>
                            <h2 className="text-2xl font-black text-white leading-tight mb-1 drop-shadow-md">{privilege.title}</h2>
                            {privilege.subtitle && <p className="text-white/80 text-sm font-medium">{privilege.subtitle}</p>}
                        </div>
                    </div>

                    {/* Details Content */}
                    <div className="p-6 space-y-6">
                        <div>
                            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-2">
                                <Star className="w-4 h-4 text-primary" /> Reward Details
                            </h3>
                            <p className="text-slate-600 text-sm leading-relaxed">{privilege.description}</p>
                        </div>

                        {/* Conditions */}
                        <div>
                            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-2">
                                <Shield className="w-4 h-4 text-primary" /> Conditions
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {privilege.conditions.map((condition, index) => (
                                    <span key={index} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-xs font-medium text-slate-500 shadow-sm">
                                        <Check className="w-3 h-3 text-green-500" /> {condition}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: Actions & Checkout (Fixed Header/Footer, Scrollable Body) */}
                <div className="w-full md:w-7/12 h-full flex flex-col bg-white relative">

                    {/* Header (Close Button) */}
                    <div className="p-4 flex justify-between items-center border-b border-slate-100 flex-shrink-0">
                        <h3 className="font-bold text-xl text-slate-800">Customize & Redeem</h3>
                        <button
                            onClick={closeAll}
                            className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-all"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Scrollable Options */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">

                        {/* SECTION: Universal Options (Variants) */}
                        {needsVariant && (
                            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                                    <Check className="w-4 h-4 text-primary" /> Select Option
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {privilege.variants.map(variant => (
                                        <label
                                            key={variant.id}
                                            className={`relative flex flex-col p-3 rounded-xl border-2 cursor-pointer transition-all ${selectedVariant?.id === variant.id
                                                ? 'bg-white border-primary shadow-md ring-1 ring-primary/20'
                                                : 'bg-white border-transparent hover:border-slate-200 shadow-sm'
                                                }`}
                                        >
                                            <div className="flex justify-between items-start mb-1">
                                                <span className={`text-sm font-bold ${selectedVariant?.id === variant.id ? 'text-slate-900' : 'text-slate-700'}`}>
                                                    {variant.label}
                                                </span>
                                                <input
                                                    type="radio"
                                                    name="variant"
                                                    checked={selectedVariant?.id === variant.id}
                                                    onChange={() => setSelectedVariant(variant)}
                                                    className="mt-0.5 w-4 h-4 text-primary border-slate-300 focus:ring-primary"
                                                />
                                            </div>
                                            {variant.priceModifier > 0 ? (
                                                <p className="text-xs font-bold text-orange-600 bg-orange-50 inline-block px-2 py-0.5 rounded self-start">
                                                    +{variant.priceModifier} FLIPS
                                                </p>
                                            ) : (
                                                <p className="text-xs text-slate-400">Standard Price</p>
                                            )}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* SECTION: Shipping Address (Physical Only) */}
                        {needsAddress && (
                            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                                    <Truck className="w-4 h-4 text-orange-500" /> Shipping Address
                                </h3>

                                {tempAddresses.length > 0 ? (
                                    <div className="space-y-2">
                                        {tempAddresses.map(addr => (
                                            <label
                                                key={addr.id}
                                                className={`flex items-start gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${selectedAddressId === addr.id
                                                    ? 'bg-white border-primary shadow-md'
                                                    : 'bg-white border-transparent hover:border-slate-200 shadow-sm'
                                                    }`}
                                            >
                                                <input
                                                    type="radio"
                                                    name="address"
                                                    checked={selectedAddressId === addr.id}
                                                    onChange={() => setSelectedAddressId(addr.id)}
                                                    className="mt-1 w-4 h-4 text-primary border-slate-300 focus:ring-primary"
                                                />
                                                <div className="flex-1">
                                                    <div className="flex justify-between items-center mb-1">
                                                        <span className={`text-sm font-bold ${selectedAddressId === addr.id ? 'text-slate-900' : 'text-slate-700'}`}>
                                                            {addr.label}
                                                        </span>
                                                        {addr.isDefault && <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">Default</span>}
                                                    </div>
                                                    <p className="text-xs text-slate-500 line-clamp-1">{addr.address}</p>
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center p-6 border-2 border-dashed border-slate-200 rounded-xl bg-white">
                                        <p className="text-xs text-slate-500 mb-2">No addresses found.</p>
                                        <a href="/profile" className="text-xs font-bold text-primary hover:underline">Manage Addresses in Profile</a>
                                    </div>
                                )}
                            </div>
                        )}

                        {!needsVariant && !needsAddress && (
                            <div className="text-center py-10 bg-slate-50 rounded-2xl border border-slate-100">
                                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
                                    <Check className="w-8 h-8 text-green-500" />
                                </div>
                                <h3 className="font-bold text-slate-800">Ready to Redeem</h3>
                                <p className="text-slate-500 text-sm mt-1">No additional options required.</p>
                            </div>
                        )}
                    </div>

                    {/* Footer / Action Bar */}
                    <div className="p-6 bg-white border-t border-slate-100 shadow-[0_-4px_30px_rgba(0,0,0,0.05)] z-20">
                        <div className="flex justify-between items-end mb-4">
                            <div>
                                <p className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wide">Total Redemption Cost</p>
                                <div className="flex items-baseline gap-1.5">
                                    <span className="text-3xl font-black text-slate-900 tracking-tight">{totalPrice.toLocaleString()}</span>
                                    <span className="text-sm font-bold text-slate-400">FLIPS</span>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-slate-400 mb-1">Wallet Balance: {balanceAfter.toLocaleString()}</p>
                            </div>
                        </div>

                        <button
                            onClick={handleRedeem}
                            disabled={!isValid}
                            className={`w-full py-4 rounded-xl font-bold text-lg shadow-xl flex items-center justify-center gap-2 transition-all transform active:scale-95 ${isValid
                                ? 'bg-gradient-to-r from-slate-900 to-slate-800 text-white hover:scale-[1.01] hover:shadow-2xl'
                                : 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none'
                                }`}
                        >
                            {isValid ? 'Confirm Redemption' : 'Select Options to Redeem'}
                            {isValid && <ChevronRight className="w-5 h-5" />}
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default PrivilegeDetailModal;

