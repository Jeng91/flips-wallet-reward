// ============================================
// MERGED MOCK DATA - HashPack + Wallet Reward
// All data preserved exactly as-is
// ============================================

// =============================================
// FROM HASHPACK - User & Wallet Data
// =============================================

export const userProfile = {
    name: "James Angle",
    email: "James@gmail.com",
    phone: "095-3332-121",
    dob: "23 Jan 1990",
    age: 35,
    address: "Chiang Mai, Thailand 50300",
    kycStatus: "Verified",
    walletConnected: true,
    avatar: "https://i.pravatar.cc/150?u=james",
    addresses: [
        {
            id: 1,
            label: "Home",
            name: "James Angle",
            phone: "095-3332-121",
            address: "123 Condo One, Nimman Road, Suthep, Mueang, Chiang Mai 50200",
            isDefault: true
        },
        {
            id: 2,
            label: "Office",
            name: "James Angle",
            phone: "095-3332-121",
            address: "888 Tech Park, Huay Kaew Road, Chang Phueak, Mueang, Chiang Mai 50300",
            isDefault: false
        }
    ]
};

export const walletBalance = {

    totalUsd: 3620000.00,
    growth: 2.4,
    fiat: {
        amount: 245000.00,
        currency: "USD",
        growth: 1.2
    },
    crypto: {
        amount: 158000.00,
        growth: 3.5
    },
    trx: {
        amount: 24582.00,
        currency: "TRX"
    },
    assets: {
        amount: 3200000.00,
        growth: 3.5
    },
    roi: {
        percentage: 18.2,
        details: "Since Jan 1, 2024"
    }
};

export const investmentStats = {
    totalValueBTC: "125,000,000",
    totalValueUSD: "3,620,000",
    roi: 185,
    profitBTC: "231,250,000",
    activeProjects: 8,
    totalProfitLabel: "Total Profit Generated"
};

export const availableNetworks = [
    {
        id: "trx",
        name: "Tron",
        symbol: "TRX",
        type: "Network",
        balance: 24582.00,
        price: 0.11,
        change24h: 0.8,
        color: "bg-red-500"
    }
];

export const tokens = [
    {
        id: "flips",
        name: "FLIPS Token",
        symbol: "FLIPS",
        type: "Utility",
        balance: 8500,
        price: 0.15,
        change24h: 5.2,
        icon: "gem",
        color: "bg-cyan-500"
    },
    {
        id: "tbf",
        name: "TBFC (Yacht Club)",
        symbol: "TBFC",
        type: "Partner",
        balance: 0,
        price: 5.50,
        change24h: 0,
        icon: "anchor",
        color: "bg-blue-800",
        claimable: { usdt: 0, flips: 0 }
    },
    {
        id: "inv-movie",
        name: "Bad Genius 2 Invest",
        symbol: "BG2",
        type: "Investment",
        balance: 5000,
        price: 1.00,
        change24h: 0,
        icon: "clapperboard",
        color: "bg-indigo-500",
        claimable: { usdt: 120.50, flips: 50 }
    },
    {
        id: "inv-condo",
        name: "Luxury Condo Sukhumvit",
        symbol: "LCS",
        type: "Investment",
        balance: 10,
        price: 3000.00,
        change24h: 2.1,
        icon: "building",
        color: "bg-emerald-500",
        claimable: { usdt: 0, flips: 0 }
    }
];

export const transactions = [
    // TRX Transactions
    {
        id: "tx1",
        type: "Transfer",
        title: "Transfer Coins",
        date: "Today, 10:42 AM",
        amount: -14.99,
        currency: "USD",
        tokenId: "trx",
        status: "Success",
        icon: "arrow-right-circle"
    },
    {
        id: "tx2",
        type: "Transfer",
        title: "Transfer Coins",
        date: "Today, 09:15 AM",
        amount: 500.00,
        currency: "USD",
        tokenId: "trx",
        status: "Pending",
        icon: "wallet"
    },
    {
        id: "tx3",
        type: "Withdraw",
        title: "Withdraw",
        date: "Yesterday, 08:30 PM",
        amount: -120.00,
        currency: "USD",
        tokenId: "trx",
        status: "Failed",
        icon: "download"
    },
    {
        id: "tx4",
        type: "Deposit",
        title: "Deposit Coins",
        date: "Yesterday, 11:00 AM",
        amount: 50.00,
        currency: "USD",
        tokenId: "trx",
        status: "Success",
        icon: "plus-circle"
    },
    // FLIPS Transactions
    {
        id: "tx5",
        type: "Transfer",
        title: "Transfer Coins",
        date: "Jan 18, 02:30 PM",
        amount: -1000,
        currency: "FLIPS",
        tokenId: "flips",
        status: "Success",
        icon: "arrow-right-circle"
    },
    {
        id: "tx6",
        type: "Receive",
        title: "Receive Coins",
        date: "Jan 17, 11:00 AM",
        amount: 500,
        currency: "FLIPS",
        tokenId: "flips",
        status: "Success",
        icon: "wallet"
    },
    {
        id: "tx7",
        type: "Transfer",
        title: "Transfer Coins",
        date: "Jan 15, 09:20 AM",
        amount: -2500,
        currency: "FLIPS",
        tokenId: "flips",
        status: "Success",
        icon: "arrow-right-circle"
    },
    {
        id: "tx8",
        type: "Receive",
        title: "Receive Coins",
        date: "Jan 10, 03:45 PM",
        amount: 8500,
        currency: "FLIPS",
        tokenId: "flips",
        status: "Success",
        icon: "wallet"
    },
    // TBFC Transactions
    {
        id: "tx9",
        type: "Transfer",
        title: "Transfer Coins",
        date: "Jan 12, 10:15 AM",
        amount: -50,
        currency: "TBFC",
        tokenId: "tbf",
        status: "Success",
        icon: "arrow-right-circle"
    },
    {
        id: "tx10",
        type: "Receive",
        title: "Receive Coins",
        date: "Jan 05, 02:00 PM",
        amount: 1500,
        currency: "TBFC",
        tokenId: "tbf",
        status: "Success",
        icon: "wallet"
    },
    // Team Coin Transactions - Phoenix
    {
        id: "tx11",
        type: "Receive",
        title: "Receive Coins",
        date: "Jan 16, 04:30 PM",
        amount: 500,
        currency: "PHOENIX",
        tokenId: "phoenix",
        status: "Success",
        icon: "wallet"
    },
    {
        id: "tx12",
        type: "Transfer",
        title: "Transfer Coins",
        date: "Jan 14, 11:00 AM",
        amount: -200,
        currency: "PHOENIX",
        tokenId: "phoenix",
        status: "Success",
        icon: "arrow-right-circle"
    },
    // Team Coin Transactions - Thunder
    {
        id: "tx13",
        type: "Receive",
        title: "Receive Coins",
        date: "Jan 13, 09:00 AM",
        amount: 1000,
        currency: "THUNDER",
        tokenId: "thunder",
        status: "Success",
        icon: "wallet"
    },
    // Investment Token - BG2
    {
        id: "tx14",
        type: "Receive",
        title: "Receive Coins",
        date: "Jan 08, 01:20 PM",
        amount: 5000,
        currency: "BG2",
        tokenId: "inv-movie",
        status: "Success",
        icon: "wallet"
    }
];

