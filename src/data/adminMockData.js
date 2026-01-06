// =============================================
// ADMIN MOCK DATA
// Comprehensive data for admin console
// =============================================

// Film Token Data
export const filmTokens = [
    {
        id: 1,
        tokenName: "Sanam Luang Retro Token",
        tokenSymbol: "SLR",
        filmName: "Sanam Luang Retro",
        price: 10.00,
        totalSupply: 100000,
        sold: 95000,
        remaining: 5000,
        burned: 2000,
        status: "active",
        holderCount: 1234,
        saleStartDate: "2023-01-15",
        saleEndDate: "2023-06-30",
        tokenRules: [
            "1 token = 1 FLIPS reward upon film release",
            "Tokens can be used for exclusive privileges",
            "Transferable on secondary market",
            "Burn mechanism for scarcity"
        ],
        contractAddress: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"
    },
    {
        id: 2,
        tokenName: "Luang Phee Jazz 4G Token",
        tokenSymbol: "LPJ",
        filmName: "Luang Phee Jazz 4G",
        price: 8.50,
        totalSupply: 75000,
        sold: 48000,
        remaining: 27000,
        burned: 500,
        status: "active",
        holderCount: 892,
        saleStartDate: "2023-03-01",
        saleEndDate: "2024-03-31",
        tokenRules: [
            "1 token = 0.8 FLIPS reward",
            "Early bird discounts available",
            "Redeemable for film merchandise",
            "Staking available for bonus rewards"
        ],
        contractAddress: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063"
    },
    {
        id: 3,
        tokenName: "Ong Bak Remastered Token",
        tokenSymbol: "OBR",
        filmName: "Ong Bak Remastered",
        price: 12.00,
        totalSupply: 120000,
        sold: 120000,
        remaining: 0,
        burned: 8000,
        status: "paused",
        holderCount: 2456,
        saleStartDate: "2023-02-10",
        saleEndDate: "2023-05-15",
        tokenRules: [
            "Limited edition token - Sold Out",
            "1 token = 1.2 FLIPS reward",
            "Exclusive access to remastered content",
            "Collectible NFT included"
        ],
        contractAddress: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174"
    },
    {
        id: 4,
        tokenName: "Pee Mak Part 2 Token",
        tokenSymbol: "PM2",
        filmName: "Pee Mak Part 2",
        price: 5.00,
        totalSupply: 50000,
        sold: 12500,
        remaining: 37500,
        burned: 0,
        status: "active",
        holderCount: 345,
        saleStartDate: "2024-01-01",
        saleEndDate: "2024-12-31",
        tokenRules: [
            "Early stage investment token",
            "1 token = 0.5 FLIPS base reward",
            "Bonus rewards at milestones",
            "Voting rights on creative decisions"
        ],
        contractAddress: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F"
    },
    {
        id: 5,
        tokenName: "Bangkok Midnight Token",
        tokenSymbol: "BKM",
        filmName: "Bangkok Midnight",
        price: 7.50,
        totalSupply: 80000,
        sold: 65000,
        remaining: 15000,
        burned: 1200,
        status: "active",
        holderCount: 1567,
        saleStartDate: "2023-08-20",
        saleEndDate: "2024-06-30",
        tokenRules: [
            "1 token = 0.75 FLIPS reward",
            "Access to behind-the-scenes content",
            "Redeemable for premiere tickets",
            "Partnership rewards available"
        ],
        contractAddress: "0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6"
    }
];

