import React from 'react';
import { ExternalLink, Coins } from 'lucide-react';

const InvestmentCard = ({ inv }) => {
    return (
        <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all group">
            <div className="relative h-32 overflow-hidden">
                <img src={inv.image} alt={inv.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-white font-bold">{inv.name}</p>
                    <p className="text-white/70 text-xs">{inv.type}</p>
                </div>
                <span className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-bold ${inv.status === 'Completed' ? 'bg-green-500 text-white' :
                    inv.status === 'In Progress' ? 'bg-blue-500 text-white' :
                        'bg-gray-500 text-white'
                    }`}>
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
                {inv.timeline && (
                    <div className="mb-4 bg-slate-50 rounded-xl p-3 border border-slate-100">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Production Status</span>
                            <div className="flex items-center gap-1.5">
                                <span className={`relative flex h-2 w-2`}>
                                    {inv.status === 'In Progress' && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>}
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                </span>
                                <span className="text-xs font-bold text-slate-700">{inv.timeline.steps[inv.timeline.currentStep].label}</span>
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
                                    {inv.timeline.nextMilestone}
                                </p>
                            </div>
                            <div className="text-right border-l border-slate-200 pl-2">
                                <p className="text-slate-400 scale-90 origin-right">Est. Completion</p>
                                <p className="font-semibold text-slate-800">
                                    {inv.timeline.steps[inv.timeline.steps.length - 1].date}
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