export const investments = [
    {
        id: 1,
        name: "Sanam Luang Retro",
        type: "Movie",
        roi: 220,
        invested: 45000000,
        returnVal: 99000000,
        status: "Sold Out",
        image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop",
        tokenId: "inv-movie",
        tokenBalance: 50000,
        earnedFlips: 50000,
        tokenPrice: 10.00,
        tokenSymbol: "SLR",

        // Movie Details for About Section
        director: "พันพิกุล ศรีสมัย",
        genre: "Drama / Romance",
        synopsis: "ภาพยนตร์ที่บอกเล่าเรื่องราวความรักและความทรงจำในยุค 80s ผ่านมุมมองของนักดนตรีหนุ่มที่พบรักครั้งแรกในสนามหลวง ท่ามกลางบรรยากาศเรโทรอันงดงาม เรื่องราวอันซาบซึ้งที่จะพาคุณย้อนเวลากลับไปสู่ยุคทองของวงการเพลงไทย",

        // Funding Progress
        funding: {
            target: 100000000,        // Target funding amount
            current: 100000000,       // Current funding raised (100%)
            progress: 100,            // Percentage funded
            totalSupply: 1000000,     // Total token supply
            myOwnership: 5.0,         // User's ownership % (50000/1000000)
            totalInvestors: 2350      // Total number of investors
        },

        // Enhanced Timeline
        timeline: {
            currentStep: 4,
            currentStatus: "streaming",     // pre-production, filming, post-production, released, streaming
            statusColor: "green",           // green, yellow, blue, orange
            lastUpdated: "2024-01-15",
            lastUpdateDescription: "Now available on Netflix globally",
            steps: [
                { label: "Pre-Prod", date: "Jan '23" },
                { label: "Filming", date: "Jun '23" },
                { label: "Post-Prod", date: "Oct '23" },
                { label: "Release", date: "Dec '23" },
                { label: "Streaming", date: "Now" }
            ],
            nextMilestone: "Global Netflix Launch",
            boxOffice: "$152M"
        },

        // Reward System
        rewards: {
            myTier: "Gold",              // User's current tier based on tokenBalance
            tiers: [
                {
                    name: "Bronze",
                    minTokens: 1000,
                    maxTokens: 9999,
                    benefits: ["Premiere Ticket", "Digital Poster"],
                    color: "#cd7f32"
                },
                {
                    name: "Silver",
                    minTokens: 10000,
                    maxTokens: 49999,
                    benefits: ["VIP Premiere", "Signed Poster", "BTS Access"],
                    color: "#c0c0c0"
                },
                {
                    name: "Gold",
                    minTokens: 50000,
                    maxTokens: 999999,
                    benefits: ["All Silver Benefits", "Meet & Greet", "Movie Credits", "Special Thanks"],
                    color: "#ffd700"
                }
            ],
            available: [
                {
                    id: "premiere-vip",
                    name: "VIP Premiere Ticket",
                    category: "movie-tickets",
                    requiredTier: "Gold",
                    status: "available",
                    expiryDate: "2024-06-15",
                    flipsPrice: 500
                },
                {
                    id: "meet-greet",
                    name: "Director Meet & Greet",
                    category: "meet-greet",
                    requiredTier: "Gold",
                    status: "available",
                    expiryDate: "2024-07-20",
                    flipsPrice: 1500
                },
                {
                    id: "poster-signed",
                    name: "Signed Movie Poster",
                    category: "merchandise",
                    requiredTier: "Silver",
                    status: "available",
                    expiryDate: "2024-12-31",
                    flipsPrice: 400
                }
            ],
            redeemed: [
                {
                    id: "credits",
                    name: "Special Thanks Credit",
                    category: "credits",
                    redeemedDate: "2024-03-10",
                    status: "completed"
                }
            ],
            stats: {
                totalAvailable: 3,
                totalRedeemed: 1,
                progress: 25             // 1/4 rewards redeemed
            }
        }
    },
    {
        id: 2,
        name: "Luang Phee Jazz 4G",
        type: "Movie",
        roi: 49,
        invested: 15000000,
        returnVal: 89000000,
        status: "Sold Out",
        image: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=2070&auto=format&fit=crop",
        tokenId: "inv-movie-2",
        tokenBalance: 15000,
        earnedFlips: 1200,
        tokenPrice: 8.50,
        tokenSymbol: "LPJ",

        // Movie Details for About Section
        director: "พจน์ อานนท์",
        genre: "Comedy / Horror",
        synopsis: "ภาคต่อสุดฮาของซีรีส์หลวงพี่แจ๊ส เมื่อหลวงพี่ต้องเผชิญหน้ากับผีร้ายในยุคดิจิทัล พร้อมเทคโนโลยี 4G ที่ทำให้ทุกอย่างวุ่นวายมากขึ้น รับรองขำกลิ้งลิ้นทั้งโรง!",

        funding: {
            target: 50000000,
            current: 50000000,
            progress: 100,
            totalSupply: 500000,
            myOwnership: 3.0,
            totalInvestors: 1890
        },

        timeline: {
            currentStep: 3,
            currentStatus: "post-production",
            statusColor: "yellow",
            lastUpdated: "2024-01-20",
            lastUpdateDescription: "Editing phase 65% complete, sound mixing in progress",
            steps: [
                { label: "Scripting", date: "Q1 '23" },
                { label: "Casting", date: "Q2 '23" },
                { label: "Filming", date: "Q4 '23" },
                { label: "Editing", date: "Current" },
                { label: "Premiere", date: "Q3 '24" }
            ],
            nextMilestone: "Official Trailer Release",
            boxOffice: "N/A"
        },

        rewards: {
            myTier: "Silver",
            tiers: [
                {
                    name: "Bronze",
                    minTokens: 1000,
                    maxTokens: 9999,
                    benefits: ["Standard Premiere Ticket", "Digital Poster"],
                    color: "#cd7f32"
                },
                {
                    name: "Silver",
                    minTokens: 10000,
                    maxTokens: 49999,
                    benefits: ["VIP Premiere", "Signed Poster", "BTS Photo Gallery"],
                    color: "#c0c0c0"
                },
                {
                    name: "Gold",
                    minTokens: 50000,
                    maxTokens: 999999,
                    benefits: ["All Silver Benefits", "Cast Meet & Greet", "Associate Producer Credit"],
                    color: "#ffd700"
                }
            ],
            available: [
                {
                    id: "premiere-silver",
                    name: "Silver Tier Premiere Ticket",
                    category: "movie-tickets",
                    requiredTier: "Silver",
                    status: "available",
                    expiryDate: "2024-09-30",
                    flipsPrice: 350
                },
                {
                    id: "poster-set",
                    name: "Limited Edition Poster Set",
                    category: "merchandise",
                    requiredTier: "Silver",
                    status: "available",
                    expiryDate: "2024-12-31",
                    flipsPrice: 600
                }
            ],
            redeemed: [],
            stats: {
                totalAvailable: 2,
                totalRedeemed: 0,
                progress: 0
            }
        }
    },
    {
        id: 3,
        name: "Ong Bak Remastered",
        type: "Movie",
        roi: 118,
        invested: 115000000,
        returnVal: 55600000,
        status: "In Progress",
        image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2025&auto=format&fit=crop",
        tokenId: "inv-movie-3",
        tokenBalance: 100000,
        earnedFlips: 0,
        tokenPrice: 12.00,
        tokenSymbol: "OBR",

        // Movie Details for About Section
        director: "ปรัชญา ปิ่นแก้ว",
        genre: "Action / Martial Arts",
        synopsis: "การรีมาสเตอร์ครั้งยิ่งใหญ่ของภาพยนตร์มวยไทยระดับตำนาน นำแสดงโดย Tony Jaa กลับมาบนจอยักษ์ IMAX พร้อมคุณภาพเสียงและภาพระดับสูงสุด สัมผัสประสบการณ์แอ็คชั่นสุดมันส์อีกครั้งในรูปแบบที่ไม่เคยมีมาก่อน!",

        funding: {
            target: 200000000,
            current: 200000000,
            progress: 100,
            totalSupply: 1500000,
            myOwnership: 6.67,
            totalInvestors: 3200
        },

        timeline: {
            currentStep: 2,
            currentStatus: "post-production",
            statusColor: "yellow",
            lastUpdated: "2024-01-18",
            lastUpdateDescription: "Sound remastering 80% complete, IMAX version in progress",
            steps: [
                { label: "Licensing", date: "Done" },
                { label: "Restoration", date: "Done" },
                { label: "Sound", date: "In Progress" },
                { label: "Marketing", date: "Q3 '24" },
                { label: "Re-Release", date: "Q4 '24" }
            ],
            nextMilestone: "IMAX Trailer Drop",
            boxOffice: "Est. $50M"
        },

        rewards: {
            myTier: "Gold",
            tiers: [
                {
                    name: "Bronze",
                    minTokens: 5000,
                    maxTokens: 19999,
                    benefits: ["IMAX Premiere Ticket", "Remastered Poster"],
                    color: "#cd7f32"
                },
                {
                    name: "Silver",
                    minTokens: 20000,
                    maxTokens: 79999,
                    benefits: ["VIP IMAX Premiere", "Collector's Blu-ray", "Tony Jaa Interview Access"],
                    color: "#c0c0c0"
                },
                {
                    name: "Gold",
                    minTokens: 80000,
                    maxTokens: 999999,
                    benefits: ["All Silver Benefits", "Exclusive Screening", "Restoration Team Credits"],
                    color: "#ffd700"
                }
            ],
            available: [
                {
                    id: "imax-premiere",
                    name: "IMAX Premiere VIP Ticket",
                    category: "movie-tickets",
                    requiredTier: "Gold",
                    status: "available",
                    expiryDate: "2024-10-15",
                    flipsPrice: 800
                },
                {
                    id: "bluray-special",
                    name: "Special Edition Blu-ray",
                    category: "merchandise",
                    requiredTier: "Gold",
                    status: "available",
                    expiryDate: "2024-12-31",
                    flipsPrice: 1200
                },
                {
                    id: "restoration-credit",
                    name: "Restoration Team Credit",
                    category: "credits",
                    requiredTier: "Gold",
                    status: "available",
                    expiryDate: "2024-08-30",
                    flipsPrice: 2000
                }
            ],
            redeemed: [],
            stats: {
                totalAvailable: 3,
                totalRedeemed: 0,
                progress: 0
            }
        }
    },
    {
        id: 4,
        name: "Pee Mak Part 2",
        type: "Movie",
        roi: 79,
        invested: 7000000,
        returnVal: 1200000,
        status: "Completed",
        image: "https://images.unsplash.com/photo-1585647347384-2593bc35786b?q=80&w=2070&auto=format&fit=crop",
        tokenId: "inv-movie-4",
        tokenBalance: 25000,
        earnedFlips: 0,
        tokenPrice: 5.00,
        tokenSymbol: "PM2",

        funding: {
            target: 80000000,
            current: 80000000,
            progress: 100,
            totalSupply: 800000,
            myOwnership: 3.13,
            totalInvestors: 1650
        },

        timeline: {
            currentStep: 1,
            currentStatus: "pre-production",
            statusColor: "blue",
            lastUpdated: "2024-01-22",
            lastUpdateDescription: "Main cast confirmed, script revision 90% complete",
            steps: [
                { label: "Concept", date: "Done" },
                { label: "Casting", date: "Current" },
                { label: "Pre-Prod", date: "Q2 '24" },
                { label: "Filming", date: "Q3 '24" },
                { label: "Release", date: "2025" }
            ],
            nextMilestone: "Lead Actor Announcement",
            boxOffice: "N/A"
        },

        rewards: {
            myTier: "Silver",
            tiers: [
                {
                    name: "Bronze",
                    minTokens: 2000,
                    maxTokens: 14999,
                    benefits: ["Premiere Access", "Digital Wallpaper"],
                    color: "#cd7f32"
                },
                {
                    name: "Silver",
                    minTokens: 15000,
                    maxTokens: 49999,
                    benefits: ["VIP Premiere", "Cast Signed Poster", "Making Of Documentary"],
                    color: "#c0c0c0"
                },
                {
                    name: "Gold",
                    minTokens: 50000,
                    maxTokens: 999999,
                    benefits: ["All Silver Benefits", "Set Visit Pass", "Executive Producer Credit"],
                    color: "#ffd700"
                }
            ],
            available: [
                {
                    id: "premiere-access",
                    name: "Premiere Premiere Ticket",
                    category: "movie-tickets",
                    requiredTier: "Silver",
                    status: "available",
                    expiryDate: "2025-03-31",
                    flipsPrice: 300
                },
                {
                    id: "making-of",
                    name: "Making Of Documentary Access",
                    category: "digital-content",
                    requiredTier: "Silver",
                    status: "available",
                    expiryDate: "2025-06-30",
                    flipsPrice: 450
                }
            ],
            redeemed: [],
            stats: {
                totalAvailable: 2,
                totalRedeemed: 0,
                progress: 0
            }
        }
    },
    // NEW MOVIES FOR TESTING SCROLL
    {
        id: 5,
        name: "Bangkok Midnight",
        type: "Movie",
        roi: 85,
        invested: 25000000,
        returnVal: 46000000,
        status: "In Progress",
        image: "https://placehold.co/600x400/1e1b4b/e0e7ff?text=Bangkok+Midnight",
        tokenId: "inv-movie-5",
        tokenBalance: 30000,
        earnedFlips: 8500,
        tokenPrice: 7.50,
        tokenSymbol: "BKM",

        funding: {
            target: 75000000,
            current: 75000000,
            progress: 100,
            totalSupply: 600000,
            myOwnership: 5.0,
            totalInvestors: 1420
        },

        timeline: {
            currentStep: 2,
            currentStatus: "filming",
            statusColor: "orange",
            lastUpdated: "2024-01-19",
            lastUpdateDescription: "Principal photography 40% complete, Bangkok locations finished",
            steps: [
                { label: "Pre-Prod", date: "Done" },
                { label: "Filming", date: "Current" },
                { label: "Post-Prod", date: "Q2 '24" },
                { label: "Premiere", date: "Q4 '24" }
            ],
            nextMilestone: "Official Trailer",
            boxOffice: "N/A"
        },

        rewards: {
            myTier: "Silver",
            tiers: [
                { name: "Bronze", minTokens: 5000, maxTokens: 19999, benefits: ["Premiere Ticket"], color: "#cd7f32" },
                { name: "Silver", minTokens: 20000, maxTokens: 79999, benefits: ["VIP Premiere", "Poster"], color: "#c0c0c0" },
                { name: "Gold", minTokens: 80000, maxTokens: 999999, benefits: ["All Benefits", "Behind Scenes"], color: "#ffd700" }
            ],
            available: [
                { id: "bkm-premiere", name: "Silver Premiere Ticket", category: "movie-tickets", requiredTier: "Silver", status: "available", expiryDate: "2024-12-31", flipsPrice: 400 }
            ],
            redeemed: [],
            stats: { totalAvailable: 1, totalRedeemed: 0, progress: 0 }
        }
    },
    {
        id: 6,
        name: "The Last Samurai TH",
        type: "Movie",
        roi: 150,
        invested: 80000000,
        returnVal: 0,
        status: "Funding",
        image: "https://placehold.co/600x400/7c2d12/fef3c7?text=Last+Samurai+TH",
        tokenId: "inv-movie-6",
        tokenBalance: 0,
        earnedFlips: 0,
        tokenPrice: 15.00,
        tokenSymbol: "LST",

        funding: {
            target: 300000000,
            current: 180000000,
            progress: 60,
            totalSupply: 2000000,
            myOwnership: 0,
            totalInvestors: 890
        },

        timeline: {
            currentStep: 0,
            currentStatus: "funding",
            statusColor: "blue",
            lastUpdated: "2024-01-21",
            lastUpdateDescription: "Funding 60% complete, script finalized",
            steps: [
                { label: "Funding", date: "Current" },
                { label: "Casting", date: "Q2 '24" },
                { label: "Filming", date: "Q3 '24" },
                { label: "Release", date: "2025" }
            ],
            nextMilestone: "Lead Casting Announcement",
            boxOffice: "N/A"
        },

        rewards: {
            myTier: null,
            tiers: [
                { name: "Bronze", minTokens: 10000, maxTokens: 49999, benefits: ["Early Bird Premiere"], color: "#cd7f32" },
                { name: "Silver", minTokens: 50000, maxTokens: 149999, benefits: ["VIP Premiere", "Collector's Edition"], color: "#c0c0c0" },
                { name: "Gold", minTokens: 150000, maxTokens: 999999, benefits: ["All Benefits", "Producer Credit"], color: "#ffd700" }
            ],
            available: [],
            redeemed: [],
            stats: { totalAvailable: 0, totalRedeemed: 0, progress: 0 }
        }
    },
    {
        id: 7,
        name: "Nang Nak Returns",
        type: "Movie",
        roi: 200,
        invested: 35000000,
        returnVal: 70000000,
        status: "Completed",
        image: "https://placehold.co/600x400/1f2937/d1d5db?text=Nang+Nak+Returns",
        tokenId: "inv-movie-7",
        tokenBalance: 45000,
        earnedFlips: 25000,
        tokenPrice: 9.00,
        tokenSymbol: "NNR",

        funding: {
            target: 120000000,
            current: 120000000,
            progress: 100,
            totalSupply: 900000,
            myOwnership: 5.0,
            totalInvestors: 2100
        },

        timeline: {
            currentStep: 5,
            currentStatus: "streaming",
            statusColor: "green",
            lastUpdated: "2024-01-10",
            lastUpdateDescription: "Available on all major streaming platforms",
            steps: [
                { label: "Pre-Prod", date: "Done" },
                { label: "Filming", date: "Done" },
                { label: "Post-Prod", date: "Done" },
                { label: "Release", date: "Done" },
                { label: "Streaming", date: "Now" }
            ],
            nextMilestone: "International Distribution",
            boxOffice: "$89M"
        },

        rewards: {
            myTier: "Silver",
            tiers: [
                { name: "Bronze", minTokens: 5000, maxTokens: 29999, benefits: ["Digital Poster"], color: "#cd7f32" },
                { name: "Silver", minTokens: 30000, maxTokens: 99999, benefits: ["Signed Poster", "Streaming Credits"], color: "#c0c0c0" },
                { name: "Gold", minTokens: 100000, maxTokens: 999999, benefits: ["All Benefits", "Special Thanks"], color: "#ffd700" }
            ],
            available: [
                { id: "nnr-poster", name: "Signed Collector Poster", category: "merchandise", requiredTier: "Silver", status: "available", expiryDate: "2024-12-31", flipsPrice: 550 }
            ],
            redeemed: [
                { id: "streaming-credit", name: "Streaming Platform Credit", category: "credits", redeemedDate: "2024-01-05", status: "completed" }
            ],
            stats: { totalAvailable: 1, totalRedeemed: 1, progress: 50 }
        }
    },
    {
        id: 8,
        name: "Muay Thai Legend",
        type: "Movie",
        roi: 95,
        invested: 50000000,
        returnVal: 0,
        status: "Pre-Production",
        image: "https://placehold.co/600x400/991b1b/fecaca?text=Muay+Thai+Legend",
        tokenId: "inv-movie-8",
        tokenBalance: 60000,
        earnedFlips: 0,
        tokenPrice: 11.00,
        tokenSymbol: "MTL",

        funding: {
            target: 150000000,
            current: 150000000,
            progress: 100,
            totalSupply: 1200000,
            myOwnership: 5.0,
            totalInvestors: 1780
        },

        timeline: {
            currentStep: 1,
            currentStatus: "pre-production",
            statusColor: "blue",
            lastUpdated: "2024-01-20",
            lastUpdateDescription: "Martial arts choreography 70% planned, locations scouted",
            steps: [
                { label: "Script", date: "Done" },
                { label: "Pre-Prod", date: "Current" },
                { label: "Filming", date: "Q2 '24" },
                { label: "Release", date: "2025" }
            ],
            nextMilestone: "Action Choreography Demo",
            boxOffice: "N/A"
        },

        rewards: {
            myTier: "Gold",
            tiers: [
                { name: "Bronze", minTokens: 10000, maxTokens: 39999, benefits: ["Premiere Ticket"], color: "#cd7f32" },
                { name: "Silver", minTokens: 40000, maxTokens: 99999, benefits: ["VIP Premiere", "Training Gear"], color: "#c0c0c0" },
                { name: "Gold", minTokens: 100000, maxTokens: 999999, benefits: ["All Benefits", "Muay Thai Workshop"], color: "#ffd700" }
            ],
            available: [
                { id: "mtl-premiere", name: "Gold VIP Premiere", category: "movie-tickets", requiredTier: "Gold", status: "available", expiryDate: "2025-03-31", flipsPrice: 700 },
                { id: "mtl-workshop", name: "Muay Thai Workshop with Cast", category: "experience", requiredTier: "Gold", status: "available", expiryDate: "2025-06-30", flipsPrice: 1800 }
            ],
            redeemed: [],
            stats: { totalAvailable: 2, totalRedeemed: 0, progress: 0 }
        }
    }
];

