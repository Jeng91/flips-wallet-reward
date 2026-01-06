import React from 'react';
import { Star, MapPin, Calendar, Lock } from 'lucide-react';
import { handleImageError } from '../../utils/dataHelpers';

const PrivilegeCard = ({ privilege, onClick, isLocked = false, lockedMessage = '', movieTag }) => {
    // Determine currency display based on category
    const getCurrencyDisplay = () => {
        switch (privilege.mainCategory) {
            case 'ctrlg':
                return { icon: '/images/ctrlg_token.png', name: 'CTRL G' };
            case 'tbf':
                return { icon: '/images/flips_token.png', name: 'TBF' };
            default:
                return { icon: '/images/flips_token.png', name: 'Flips' };
        }
    };

    const currency = getCurrencyDisplay();

    return (
        <div
            onClick={onClick}
            className={`bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300 cursor-pointer group relative ${isLocked ? 'opacity-75' : ''}`}
        >
            {/* Locked Overlay */}
            {isLocked && (
                <div className="absolute inset-0 z-10 bg-gray-900/10 backdrop-blur-[1px] flex items-end justify-center pointer-events-none">
                    <div className="bg-slate-800/90 text-white text-xs font-medium px-3 py-2 rounded-t-lg flex items-center gap-2">
                        <Lock className="w-3 h-3" />
                        <span>{lockedMessage || 'Invest to Unlock'}</span>
                    </div>
                </div>
            )}

            {/* Image */}
            <div className="relative h-48 overflow-hidden">
                <img
                    src={privilege.image}
                    alt={privilege.title}
                    className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${isLocked ? 'grayscale-[30%]' : ''}`}
                    onError={(e) => handleImageError(e, privilege.title)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs font-semibold text-slate-700 shadow-sm">
                        {privilege.categoryLabel}
                    </span>
                </div>

                {/* Locked Badge */}
                <div className="absolute top-3 right-3 flex gap-2">
                    {isLocked && (
                        <span className="px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-700 text-white border border-slate-600 flex items-center gap-1">
                            <Lock className="w-3 h-3" /> View Only
                        </span>
                    )}
                </div>

                {/* Movie/Universal Tag */}
                {(movieTag || privilege.movieName) && (
                    <div className="absolute bottom-3 left-3">
                        <span className={`px-2 py-1.5 rounded-lg text-[10px] font-bold shadow-sm backdrop-blur-sm ${movieTag?.includes('Universal')
                            ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white'
                            : 'bg-slate-900/80 text-white'
                            }`}>
                            {movieTag || `🎬 ${privilege.movieName}`}
                        </span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-1">
                <h3 className={`font-bold text-lg mb-2 leading-tight line-clamp-2 min-h-[3rem] transition-colors ${isLocked ? 'text-slate-600' : 'text-slate-900 group-hover:text-primary'}`}>
                    {privilege.title}
                </h3>

                <p className="text-sm text-slate-500 mb-4 line-clamp-2 min-h-[2.5rem]">
                    {privilege.subtitle}
                </p>

                {/* Meta Info */}
                <div className="flex flex-wrap gap-2 mb-4 mt-auto">
                    {privilege.venue && (
                        <span className="flex items-center gap-1 text-xs text-slate-400">
                            <MapPin className="w-3 h-3" />
                            {privilege.venue}
                        </span>
                    )}
                    {privilege.eventDate && (
                        <span className="flex items-center gap-1 text-xs text-slate-400">
                            <Calendar className="w-3 h-3" />
                            {privilege.eventDate}
                        </span>
                    )}
                </div>

                {/* Price */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                    <div className="flex items-center gap-2">
                        <img src={currency.icon} alt={currency.name} className="w-5 h-5 object-contain" />
                        <span className={`text-lg font-bold ${isLocked ? 'text-slate-500' : 'text-slate-900'}`}>{privilege.price.toLocaleString()}</span>
                        <span className="text-xs text-slate-400">{currency.name}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivilegeCard;