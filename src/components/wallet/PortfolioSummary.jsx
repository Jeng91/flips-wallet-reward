import React from 'react';
import { TrendingUp } from 'lucide-react';
import { walletBalance } from '../../data/mockData';

const PortfolioSummary = () => {
    return (
        <div className="bg-gradient-to-br from-primary-dark via-brand-navy to-primary-dark rounded-3xl p-6 md:p-8 mb-6 relative overflow-hidden text-white shadow-xl shadow-blue-900/10">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-primary/5 rounded-full blur-2xl"></div>

            <div className="relative z-10">
                <p className="text-white/70 text-sm font-medium mb-1">Total Portfolio Value</p>
                <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-4xl md:text-5xl font-bold tracking-tight">
                        ${walletBalance.totalUsd.toLocaleString()}
                    </span>
                </div>
                <div className="flex items-center gap-2 text-primary">
                    <TrendingUp className="w-4 h-4" />
                    <span className="font-semibold">+{walletBalance.growth}%</span>
                    <span className="text-white/50 text-sm">this month</span>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                        <p className="text-white/60 text-xs mb-1">FIAT Balance</p>
                        <p className="font-bold">${walletBalance.fiat.amount.toLocaleString()}</p>
                    </div>
                    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                        <p className="text-white/60 text-xs mb-1">Crypto</p>
                        <p className="font-bold">${walletBalance.crypto.amount.toLocaleString()}</p>
                    </div>
                    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                        <p className="text-white/60 text-xs mb-1">Assets Value</p>
                        <p className="font-bold">${walletBalance.assets.amount.toLocaleString()}</p>
                    </div>
                    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                        <p className="text-white/60 text-xs mb-1">ROI</p>
                        <p className="font-bold text-primary">+{walletBalance.roi.percentage}%</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PortfolioSummary;