export const vouchers = [
    {
        id: 1,
        title: "Luxury Condo (Early Bird)",
        type: "Real Estate",
        partner: "Colestia",
        asset: "1 sqm",
        price: 90000,
        priceAmount: 5000,
        currency: "FLIPS",
        image: "https://placehold.co/600x400/10b981/ffffff?text=Luxury+Condo",
        tier: "Tier 1"
    },
    {
        id: 2,
        title: "Yacht Charter (Off-Peak)",
        type: "Yacht",
        partner: "Yacht Club",
        asset: "4 hrs",
        price: 10000,
        priceAmount: 200,
        currency: "TBFC",
        image: "https://placehold.co/600x400/3b82f6/ffffff?text=Yacht+Charter",
        tier: "Tier 1"
    },
    {
        id: 3,
        title: "5-Star Hotel Night",
        type: "Hotel",
        partner: "Colestia",
        asset: "1 night",
        price: 2500,
        priceAmount: 300,
        currency: "FLIPS",
        image: "https://placehold.co/600x400/f59e0b/ffffff?text=5-Star+Hotel",
        tier: "Tier 1"
    },
    {
        id: 4,
        title: "Exclusive Gala Dinner",
        type: "Event",
        partner: "CtrlG",
        asset: "1 Ticket",
        price: 5000,
        priceAmount: 500,
        currency: "BG2",
        image: "https://placehold.co/600x400/6366f1/ffffff?text=Gala+Dinner",
        tier: "VIP"
    }
];

export const myVouchers = [
    // DIGITAL VOUCHER - Uses QR Code
    {
        id: 101,
        title: "5-Star Hotel Night",
        partner: "Colestia",
        rewardType: "digital",
        category: "Hotel",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=300&h=200",
        purchaseDate: "12 Dec 2024",
        status: "Active",
        code: "H-123-456-789",
        isPhysical: false,
        expiryDate: "12 Dec 2025"
    },
    // PHYSICAL ITEM - Shipping
    {
        id: 102,
        title: "Pro Gaming Headset",
        partner: "CTRL G",
        rewardType: "physical",
        category: "Gaming Gear",
        image: "https://placehold.co/400x200/0891b2/ffffff?text=Gaming+Headset",
        purchaseDate: "04 Jan 2025",
        status: "Shipping",
        trackingId: "TH-88849201",
        carrier: "Kerry Express",
        variantLabel: "Neon Red",
        addressLabel: "Home",
        isPhysical: true
    },
    // PHYSICAL ITEM - Delivered
    {
        id: 103,
        title: "Phoenix Rising Jersey",
        partner: "CTRL G",
        rewardType: "physical",
        category: "Apparel",
        image: "https://placehold.co/400x200/7c3aed/ffffff?text=Phoenix+Jersey",
        purchaseDate: "28 Dec 2024",
        status: "Delivered",
        trackingId: "TH-77712345",
        carrier: "Flash Express",
        variantLabel: "Size L",
        addressLabel: "Office",
        isPhysical: true,
        deliveredDate: "02 Jan 2025"
    },
    // EVENT TICKET - Uses QR Code
    {
        id: 104,
        title: "Premiere Night VIP - Sanam Luang",
        partner: "Colestia",
        rewardType: "event",
        category: "Movie Tickets",
        image: "https://placehold.co/400x200/be185d/ffffff?text=Premiere+VIP",
        purchaseDate: "15 Dec 2024",
        status: "Active",
        code: "E-VIP-SLR-2024",
        isPhysical: false,
        eventDate: "15 Jun 2024",
        venue: "Major Cineplex Paragon"
    },
    // PHYSICAL ITEM - Processing
    {
        id: 105,
        title: "Developer Hoodie",
        partner: "CTRL G",
        rewardType: "physical",
        category: "Apparel",
        image: "https://placehold.co/400x200/1e40af/ffffff?text=Dev+Hoodie",
        purchaseDate: "05 Jan 2025",
        status: "Processing",
        variantLabel: "Size XL",
        addressLabel: "Home",
        isPhysical: true
    }
];

