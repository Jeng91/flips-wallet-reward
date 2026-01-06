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
    {
        id: "tx1",
        type: "Transfer",
        title: "Transfer Coins",
        date: "Today, 10:42 AM",
        amount: -14.99,
        currency: "USD",
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
        status: "Success",
        icon: "plus-circle"
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
        timeline: {
            currentStep: 4,
            steps: [
                { label: "Pre-Prod", date: "Jan '23" },
                { label: "Filming", date: "Jun '23" },
                { label: "Post-Prod", date: "Oct '23" },
                { label: "Release", date: "Dec '23" },
                { label: "Streaming", date: "Now" }
            ],
            nextMilestone: "Global Netflix Launch",
            boxOffice: "$152M"
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
        timeline: {
            currentStep: 3,
            steps: [
                { label: "Scripting", date: "Q1 '23" },
                { label: "Casting", date: "Q2 '23" },
                { label: "Filming", date: "Q4 '23" },
                { label: "Editing", date: "Current" },
                { label: "Premiere", date: "Q3 '24" }
            ],
            nextMilestone: "Official Trailer Release",
            boxOffice: "N/A"
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
        timeline: {
            currentStep: 2,
            steps: [
                { label: "Licensing", date: "Done" },
                { label: "Restoration", date: "Done" },
                { label: "Sound", date: "In Progress" },
                { label: "Marketing", date: "Q3 '24" },
                { label: "Re-Release", date: "Q4 '24" }
            ],
            nextMilestone: "IMAX Trailer Drop",
            boxOffice: "Est. $50M"
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
        timeline: {
            currentStep: 1,
            steps: [
                { label: "Concept", date: "Done" },
                { label: "Casting", date: "Current" },
                { label: "Pre-Prod", date: "Q2 '24" },
                { label: "Filming", date: "Q3 '24" },
                { label: "Release", date: "2025" }
            ],
            nextMilestone: "Lead Actor Announcement",
            boxOffice: "N/A"
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
        timeline: { currentStep: 2, steps: [], nextMilestone: "Trailer", boxOffice: "N/A" }
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
        timeline: { currentStep: 0, steps: [], nextMilestone: "Casting", boxOffice: "N/A" }
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
        timeline: { currentStep: 5, steps: [], nextMilestone: "Streaming", boxOffice: "$89M" }
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
        timeline: { currentStep: 1, steps: [], nextMilestone: "Script Finalization", boxOffice: "N/A" }
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
    // TBF (BOAT) PRIVILEGES
    {
        id: 301,
        title: 'Sunset Yacht Cruise',
        titleTh: 'ล่องเรือยอร์ชชมพระอาทิตย์ตก',
        subtitle: '3-hour luxury sunset cruise',
        subtitleTh: 'ล่องเรือหรู 3 ชั่วโมงชมพระอาทิตย์ตก',
        category: 'boat-passes',
        categoryLabel: 'Boat Passes',
        categoryLabelTh: 'บัตรล่องเรือ',
        image: 'https://placehold.co/400x200/0369a1/ffffff?text=Sunset+Cruise',
        price: 800,
        rating: 4.9,
        reviews: 145,
        isPhysical: false,
        tier: 'gold',
        eventDate: 'Flexible',
        venue: 'Pattaya Marina',
        description: 'Experience a magical sunset cruise on our luxury yacht with drinks and canapes.',
        descriptionTh: 'สัมผัสประสบการณ์ล่องเรือยอร์ชหรูชมพระอาทิตย์ตกพร้อมเครื่องดื่มและคานาเป้',
        conditions: ['Valid for 2 persons', 'Advance booking required', 'Subject to weather'],
        conditionsTh: ['ใช้ได้ 2 ท่าน', 'ต้องจองล่วงหน้า', 'ขึ้นอยู่กับสภาพอากาศ'],
        mainCategory: 'tbf'
    },
    {
        id: 302,
        title: 'VIP Yacht Party',
        titleTh: 'ปาร์ตี้บนเรือยอร์ช VIP',
        subtitle: 'Exclusive yacht party experience',
        subtitleTh: 'ประสบการณ์ปาร์ตี้บนเรือยอร์ชสุดพิเศษ',
        category: 'boat-events',
        categoryLabel: 'Yacht Events',
        categoryLabelTh: 'อีเว้นท์บนเรือ',
        image: 'https://placehold.co/400x200/0284c7/ffffff?text=Yacht+Party',
        price: 1500,
        rating: 5.0,
        reviews: 89,
        isPhysical: false,
        tier: 'gold',
        eventDate: '2025-02-14',
        venue: 'Phuket Marina',
        description: 'Join our exclusive VIP yacht party with premium drinks, DJ, and fireworks.',
        descriptionTh: 'ร่วมปาร์ตี้บนเรือยอร์ช VIP พร้อมเครื่องดื่มพรีเมียม DJ และพลุ',
        conditions: ['21+ only', 'Dress code: Smart casual', 'Includes all drinks'],
        conditionsTh: ['อายุ 21+ เท่านั้น', 'การแต่งกาย: Smart casual', 'รวมเครื่องดื่มทั้งหมด'],
        mainCategory: 'tbf'
    },
    {
        id: 303,
        title: 'Island Hopping Tour',
        titleTh: 'ทัวร์เกาะสุดหรู',
        subtitle: 'Full-day island exploration',
        subtitleTh: 'สำรวจเกาะเต็มวัน',
        category: 'boat-tours',
        categoryLabel: 'Luxury Tours',
        categoryLabelTh: 'ทัวร์หรู',
        image: 'https://placehold.co/400x200/0ea5e9/ffffff?text=Island+Tour',
        price: 1200,
        rating: 4.8,
        reviews: 178,
        isPhysical: false,
        tier: 'gold',
        venue: 'Krabi Islands',
        description: 'Explore 4 stunning islands with snorkeling, lunch, and sunset viewing.',
        descriptionTh: 'สำรวจ 4 เกาะสวยงามพร้อมดำน้ำตื้น อาหารกลางวัน และชมพระอาทิตย์ตก',
        conditions: ['Valid for 1 person', 'Includes lunch & equipment', 'Pickup from hotel'],
        conditionsTh: ['ใช้ได้ 1 ท่าน', 'รวมอาหารกลางวันและอุปกรณ์', 'รับจากโรงแรม'],
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
        id: 201,
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
        id: 202,
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

// Filter categories
export const filters = [
    { id: 'all', label: 'All', labelTh: 'ทั้งหมด' },
    { id: 'travel', label: 'Travel', labelTh: 'ท่องเที่ยว', icon: 'plane' },
    { id: 'hospitality', label: 'Hospitality', labelTh: 'โรงแรม', icon: 'hotel' },
    { id: 'goods', label: 'Goods', labelTh: 'สินค้า', icon: 'shopping-bag' },
    { id: 'dining', label: 'Dining', labelTh: 'อาหาร', icon: 'utensils' },
];