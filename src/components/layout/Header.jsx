import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bell, Globe, User, Shield, Crown, Film, Gamepad2, Ship } from 'lucide-react';
import { useCategory } from '../../context/CategoryContext';
import { MAIN_CATEGORIES } from '../../config/theme';
import { defaultWalletData, notifications } from '../../data/mockData';

const Header = () => {
    const location = useLocation();
    const { activeMainCategory, setActiveMainCategory } = useCategory();
    const [showNotifications, setShowNotifications] = useState(false);
    const [language, setLanguage] = useState('TH');

    const toggleLanguage = () => {
        setLanguage(prev => prev === 'TH' ? 'EN' : 'TH');
    };

    const unreadCount = notifications.filter(n => !n.read).length;

    // Get icon component for category
    const getCategoryIcon = (iconName) => {
        switch (iconName) {
            case 'crown': return Crown;
            case 'film': return Film;
            case 'gamepad': return Gamepad2;
            case 'ship': return Ship;
            default: return Crown;
        }
    };

    // Get current token balance based on selected category
    const getTokenDisplay = () => {
        switch (activeMainCategory) {
            case 'colestai':
                return { balance: defaultWalletData.totalPoints, name: 'Flips', icon: '/images/flips_token.png' };
            case 'ctrlg':
                const totalTeam = Object.values(defaultWalletData.teamCoins).reduce((a, b) => a + b, 0);
                return { balance: totalTeam, name: 'Coins', icon: '/images/ctrlg_token.png' };
            case 'tbf':
                return { balance: defaultWalletData.tbfCoins, name: 'TBF', icon: '/images/flips_token.png' };
            default:
                return { balance: defaultWalletData.totalPoints, name: 'Flips', icon: '/images/flips_token.png' };
        }
    };

    const tokenDisplay = getTokenDisplay();

    // Only show category tabs on home page
    const showCategoryTabs = location.pathname === '/';

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-white/20 transition-all duration-300">
            <nav className="max-w-7xl mx-auto px-4 md:px-6">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group flex-shrink-0">
                        <img
                            src="/images/logo_new.png"
                            alt="Flips ID"
                            className="h-10 md:h-12 w-auto group-hover:scale-105 transition-transform duration-300"
                        />
                    </Link>

                    {/* Main Category Tabs (Desktop) - Only on Home page */}
                    {showCategoryTabs && (
                        <div className="hidden md:flex items-center justify-center flex-1 px-8">
                            <div className="flex items-center gap-1 bg-gray-50/80 rounded-full p-1 border border-gray-100">
                                {MAIN_CATEGORIES.map((cat) => {
                                    const IconComponent = getCategoryIcon(cat.icon);
                                    const isActive = activeMainCategory === cat.id;
                                    return (
                                        <button
                                            key={cat.id}
                                            onClick={() => setActiveMainCategory(cat.id)}
                                            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                        ${isActive
                                                    ? 'bg-primary text-white shadow-md'
                                                    : 'text-slate-500 hover:text-primary hover:bg-blue-50'
                                                }`}
                                        >
                                            <IconComponent className="w-4 h-4" />
                                            <span>{cat.label}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Right Actions */}
                    <div className="flex items-center gap-2 md:gap-3">
                        {/* Notification Bell */}
                        <div className="relative">
                            <button
                                onClick={() => setShowNotifications(!showNotifications)}
                                className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                            >
                                <Bell className="w-5 h-5 text-gray-500" />
                                {unreadCount > 0 && (
                                    <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full text-[9px] flex items-center justify-center font-bold text-white">
                                        {unreadCount}
                                    </span>
                                )}
                            </button>

                            {/* Notification Dropdown */}
                            {showNotifications && (
                                <div className="absolute top-12 right-0 w-80 md:w-96 bg-white/95 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-2xl z-60 overflow-hidden">
                                    <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                                        <h3 className="font-bold flex items-center gap-2">
                                            <Bell className="w-4 h-4 text-primary" />
                                            Notifications
                                        </h3>
                                        <button className="text-xs text-slate-500 hover:text-primary transition-colors">
                                            Mark all read
                                        </button>
                                    </div>
                                    <div className="max-h-[60vh] overflow-y-auto p-2 space-y-1">
                                        {notifications.map((notif) => (
                                            <div
                                                key={notif.id}
                                                className={`p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors ${!notif.read ? 'bg-blue-50/50' : ''}`}
                                            >
                                                <p className="font-medium text-sm text-slate-800">{notif.title}</p>
                                                <p className="text-xs text-slate-500 mt-1">{notif.description}</p>
                                                <p className="text-[10px] text-slate-400 mt-2">{notif.time}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Language Toggle */}
                        <button
                            onClick={toggleLanguage}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-50 border border-gray-200 hover:bg-gray-100 hover:border-gray-300 transition-all"
                        >
                            <Globe className="w-4 h-4 text-primary" />
                            <span className="text-sm font-medium text-gray-600">{language}</span>
                        </button>

                        {/* Wallet Button */}
                        <Link
                            to="/wallet"
                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 text-slate-700 font-semibold hover:border-primary/30 hover:shadow-md transition-all shadow-sm"
                        >
                            <img src="/images/flips_token.png" alt="Wallet" className="w-5 h-5 object-contain" />
                            <span>My Wallet</span>
                        </Link>

                        {/* Profile Button */}
                        <div className="relative group">
                            <Link
                                to="/profile"
                                className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center hover:scale-110 transition-transform duration-300 overflow-hidden p-0.5"
                            >
                                <img
                                    src="/images/profile_v1.jpg"
                                    alt="Profile"
                                    className="w-full h-full rounded-full object-cover"
                                />
                            </Link>
                            {/* Admin Switch Badge */}
                            <Link
                                to="/admin"
                                title="Switch to Admin"
                                className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-primary rounded-full border-2 border-white flex items-center justify-center text-[8px] text-white hover:bg-white hover:text-primary transition-colors z-20 shadow-md"
                            >
                                <Shield className="w-2.5 h-2.5" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Mobile Category Tabs - Only on Home page */}
                {showCategoryTabs && (
                    <div className="md:hidden overflow-x-auto no-scrollbar py-2 -mx-4 px-4 border-t border-gray-50">
                        <div className="flex items-center gap-1 w-max">
                            {MAIN_CATEGORIES.map((cat) => {
                                const IconComponent = getCategoryIcon(cat.icon);
                                const isActive = activeMainCategory === cat.id;
                                return (
                                    <button
                                        key={cat.id}
                                        onClick={() => setActiveMainCategory(cat.id)}
                                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 whitespace-nowrap
                      ${isActive
                                                ? 'bg-primary text-white shadow-sm'
                                                : 'bg-gray-100 text-slate-500'
                                            }`}
                                    >
                                        <IconComponent className="w-3 h-3" />
                                        <span>{cat.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Header;