export const loginActivity = [
    {
        id: 1,
        device: "Chrome on Windows",
        location: "Bangkok, Thailand",
        lastLogin: "2 minutes ago",
        current: true
    },
    {
        id: 2,
        device: "Safari on iPhone",
        location: "Chiang Mai, Thailand",
        lastLogin: "3 hours ago",
        current: false
    }
];

export const notifications = [
    {
        id: 1,
        type: "success",
        title: "Transaction completed",
        description: "Your investment of 50,000 in Tech Growth Fund has been successfully processed.",
        time: "1 hour ago",
        read: false
    },
    {
        id: 2,
        type: "warning",
        title: "Password expiring soon",
        description: "Your password will expire in 7 days. We recommend changing it now.",
        time: "3 hours ago",
        read: false
    },
    {
        id: 3,
        type: "info",
        title: "Dividend payment received",
        description: "You've received a dividend payment of 2,450 from your mutual fund investments.",
        time: "2 days ago",
        read: true
    }
];

// =============================================
// FROM WALLET REWARD - Wallet Data
// =============================================

export const defaultWalletData = {
    totalPoints: 50000,
    tbfCoins: 1500,
    teamCoins: {
        phoenix: 2500,
        shadow: 1800,
        thunder: 3200,
        dragon: 1500
    },
    movieTokens: 15,
    gameTokens: 8,
    movieTokenDetails: [
        { id: 1, title: 'Dark Moon Rising', titleTh: 'จันทร์มืด', tokens: 5, image: '/images/privilege_movie_premiere.png', status: 'active', earnedDate: '2024-01-15', source: 'Investment Reward', sourceTh: 'รางวัลจากการลงทุน' },
        { id: 2, title: 'Eternal Shadows', titleTh: 'เงามืดนิรันดร์', tokens: 4, image: '/images/privilege_screening.png', status: 'active', earnedDate: '2024-02-20', source: 'Film Production Bonus', sourceTh: 'โบนัสการผลิตหนัง' },
        { id: 3, title: 'Bangkok Heist', titleTh: 'ปล้นกรุงเทพ', tokens: 3, image: '/images/privilege_meet_director.png', status: 'active', earnedDate: '2024-03-10', source: 'Early Bird Investment', sourceTh: 'ลงทุนช่วง Early Bird' },
        { id: 4, title: 'The Last Dynasty', titleTh: 'ราชวงศ์สุดท้าย', tokens: 3, image: '/images/privilege_bts_vip.png', status: 'active', earnedDate: '2024-04-01', source: 'Limited Promotion', sourceTh: 'โปรโมชันพิเศษ' }
    ],
    gameTokenDetails: [
        { id: 1, title: 'FULL SENSE Jersey', titleTh: 'เสื้อแข่ง FULL SENSE', tokens: 10, image: '/images/privilege_game_weapon.png', status: 'active', earnedDate: '2024-02-01', source: 'Esports Investment', sourceTh: 'การลงทุนอีสปอร์ต' },
        { id: 2, title: 'Meet & Greet Ticket', titleTh: 'บัตร Meet & Greet', tokens: 5, image: '/images/privilege_game_beta.png', status: 'active', earnedDate: '2024-03-15', source: 'Fan Support Bonus', sourceTh: 'โบนัสแฟนคลับ' },
        { id: 3, title: 'Signed Mousepad', titleTh: 'แผ่นรองเมาส์พร้อมลายเซ็น', tokens: 3, image: '/images/privilege_game_character.png', status: 'active', earnedDate: '2024-04-05', source: 'Community Event', sourceTh: 'กิจกรรมชุมชน' }
    ],
    pointsBatches: [
        { id: 1, amount: 20000, source: 'Investment Reward - Gold Tier', earnedDate: '2024-01-15', expiryDate: '2025-06-15', status: 'active' },
        { id: 2, amount: 15000, source: 'Film Production Bonus', earnedDate: '2024-02-20', expiryDate: '2025-08-20', status: 'active' },
        { id: 3, amount: 10000, source: 'Referral Bonus', earnedDate: '2024-03-10', expiryDate: '2025-09-10', status: 'active' },
        { id: 4, amount: 5000, source: 'Limited Time Promotion', earnedDate: '2024-04-01', expiryDate: '2025-05-01', status: 'expiring_soon' },
    ],
    transactions: [
        { type: 'earn', amount: 5000, description: 'Limited Time Promotion', date: '2024-04-01' },
        { type: 'earn', amount: 10000, description: 'Referral Bonus', date: '2024-03-10' },
        { type: 'earn', amount: 15000, description: 'Film Production Bonus', date: '2024-02-20' },
        { type: 'earn', amount: 20000, description: 'Investment Reward - Gold Tier', date: '2024-01-15' },
    ]
};

// =============================================
// FROM WALLET REWARD - Privileges Data
// =============================================

