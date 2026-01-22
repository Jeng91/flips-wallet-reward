// =============================================
// EXTENDED ADMIN MOCK DATA
// User Management, Vouchers, Boats, Fractional TBF
// =============================================

// =============================================
// USER MANAGEMENT DATA
// =============================================

export const users = [
    { id: 1, name: "สมชาย ใจดี", email: "somchai@example.com", phone: "081-234-5678", registrationDate: "2024-01-05 14:32", lastActivity: "2024-01-08 10:20", status: "active", hasTokens: true, totalTokens: 8500 },
    { id: 2, name: "สมหญิง สวยงาม", email: "somying@example.com", phone: "082-345-6789", registrationDate: "2024-01-05 09:18", lastActivity: "2024-01-08 09:15", status: "active", hasTokens: true, totalTokens: 6200 },
    { id: 3, name: "John Smith", email: "john@example.com", phone: "083-456-7890", registrationDate: "2024-01-04 18:45", lastActivity: "2024-01-07 16:30", status: "active", hasTokens: true, totalTokens: 12000 },
    { id: 4, name: "วิทยา มีปัญญา", email: "wittaya@example.com", phone: "084-567-8901", registrationDate: "2024-01-05 11:22", lastActivity: "2024-01-08 08:45", status: "active", hasTokens: true, totalTokens: 3500 },
    { id: 5, name: "นภา ดาวเรือง", email: "napa@example.com", phone: "085-678-9012", registrationDate: "2024-01-05 16:55", lastActivity: "2024-01-08 11:20", status: "active", hasTokens: true, totalTokens: 9800 },
    { id: 6, name: "David Kim", email: "david@example.com", phone: "086-789-0123", registrationDate: "2024-01-03 08:12", lastActivity: "2024-01-06 14:30", status: "active", hasTokens: true, totalTokens: 15000 },
    { id: 7, name: "ชัยวัฒน์ รุ่งเรือง", email: "chaiwat@example.com", phone: "087-890-1234", registrationDate: "2024-01-05 13:40", lastActivity: "2024-01-08 07:50", status: "active", hasTokens: true, totalTokens: 4200 },
    { id: 8, name: "Sarah Chen", email: "sarah@example.com", phone: "088-901-2345", registrationDate: "2024-01-04 21:15", lastActivity: "2024-01-08 12:10", status: "active", hasTokens: true, totalTokens: 7600 },
    { id: 9, name: "อนันต์ ทองดี", email: "anan@example.com", phone: "089-012-3456", registrationDate: "2024-01-05 10:28", lastActivity: "2024-01-07 18:20", status: "active", hasTokens: true, totalTokens: 5500 },
    { id: 10, name: "ปรีชา สมบูรณ์", email: "preecha@example.com", phone: "090-123-4567", registrationDate: "2024-01-05 15:50", lastActivity: "2024-01-08 13:45", status: "active", hasTokens: true, totalTokens: 11200 },
    { id: 11, name: "Lisa Martinez", email: "lisa@example.com", phone: "091-234-5678", registrationDate: "2024-01-02 14:22", lastActivity: "2024-01-05 09:30", status: "inactive", hasTokens: true, totalTokens: 2800 },
    { id: 12, name: "ธนพล ศรีสุข", email: "thanapol@example.com", phone: "092-345-6789", registrationDate: "2024-01-05 12:08", lastActivity: "2024-01-08 14:20", status: "active", hasTokens: true, totalTokens: 18500 },
    { id: 13, name: "วารุณี จันทร์เพ็ญ", email: "warunee@example.com", phone: "093-456-7890", registrationDate: "2024-01-04 19:33", lastActivity: "2024-01-08 06:15", status: "active", hasTokens: true, totalTokens: 6700 },
    { id: 14, name: "Tom Anderson", email: "tom@example.com", phone: "094-567-8901", registrationDate: "2024-01-05 09:45", lastActivity: "2024-01-07 20:10", status: "active", hasTokens: true, totalTokens: 3200 },
    { id: 15, name: "Anna Schmidt", email: "anna@example.com", phone: "095-678-9012", registrationDate: "2024-01-05 17:12", lastActivity: "2024-01-08 15:30", status: "active", hasTokens: true, totalTokens: 9400 },
    { id: 16, name: "สุรศักดิ์ ปานกลาง", email: "surasak@example.com", phone: "096-789-0123", registrationDate: "2024-01-07 11:30", lastActivity: "2024-01-08 08:20", status: "active", hasTokens: false, totalTokens: 0 },
    { id: 17, name: "ดวงใจ รักษ์ดี", email: "duangjai@example.com", phone: "097-890-1234", registrationDate: "2024-01-07 14:15", lastActivity: "2024-01-08 09:45", status: "active", hasTokens: false, totalTokens: 0 },
    { id: 18, name: "Michael Lee", email: "michael@example.com", phone: "098-901-2345", registrationDate: "2024-01-08 08:00", lastActivity: "2024-01-08 10:30", status: "active", hasTokens: false, totalTokens: 0 },
    { id: 19, name: "วิชัย พลอยงาม", email: "wichai@example.com", phone: "099-012-3456", registrationDate: "2024-01-08 09:20", lastActivity: "2024-01-08 11:15", status: "active", hasTokens: false, totalTokens: 0 },
    { id: 20, name: "Emily Wong", email: "emily@example.com", phone: "080-123-4567", registrationDate: "2024-01-08 11:45", lastActivity: "2024-01-08 12:00", status: "active", hasTokens: false, totalTokens: 0 }
];

