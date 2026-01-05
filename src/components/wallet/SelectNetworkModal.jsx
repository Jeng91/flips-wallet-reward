import React from 'react';
import { X, Search, Gem, Anchor, Clapperboard, Building } from 'lucide-react';
import { tokens, availableNetworks } from '../../data/mockData';

const SelectNetworkModal = ({ isOpen, onClose, onSelect }) => {
    if (!isOpen) return null;

    const allAssets = [...availableNetworks, ...tokens];

    const getIcon = (asset) => {
        if (asset.symbol === 'TRX') return <span className="font-bold">T</span>;
        if (asset.icon === 'gem') return <Gem className="w-5 h-5" />;
        if (asset.icon === 'anchor') return <Anchor className="w-5 h-5" />;
        if (asset.icon === 'clapperboard') return <Clapperboard className="w-5 h-5" />;
        if (asset.icon === 'building') return <Building className="w-5 h-5" />;
        return <span className="font-bold">{asset.symbol?.[0]}</span>;
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

            <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-scale-up">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900">Select Asset</h3>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Search */}
                <div className="p-4 border-b border-gray-100">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search assets..."
                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        />
                    </div>
                </div>

                {/* Asset List */}
                <div className="max-h-80 overflow-y-auto">
                    {allAssets.map((asset) => (
                        <button
                            key={asset.id}
                            onClick={() => {
                                onSelect(asset);
                                onClose();
                            }}
                            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-50"
                        >
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-full ${asset.color || 'bg-gray-200'} flex items-center justify-center text-white`}>
                                    {getIcon(asset)}
                                </div>
                                <div className="text-left">
                                    <p className="font-bold text-gray-900">{asset.symbol}</p>
                                    <p className="text-xs text-gray-500">{asset.name}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-gray-900">{asset.balance?.toLocaleString()}</p>
                                <p className="text-xs text-gray-500">${(asset.balance * asset.price).toLocaleString()}</p>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SelectNetworkModal;