export const privilegePackages = [
    // COLESTAI (MOVIE) PRIVILEGES
    // COLESTAI (MOVIE) PRIVILEGES - Linked to Sanam Luang Retro (invId: 1)
    {
        id: 101,
        title: 'Premiere Night VIP - Sanam Luang Retro',
        titleTh: 'บัตร VIP รอบปฐมทัศน์ - สนามหลวง เรโทร',
        subtitle: 'Exclusive premiere screening',
        subtitleTh: 'ชมภาพยนตร์รอบปฐมทัศน์สุดพิเศษ',
        category: 'movie-tickets',
        categoryLabel: 'Movie Tickets',
        categoryLabelTh: 'บัตรชมภาพยนตร์',
        image: '/images/privilege_movie_premiere.png',
        price: 500,
        currency: 'FLIPS',
        allowedInvestmentIds: [1], // Only for Sanam Luang Retro investors
        rating: 4.9,
        reviews: 156,
        isPhysical: false,
        tier: 'gold',
        movieId: 'sanam-luang-retro',
        movieName: 'Sanam Luang Retro',
        movieNameTh: 'สนามหลวง เรโทร',
        eventDate: '2024-06-15',
        venue: 'Major Cineplex Paragon',
        description: 'Experience the premiere night with VIP seating, welcome drinks, and exclusive meet & greet opportunity.',
        descriptionTh: 'สัมผัสประสบการณ์รอบปฐมทัศน์พร้อมที่นั่ง VIP เครื่องดื่มต้อนรับ และโอกาสพบปะทีมนักแสดง',
        conditions: ['Valid for 1 person', 'Non-transferable', 'Must present QR code at venue'],
        conditionsTh: ['ใช้ได้ 1 ท่าน', 'ไม่สามารถโอนสิทธิ์ได้', 'ต้องแสดง QR code ที่สถานที่'],
        mainCategory: 'colestai'
    },
    {
        id: 102,
        title: 'Director Meet & Greet - Sanam Luang Retro',
        titleTh: 'พบปะผู้กำกับ - สนามหลวง เรโทร',
        subtitle: 'Exclusive session with the director',
        subtitleTh: 'พบปะผู้กำกับแบบเอ็กซ์คลูซีฟ',
        category: 'meet-greet',
        categoryLabel: 'Meet & Greet',
        categoryLabelTh: 'พบทีมผู้สร้าง',
        image: '/images/privilege_meet_director.png',
        price: 1500,
        currency: 'FLIPS',
        allowedInvestmentIds: [1],
        rating: 4.9,
        reviews: 32,
        isPhysical: false,
        tier: 'gold',
        movieId: 'sanam-luang-retro',
        eventDate: '2024-07-20',
        venue: 'FLIPS Studio Bangkok',
        description: 'A once-in-a-lifetime opportunity to meet the director and discuss filmmaking.',
        descriptionTh: 'โอกาสครั้งหนึ่งในชีวิตที่จะพบผู้กำกับและพูดคุยเรื่องการสร้างภาพยนตร์',
        conditions: ['Limited to 20 participants', 'Photo opportunity included', 'Light refreshments provided'],
        conditionsTh: ['จำกัด 20 ท่าน', 'รวมถ่ายรูปร่วมกัน', 'มีอาหารว่างบริการ'],
        mainCategory: 'colestai'
    },
    {
        id: 103,
        title: 'Special Thanks Credit - Sanam Luang Retro',
        titleTh: 'เครดิต Special Thanks - สนามหลวง เรโทร',
        subtitle: 'Your name in Special Thanks section',
        subtitleTh: 'ชื่อของคุณในส่วน Special Thanks',
        category: 'credits',
        categoryLabel: 'Movie Credits',
        categoryLabelTh: 'เครดิตท้ายหนัง',
        image: '/images/privilege_credits.png',
        price: 1000,
        currency: 'FLIPS',
        allowedInvestmentIds: [1],
        rating: 4.8,
        reviews: 234,
        isPhysical: false,
        tier: 'silver',
        movieId: 'sanam-luang-retro',
        description: 'Have your name appear in the Special Thanks section of the movie credits.',
        descriptionTh: 'ชื่อของคุณจะปรากฏในส่วน Special Thanks ของเครดิตท้ายภาพยนตร์',
        conditions: ['Name as registered', 'Permanent credit', 'Certificate provided'],
        conditionsTh: ['ใช้ชื่อตามที่ลงทะเบียน', 'เครดิตถาวร', 'ได้รับใบประกาศนียบัตร'],
        mainCategory: 'colestai'
    },
    {
        id: 104,
        title: 'Movie Poster Collection - Sanam Luang Retro',
        titleTh: 'คอลเลคชั่นโปสเตอร์ - สนามหลวง เรโทร',
        subtitle: 'Signed limited edition posters',
        subtitleTh: 'โปสเตอร์ลิมิเต็ดพร้อมลายเซ็น',
        category: 'merchandise',
        categoryLabel: 'Merchandise',
        categoryLabelTh: 'สินค้าที่ระลึก',
        image: '/images/privilege_merch_poster.png',
        price: 400,
        currency: 'FLIPS',
        allowedInvestmentIds: [1],
        rating: 4.7,
        reviews: 156,
        isPhysical: true,
        tier: 'silver',
        description: 'Set of 3 limited edition movie posters signed by the cast.',
        descriptionTh: 'ชุดโปสเตอร์ลิมิเต็ด 3 แบบพร้อมลายเซ็นนักแสดง',
        conditions: ['Ships within 7 days', 'Certificate of authenticity', 'Protective tube packaging'],
        conditionsTh: ['จัดส่งภายใน 7 วัน', 'ใบรับรองความแท้', 'บรรจุในหลอดป้องกัน'],
        variants: [
            { id: 'v1', label: 'Standard Set', priceModifier: 0 },
            { id: 'v2', label: 'Framed Set (+2000 FLIPS)', priceModifier: 2000 }
        ],
        mainCategory: 'colestai'
    },
    // CTRL G (GAME) PRIVILEGES
    // Luang Phee Jazz 4G Privileges (invId: 2) - User has 0 FLIPS
    {
        id: 105,
        title: 'Premiere Night VIP - Luang Phee Jazz 4G',
        titleTh: 'บัตร VIP รอบปฐมทัศน์ - หลวงพี่แจ๊ส 4G',
        subtitle: 'Exclusive premiere screening',
        subtitleTh: 'ชมภาพยนตร์รอบปฐมทัศน์สุดพิเศษ',
        category: 'movie-tickets',
        categoryLabel: 'Movie Tickets',
        categoryLabelTh: 'บัตรชมภาพยนตร์',
        image: '/images/privilege_movie_premiere.png',
        price: 400,
        currency: 'FLIPS',
        allowedInvestmentIds: [2],
        rating: 4.8,
        reviews: 89,
        isPhysical: false,
        tier: 'gold',
        movieId: 'luang-phee-jazz-4g',
        movieName: 'Luang Phee Jazz 4G',
        movieNameTh: 'หลวงพี่แจ๊ส 4G',
        eventDate: '2024-08-10',
        venue: 'SF Cinema Central World',
        description: 'Be the first to watch the premiere with exclusive VIP seating.',
        descriptionTh: 'เป็นคนแรกที่ได้ชมรอบปฐมทัศน์พร้อมที่นั่ง VIP',
        conditions: ['Valid for 1 person', 'Non-transferable'],
        conditionsTh: ['ใช้ได้ 1 ท่าน', 'ไม่สามารถโอนสิทธิ์ได้'],
        mainCategory: 'colestai'
    },
    {
        id: 106,
        title: 'Meet & Greet Cast - Luang Phee Jazz 4G',
        titleTh: 'พบปะนักแสดง - หลวงพี่แจ๊ส 4G',
        subtitle: 'Exclusive photo session with the cast',
        subtitleTh: 'ถ่ายรูปกับนักแสดงพิเศษ',
        category: 'meet-greet',
        categoryLabel: 'Meet & Greet',
        categoryLabelTh: 'พบทีมผู้สร้าง',
        image: '/images/privilege_meet_director.png',
        price: 1200,
        currency: 'FLIPS',
        allowedInvestmentIds: [2],
        rating: 4.9,
        reviews: 45,
        isPhysical: false,
        tier: 'gold',
        movieId: 'luang-phee-jazz-4g',
        eventDate: '2024-08-15',
        venue: 'FLIPS Event Hall',
        description: 'Meet the beloved cast and take exclusive photos together.',
        descriptionTh: 'พบนักแสดงสุดรักและถ่ายรูปพิเศษด้วยกัน',
        conditions: ['Limited to 30 participants', 'Photo included'],
        conditionsTh: ['จำกัด 30 ท่าน', 'รวมถ่ายรูป'],
        mainCategory: 'colestai'
    },
    // Ong Bak Remastered (invId: 3)
    {
        id: 107,
        title: 'Martial Arts Workshop - Ong Bak',
        titleTh: 'เวิร์คช็อปศิลปะการต่อสู้ - องค์บาก',
        subtitle: 'Learn precision stunts with the stunt team',
        subtitleTh: 'เรียนรู้สตั๊นท์แม่นยำกับทีมสตั๊นท์',
        category: 'meet-greet',
        categoryLabel: 'Workshop',
        categoryLabelTh: 'เวิร์คช็อป',
        image: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=2070&auto=format&fit=crop', // Muay Thai/Martial Arts
        price: 800,
        currency: 'FLIPS',
        allowedInvestmentIds: [3],
        rating: 5.0,
        reviews: 12,
        isPhysical: false,
        tier: 'gold',
        movieId: 'ong-bak-remastered',
        movieName: 'Ong Bak Remastered',
        movieNameTh: 'องค์บาก รีมาสเตอร์',
        eventDate: '2024-09-05',
        venue: 'Muay Thai Institute',
        description: 'Exclusive workshop with the choreography team behind Ong Bak.',
        descriptionTh: 'เวิร์คช็อปพิเศษกับทีมออกแบบท่าต่อสู้ขององค์บาก',
        conditions: ['Physical health required', 'Waiver to be signed'],
        conditionsTh: ['ต้องมีสุขภาพแข็งแรง', 'ต้องเซ็นเอกสารยินยอม'],
        mainCategory: 'colestai'
    },
    {
        id: 108,
        title: 'Private Screening 4K - Ong Bak',
        titleTh: 'ฉายส่วนตัว 4K - องค์บาก',
        subtitle: 'Watch the remastered classic in private',
        subtitleTh: 'ชมภาพยนตร์รีมาสเตอร์แบบส่วนตัว',
        category: 'movie-tickets',
        categoryLabel: 'Private Screening',
        categoryLabelTh: 'ฉายส่วนตัว',
        image: '/images/privilege_screening.png',
        price: 2500,
        currency: 'FLIPS',
        allowedInvestmentIds: [3],
        rating: 4.9,
        reviews: 8,
        isPhysical: false,
        tier: 'platinum',
        movieId: 'ong-bak-remastered',
        description: 'Rent a private theater for you and 10 friends.',
        descriptionTh: 'เช่าโรงภาพยนตร์ส่วนตัวสำหรับคุณและเพื่อน 10 คน',
        conditions: ['Booking required 2 weeks in advance'],
        conditionsTh: ['จองล่วงหน้า 2 สัปดาห์'],
        mainCategory: 'colestai'
    },
    // Pee Mak Part 2 (invId: 4)
    {
        id: 109,
        title: 'Haunted Set Tour - Pee Mak 2',
        titleTh: 'ทัวร์กองถ่ายบ้านผี - พี่มาก 2',
        subtitle: 'Night tour of the filming location',
        subtitleTh: 'ทัวร์กลางคืนสถานที่ถ่ายทำ',
        category: 'behind-scenes',
        categoryLabel: 'Set Tour',
        categoryLabelTh: 'ทัวร์กองถ่าย',
        image: 'https://images.unsplash.com/photo-1505672675380-4a829cac4088?q=80&w=2000&auto=format&fit=crop', // Spooky House
        price: 600,
        currency: 'FLIPS',
        allowedInvestmentIds: [4],
        rating: 4.7,
        reviews: 15,
        isPhysical: false,
        tier: 'silver',
        movieId: 'pee-mak-2',
        description: 'Guided ghost tour of the movie set after dark.',
        descriptionTh: 'ทัวร์ล่าท้าผีพาชมกองถ่ายหลังพระอาทิตย์ตก',
        conditions: ['18+ Only', 'No flash photography'],
        conditionsTh: ['เฉพาะผู้ที่มีอายุ 18 ปีขึ้นไป', 'ห้ามเปิดแฟลช'],
        mainCategory: 'colestai'
    },
    // UNIVERSAL COLESTAI REWARD (Any Investor)
    {
        id: 110,
        title: 'Major Cineplex Popcorn Set',
        titleTh: 'ชุดป๊อปคอร์น เมเจอร์ ซีนีเพล็กซ์',
        subtitle: 'Free large popcorn & drink',
        subtitleTh: 'ป๊อปคอร์นใหญ่และน้ำฟรี',
        category: 'merchandise',
        categoryLabel: 'Privilege',
        categoryLabelTh: 'สิทธิพิเศษ',
        image: 'https://images.unsplash.com/photo-1572177191856-3cde618dee1f?q=80&w=2070&auto=format&fit=crop',
        price: 300,
        currency: 'FLIPS',
        allowedInvestmentIds: [], // Empty = Universal
        rating: 4.5,
        reviews: 342,
        isPhysical: false,
        tier: 'silver',
        description: 'Enjoy a movie snack on us! Redeemable at any Major Cineplex branch.',
        descriptionTh: 'อิ่มอร่อยกับป๊อปคอร์นฟรี ใช้ได้ที่เมเจอร์ทุกสาขา',
        conditions: ['Valid at all branches', 'Single use only'],
        conditionsTh: ['ใช้ได้ทุกสาขา', 'ใช้ได้ครั้งเดียว'],
        mainCategory: 'colestai'
    },
    // CTRL G (GAME) PRIVILEGES BELOW
    {
        id: 201,
        title: 'Phoenix Rising Jersey',
        titleTh: 'เสื้อทีม Phoenix Rising',
        subtitle: 'Official team jersey',
        subtitleTh: 'เสื้อทีมแท้',
        category: 'game-merchandise',
        categoryLabel: 'Game Merchandise',
        categoryLabelTh: 'สินค้าเกม',
        image: '/images/privilege_merch_tshirt.png',
        price: 500,
        rating: 4.9,
        reviews: 234,
        isPhysical: true,
        tier: 'silver',
        teamId: 'phoenix',
        teamName: 'Phoenix Rising',
        teamNameTh: 'ฟีนิกซ์ ไรซิ่ง',
        coinType: 'phoenix',
        description: 'Official Phoenix Rising team jersey worn by pro players.',
        descriptionTh: 'เสื้อทีม Phoenix Rising ของแท้ที่นักแข่งมืออาชีพสวมใส่',
        conditions: ['Sizes available: S-XXL', 'Authentic merchandise', 'Ships in 5-7 days'],
        conditionsTh: ['มีไซส์ S-XXL', 'ของแท้', 'จัดส่งภายใน 5-7 วัน'],
        mainCategory: 'ctrlg'
    },
    {
        id: 202,
        title: 'Meet Phoenix Rising Team',
        titleTh: 'พบทีม Phoenix Rising',
        subtitle: 'Meet the pro players',
        subtitleTh: 'พบนักแข่งมืออาชีพ',
        category: 'game-meet-greet',
        categoryLabel: 'Meet Players',
        categoryLabelTh: 'พบนักแข่ง',
        image: '/images/privilege_game_qa.png',
        price: 1000,
        rating: 5.0,
        reviews: 56,
        isPhysical: false,
        tier: 'gold',
        teamId: 'phoenix',
        coinType: 'phoenix',
        eventDate: '2025-01-20',
        venue: 'FLIPS Gaming Arena',
        description: 'Exclusive meet and greet with Phoenix Rising esports team.',
        descriptionTh: 'พบปะทีม Phoenix Rising แบบเอ็กซ์คลูซีฟ',
        conditions: ['Limited to 30 fans', 'Photo session included', 'Signed merchandise'],
        conditionsTh: ['จำกัด 30 คน', 'รวมถ่ายรูป', 'รวมเซ็นของที่ระลึก'],
        mainCategory: 'ctrlg'
    },
    {
        id: 203,
        title: 'Phoenix In-Game Bundle',
        titleTh: 'ชุดไอเทม Phoenix',
        subtitle: 'Exclusive in-game items',
        subtitleTh: 'ไอเทมพิเศษในเกม',
        category: 'game-items',
        categoryLabel: 'In-Game Items',
        categoryLabelTh: 'ไอเทมในเกม',
        image: '/images/privilege_game_character.png',
        price: 300,
        rating: 4.8,
        reviews: 189,
        isPhysical: false,
        tier: 'silver',
        teamId: 'phoenix',
        coinType: 'phoenix',
        description: 'Phoenix-themed weapon skins and character outfit.',
        descriptionTh: 'สกินอาวุธและชุดตัวละครธีม Phoenix',
        conditions: ['Account binding required', 'Permanent unlock', 'Cross-platform'],
        conditionsTh: ['ต้องผูกบัญชี', 'ปลดล็อคถาวร', 'ใช้ได้ทุกแพลตฟอร์ม'],
        mainCategory: 'ctrlg'
    },
    {
        id: 204,
        title: 'Closed Beta Access',
        titleTh: 'เข้าถึง Closed Beta',
        subtitle: 'Play before everyone else',
        subtitleTh: 'เล่นก่อนใครๆ',
        category: 'early-access',
        categoryLabel: 'Early Access',
        categoryLabelTh: 'เข้าถึงก่อน',
        image: '/images/privilege_game_beta.png',
        price: 400,
        rating: 4.9,
        reviews: 256,
        isPhysical: false,
        tier: 'silver',
        gameName: 'Project Nova',
        gameNameTh: 'โปรเจค โนวา',
        eventDate: '2025-01-15',
        description: 'Get exclusive access to closed beta testing before public launch.',
        descriptionTh: 'เข้าถึง Closed Beta ก่อนเปิดให้สาธารณะ',
        conditions: ['2-week early access', 'Beta tester badge', 'Feedback channel'],
        conditionsTh: ['เข้าถึงก่อน 2 สัปดาห์', 'แบดจ์ผู้ทดสอบ', 'ช่องทางแจ้งข้อเสนอแนะ'],
        mainCategory: 'ctrlg'
    },
    // TBF (YACHT) PRIVILEGES - Enhanced with voucherType and yacht-specific fields
    {
        id: 301,
        voucherType: 'yacht_experience', // Type discriminator
        title: 'Sunset Yacht Cruise',
        titleTh: 'ล่องเรือยอชท์ชมพระอาทิตย์ตก',
        subtitle: '4-hour luxury sunset cruise on premium fleet',
        subtitleTh: 'ล่องเรือหรู 4 ชั่วโมงชมพระอาทิตย์ตก',
        category: 'boat-passes',
        categoryLabel: 'Boat Passes',
        categoryLabelTh: 'บัตรล่องเรือ',
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
        price: 800,
        currency: 'TBF',
        rating: 4.9,
        reviews: 47,
        isPhysical: false,
        tier: 'gold',

        // Yacht-specific fields
        yachtInfo: {
            availableYachts: ['merry-fisher', 'cap-camarat'],
            duration: 4, // hours
            maxPax: 8,
            location: 'Boat Lagoon Yachting Charter, Phuket',
            startTimes: ['09:00', '14:00'], // Available departure times
            included: ['Professional captain & crew', 'Drinks & light refreshments', 'Snorkeling equipment', 'Towels & amenities']
        },

        // Information page content (for modal Info tab)
        infoPage: {
            heroImage: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200',
            sections: [
                {
                    title: 'Your Yacht Experience',
                    titleTh: 'ประสบการณ์ล่องเรือของคุณ',
                    content: 'Cruise the pristine waters of Phuket on our premium Jeanneau fleet. Choose between the Merry Fisher 1095 FLY for comfort or Cap Camarat 10.5 CC for adventure.',
                    contentTh: 'ล่องเรือในน่านน้ำภูเก็ตบนเรือ Jeanneau พรีเมียม เลือกระหว่าง Merry Fisher 1095 FLY เพื่อความสะดวกสบาย หรือ Cap Camarat 10.5 CC สำหรับการผจญภัย',
                    icon: 'anchor'
                },
                {
                    title: "What's Included",
                    titleTh: 'สิ่งที่รวมอยู่',
                    items: ['Professional captain & crew', 'Drinks & light refreshments', 'Snorkeling equipment', 'Towels & amenities', 'Underwater & deck lighting for sunset ambience'],
                    itemsTh: ['กัปตันและลูกเรือมืออาชีพ', 'เครื่องดื่มและของว่าง', 'อุปกรณ์ดำน้ำตื้น', 'ผ้าขนหนูและสิ่งอำนวยความสะดวก', 'ไฟใต้น้ำและบนดาดฟ้าสำหรับบรรยากาศพระอาทิตย์ตก'],
                    icon: 'check-circle'
                }
            ],
            yachtComparison: true // Show yacht specs comparison
        },

        description: 'Experience a magical sunset cruise on our luxury yacht with drinks and canapes.',
        descriptionTh: 'สัมผัสประสบการณ์ล่องเรือยอชท์หรูชมพระอาทิตย์ตกพร้อมเครื่องดื่มและคานาเป้',
        conditions: ['Valid for 2 persons', 'Advance booking required (7 days)', 'Subject to weather', 'Up to 8 guests total'],
        conditionsTh: ['ใช้ได้ 2 ท่าน', 'ต้องจองล่วงหน้า 7 วัน', 'ขึ้นอยู่กับสภาพอากาศ', 'รองรับผู้โดยสารสูงสุด 8 ท่าน'],
        mainCategory: 'tbf'
    },
    {
        id: 302,
        voucherType: 'yacht_experience',
        title: 'Island Hopping Adventure',
        titleTh: 'ผจญภัยเกาะสุดหรู',
        subtitle: 'Full-day island exploration on Cap Camarat',
        subtitleTh: 'สำรวจเกาะเต็มวันบน Cap Camarat',
        category: 'boat-tours',
        categoryLabel: 'Yacht Tours',
        categoryLabelTh: 'ทัวร์ยอชท์',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
        price: 1200,
        currency: 'TBF',
        rating: 4.8,
        reviews: 89,
        isPhysical: false,
        tier: 'gold',

        yachtInfo: {
            availableYachts: ['cap-camarat'], // Specific yacht for this experience
            duration: 8, // hours
            maxPax: 8,
            location: 'Boat Lagoon Yachting Charter, Phuket',
            startTimes: ['08:00'],
            included: ['Full-day yacht charter', 'Lunch & drinks', 'Snorkeling at 3 islands', 'Professional guide', 'All equipment']
        },

        infoPage: {
            heroImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200',
            sections: [
                {
                    title: 'Adventure Awaits',
                    titleTh: 'การผจญภัยรอคุณอยู่',
                    content: 'Explore the stunning islands around Phuket on our Cap Camarat 10.5 CC - built for adventure with its Deep-V hull and powerful twin 300 HP engines.',
                    icon: 'compass'
                },
                {
                    title: 'Island Itinerary',
                    titleTh: 'เส้นทางเกาะ',
                    items: ['Koh Racha Yai - Crystal clear waters', 'Coral Island - Snorkeling paradise', 'Maiton Island - Secluded beach lunch', 'Sunset viewpoint on return'],
                    icon: 'map'
                }
            ],
            yachtComparison: false
        },

        description: 'Explore stunning islands with snorkeling, lunch, and sunset viewing on the Cap Camarat.',
        descriptionTh: 'สำรวจเกาะสวยงามพร้อมดำน้ำตื้น อาหารกลางวัน และชมพระอาทิตย์ตกบน Cap Camarat',
        conditions: ['Valid for 1 person', 'Includes lunch & equipment', 'Pickup from Boat Lagoon', '8 hours duration'],
        conditionsTh: ['ใช้ได้ 1 ท่าน', 'รวมอาหารกลางวันและอุปกรณ์', 'รับจาก Boat Lagoon', 'ระยะเวลา 8 ชั่วโมง'],
        mainCategory: 'tbf'
    },
    {
        id: 350,
        voucherType: 'yacht_fraction', // Special type - generates tickets
        title: 'FLIPS Member Fraction',
        titleTh: 'FLIPS Member Fraction',
        subtitle: 'Fractional yacht ownership - 10 tickets over 5 years',
        subtitleTh: 'สิทธิ์ร่วมเป็นเจ้าของเรือ - 10 ตั๋วใน 5 ปี',
        category: 'yacht-ownership',
        categoryLabel: 'Member Fraction',
        categoryLabelTh: 'สมาชิก Fraction',
        image: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800',
        price: 99000,
        currency: 'THB',
        rating: 5.0,
        reviews: 12,
        isPhysical: false,
        tier: 'platinum',

        // Fraction-specific configuration
        fractionConfig: {
            priceThb: 99000,
            ticketsPerYear: 2,
            hoursPerTicket: 4,
            programYears: 5,
            totalTickets: 10, // 2 × 5
            maxPaxPerTrip: 8,

            ticketAccess: ['merry-fisher', 'cap-camarat'],

            cashOptions: {
                charterMatch: {
                    enabled: true,
                    valuePerTicket: 9900,
                    noticeDays: 90,
                    description: 'Match with charter demand'
                },
                mvpExchange: {
                    enabled: true,
                    description: 'List on MVP Exchange at market price'
                }
            },

            benefits: [
                'Access to both yachts in the fleet',
                'Priority booking over charter customers',
                'No maintenance or crew management costs',
                'Cruise or Cash Flexibility'
            ]
        },

        // When purchased, generates these tickets
        generatesTickets: true,
        ticketTemplate: {
            voucherType: 'yacht_ticket',
            title: 'Yacht Cruise Ticket',
            titleTh: 'ตั๋วล่องเรือยอชท์',
            duration: 4,
            maxPax: 8,
            validMonths: 12 // Each year's tickets expire after 12 months
        },

        infoPage: {
            heroImage: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=1200',
            sections: [
                {
                    title: 'Your Exclusive Opportunity',
                    titleTh: 'โอกาสพิเศษสำหรับคุณ',
                    content: 'Fractional yacht ownership designed for lifestyle members. All the benefits of ownership, none of the hassle.',
                    contentTh: 'การร่วมเป็นเจ้าของเรือยอชท์แบบ Fractional ออกแบบมาสำหรับสมาชิกไลฟ์สไตล์ ได้รับประโยชน์ทั้งหมดของการเป็นเจ้าของ โดยไม่ต้องยุ่งยาก',
                    icon: 'star'
                },
                {
                    title: 'Two World-Class Yachts',
                    titleTh: 'เรือยอชท์ระดับโลก 2 ลำ',
                    content: 'Merry Fisher 1095 FLY (34ft flybridge) & Cap Camarat 10.5 CC (36ft center-console)',
                    icon: 'ship'
                },
                {
                    title: 'Cruise or Cash',
                    titleTh: 'ล่องเรือหรือแลกเงิน',
                    items: ['Use your tickets for yacht experiences', 'Charter Match: THB 9,900 per unused ticket', 'MVP Exchange: List at market price'],
                    itemsTh: ['ใช้ตั๋วเพื่อประสบการณ์ล่องเรือ', 'Charter Match: ฿9,900 ต่อตั๋วที่ไม่ใช้', 'MVP Exchange: ลงขายในราคาตลาด'],
                    icon: 'dollar-sign'
                }
            ],
            yachtComparison: true,
            showTicketPreview: true
        },

        description: 'Become a fractional yacht owner. Get 2 tickets per year for 5 years (10 total). Each ticket = 4-hour cruise for up to 8 guests.',
        descriptionTh: 'ร่วมเป็นเจ้าของเรือยอชท์แบบ Fractional รับ 2 ตั๋วต่อปีเป็นเวลา 5 ปี (รวม 10 ตั๋ว) แต่ละตั๋ว = ล่องเรือ 4 ชั่วโมงสำหรับผู้โดยสารสูงสุด 8 ท่าน',
        conditions: ['THB 99,000 one-time payment', '2 tickets per year for 5 years', '4 hours per trip, up to 8 PAX', 'Priority booking over charter customers', 'Cash-out option: THB 9,900 per ticket'],
        conditionsTh: ['จ่าย ฿99,000 ครั้งเดียว', '2 ตั๋วต่อปีเป็นเวลา 5 ปี', '4 ชั่วโมงต่อทริป ผู้โดยสารสูงสุด 8 ท่าน', 'จองก่อนลูกค้าเช่าเรือ', 'แลกเป็นเงิน: ฿9,900 ต่อตั๋ว'],
        mainCategory: 'tbf'
    },
    // FLIPS ID (GENERAL) PRIVILEGES
    {
        id: 401,
        title: 'Stay 2 nights at Wyndham Phuket',
        titleTh: 'พัก 2 คืนที่ วินด์แฮม ภูเก็ต',
        subtitle: 'Kalim Bay beachfront resort',
        subtitleTh: 'รีสอร์ตติดทะเลอ่าวกะหลิม',
        category: 'hospitality',
        categoryLabel: 'Hospitality',
        categoryLabelTh: 'โรงแรม',
        image: '/images/hotel-room.png',
        price: 500,
        rating: 4.8,
        reviews: 234,
        isPhysical: false,
        tier: 'gold',
        venue: 'Wyndham Grand Phuket Kalim Bay',
        description: 'Experience beachfront luxury with ocean views, spa treatment, and breakfast.',
        descriptionTh: 'สัมผัสความหรูหราติดชายหาดพร้อมวิวทะเล ทรีตเมนต์สปา และอาหารเช้า',
        conditions: ['Valid for 2 adults', 'Booking 7 days in advance', 'Valid until Apr 2024'],
        conditionsTh: ['ใช้ได้ 2 ท่าน', 'จองล่วงหน้า 7 วัน', 'ใช้ได้ถึง เม.ย. 2024'],
        mainCategory: 'flipsid'
    },
    {
        id: 402,
        title: 'Santorini Dream Escape',
        titleTh: 'ซานโตรินี ดรีม เอสเคป',
        subtitle: '5-star luxury experience',
        subtitleTh: 'ประสบการณ์หรูหราระดับ 5 ดาว',
        category: 'travel',
        categoryLabel: 'Travel',
        categoryLabelTh: 'ท่องเที่ยว',
        image: '/images/santorini.png',
        price: 900,
        rating: 4.9,
        reviews: 189,
        isPhysical: false,
        tier: 'gold',
        description: 'Luxury escape to Santorini with flights, hotel, and exclusive experiences.',
        descriptionTh: 'หนีไปซานโตรินีหรูหราพร้อมตั๋วเครื่องบิน โรงแรม และประสบการณ์พิเศษ',
        conditions: ['Valid for 2 persons', 'Economy flights included', 'Peak season surcharge'],
        conditionsTh: ['ใช้ได้ 2 ท่าน', 'รวมตั๋วชั้นประหยัด', 'มีค่าใช้จ่ายเพิ่มในช่วง peak'],
        mainCategory: 'flipsid'
    },
    {
        id: 403,
        title: 'Premium Smartwatch',
        titleTh: 'นาฬิกาอัจฉริยะพรีเมียม',
        subtitle: 'Health & Fitness Tracker',
        subtitleTh: 'ติดตามสุขภาพและฟิตเนส',
        category: 'goods',
        categoryLabel: 'Goods',
        categoryLabelTh: 'สินค้า',
        image: '/images/smart_watch.png',
        price: 450,
        rating: 4.7,
        reviews: 156,
        isPhysical: true,
        tier: 'silver',
        description: 'Latest smartwatch with health monitoring, GPS, and 7-day battery life.',
        descriptionTh: 'สมาร์ทวอทช์รุ่นใหม่พร้อมติดตามสุขภาพ GPS และแบตเตอรี่ 7 วัน',
        conditions: ['1 year warranty', 'Ships within 3 days', 'Color: Space Gray'],
        conditionsTh: ['รับประกัน 1 ปี', 'จัดส่งภายใน 3 วัน', 'สี: Space Gray'],
        mainCategory: 'flipsid'
    },
    {
        id: 404,
        title: 'Wireless Earbuds Pro',
        titleTh: 'หูฟังไร้สายโปร',
        subtitle: 'Active Noise Cancelling',
        subtitleTh: 'ตัดเสียงรบกวน',
        category: 'goods',
        categoryLabel: 'Goods',
        categoryLabelTh: 'สินค้า',
        image: '/images/wireless_earbuds.png',
        price: 350,
        rating: 4.8,
        reviews: 203,
        isPhysical: true,
        tier: 'silver',
        description: 'Premium wireless earbuds with ANC, spatial audio, and 24hr battery.',
        descriptionTh: 'หูฟังไร้สายพรีเมียมพร้อม ANC เสียงรอบทิศทาง และแบตเตอรี่ 24 ชม.',
        conditions: ['1 year warranty', 'Ships within 3 days', 'Includes all ear tips'],
        conditionsTh: ['รับประกัน 1 ปี', 'จัดส่งภายใน 3 วัน', 'รวมจุกหูทุกขนาด'],
        mainCategory: 'flipsid'
    },
    {
        id: 405,
        title: 'Fine Dining Experience',
        titleTh: 'ประสบการณ์อาหารมื้อหรู',
        subtitle: '5-Course Meal for Two',
        subtitleTh: 'อาหาร 5 คอร์สสำหรับ 2 ท่าน',
        category: 'dining',
        categoryLabel: 'Dining',
        categoryLabelTh: 'อาหาร',
        image: '/images/breakfast.png',
        price: 400,
        rating: 4.9,
        reviews: 276,
        isPhysical: false,
        tier: 'gold',
        venue: 'Le Normandie, Bangkok',
        description: 'Exquisite 5-course French dinner with wine pairing at a Michelin-starred restaurant.',
        descriptionTh: 'มื้อค่ำฝรั่งเศส 5 คอร์สพร้อมไวน์คู่กับอาหารที่ร้านติดดาวมิชลิน',
        conditions: ['Reservation required', 'Smart dress code', 'Wine pairing extra'],
        conditionsTh: ['ต้องจองล่วงหน้า', 'แต่งกายสุภาพ', 'ไวน์คิดค่าใช้จ่ายเพิ่ม'],
        mainCategory: 'flipsid'
    },
    {
        id: 401,
        title: 'Pro Gaming Headset',
        titleTh: 'หูฟังเกมมิ่งโปร',
        subtitle: 'Immersive 7.1 Surround Sound',
        subtitleTh: 'ระบบเสียงรอบทิศทาง 7.1',
        category: 'goods',
        categoryLabel: 'Gaming Gear',
        categoryLabelTh: 'อุปกรณ์เกมมิ่ง',
        image: '/images/privilege_game_figurine.png',
        price: 1200,
        rating: 4.8,
        reviews: 342,
        isPhysical: true,
        tier: 'silver',
        description: 'Professional grade gaming headset with noise cancelling microphone and RGB lighting.',
        descriptionTh: 'หูฟังเกมมิ่งระดับมืออาชีพพร้อมไมค์ตัดเสียงรบกวนและไฟ RGB',
        conditions: ['2 Year Warranty', 'Free Shipping', '30-day return'],
        conditionsTh: ['รับประกัน 2 ปี', 'ส่งฟรี', 'คืนสินค้าได้ใน 30 วัน'],
        variants: [
            { id: 'c1', label: 'Matte Black', priceModifier: 0 },
            { id: 'c2', label: 'Neon Red', priceModifier: 0 },
            { id: 'c3', label: 'Electric Blue', priceModifier: 0 }
        ],
        mainCategory: 'universal'
    },
    {
        id: 402,
        title: 'Developer Hoodie',
        titleTh: 'เสื้อฮู้ดนักพัฒนา',
        subtitle: 'Limited Edition FLIPS ID Merch',
        subtitleTh: 'สินค้าลิมิเต็ด FLIPS ID',
        category: 'apparel',
        categoryLabel: 'Apparel',
        categoryLabelTh: 'เครื่องแต่งกาย',
        image: '/images/privilege_merch_premium.png',
        price: 800,
        rating: 4.9,
        reviews: 512,
        isPhysical: true,
        tier: 'bronze',
        description: 'Premium cotton hoodie with embroidered logo. Perfect for coding sessions.',
        descriptionTh: 'เสื้อฮู้ดผ้าฝ้ายพรีเมียมปักโลโก้ เหมาะสำหรับใส่เขียนโค้ด',
        conditions: ['Unisex sizing', 'Machine washable', ' shrinking resistant'],
        conditionsTh: ['ขนาด Unisex', 'ซักเครื่องได้', 'ไม่หด'],
        variants: [
            { id: 's', label: 'Size S', priceModifier: 0 },
            { id: 'm', label: 'Size M', priceModifier: 0 },
            { id: 'l', label: 'Size L', priceModifier: 0 },
            { id: 'xl', label: 'Size XL', priceModifier: 0 },
            { id: 'xxl', label: 'Size XXL (+100 FLIPS)', priceModifier: 100 }
        ],
        mainCategory: 'universal'
    }
];