// =============================================
// COLESTIA VOUCHER DATA
// =============================================

export const colestiaMovies = [
    { id: 1, title: "ผีเสื้อและดอกไม้", titleEn: "Butterfly and Flowers", genre: "Romance", releaseDate: "2024-03-15", status: "upcoming", director: "วิชัย คงกระพัน", hasVouchers: true, voucherCount: 3, posterUrl: "/images/movies/butterfly-flowers.jpg" },
    { id: 2, title: "แดนสาป", titleEn: "The Cursed Land", genre: "Horror", releaseDate: "2024-02-20", status: "released", director: "สมชาย อาสนจินดา", hasVouchers: true, voucherCount: 5, posterUrl: "/images/movies/cursed-land.jpg" },
    { id: 3, title: "เส้นทางแห่งฝัน", titleEn: "Path of Dreams", genre: "Drama", releaseDate: "2024-05-10", status: "upcoming", director: "นภดล เมธาคุณวุฒิ", hasVouchers: true, voucherCount: 2, posterUrl: "/images/movies/path-dreams.jpg" }
];

export const colestiaNewMovies = [
    { id: 4, title: "รักในสายลม", titleEn: "Love in the Wind", genre: "Romance", releaseDate: "2024-06-25", status: "upcoming", director: "อาริยา เอ หริพันธุ์", hasVouchers: false, voucherCount: 0, posterUrl: "/images/movies/love-wind.jpg" },
    { id: 5, title: "ตำนานนักสู้", titleEn: "Legend of Warriors", genre: "Action", releaseDate: "2024-07-30", status: "upcoming", director: "ปรัชญา ปิ่นแก้ว", hasVouchers: false, voucherCount: 0, posterUrl: "/images/movies/legend-warriors.jpg" }
];

