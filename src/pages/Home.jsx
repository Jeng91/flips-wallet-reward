import React, { useState, useMemo } from 'react';
import { Search, Star, MapPin, Calendar, Film, Gift, Sparkles, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCategory } from '../context/CategoryContext';
import { privilegePackages, defaultWalletData, investments } from '../data/mockData';
import { MAIN_CATEGORIES, PRIVILEGE_CATEGORIES } from '../config/theme';
import PrivilegeCard from '../components/privileges/PrivilegeCard';
import PrivilegeDetailModal from '../components/privileges/PrivilegeDetailModal';

const Home = () => {
    const { activeMainCategory } = useCategory();
    const [activeSubCategory, setActiveSubCategory] = useState('all');
    const [colestaiFilter, setColestaiFilter] = useState('all'); // 'all' | 'my' | 'movie-1' | 'movie-2' etc.
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedPrivilege, setSelectedPrivilege] = useState(null);
    const [showDetail, setShowDetail] = useState(false);

    // Get available movie investments for Colestai
    const movieInvestments = useMemo(() => {
        return investments.filter(inv => inv.type === 'Movie');
    }, []);

    // Calculate user's total earned FLIPS across all movies
    const userTotalFlips = useMemo(() => {
        return movieInvestments.reduce((sum, inv) => sum + (inv.earnedFlips || 0), 0);
    }, [movieInvestments]);

    // Movies user has invested in (has earned FLIPS)
    const userInvestedMovies = useMemo(() => {
        return movieInvestments.filter(inv => inv.earnedFlips > 0);
    }, [movieInvestments]);

    // Reset filter when switching categories
    React.useEffect(() => {
        if (activeMainCategory === 'colestai') {
            setColestaiFilter('all');
        }
    }, [activeMainCategory]);

    // Filter privileges based on selected categories
    const filteredPrivileges = useMemo(() => {
        let filtered = [...privilegePackages];

        // Filter by main category
        if (activeMainCategory !== 'flipsid') {
            filtered = filtered.filter(p => p.mainCategory === activeMainCategory);
        }

        // For Colestai: Apply colestaiFilter
        if (activeMainCategory === 'colestai' && colestaiFilter !== 'all') {
            if (colestaiFilter === 'my') {
                // Only rewards user CAN claim (has FLIPS for)
                filtered = filtered.filter(p => {
                    const reqIds = p.allowedInvestmentIds || [];
                    if (reqIds.length === 0) return true; // Universal
                    return reqIds.some(id => {
                        const inv = investments.find(i => i.id === id);
                        return inv && inv.earnedFlips > 0;
                    });
                });
            } else if (colestaiFilter === 'universal') {
                // Universal rewards only (not tied to specific movie)
                filtered = filtered.filter(p => !p.allowedInvestmentIds || p.allowedInvestmentIds.length === 0);
            } else if (colestaiFilter.startsWith('movie-')) {
                // Specific movie filter
                const movieId = parseInt(colestaiFilter.replace('movie-', ''));
                filtered = filtered.filter(p =>
                    p.allowedInvestmentIds && p.allowedInvestmentIds.includes(movieId)
                );
            }
        }

        // Filter by sub category
        if (activeSubCategory !== 'all') {
            filtered = filtered.filter(p => p.category === activeSubCategory);
        }

        // Filter by search
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(p =>
                p.title.toLowerCase().includes(query) ||
                p.titleTh?.toLowerCase().includes(query) ||
                p.categoryLabel?.toLowerCase().includes(query)
            );
        }

        return filtered;
    }, [activeMainCategory, activeSubCategory, searchQuery, colestaiFilter]);

    // Helper: Check if a privilege is locked (user doesn't have FLIPS for that movie)
    const getPrivilegeLockState = (privilege) => {
        if (activeMainCategory !== 'colestai') return { isLocked: false };

        // Find which investment this privilege requires
        const requiredInvIds = privilege.allowedInvestmentIds || [];

        // CASE 1: Universal Reward (No specific investment required)
        if (requiredInvIds.length === 0) {
            // Unlocked if user has ANY earned FLIPS from ANY movie
            if (userTotalFlips > 0) return { isLocked: false, tag: '🌐 Universal' };
            return {
                isLocked: true,
                lockedMessage: 'Invest in any movie to unlock',
                tag: '🌐 Universal'
            };
        }

        // CASE 2: Exclusive Reward (Specific investment required)
        const reqInv = investments.find(i => i.id === requiredInvIds[0]);
        const movieTag = reqInv ? `🎬 ${reqInv.name}` : 'Exclusive';

        // Check if user has earnedFlips for the required investment
        const hasFlips = requiredInvIds.some(invId => {
            const inv = investments.find(i => i.id === invId);
            return inv && inv.earnedFlips > 0;
        });

        if (hasFlips) return { isLocked: false, tag: movieTag };

        return {
            isLocked: true,
            lockedMessage: reqInv ? `Invest in ${reqInv.name}` : 'Investment Required',
            tag: movieTag
        };
    };

    // Get sub-categories based on selected main category
    const subCategories = useMemo(() => {
        if (activeMainCategory === 'flipsid') {
            return PRIVILEGE_CATEGORIES.filter(cat => cat.id === 'all');
        }
        return PRIVILEGE_CATEGORIES.filter(
            cat => cat.id === 'all' || cat.mainCategory === activeMainCategory
        );
    }, [activeMainCategory]);

    // Get user's token balance for selected category - DYNAMIC based on selection
    const getTokenInfo = () => {
        switch (activeMainCategory) {
            case 'colestai':
                // Specific movie selected
                if (colestaiFilter.startsWith('movie-')) {
                    const movieId = parseInt(colestaiFilter.replace('movie-', ''));
                    const selectedInv = investments.find(inv => inv.id === movieId);
                    const flips = selectedInv?.earnedFlips || 0;
                    return {
                        name: `${selectedInv?.name || 'Movie'} FLIPS`,
                        balance: flips,
                        icon: '/images/flips_token.png',
                        color: flips > 0 ? 'text-cyan-600' : 'text-gray-400',
                        bgColor: 'bg-cyan-50',
                        description: flips > 0 ? `Redeem exclusive ${selectedInv?.name} rewards` : 'Invest to earn FLIPS'
                    };
                }
                // 'All' or 'My Rewards' view - Do not show a misleading total
                return {
                    name: 'Movie Privileges',
                    balance: null, // Hide balance number
                    icon: '/images/flips_token.png',
                    color: 'text-slate-600',
                    bgColor: 'bg-slate-50',
                    description: 'Balances are specific to each movie investment'
                };
            case 'ctrlg':
                const totalTeam = Object.values(defaultWalletData.teamCoins).reduce((a, b) => a + b, 0);
                return {
                    name: 'Team Coins',
                    balance: totalTeam,
                    icon: '/images/ctrlg_token.png',
                    color: 'text-purple-600',
                    bgColor: 'bg-purple-50',
                    description: 'Use Team Coins to redeem gaming rewards'
                };
            case 'tbf':
                return {
                    name: 'TBF',
                    balance: defaultWalletData.tbfCoins,
                    icon: '/images/flips_token.png',
                    color: 'text-blue-600',
                    bgColor: 'bg-blue-50',
                    description: 'Use TBF Coins to redeem yacht experiences'
                };
            default:
                // FLIPS ID (Aggregator) - Show summary of all assets
                const allTeam = Object.values(defaultWalletData.teamCoins).reduce((a, b) => a + b, 0);
                return {
                    type: 'multi',
                    name: 'Eco Assets',
                    flipsBalance: defaultWalletData.totalPoints,
                    ctrlgBalance: allTeam,
                    tbfBalance: defaultWalletData.tbfCoins,
                    bgColor: 'bg-white', // Cleaner look for multi-token
                    description: 'Your combined ecosystem assets'
                };
        }
    };

    const tokenInfo = getTokenInfo();

    const handlePrivilegeClick = (privilege) => {
        setSelectedPrivilege(privilege);
        setShowDetail(true);
    };

    // Reset sub-category when main category changes
    React.useEffect(() => {
        setActiveSubCategory('all');
    }, [activeMainCategory]);

    return (
        <div className="min-h-screen">
            {/* Hero Section - Clean without duplicate tabs */}
            <section className="min-h-[35vh] flex items-center pt-4 pb-6 relative overflow-hidden hero-animated-bg">
                {/* Animated Blobs */}
                <div className="hero-blob hero-blob-1"></div>
                <div className="hero-blob hero-blob-2"></div>

                {/* Floating Decorations */}
                <div className="absolute top-1/4 left-[10%] w-16 h-16 rounded-full glass-card-premium animate-float opacity-80 items-center justify-center hidden md:flex">
                    <i className="fas fa-crown text-blue-500 text-xl"></i>
                </div>
                <div className="absolute bottom-1/4 right-[10%] w-20 h-20 rounded-full glass-card-premium animate-float opacity-80 items-center justify-center hidden md:flex" style={{ animationDelay: '1.5s' }}>
                    <i className="fas fa-gem text-secondary text-2xl"></i>
                </div>

                <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
                    <div className="text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card-premium mb-4 animate-float">
                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                            <span className="text-sm font-medium tracking-wide text-slate-700">Exclusive for Investors</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-extrabold mb-3 leading-tight text-slate-900 drop-shadow-sm">
                            Welcome to FLIPS ID
                        </h1>
                        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto font-light">
                            Exclusive Rewards & Premium Privileges
                        </p>
                    </div>
                </div>
            </section>

            {/* Token Balance Bar - DYNAMIC based on selected category */}
            <div className={`sticky top-16 z-30 ${tokenInfo.bgColor} backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-300`}>
                <div className="max-w-7xl mx-auto px-6 py-3">
                    {tokenInfo.type === 'multi' ? (
                        <div className="flex items-center justify-between overflow-x-auto no-scrollbar gap-4">
                            <div className="flex items-center gap-8">
                                {/* FLIPS */}
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center border border-blue-100 p-1">
                                        <img src="/images/flips_token.png" alt="Flips" className="w-full h-full object-contain" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Flips</p>
                                        <p className="font-bold text-slate-800 text-lg leading-none">{tokenInfo.flipsBalance.toLocaleString()}</p>
                                    </div>
                                </div>
                                {/* Divider */}
                                <div className="h-8 w-px bg-gray-200"></div>
                                {/* CTRL G */}
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center border border-purple-100 p-1">
                                        <img src="/images/ctrlg_token.png" alt="CTRL G" className="w-full h-full object-contain" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">CTRL G</p>
                                        <p className="font-bold text-slate-800 text-lg leading-none">{tokenInfo.ctrlgBalance.toLocaleString()}</p>
                                    </div>
                                </div>
                                {/* Divider */}
                                <div className="h-8 w-px bg-gray-200"></div>
                                {/* TBF */}
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center border border-indigo-100 p-1">
                                        <span className="text-xs font-black text-indigo-600">TBF</span>
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Boat</p>
                                        <p className="font-bold text-slate-800 text-lg leading-none">{tokenInfo.tbfBalance.toLocaleString()}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="hidden lg:block text-xs text-gray-400 font-medium">
                                Multi-Asset Wallet
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <img src={tokenInfo.icon} alt={tokenInfo.name} className="w-8 h-8 object-contain" />
                                <div>
                                    <p className="text-xs text-gray-500">Your {tokenInfo.name} Balance</p>
                                    <p className={`font-bold ${tokenInfo.color}`}>
                                        {tokenInfo.balance !== null ? (
                                            <>
                                                {tokenInfo.balance.toLocaleString()}
                                                <span className="text-gray-400 font-normal ml-1">{tokenInfo.name.split(' ')[0]}</span>
                                            </>
                                        ) : (
                                            <span className="text-sm font-normal text-slate-500">Select a movie to view balance</span>
                                        )}
                                    </p>
                                </div>
                            </div>
                            <div className="text-sm text-gray-500 hidden sm:block">
                                {tokenInfo.description}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* COLESTAI FILTER SECTION */}
            {activeMainCategory === 'colestai' && (
                <section className="py-4 bg-white border-b border-gray-100">
                    <div className="max-w-7xl mx-auto px-6">
                        {/* Promo Banner for Non-Investors */}
                        {userTotalFlips === 0 && (
                            <div className="mb-6 p-6 rounded-2xl bg-gradient-to-r from-primary/10 via-cyan-50 to-primary/5 border border-primary/20">
                                <div className="flex flex-col md:flex-row items-center gap-4">
                                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                                        <Sparkles className="w-8 h-8 text-primary" />
                                    </div>
                                    <div className="flex-1 text-center md:text-left">
                                        <h3 className="text-lg font-bold text-slate-900 mb-1">
                                            Unlock Exclusive Movie Rewards!
                                        </h3>
                                        <p className="text-slate-600 text-sm">
                                            Invest in our movie projects to earn FLIPS tokens and redeem exclusive rewards like premiere tickets, director meet &amp; greets, and more.
                                        </p>
                                    </div>
                                    <Link
                                        to="/wallet"
                                        className="flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                                    >
                                        <TrendingUp className="w-5 h-5" />
                                        View Investments
                                    </Link>
                                </div>
                            </div>
                        )}

                        {/* Filter Controls Header */}
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                {colestaiFilter === 'universal' ? (
                                    <>
                                        <Gift className="w-5 h-5 text-purple-600" />
                                        Universal Privileges
                                    </>
                                ) : (
                                    <>
                                        <Film className="w-5 h-5 text-primary" />
                                        Movie Portfolio & Rewards
                                    </>
                                )}
                            </h3>

                            <div className="flex bg-gray-100 rounded-lg p-1 gap-1">
                                <button
                                    onClick={() => setColestaiFilter('all')}
                                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${colestaiFilter === 'all' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                                >
                                    All Rewards
                                </button>
                                <button
                                    onClick={() => setColestaiFilter('universal')}
                                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${colestaiFilter === 'universal' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                                >
                                    Universal Only
                                </button>
                                {userTotalFlips > 0 && (
                                    <button
                                        onClick={() => setColestaiFilter('my')}
                                        className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${colestaiFilter === 'my' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                                    >
                                        My Investment
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* MOVIE REEL - Horizontal Selection */}
                        {colestaiFilter !== 'universal' && (
                            <div className="relative -mx-6 px-6">
                                <div className="flex overflow-x-auto gap-4 py-4 px-2 no-scrollbar snap-x">
                                    {movieInvestments.map((movie) => {
                                        const isSelected = colestaiFilter === `movie-${movie.id}`;
                                        const hasInvestment = movie.earnedFlips > 0;

                                        return (
                                            <button
                                                key={movie.id}
                                                onClick={() => setColestaiFilter(isSelected ? 'all' : `movie-${movie.id}`)}
                                                className={`relative flex-shrink-0 w-64 h-36 rounded-xl overflow-hidden group snap-center transition-all duration-300 ${isSelected
                                                    ? 'ring-4 ring-primary ring-offset-2 transform scale-[1.02] shadow-xl z-10'
                                                    : 'hover:ring-2 hover:ring-gray-200 hover:scale-[1.01] opacity-90 hover:opacity-100 grayscale-[20%] hover:grayscale-0'
                                                    }`}
                                            >
                                                {/* Poster Background */}
                                                <img
                                                    src={movie.image}
                                                    alt={movie.name}
                                                    className="absolute inset-0 w-full h-full object-cover"
                                                />
                                                <div className={`absolute inset-0 bg-gradient-to-t ${isSelected ? 'from-primary/90 via-primary/40' : 'from-black/90 via-black/40'} to-transparent transition-colors duration-300`}></div>

                                                {/* Selection Indicator */}
                                                {isSelected && (
                                                    <div className="absolute top-2 right-2 bg-white text-primary text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm flex items-center gap-1">
                                                        <Sparkles className="w-3 h-3" /> Selected
                                                    </div>
                                                )}

                                                {/* Card Content */}
                                                <div className="absolute bottom-0 left-0 right-0 p-4 text-left">
                                                    <p className="text-white font-bold text-lg leading-tight mb-1 truncate shadow-sm">{movie.name}</p>

                                                    <div className="flex items-center justify-between">
                                                        {hasInvestment ? (
                                                            <div className="flex items-center gap-1.5">
                                                                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></div>
                                                                <span className="text-cyan-200 text-xs font-medium">Owned</span>
                                                                <span className="text-white font-bold text-sm tracking-wide">{movie.earnedFlips.toLocaleString()} FLIPS</span>
                                                            </div>
                                                        ) : (
                                                            <span className="text-white/60 text-xs flex items-center gap-1 bg-white/10 px-2 py-1 rounded backdrop-blur-sm">
                                                                Invest to Unlock
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>

                                {/* Scroll Hint Gradient */}
                                <div className="absolute right-0 top-0 bottom-6 w-12 bg-gradient-to-l from-white/90 to-transparent pointer-events-none md:hidden"></div>
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* Sub-Category Filter Tabs - Only show if there are subcategories AND NOT Colestai (Colestai uses Movie Filter) */}
            {activeMainCategory !== 'colestai' && subCategories.length > 1 && (
                <section className="py-4 relative bg-gray-50">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="flex overflow-x-auto gap-3 pb-2 px-1 no-scrollbar scroll-smooth">
                            {subCategories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveSubCategory(cat.id)}
                                    className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${activeSubCategory === cat.id
                                        ? 'bg-primary text-white shadow-md'
                                        : 'bg-white text-slate-600 border border-gray-200 hover:border-primary/30 hover:text-primary'
                                        }`}
                                >
                                    <i className={`fas fa-${cat.icon} text-xs`}></i>
                                    <span>{cat.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Privileges Section */}
            <section className="py-10 relative bg-gray-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-8">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900 mb-1">
                                {activeMainCategory === 'flipsid'
                                    ? 'All Privileges'
                                    : (MAIN_CATEGORIES.find(c => c.id === activeMainCategory)?.label || 'Rewards') + ' Rewards'}
                            </h2>
                            <p className="text-slate-500">{filteredPrivileges.length} items available</p>
                        </div>

                        {/* Search */}
                        <div className="flex gap-3 w-full lg:w-auto">
                            <div className="relative flex-1 lg:w-80">
                                <input
                                    type="text"
                                    placeholder="Search privileges..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full px-4 py-3 pl-12 rounded-xl bg-white border border-gray-200 outline-none text-slate-800 placeholder-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                                />
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                            </div>
                        </div>
                    </div>

                    {/* Privileges Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredPrivileges.map((privilege) => {
                            const lockState = getPrivilegeLockState(privilege);
                            return (
                                <PrivilegeCard
                                    key={privilege.id}
                                    privilege={privilege}
                                    onClick={() => handlePrivilegeClick(privilege)}
                                    isLocked={lockState.isLocked}
                                    lockedMessage={lockState.lockedMessage}
                                    movieTag={lockState.tag}
                                />
                            );
                        })}
                    </div>

                    {filteredPrivileges.length === 0 && (
                        <div className="text-center py-20">
                            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <i className="fas fa-search text-3xl text-gray-300"></i>
                            </div>
                            <h3 className="text-xl font-bold text-gray-400">No privileges found</h3>
                            <p className="text-gray-400 mt-2">Try searching with different keywords or select another category</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-white py-8 md:py-12 border-t border-gray-200">
                <div className="max-w-7xl mx-auto px-4 md:px-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
                        <div className="flex items-center gap-3">
                            <img src="/images/logo_new.png" alt="Flips ID" className="h-8 md:h-12 w-auto" />
                        </div>
                        <p className="text-slate-500 text-xs md:text-sm text-center">
                            © 2024 FLIPS ID Corporation. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>

            {/* Privilege Detail Modal */}
            <PrivilegeDetailModal
                isOpen={showDetail}
                onClose={() => setShowDetail(false)}
                privilege={selectedPrivilege}
                userTokenBalance={tokenInfo}
            />
        </div>
    );
};

export default Home;