// Movies for Colestai section
export const movies = [
    {
        id: 'the-last-horizon',
        name: 'The Last Horizon',
        nameTh: 'ขอบฟ้าสุดท้าย',
        year: 2024,
        poster: '/images/privilege_movie_premiere.png',
        genre: 'Sci-Fi / Action'
    },
    {
        id: 'eternal-flame',
        name: 'Eternal Flame',
        nameTh: 'เปลวไฟนิรันดร์',
        year: 2025,
        poster: '/images/privilege_screening.png',
        genre: 'Drama / Romance'
    },
    {
        id: 'shadow-realm',
        name: 'Shadow Realm',
        nameTh: 'อาณาจักรเงามืด',
        year: 2024,
        poster: '/images/privilege_bts_vip.png',
        genre: 'Fantasy / Adventure'
    }
];

// =============================================
// TOKEN PRICE HISTORY DATA
// =============================================

// Helper function to generate price history data
const generatePriceHistory = (basePrice, volatility = 0.05, points = 100) => {
    const data = [];
    let price = basePrice;
    const now = Date.now();

    for (let i = points; i >= 0; i--) {
        const change = (Math.random() - 0.5) * 2 * volatility * price;
        price = Math.max(price + change, basePrice * 0.5); // Don't go below 50% of base
        data.push({
            timestamp: now - (i * 3600000), // 1 hour intervals
            price: parseFloat(price.toFixed(4)),
            volume: Math.random() * 1000000
        });
    }
    return data;
};