export const colestiaVouchers = [
    { id: 1, movieId: 1, movieTitle: "ผีเสื้อและดอกไม้", name: "แก้วน้ำ", type: "Product", category: "ไม่", description: "แก้วน้ำลายผีเสื้อและดอกไม้ ของที่ระลึกสุดพิเศษ", conditions: ["ฟรีเมื่อเงินก่นทุน ใช้โปรโมคอด", "แทนค่าค่าจัดส่ง ที่กดรับ หน้าตบาง ครองคาตา"], startDate: "2024-01-01", expiryDate: "2024-08-29", rewardType: "ไม่", totalStock: 122, redeemed: 11, remaining: 111, images: ["/images/vouchers/cup-butterfly.jpg"], createdDate: "2024-01-01 10:00" },
    { id: 2, movieId: 1, movieTitle: "ผีเสื้อและดอกไม้", name: "เสื้อยืด", type: "Product", category: "ตัว", description: "เสื้อยืดลายภาพยนตร์ ของเก็บสะสม", conditions: ["ฟรีเมื่อจอง กดรับได้ที่ ใช่ได้ทุกโคนา"], startDate: "2024-01-01", expiryDate: "2024-08-29", rewardType: "ตัว", totalStock: 122, redeemed: 11, remaining: 111, images: ["/images/vouchers/tshirt-black.jpg"], createdDate: "2024-01-01 11:30" },
    { id: 3, movieId: 2, movieTitle: "แดนสาป", name: "ตั๋วชมรอบพิเศษ", type: "Activity", category: "ใบ", description: "ตั๋วชมภาพยนตร์รอบพิเศษก่อนฉายจริง", conditions: ["จองล่วงหน้าออนไลน์", "ใช้ได้ที่โรงภาพยนตร์ที่ร่วมรายการ"], startDate: "2024-01-15", expiryDate: "2024-02-19", rewardType: "ใบ", totalStock: 200, redeemed: 85, remaining: 115, images: ["/images/vouchers/ticket-cursed.jpg"], createdDate: "2024-01-15 09:00" },
    { id: 4, movieId: 2, movieTitle: "แดนสาป", name: "โปสเตอร์จำกัด", type: "Product", category: "แผ่น", description: "โปสเตอร์ภาพยนตร์ลายเซ็นผู้กำกับ", conditions: ["มีจำนวนจำกัด", "สำหรับผู้สนับสนุนทุน"], startDate: "2024-01-10", expiryDate: "2024-12-31", rewardType: "แผ่น", totalStock: 50, redeemed: 32, remaining: 18, images: ["/images/vouchers/poster-cursed.jpg"], createdDate: "2024-01-10 14:20" }
];

//==============================================
// CTRLG & TBF VOUCHER DATA  
// =============================================

export const ctrlgMovies = [
    { id: 1, title: "The Last Horizon", titleTh: "ขอบฟ้าสุดท้าย", genre: "Sci-Fi", releaseDate: "2024-04-12", status: "upcoming", director: "James Mitchell", hasVouchers: true, voucherCount: 2, posterUrl: "/images/movies/last-horizon.jpg" },
    { id: 2, title: "Urban Dreams", titleTh: "ความฝันในเมือง", genre: "Drama", releaseDate: "2024-03-08", status: "released", director: "Sarah Johnson", hasVouchers: true, voucherCount: 3, posterUrl: "/images/movies/urban-dreams.jpg" }
];

export const ctrlgVouchers = [
    { id: 1, movieId: 1, movieTitle: "The Last Horizon", name: "Exclusive T-Shirt", type: "Product", category: "piece", description: "Limited edition movie merchandise t-shirt", conditions: ["One per customer", "Available while stocks last"], startDate: "2024-02-01", expiryDate: "2024-04-30", rewardType: "piece", totalStock: 100, redeemed: 35, remaining: 65, images: ["/images/vouchers/tshirt-horizon.jpg"], createdDate: "2024-02-01 10:00" },
    { id: 2, movieId: 2, movieTitle: "Urban Dreams", name: "VIP Screening Pass", type: "Activity", category: "ticket", description: "VIP access to exclusive screening", conditions: ["Must book in advance", "Valid at selected cinemas"], startDate: "2024-02-15", expiryDate: "2024-03-07", rewardType: "ticket", totalStock: 150, redeemed: 98, remaining: 52, images: ["/images/vouchers/vip-urban.jpg"], createdDate: "2024-02-15 14:30" }
];

// =============================================
// TBF YACHT FLEET DATA (Real 2-Yacht Fleet)
// =============================================