// Wallet Holder Data
export const walletHolders = [
    { id: 1, userId: "USER001", walletAddress: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb", totalTokens: 8500, lastActivity: "2024-01-05 14:32", filmTokens: { SLR: 5000, LPJ: 2500, BKM: 1000 } },
    { id: 2, userId: "USER002", walletAddress: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063", totalTokens: 6200, lastActivity: "2024-01-05 09:18", filmTokens: { OBR: 4000, PM2: 2200 } },
    { id: 3, userId: "USER003", walletAddress: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174", totalTokens: 12000, lastActivity: "2024-01-04 18:45", filmTokens: { SLR: 8000, OBR: 4000 } },
    { id: 4, userId: "USER004", walletAddress: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F", totalTokens: 3500, lastActivity: "2024-01-05 11:22", filmTokens: { BKM: 2500, PM2: 1000 } },
    { id: 5, userId: "USER005", walletAddress: "0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6", totalTokens: 9800, lastActivity: "2024-01-05 16:55", filmTokens: { SLR: 4000, LPJ: 3800, BKM: 2000 } },
    { id: 6, userId: "USER006", walletAddress: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619", totalTokens: 15000, lastActivity: "2024-01-03 08:12", filmTokens: { OBR: 10000, SLR: 5000 } },
    { id: 7, userId: "USER007", walletAddress: "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270", totalTokens: 4200, lastActivity: "2024-01-05 13:40", filmTokens: { LPJ: 2200, PM2: 2000 } },
    { id: 8, userId: "USER008", walletAddress: "0x53E0bca35eC356BD5ddDFebbD1Fc0fD03FaBad39", totalTokens: 7600, lastActivity: "2024-01-04 21:15", filmTokens: { BKM: 5000, SLR: 2600 } },
    { id: 9, userId: "USER009", walletAddress: "0x831753DD7087CaC61aB5644b308642cc1c33Dc13", totalTokens: 5500, lastActivity: "2024-01-05 10:28", filmTokens: { OBR: 3500, LPJ: 2000 } },
    { id: 10, userId: "USER010", walletAddress: "0xD6DF932A45C0f255f85145f286eA0b292B21C90B", totalTokens: 11200, lastActivity: "2024-01-05 15:50", filmTokens: { SLR: 6000, BKM: 3200, PM2: 2000 } },
    { id: 11, userId: "USER011", walletAddress: "0x8505b9d2254A7Ae468c0E9dd10Ccea3A837aef5c", totalTokens: 2800, lastActivity: "2024-01-02 14:22", filmTokens: { PM2: 1800, LPJ: 1000 } },
    { id: 12, userId: "USER012", walletAddress: "0x172370d5Cd63279eFa6d502DAB29171933a610AF", totalTokens: 18500, lastActivity: "2024-01-05 12:08", filmTokens: { OBR: 12000, SLR: 6500 } },
    { id: 13, userId: "USER013", walletAddress: "0xb33EaAd8d922B1083446DC23f610c2567fB5180f", totalTokens: 6700, lastActivity: "2024-01-04 19:33", filmTokens: { BKM: 4000, LPJ: 2700 } },
    { id: 14, userId: "USER014", walletAddress: "0x85955046DF4668e1DD369D2DE9f3AEB98DD2A369", totalTokens: 3200, lastActivity: "2024-01-05 09:45", filmTokens: { SLR: 2000, PM2: 1200 } },
    { id: 15, userId: "USER015", walletAddress: "0x03b54A6e9a984069379fae1a4fC4dBAE93B3bCCD", totalTokens: 9400, lastActivity: "2024-01-05 17:12", filmTokens: { OBR: 5000, BKM: 4400 } },
    { id: 16, userId: "USER016", walletAddress: "0x45c32fA6DF82ead1e2EF74d17b76547EDdFaFF89", totalTokens: 5100, lastActivity: "2024-01-03 11:55", filmTokens: { LPJ: 3100, SLR: 2000 } },
    { id: 17, userId: "USER017", walletAddress: "0x692597b009d13C4049a947CAB2239b7d6517875F", totalTokens: 14000, lastActivity: "2024-01-05 08:30", filmTokens: { SLR: 8000, OBR: 6000 } },
    { id: 18, userId: "USER018", walletAddress: "0xA1c57f48F0Deb89f569dFbE6E2B7f46D33606fD4", totalTokens: 4800, lastActivity: "2024-01-04 16:20", filmTokens: { BKM: 2800, PM2: 2000 } },
    { id: 19, userId: "USER019", walletAddress: "0xB0897686c545045aFc77CF20eC7A532E3120E0F1", totalTokens: 7200, lastActivity: "2024-01-05 14:05", filmTokens: { LPJ: 4200, SLR: 3000 } },
    { id: 20, userId: "USER020", walletAddress: "0x580A84C73811E1839F75d86d75d88cCa0c241fF4", totalTokens: 16500, lastActivity: "2024-01-05 19:42", filmTokens: { OBR: 10000, BKM: 6500 } }
];

// Redemption Queue Data
export const redemptionQueue = [
    {
        id: 1,
        userId: "USER003",
        userName: "James Angle",
        filmName: "Sanam Luang Retro",
        filmSymbol: "SLR",
        rewardTitle: "Premiere Night VIP",
        rewardType: "Event Ticket",
        tokensUsed: 500,
        requestDate: "2024-01-05 10:30",
        status: "pending"
    },
    {
        id: 2,
        userId: "USER012",
        userName: "Sarah Chen",
        filmName: "Ong Bak Remastered",
        filmSymbol: "OBR",
        rewardTitle: "Martial Arts Workshop",
        rewardType: "Workshop",
        tokensUsed: 800,
        requestDate: "2024-01-05 09:15",
        status: "pending"
    },
    {
        id: 3,
        userId: "USER006",
        userName: "David Kim",
        filmName: "Sanam Luang Retro",
        filmSymbol: "SLR",
        rewardTitle: "Movie Poster Collection",
        rewardType: "Merchandise",
        tokensUsed: 400,
        requestDate: "2024-01-04 18:45",
        status: "approved"
    },
    {
        id: 4,
        userId: "USER005",
        userName: "Emily Wong",
        filmName: "Bangkok Midnight",
        filmSymbol: "BKM",
        rewardTitle: "Signed Blu-ray Edition",
        rewardType: "Merchandise",
        tokensUsed: 600,
        requestDate: "2024-01-04 14:20",
        status: "approved"
    },
    {
        id: 5,
        userId: "USER017",
        userName: "Michael Lee",
        filmName: "Ong Bak Remastered",
        filmSymbol: "OBR",
        rewardTitle: "Private Screening 4K",
        rewardType: "Event Ticket",
        tokensUsed: 2500,
        requestDate: "2024-01-03 16:55",
        status: "rejected"
    },
    {
        id: 6,
        userId: "USER010",
        userName: "Lisa Martinez",
        filmName: "Luang Phee Jazz 4G",
        filmSymbol: "LPJ",
        rewardTitle: "Meet & Greet Cast",
        rewardType: "Meet & Greet",
        tokensUsed: 1200,
        requestDate: "2024-01-05 11:40",
        status: "pending"
    },
    {
        id: 7,
        userId: "USER008",
        userName: "Tom Anderson",
        filmName: "Bangkok Midnight",
        filmSymbol: "BKM",
        rewardTitle: "Behind the Scenes DVD",
        rewardType: "Merchandise",
        tokensUsed: 350,
        requestDate: "2024-01-04 20:10",
        status: "approved"
    },
    {
        id: 8,
        userId: "USER015",
        userName: "Anna Schmidt",
        filmName: "Sanam Luang Retro",
        filmSymbol: "SLR",
        rewardTitle: "Director Meet & Greet",
        rewardType: "Meet & Greet",
        tokensUsed: 1500,
        requestDate: "2024-01-05 13:25",
        status: "pending"
    },
    {
        id: 9,
        userId: "USER004",
        userName: "Chris Brown",
        filmName: "Pee Mak Part 2",
        filmSymbol: "PM2",
        rewardTitle: "Early Access Screening",
        rewardType: "Event Ticket",
        tokensUsed: 300,
        requestDate: "2024-01-02 09:30",
        status: "approved"
    },
    {
        id: 10,
        userId: "USER019",
        userName: "Nina Patel",
        filmName: "Luang Phee Jazz 4G",
        filmSymbol: "LPJ",
        rewardTitle: "Premiere Night VIP",
        rewardType: "Event Ticket",
        tokensUsed: 400,
        requestDate: "2024-01-05 15:50",
        status: "pending"
    }
];

// Funding Reports Data
export const fundingReports = [
    {
        filmId: 1,
        filmName: "Sanam Luang Retro",
        tokenSymbol: "SLR",
        targetFunding: 1000000,
        raisedFund: 950000,
        tokensSold: 95000,
        totalSupply: 100000,
        utilizationRate: 85.2,
        redemptionCost: 127500,
        redemptionCount: 234,
        activeHolders: 1234,
        averageHolding: 77.02,
        status: "Active"
    },
    {
        filmId: 2,
        filmName: "Luang Phee Jazz 4G",
        tokenSymbol: "LPJ",
        targetFunding: 637500,
        raisedFund: 408000,
        tokensSold: 48000,
        totalSupply: 75000,
        utilizationRate: 64.0,
        redemptionCost: 48600,
        redemptionCount: 89,
        activeHolders: 892,
        averageHolding: 53.81,
        status: "Active"
    },
    {
        filmId: 3,
        filmName: "Ong Bak Remastered",
        tokenSymbol: "OBR",
        targetFunding: 1440000,
        raisedFund: 1440000,
        tokensSold: 120000,
        totalSupply: 120000,
        utilizationRate: 92.8,
        redemptionCost: 278400,
        redemptionCount: 456,
        activeHolders: 2456,
        averageHolding: 48.86,
        status: "Sold Out"
    },
    {
        filmId: 4,
        filmName: "Pee Mak Part 2",
        tokenSymbol: "PM2",
        targetFunding: 250000,
        raisedFund: 62500,
        tokensSold: 12500,
        totalSupply: 50000,
        utilizationRate: 25.0,
        redemptionCost: 5250,
        redemptionCount: 23,
        activeHolders: 345,
        averageHolding: 36.23,
        status: "Active"
    },
    {
        filmId: 5,
        filmName: "Bangkok Midnight",
        tokenSymbol: "BKM",
        targetFunding: 600000,
        raisedFund: 487500,
        tokensSold: 65000,
        totalSupply: 80000,
        utilizationRate: 81.25,
        redemptionCost: 89050,
        redemptionCount: 167,
        activeHolders: 1567,
        averageHolding: 41.48,
        status: "Active"
    }
];

// Admin Roles & Permissions Data
export const adminRoles = [
    {
        id: 1,
        roleName: "Super Admin",
        description: "Full system access and control",
        permissions: {
            tokenManagement: { view: true, create: true, edit: true, delete: true, pause: true, burn: true },
            walletMonitoring: { view: true, export: true, block: true },
            redemptionQueue: { view: true, approve: true, reject: true, edit: true },
            reports: { view: true, export: true, generate: true },
            userManagement: { view: true, create: true, edit: true, delete: true, assignRoles: true },
            systemSettings: { view: true, edit: true }
        },
        userCount: 2,
        color: "bg-red-500"
    },
    {
        id: 2,
        roleName: "Finance Admin",
        description: "Financial operations and reporting",
        permissions: {
            tokenManagement: { view: true, create: false, edit: true, delete: false, pause: true, burn: false },
            walletMonitoring: { view: true, export: true, block: false },
            redemptionQueue: { view: true, approve: true, reject: true, edit: false },
            reports: { view: true, export: true, generate: true },
            userManagement: { view: true, create: false, edit: false, delete: false, assignRoles: false },
            systemSettings: { view: false, edit: false }
        },
        userCount: 3,
        color: "bg-green-500"
    },
    {
        id: 3,
        roleName: "Film Manager",
        description: "Film project and token management",
        permissions: {
            tokenManagement: { view: true, create: true, edit: true, delete: false, pause: true, burn: false },
            walletMonitoring: { view: true, export: false, block: false },
            redemptionQueue: { view: true, approve: true, reject: false, edit: false },
            reports: { view: true, export: false, generate: false },
            userManagement: { view: false, create: false, edit: false, delete: false, assignRoles: false },
            systemSettings: { view: false, edit: false }
        },
        userCount: 5,
        color: "bg-blue-500"
    },
    {
        id: 4,
        roleName: "Support",
        description: "Customer support and basic operations",
        permissions: {
            tokenManagement: { view: true, create: false, edit: false, delete: false, pause: false, burn: false },
            walletMonitoring: { view: true, export: false, block: false },
            redemptionQueue: { view: true, approve: false, reject: false, edit: false },
            reports: { view: true, export: false, generate: false },
            userManagement: { view: true, create: false, edit: false, delete: false, assignRoles: false },
            systemSettings: { view: false, edit: false }
        },
        userCount: 8,
        color: "bg-purple-500"
    }
];

// Admin Users
export const adminUsers = [
    { id: 1, name: "Admin User", email: "admin@flips.com", role: "Super Admin", lastLogin: "2024-01-05 19:30", status: "active" },
    { id: 2, name: "John Doe", email: "john@flips.com", role: "Super Admin", lastLogin: "2024-01-04 15:20", status: "active" },
    { id: 3, name: "Jane Smith", email: "jane@flips.com", role: "Finance Admin", lastLogin: "2024-01-05 17:45", status: "active" },
    { id: 4, name: "Mike Johnson", email: "mike@flips.com", role: "Finance Admin", lastLogin: "2024-01-05 10:12", status: "active" },
    { id: 5, name: "Sarah Williams", email: "sarah@flips.com", role: "Finance Admin", lastLogin: "2024-01-03 14:30", status: "active" },
    { id: 6, name: "David Brown", email: "david@flips.com", role: "Film Manager", lastLogin: "2024-01-05 18:55", status: "active" },
    { id: 7, name: "Emily Davis", email: "emily@flips.com", role: "Film Manager", lastLogin: "2024-01-05 12:40", status: "active" },
    { id: 8, name: "Chris Wilson", email: "chris@flips.com", role: "Film Manager", lastLogin: "2024-01-05 09:15", status: "active" },
    { id: 9, name: "Lisa Martinez", email: "lisa@flips.com", role: "Film Manager", lastLogin: "2024-01-04 20:30", status: "active" },
    { id: 10, name: "Tom Anderson", email: "tom@flips.com", role: "Film Manager", lastLogin: "2024-01-02 11:20", status: "inactive" },
    { id: 11, name: "Anna Taylor", email: "anna@flips.com", role: "Support", lastLogin: "2024-01-05 19:10", status: "active" },
    { id: 12, name: "Robert Thomas", email: "robert@flips.com", role: "Support", lastLogin: "2024-01-05 16:25", status: "active" },
    { id: 13, name: "Maria Garcia", email: "maria@flips.com", role: "Support", lastLogin: "2024-01-05 14:50", status: "active" },
    { id: 14, name: "James Rodriguez", email: "james@flips.com", role: "Support", lastLogin: "2024-01-05 13:35", status: "active" },
    { id: 15, name: "Patricia Lee", email: "patricia@flips.com", role: "Support", lastLogin: "2024-01-05 11:55", status: "active" },
    { id: 16, name: "Michael White", email: "michael@flips.com", role: "Support", lastLogin: "2024-01-04 18:40", status: "active" },
    { id: 17, name: "Linda Harris", email: "linda@flips.com", role: "Support", lastLogin: "2024-01-05 08:20", status: "active" },
    { id: 18, name: "Daniel Clark", email: "daniel@flips.com", role: "Support", lastLogin: "2024-01-03 16:10", status: "inactive" }
];