export const tokenPriceHistory = {
    flips: {
        '1H': generatePriceHistory(0.15, 0.02, 60),
        '1D': generatePriceHistory(0.15, 0.05, 24),
        '1W': generatePriceHistory(0.15, 0.08, 7 * 24),
        '1M': generatePriceHistory(0.15, 0.12, 30),
        '1Y': generatePriceHistory(0.15, 0.25, 365),
        'All': generatePriceHistory(0.10, 0.35, 500)
    },
    tbf: {
        '1H': generatePriceHistory(5.50, 0.01, 60),
        '1D': generatePriceHistory(5.50, 0.03, 24),
        '1W': generatePriceHistory(5.50, 0.06, 7 * 24),
        '1M': generatePriceHistory(5.50, 0.10, 30),
        '1Y': generatePriceHistory(5.50, 0.20, 365),
        'All': generatePriceHistory(4.50, 0.30, 500)
    },
    phoenix: {
        '1H': generatePriceHistory(0.08, 0.03, 60),
        '1D': generatePriceHistory(0.08, 0.06, 24),
        '1W': generatePriceHistory(0.08, 0.10, 7 * 24),
        '1M': generatePriceHistory(0.08, 0.15, 30),
        '1Y': generatePriceHistory(0.08, 0.28, 365),
        'All': generatePriceHistory(0.05, 0.40, 500)
    },
    shadow: {
        '1H': generatePriceHistory(0.08, 0.03, 60),
        '1D': generatePriceHistory(0.08, 0.06, 24),
        '1W': generatePriceHistory(0.08, 0.10, 7 * 24),
        '1M': generatePriceHistory(0.08, 0.15, 30),
        '1Y': generatePriceHistory(0.08, 0.28, 365),
        'All': generatePriceHistory(0.05, 0.40, 500)
    },
    thunder: {
        '1H': generatePriceHistory(0.08, 0.03, 60),
        '1D': generatePriceHistory(0.08, 0.06, 24),
        '1W': generatePriceHistory(0.08, 0.10, 7 * 24),
        '1M': generatePriceHistory(0.08, 0.15, 30),
        '1Y': generatePriceHistory(0.08, 0.28, 365),
        'All': generatePriceHistory(0.05, 0.40, 500)
    },
    dragon: {
        '1H': generatePriceHistory(0.08, 0.03, 60),
        '1D': generatePriceHistory(0.08, 0.06, 24),
        '1W': generatePriceHistory(0.08, 0.10, 7 * 24),
        '1M': generatePriceHistory(0.08, 0.15, 30),
        '1Y': generatePriceHistory(0.08, 0.28, 365),
        'All': generatePriceHistory(0.05, 0.40, 500)
    }
};