export const tbfYachts = [
    {
        id: 'merry-fisher',
        name: 'Merry Fisher 1095 FLY',
        brand: 'Jeanneau',
        tagline: 'Built for Enjoyment',
        type: 'Flybridge Motor Yacht',
        specs: {
            length: '10.45m',
            lengthFeet: '34 ft',
            beam: '3.25m',
            draft: '0.73m',
            weight: '4,582 kg',
            fuel: '2×400L',
            water: '260L',
            power: '2×300 HP',
            cabins: 3,
            maxPax: 8
        },
        features: [
            'Spacious flybridge with sunpad',
            '3 private cabins',
            'Full air conditioning',
            'Twin 300 HP engines',
            'Gyroscopic stabilizer',
            'Full galley kitchen',
            'Underwater & deck lighting'
        ],
        description: 'A modern flybridge motor yacht designed for comfort, stability, and effortless cruising.',
        descriptionTh: 'เรือยอชท์ flybridge ทันสมัย ออกแบบมาเพื่อความสะดวกสบาย เสถียร และการล่องเรือที่ราบรื่น',
        images: ['/images/yachts/merry-fisher-1.jpg', '/images/yachts/merry-fisher-2.jpg'],
        status: 'available'
    },
    {
        id: 'cap-camarat',
        name: 'Cap Camarat 10.5 CC',
        brand: 'Jeanneau',
        tagline: 'Built for Adventure',
        type: 'Center-Console Sports Yacht',
        specs: {
            length: '10.90m',
            lengthFeet: '36 ft',
            beam: '3.37m',
            draft: '0.95m',
            weight: '5,300 kg',
            fuel: '2×400L',
            water: '160L',
            power: '2×300 HP',
            cabins: '1+1',
            maxPax: 8
        },
        features: [
            'Open center-console design',
            'Up to 8 passengers',
            'Deep-V hull for stability',
            '2×300 HP outboards',
            'T-Top with shade',
            'Underwater LED lights',
            'Large sun lounges'
        ],
        description: 'A powerful center-console yacht designed for open-sea performance, social cruising, and versatile day experiences.',
        descriptionTh: 'เรือยอชท์ center-console ทรงพลัง ออกแบบมาเพื่อสมรรถนะในทะเลเปิด การล่องเรือแบบสังคม และประสบการณ์ที่หลากหลาย',
        images: ['/images/yachts/cap-camarat-1.jpg', '/images/yachts/cap-camarat-2.jpg'],
        status: 'available'
    }
];

// Yacht Fleet Location
export const yachtLocation = {
    name: 'Boat Lagoon Yachting Charter',
    address: '22/1 ถ.เทพกระษัตรี ต.เกาะแก้ว',
    city: 'Muang, Phuket 83000',
    rating: 4.9,
    reviews: 11,
    mapUrl: 'https://maps.google.com/?q=Boat+Lagoon+Phuket'
};

// =============================================
// MEMBER FRACTION PROGRAM
// =============================================

export const memberFractionProgram = {
    name: 'FLIPS Member Fraction Program',
    tagline: 'Your Exclusive Opportunity',
    description: 'Fractional yacht ownership designed for lifestyle members. All the benefits of ownership, none of the hassle.',
    pricePerFraction: 99000, // THB
    currency: 'THB',
    ticketsPerYear: 2,
    hoursPerTicket: 4,
    programYears: 5,
    totalTickets: 10, // 2 × 5
    maxPaxPerTrip: 8,
    benefits: [
        'Access to both yachts in the fleet',
        'Priority booking over charter customers',
        'No maintenance or crew management costs',
        'Cruise or Cash Flexibility'
    ],
    cashOptions: {
        charterMatch: {
            name: 'Charter Match',
            pricePerTicket: 9900, // THB
            noticePeriod: 90, // days
            description: 'Match with charter demand'
        },
        mvpExchange: {
            name: 'MVP Exchange',
            description: 'List on the MVP Exchange at market price',
            noticePeriod: null // anytime
        }
    }
};

