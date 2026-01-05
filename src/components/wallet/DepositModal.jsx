import React, { useState } from 'react';
import { X, Plus, CreditCard, Building2, Wallet } from 'lucide-react';

const DepositModal = ({ isOpen, onClose }) => {
    const [amount, setAmount] = useState('');
    const [method, setMethod] = useState('card');

    if (!isOpen) return null;

    const methods = [
        { id: 'card', name: 'Credit/Debit Card', icon: CreditCard, fee: '2.5%' },
        { id: 'bank', name: 'Bank Transfer', icon: Building2, fee: 'Free' },
        { id: 'crypto', name: 'Crypto Wallet', icon: Wallet, fee: '0.1%' },
    ];

    const quickAmounts = [100, 500, 1000, 5000];

    const handleDeposit = () => {
        alert(`Deposit $${amount} via ${method}`);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

            <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-scale-up">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <Plus className="w-5 h-5 text-blue-600" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">Deposit</h3>
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
                    {/* Amount */}
                    <div>
                        <label className="block text-sm font-medium text-gray-500 mb-2">Amount (USD)</label>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="0.00"
                            className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-2xl font-bold text-center"
                        />

                        {/* Quick Amount Buttons */}
                        <div className="flex gap-2 mt-3">
                            {quickAmounts.map((amt) => (
                                <button
                                    key={amt}
                                    onClick={() => setAmount(amt.toString())}
                                    className="flex-1 py-2 bg-gray-100 hover:bg-primary hover:text-white rounded-lg text-sm font-medium transition-colors"
                                >
                                    ${amt}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Payment Method */}
                    <div>
                        <label className="block text-sm font-medium text-gray-500 mb-2">Payment Method</label>
                        <div className="space-y-2">
                            {methods.map((m) => {
                                const Icon = m.icon;
                                return (
                                    <button
                                        key={m.id}
                                        onClick={() => setMethod(m.id)}
                                        className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-colors ${method === m.id
                                                ? 'border-primary bg-primary/5'
                                                : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <Icon className={`w-5 h-5 ${method === m.id ? 'text-primary' : 'text-gray-400'}`} />
                                            <span className="font-medium text-gray-900">{m.name}</span>
                                        </div>
                                        <span className="text-sm text-gray-500">Fee: {m.fee}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Deposit Button */}
                    <button
                        onClick={handleDeposit}
                        disabled={!amount}
                        className="w-full py-4 bg-gradient-to-r from-primary to-primary-dark text-white font-bold rounded-xl shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        Deposit ${amount || '0'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DepositModal;