// =============================================
// TOKEN TRANSACTION HISTORY
// =============================================

export const tokenTransactionHistory = {
    flips: [
        { id: 1, type: 'receive', amount: 5000, from: 'Investment Reward', date: '2025-01-05 14:30', txHash: '0x7a8b...c3d2' },
        { id: 2, type: 'send', amount: -500, to: 'Redeem Privilege', date: '2025-01-04 10:15', txHash: '0x9f2e...b1a4' },
        { id: 3, type: 'receive', amount: 2500, from: 'Game Reward', date: '2025-01-03 16:45', txHash: '0x3c4d...e5f6' },
        { id: 4, type: 'receive', amount: 10000, from: 'Referral Bonus', date: '2025-01-02 09:20', txHash: '0x1a2b...3c4d' },
        { id: 5, type: 'send', amount: -1500, to: 'Transfer to Friend', date: '2025-01-01 12:00', txHash: '0x5e6f...7g8h' },
        { id: 6, type: 'receive', amount: 15000, from: 'Film Production Bonus', date: '2024-12-28 18:30', txHash: '0x8h9i...0j1k' },
        { id: 7, type: 'receive', amount: 20000, from: 'Investment Reward - Gold Tier', date: '2024-12-15 11:00', txHash: '0x2l3m...4n5o' },
    ],
    tbf: [
        { id: 1, type: 'receive', amount: 1500, from: 'Initial Allocation', date: '2025-01-01 00:00', txHash: '0xa1b2...c3d4' },
        { id: 2, type: 'receive', amount: 200, from: 'Staking Reward', date: '2024-12-25 10:00', txHash: '0xe5f6...g7h8' },
    ],
    phoenix: [
        { id: 1, type: 'receive', amount: 2500, from: 'Team Victory Bonus', date: '2025-01-05 20:00', txHash: '0xi9j0...k1l2' },
        { id: 2, type: 'receive', amount: 1000, from: 'Match Participation', date: '2025-01-03 19:00', txHash: '0xm3n4...o5p6' },
        { id: 3, type: 'send', amount: -500, to: 'Team Merch Purchase', date: '2025-01-02 15:30', txHash: '0xq7r8...s9t0' },
    ],
    shadow: [
        { id: 1, type: 'receive', amount: 1800, from: 'Team Victory Bonus', date: '2025-01-04 21:00', txHash: '0xu1v2...w3x4' },
        { id: 2, type: 'receive', amount: 800, from: 'Match Participation', date: '2025-01-01 18:00', txHash: '0xy5z6...a7b8' },
    ],
    thunder: [
        { id: 1, type: 'receive', amount: 3200, from: 'Championship Win', date: '2025-01-05 22:00', txHash: '0xc9d0...e1f2' },
        { id: 2, type: 'receive', amount: 1500, from: 'Tournament Entry', date: '2024-12-30 17:00', txHash: '0xg3h4...i5j6' },
    ],
    dragon: [
        { id: 1, type: 'receive', amount: 1500, from: 'Team Victory Bonus', date: '2025-01-03 20:30', txHash: '0xk7l8...m9n0' },
        { id: 2, type: 'receive', amount: 600, from: 'Match Participation', date: '2024-12-29 19:00', txHash: '0xo1p2...q3r4' },
    ]
};

// =============================================
// TOKEN DETAILS (ABOUT INFO)
// =============================================

export const tokenDetails = {
    flips: {
        name: 'Flips Coins',
        symbol: 'FLIPS',
        description: 'Universal reward token for the Flips ecosystem. Earn FLIPS through investments, games, and activities. Redeem for exclusive privileges and rewards.',
        descriptionTh: 'โทเค็นรางวัลสากลสำหรับระบบนิเวศ Flips สะสม FLIPS ผ่านการลงทุน เกม และกิจกรรม แลกรับสิทธิพิเศษและของรางวัล',
        totalSupply: '100,000,000',
        circulatingSupply: '45,000,000',
        marketCap: '$6,750,000',
        website: 'https://flips.io',
        whitepaper: 'https://flips.io/whitepaper.pdf',
        contract: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
        features: [
            'Earn rewards from investments',
            'Redeem exclusive privileges',
            'Transfer to other users',
            'Stake for additional benefits'
        ]
    },
    tbf: {
        name: 'TBF Yacht Club',
        symbol: 'TBFC',
        description: 'Premium partner token for yacht club access and luxury experiences.',
        descriptionTh: 'โทเค็นพาร์ทเนอร์พรีเมียมสำหรับการเข้าถึงยอร์ชคลับและประสบการณ์หรูหรา',
        totalSupply: '10,000,000',
        circulatingSupply: '2,500,000',
        marketCap: '$13,750,000',
        website: 'https://tbfyachtclub.com',
        contract: '0x8a3D4b9Cc6e2F1a6B5c8E0d9A1B2C3D4E5F6G7H8',
        features: [
            'VIP yacht access',
            'Exclusive events',
            'Luxury partner benefits',
            'Premium staking rewards'
        ]
    },
    phoenix: {
        name: 'Phoenix Rising',
        symbol: 'PHOENIX',
        description: 'Team token for Phoenix Rising esports team supporters.',
        descriptionTh: 'โทเค็นทีมสำหรับผู้สนับสนุนทีม Phoenix Rising อีสปอร์ต',
        totalSupply: '50,000,000',
        circulatingSupply: '15,000,000',
        marketCap: '$1,200,000',
        features: [
            'Team merchandise discounts',
            'Match prediction rewards',
            'Exclusive team content',
            'Meet & greet opportunities'
        ]
    },
    shadow: {
        name: 'Shadow Strikers',
        symbol: 'SHADOW',
        description: 'Team token for Shadow Strikers esports team supporters.',
        descriptionTh: 'โทเค็นทีมสำหรับผู้สนับสนุนทีม Shadow Strikers อีสปอร์ต',
        totalSupply: '50,000,000',
        circulatingSupply: '12,000,000',
        marketCap: '$960,000',
        features: [
            'Team merchandise discounts',
            'Match prediction rewards',
            'Exclusive team content',
            'Meet & greet opportunities'
        ]
    },
    thunder: {
        name: 'Thunder Titans',
        symbol: 'THUNDER',
        description: 'Team token for Thunder Titans esports team supporters.',
        descriptionTh: 'โทเค็นทีมสำหรับผู้สนับสนุนทีม Thunder Titans อีสปอร์ต',
        totalSupply: '50,000,000',
        circulatingSupply: '18,000,000',
        marketCap: '$1,440,000',
        features: [
            'Team merchandise discounts',
            'Match prediction rewards',
            'Exclusive team content',
            'Meet & greet opportunities'
        ]
    },
    dragon: {
        name: 'Dragon Dynasty',
        symbol: 'DRAGON',
        description: 'Team token for Dragon Dynasty esports team supporters.',
        descriptionTh: 'โทเค็นทีมสำหรับผู้สนับสนุนทีม Dragon Dynasty อีสปอร์ต',
        totalSupply: '50,000,000',
        circulatingSupply: '10,000,000',
        marketCap: '$800,000',
        features: [
            'Team merchandise discounts',
            'Match prediction rewards',
            'Exclusive team content',
            'Meet & greet opportunities'
        ]
    }
};

// Filter categories
export const filters = [
    { id: 'all', label: 'All', labelTh: 'ทั้งหมด' },
    { id: 'travel', label: 'Travel', labelTh: 'ท่องเที่ยว', icon: 'plane' },
    { id: 'hospitality', label: 'Hospitality', labelTh: 'โรงแรม', icon: 'hotel' },
    { id: 'goods', label: 'Goods', labelTh: 'สินค้า', icon: 'shopping-bag' },
    { id: 'dining', label: 'Dining', labelTh: 'อาหาร', icon: 'utensils' },
];