// Member Fraction Owners
export const fractionOwners = [
    { 
        id: 1, 
        userId: 'USER001',
        name: 'สมชาย ใจดี', 
        email: 'somchai@example.com',
        phone: '081-234-5678',
        fractions: 1, 
        purchaseDate: '2024-01-15',
        ticketsTotal: 10,
        ticketsUsed: 2,
        ticketsRemaining: 8,
        ticketsCashedOut: 0,
        status: 'active'
    },
    { 
        id: 2, 
        userId: 'USER005',
        name: 'นภา ดาวเรือง', 
        email: 'napa@example.com',
        phone: '085-678-9012',
        fractions: 1, 
        purchaseDate: '2024-02-01',
        ticketsTotal: 10,
        ticketsUsed: 1,
        ticketsRemaining: 9,
        ticketsCashedOut: 0,
        status: 'active'
    },
    { 
        id: 3, 
        userId: 'USER012',
        name: 'ธนพล ศรีสุข', 
        email: 'thanapol@example.com',
        phone: '092-345-6789',
        fractions: 2, 
        purchaseDate: '2024-01-20',
        ticketsTotal: 20,
        ticketsUsed: 3,
        ticketsRemaining: 15,
        ticketsCashedOut: 2,
        status: 'active'
    }
];

// Yacht Bookings (from fraction tickets)
export const yachtBookings = [
    { 
        id: 1, 
        ownerId: 1, 
        ownerName: 'สมชาย ใจดี',
        yachtId: 'merry-fisher',
        yachtName: 'Merry Fisher 1095 FLY',
        bookingDate: '2024-02-15',
        startTime: '09:00',
        endTime: '13:00', // 4 hours
        guests: 6,
        purpose: 'ทริปครอบครัว',
        status: 'confirmed',
        ticketUsed: true,
        requestDate: '2024-02-01 10:30'
    },
    { 
        id: 2, 
        ownerId: 2, 
        ownerName: 'นภา ดาวเรือง',
        yachtId: 'cap-camarat',
        yachtName: 'Cap Camarat 10.5 CC',
        bookingDate: '2024-02-20',
        startTime: '14:00',
        endTime: '18:00',
        guests: 4,
        purpose: 'Sunset cruise',
        status: 'pending',
        ticketUsed: false,
        requestDate: '2024-02-10 14:20'
    },
    { 
        id: 3, 
        ownerId: 3, 
        ownerName: 'ธนพล ศรีสุข',
        yachtId: 'merry-fisher',
        yachtName: 'Merry Fisher 1095 FLY',
        bookingDate: '2024-02-25',
        startTime: '10:00',
        endTime: '14:00',
        guests: 8,
        purpose: 'งานปาร์ตี้บริษัท',
        status: 'pending',
        ticketUsed: false,
        requestDate: '2024-02-12 09:15'
    }
];

// Ticket Cash-Out Redemptions
export const ticketRedemptions = [
    {
        id: 1,
        ownerId: 3,
        ownerName: 'ธนพล ศรีสุข',
        redemptionType: 'charter_match',
        ticketCount: 2,
        valuePerTicket: 9900,
        totalValue: 19800,
        requestDate: '2024-01-25',
        status: 'paid', // pending, approved, paid
        paidDate: '2024-02-08',
        notes: 'Charter match completed'
    }
];

// Legacy exports for backward compatibility
export const tbfBoats = tbfYachts;
export const tbfBookings = yachtBookings;
export const tbfConfirmedBookings = yachtBookings.filter(b => b.status === 'confirmed');
export const fractionalBoat = {
    ...tbfYachts[0],
    totalShares: 10,
    sharesSold: 3,
    pricePerShare: memberFractionProgram.pricePerFraction
};
export const fractionalOwners = fractionOwners;
export const fractionalSchedule = [];
export const fractionalBookings = yachtBookings.filter(b => b.status === 'pending');
export const fractionalConfirmedBookings = yachtBookings.filter(b => b.status === 'confirmed');
