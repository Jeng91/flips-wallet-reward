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

export const tbfBoats = [
    { id: 1, name: "Sea Breeze", nameTh: "สายลมทะเล", type: "Yacht", capacity: 12, description: "หรูหราสไตล์โมเดิร์น พร้อมสิ่งอำนวยความสะดวกครบครัน", facilities: ["Air Conditioning", "Kitchen", "2 Bedrooms", "Sound System", "Fishing Equipment"], images: ["/images/boats/sea-breeze-1.jpg"], pricePerDay: 25000, status: "available" },
    { id: 2, name: "Ocean Star", nameTh: "ดาราแห่งมหาสมุทร", type: "Speedboat", capacity: 8, description: "เร็วแรง เหมาะสำหรับการท่องเที่ยวเกาะ", facilities: ["GPS Navigation", "Safety Equipment", "Snorkeling Gear", "Cooler Box"], images: ["/images/boats/ocean-star-1.jpg"], pricePerDay: 18000, status: "available" },
    { id: 3, name: "Paradise Dream", nameTh: "ฝันสวรรค์", type: "Catamaran", capacity: 20, description: "เรือใหญ่สุดหรู เหมาะสำหรับงานปาร์ตี้", facilities: ["Bar Counter", "BBQ Grill", "Sunbathing Deck", "Karaoke System", "3 Bathrooms"], images: ["/images/boats/paradise-1.jpg"], pricePerDay: 45000, status: "available" }
];

export const tbfBookings = [
    { id: 1, boatId: 1, boatName: "Sea Breeze", ownerName: "บริษัท ท่องเที่ยวทะเล จำกัด", bookingDate: "2024-01-15", startTime: "09:00", endTime: "17:00", customerName: "สมชาย ใจดี", customerPhone: "081-234-5678", customerEmail: "somchai@example.com", numberOfGuests: 10, purpose: "ทริปครอบครัว", status: "pending", requestDate: "2024-01-08 10:30", notes: "ต้องการอาหารมังสวิรัติ" },
    { id: 2, boatId: 2, boatName: "Ocean Star", ownerName: "คุณวิชัย พลอยงาม", bookingDate: "2024-01-20", startTime: "08:00", endTime: "16:00", customerName: "นภา ดาวเรือง", customerPhone: "085-678-9012", customerEmail: "napa@example.com", numberOfGuests: 6, purpose: "ดำน้ำดูปะการัง", status: "pending", requestDate: "2024-01-08 11:15", notes: "ขอชุดดำน้ำด้วย" },
    { id: 3, boatId: 3, boatName: "Paradise Dream", ownerName: "Paradise Marine Co.", bookingDate: "2024-01-25", startTime: "18:00", endTime: "22:00", customerName: "ธนพล ศรีสุข", customerPhone: "092-345-6789", customerEmail: "thanapol@example.com", numberOfGuests: 18, purpose: "งานปาร์ตี้บริษัท", status: "pending", requestDate: "2024-01-08 14:20", notes: "ต้องการจัดเลี้ยงบนเรือ" }
];

export const tbfConfirmedBookings = [
    { id: 1, boatId: 1, boatName: "Sea Breeze", ownerName: "บริษัท ท่องเที่ยวทะเล จำกัด", bookingDate: "2024-01-10", startTime: "10:00", endTime: "18:00", customerName: "วารุณี จันทร์เพ็ญ", customerPhone: "093-456-7890", customerEmail: "warunee@example.com", numberOfGuests: 8, purpose: "วันเกิด", status: "confirmed", requestDate: "2024-01-02 09:00", confirmedDate: "2024-01-02 15:30", confirmedBy: "Admin User", notes: "ต้องการเค้กวันเกิด" },
    { id: 2, boatId: 2, boatName: "Ocean Star", ownerName: "คุณวิชัย พลอยงาม", bookingDate: "2024-01-12", startTime: "07:00", endTime: "15:00", customerName: "John Smith", customerPhone: "083-456-7890", customerEmail: "john@example.com", numberOfGuests: 4, purpose: "ถ่ายรูป", status: "confirmed", requestDate: "2024-01-05 11:20", confirmedDate: "2024-01-05 16:45", confirmedBy: "Admin User", notes: "" }
];

// =============================================
// FRACTIONAL TBF DATA
// =============================================

export const fractionalBoat = {
    id: 1, name: "Luxury Pearl", nameTh: "มุกสุดหรู", type: "Luxury Yacht", capacity: 15,
    description: "เรือยอชท์หรูระดับพรีเมียม สำหรับเจ้าของร่วม แบ่งส่วนการลงทุน",
    facilities: ["Master Bedroom Suite", "2 Guest Bedrooms", "Full Kitchen", "Living Room", "Outdoor Deck", "Jacuzzi", "Entertainment System", "Professional Crew"],
    images: ["/images/boats/luxury-pearl-1.jpg", "/images/boats/luxury-pearl-2.jpg"],
    totalShares: 10, sharesSold: 7, pricePerShare: 2500000, maintenanceFeePerMonth: 50000,
    specifications: { length: "65 feet", manufacturer: "Sunseeker", year: 2023, engine: "Twin 1000 HP", maxSpeed: "32 knots" }
};

