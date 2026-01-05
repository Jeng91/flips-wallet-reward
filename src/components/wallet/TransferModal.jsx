import React, { useState } from 'react';
import { X, ArrowRight, Wallet, Copy, Check } from 'lucide-react';
import { tokens, availableNetworks } from '../../data/mockData';

const TransferModal = ({ isOpen, onClose, initialToken, onChangeAsset }) => {
    const [amount, setAmount] = useState('');
    const [recipient, setRecipient] = useState('');
    const [copied, setCopied] = useState(false);

    if (!isOpen) return null;

    const selectedToken = initialToken || tokens[0];

    const handleTransfer = () => {
        alert(`Transfer ${amount} ${selectedToken.symbol} to ${recipient}`);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

            <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-scale-up">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                            <ArrowRight className="w-5 h-5 text-primary" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">Transfer</h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 space-y-6">
                    {/* Token Selection */}
                    <div>
                        <label className="block text-sm font-medium text-gray-500 mb-2">Asset</label>
                        <button
                            onClick={onChangeAsset}
                            className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-primary/30 transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-full ${selectedToken.color || 'bg-gray-200'} flex items-center justify-center text-white font-bold`}>
                                    {selectedToken.symbol?.[0] || 'T'}
                                </div>
                                <div className="text-left">
                                    <p className="font-bold text-gray-900">{selectedToken.symbol}</p>
                                    <p className="text-xs text-gray-500">{selectedToken.name}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-gray-900">{selectedToken.balance?.toLocaleString()}</p>
                                <p className="text-xs text-gray-500">Available</p>
                            </div>
                        </button>
                    </div>

                    {/* Recipient Address */}
                    <div>
                        <label className="block text-sm font-medium text-gray-500 mb-2">Recipient Address</label>
                        <input
                            type="text"
                            value={recipient}
                            onChange={(e) => setRecipient(e.target.value)}
                            placeholder="Enter wallet address"
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        />
                    </div>

                    {/* Amount */}
                    <div>
                        <label className="block text-sm font-medium text-gray-500 mb-2">Amount</label>
                        <div className="relative">
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="0.00"
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all pr-20"
                            />
                            <button
                                onClick={() => setAmount(selectedToken.balance?.toString() || '0')}
                                className="absolute right-3 top-1/2 -translate-y-1/2 px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-lg hover:bg-primary/20 transition-colors"
                            >
                                MAX
                            </button>
                        </div>
                    </div>

                    {/* Fee Info */}
                    <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Network Fee</span>
                            <span className="font-medium text-gray-900">~0.1 TRX</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Estimated Time</span>
                            <span className="font-medium text-gray-900">~1 min</span>
                        </div>
                    </div>

                    {/* Transfer Button */}
                    <button
                        onClick={handleTransfer}
                        disabled={!amount || !recipient}
                        className="w-full py-4 bg-gradient-to-r from-primary to-primary-dark text-white font-bold rounded-xl shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        Transfer {selectedToken.symbol}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TransferModal;
