import React from 'react';
import { ExternalLink, Coins } from 'lucide-react';
import { INVESTMENT_STATUS_STYLES } from '../../config/styles';
import { handleImageError } from '../../utils/dataHelpers';

const InvestmentCard = ({ inv }) => {
    // Get status style from centralized map
    const statusStyle = INVESTMENT_STATUS_STYLES[inv.status] || INVESTMENT_STATUS_STYLES['In Progress'];

    return (
        <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all group">
            <div className="relative h-32 overflow-hidden bg-gray-200">
                <img
                    src={inv.image}
                    alt={inv.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => handleImageError(e, inv.name)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-white font-bold">{inv.name}</p>
                    <p className="text-white/70 text-xs">{inv.type}</p>
                </div>
                <span className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-bold ${statusStyle.bg} ${statusStyle.text}`}>
                    {inv.status}
                </span>
            </div>
            <div className="p-4">
                {/* Token Holdings */}
                <div className="flex items-center gap-3 mb-3 p-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                        <Coins className="w-5 h-5 text-indigo-500" />
                    </div>
                    <div className="flex-1">
                        <p className="text-xs text-indigo-600 font-medium">Your Token Holdings</p>
                        <p className="text-lg font-bold text-gray-900">
                            {inv.tokenBalance?.toLocaleString() || 0} <span className="text-indigo-500 text-sm">{inv.tokenSymbol || 'TKN'}</span>
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-gray-400">@ ฿{inv.tokenPrice?.toLocaleString() || 0}</p>
                        <p className="text-sm font-semibold text-gray-700">฿{((inv.tokenBalance || 0) * (inv.tokenPrice || 0)).toLocaleString()}</p>
                    </div>
                </div>

                {/* Funding Progress */}
                {inv.funding && (
                    <div className="mb-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
                        <div className="flex justify-between text-xs mb-1.5">
                            <span className="text-blue-600 font-medium">Funding Progress</span>
                            <span className="font-bold text-blue-900">{inv.funding.progress}%</span>
                        </div>
                        <div className="h-2 bg-blue-200 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500"
                                style={{ width: `${inv.funding.progress}%` }}
                            ></div>
                        </div>
                        <div className="flex justify-between text-xs mt-1.5">
                            <span className="text-gray-600">{inv.funding.totalInvestors?.toLocaleString() || 0} investors</span>
                            <span className="text-gray-600 font-medium">{inv.funding.myOwnership?.toFixed(1)}% owned</span>
                        </div>
                    </div>
                )}

                {/* Reward Tier Badge */}
                {inv.rewards?.myTier && (
                    <div className="mb-3">
                        <div
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold"
                            style={{
                                backgroundColor: (inv.rewards.tiers.find(t => t.name === inv.rewards.myTier)?.color || '#ffd700') + '20',
                                color: inv.rewards.tiers.find(t => t.name === inv.rewards.myTier)?.color || '#ffd700'
                            }}
                        >
                            <i className="fas fa-crown"></i>
                            {inv.rewards.myTier} Tier
                            {inv.rewards.stats.totalAvailable > 0 && (
                                <span className="text-[10px] font-normal opacity-80">• {inv.rewards.stats.totalAvailable} rewards</span>
                            )}
                        </div>
                    </div>
                )}

                <div className="flex justify-between items-center mb-3">
                    <div>
                        <p className="text-xs text-gray-400">Invested</p>
                        <p className="font-bold text-gray-900">฿{inv.invested.toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-gray-400">Return</p>
                        <p className="font-bold text-green-600">฿{inv.returnVal.toLocaleString()}</p>
                    </div>
                </div>

                {/* MOVIE PRODUCTION TIMELINE */}
                {inv.timeline && inv.timeline.steps && inv.timeline.steps.length > 0 && (
                    <div className="mb-4 bg-slate-50 rounded-xl p-3 border border-slate-100">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Production Status</span>
                            <div className="flex items-center gap-1.5">
                                <span className={`relative flex h-2 w-2`}>
                                    {(inv.timeline.currentStatus === 'filming' || inv.timeline.currentStatus === 'funding') &&
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                                            style={{
                                                backgroundColor: inv.timeline.statusColor === 'blue' ? '#3b82f6' :
                                                    inv.timeline.statusColor === 'orange' ? '#f97316' :
                                                        inv.timeline.statusColor === 'yellow' ? '#eab308' : '#10b981'
                                            }}
                                        ></span>
                                    }
                                    <span className="relative inline-flex rounded-full h-2 w-2"
                                        style={{
                                            backgroundColor: inv.timeline.statusColor === 'blue' ? '#3b82f6' :
                                                inv.timeline.statusColor === 'orange' ? '#f97316' :
                                                    inv.timeline.statusColor === 'yellow' ? '#eab308' : '#10b981'
                                        }}
                                    ></span>
                                </span>
                                <span className="text-xs font-bold text-slate-700">
                                    {inv.timeline.steps[Math.min(inv.timeline.currentStep, inv.timeline.steps.length - 1)]?.label || inv.status}
                                </span>
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="relative h-1.5 bg-slate-200 rounded-full mb-3 overflow-hidden">
                            <div
                                className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-1000"
                                style={{ width: `${((inv.timeline.currentStep + 1) / inv.timeline.steps.length) * 100}%` }}
                            ></div>
                        </div>

                        {/* Milestone Info */}
                        <div className="grid grid-cols-2 gap-2 text-xs">
                            <div>
                                <p className="text-slate-400 scale-90 origin-left">Next Milestone</p>
                                <p className="font-semibold text-slate-800 truncate" title={inv.timeline.nextMilestone}>
                                    {inv.timeline.nextMilestone || 'TBD'}
                                </p>
                            </div>
                            <div className="text-right border-l border-slate-200 pl-2">
                                <p className="text-slate-400 scale-90 origin-right">Est. Completion</p>
                                <p className="font-semibold text-slate-800">
                                    {inv.timeline.steps[inv.timeline.steps.length - 1]?.date || 'TBD'}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-green-600">+{inv.roi}%</span>
                        <span className="text-xs text-gray-400">ROI</span>
                    </div>
                    <button className="flex items-center gap-1 text-primary font-medium text-sm hover:underline">
                        Details <ExternalLink className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InvestmentCard;