export const fractionalOwners = [
    { id: 1, name: "คุณสมชาย ร่ำรวย", shares: 2, percentage: 20, purchaseDate: "2023-06-15", email: "somchai.rich@example.com", phone: "081-111-2222" },
    { id: 2, name: "คุณนิภา เศรษฐี", shares: 2, percentage: 20, purchaseDate: "2023-07-20", email: "nipa.wealthy@example.com", phone: "082-222-3333" },
    { id: 3, name: "Mr. David Johnson", shares: 1, percentage: 10, purchaseDate: "2023-08-10", email: "david.j@example.com", phone: "083-333-4444" },
    { id: 4, name: "คุณประยุทธ สมบูรณ์", shares: 1, percentage: 10, purchaseDate: "2023-09-05", email: "prayuth.s@example.com", phone: "084-444-5555" },
    { id: 5, name: "Ms. Sarah Williams", shares: 1, percentage: 10, purchaseDate: "2023-10-12", email: "sarah.w@example.com", phone: "085-555-6666" }
];

export const fractionalSchedule = [
    { id: 1, date: "2024-01-15", startTime: "09:00", endTime: "17:00", status: "available", notes: "" },
    { id: 2, date: "2024-01-16", startTime: "09:00", endTime: "17:00", status: "available", notes: "" },
    { id: 3, date: "2024-01-18", startTime: "10:00", endTime: "18:00", status: "available", notes: "" },
    { id: 4, date: "2024-01-20", startTime: "08:00", endTime: "16:00", status: "booked", bookedBy: "คุณสมชาย ร่ำรวย", notes: "Owner use" },
    { id: 5, date: "2024-01-22", startTime: "09:00", endTime: "17:00", status: "available", notes: "" },
    { id: 6, date: "2024-01-25", startTime: "09:00", endTime: "17:00", status: "available", notes: "" },
    { id: 7, date: "2024-01-27", startTime: "14:00", endTime: "22:00", status: "booked", bookedBy: "คุณนิภา เศรษฐี", notes: "Sunset cruise" },
    { id: 8, date: "2024-01-30", startTime: "09:00", endTime: "17:00", status: "available", notes: "" }
];

export const fractionalBookings = [
    { id: 1, boatName: "Luxury Pearl", ownerName: "Fractional Ownership Pool", bookingDate: "2024-01-18", startTime: "10:00", endTime: "18:00", customerName: "ชัยวัฒน์ รุ่งเรือง", customerPhone: "087-890-1234", customerEmail: "chaiwat@example.com", numberOfGuests: 12, purpose: "งานครบรอบแต่งงาน", isOwner: false, status: "pending", requestDate: "2024-01-08 09:45", notes: "ต้องการจัดงานรับประทานอาหารค่ำ" },
    { id: 2, boatName: "Luxury Pearl", ownerName: "Fractional Ownership Pool", bookingDate: "2024-01-22", startTime: "09:00", endTime: "17:00", customerName: "Michael Lee", customerPhone: "098-901-2345", customerEmail: "michael@example.com", numberOfGuests: 8, purpose: "Business meeting", isOwner: false, status: "pending", requestDate: "2024-01-08 13:20", notes: "Require meeting facilities" }
];

export const fractionalConfirmedBookings = [
    { id: 1, boatName: "Luxury Pearl", ownerName: "Fractional Ownership Pool", bookingDate: "2024-01-20", startTime: "08:00", endTime: "16:00", customerName: "คุณสมชาย ร่ำรวย", customerPhone: "081-111-2222", customerEmail: "somchai.rich@example.com", numberOfGuests: 10, purpose: "ทริปครอบครัว", isOwner: true, status: "confirmed", requestDate: "2024-01-02 10:00", confirmedDate: "2024-01-02 10:05", confirmedBy: "Auto-confirmed (Owner)", notes: "Owner booking - priority access" },
    { id: 2, boatName: "Luxury Pearl", ownerName: "Fractional Ownership Pool", bookingDate: "2024-01-27", startTime: "14:00", endTime: "22:00", customerName: "คุณนิภา เศรษฐี", customerPhone: "082-222-3333", customerEmail: "nipa.wealthy@example.com", numberOfGuests: 6, purpose: "Sunset Cruise", isOwner: true, status: "confirmed", requestDate: "2024-01-03 14:30", confirmedDate: "2024-01-03 14:32", confirmedBy: "Auto-confirmed (Owner)", notes: "Owner booking" }
];
