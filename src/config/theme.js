// ============================================
// THEME CONFIGURATION - Soft-coded values
// ============================================

export const THEME = {
    colors: {
        primary: '#40a2d2',
        primaryDark: '#012f49',
        primaryLight: '#7fcbef',
        secondary: '#012f49',
        secondaryDark: '#012f49', // Standardizing to premium dark
        secondaryLight: '#1a4c6b',
        success: '#8BC34A',
        warning: '#FF9800',
        error: '#F44336',
        brandDark: '#0B1739',
        brandNavy: '#1a2b5e',
    },
};

// Main Categories (FLIPS ID, Colestai, CTRL G, TBF)
export const MAIN_CATEGORIES = [
    {
        id: 'flipsid',
        label: 'FLIPS ID',
        labelTh: 'FLIPS ID',
        icon: 'crown',
        color: 'from-blue-600 to-indigo-600',
        bgActive: 'bg-primary text-white',
        description: 'All Rewards Hub',
        descriptionTh: 'ศูนย์รวมของรางวัลทั้งหมด',
        coinType: 'flips',
        coinName: 'Flips Coins',
        coinIcon: '/images/flips_token.png',
    },
    {
        id: 'colestai',
        label: 'Colestai',
        labelTh: 'Colestai',
        icon: 'film',
        color: 'from-amber-500 to-orange-500',
        bgActive: 'bg-amber-500 text-white',
        description: 'Movie Rewards',
        descriptionTh: 'ของรางวัลหนัง',
        coinType: 'flips',
        coinName: 'Flips Coins',
        coinIcon: '/images/flips_token.png',
    },
    {
        id: 'ctrlg',
        label: 'CTRL G',
        labelTh: 'CTRL G',
        icon: 'gamepad',
        color: 'from-purple-500 to-pink-500',
        bgActive: 'bg-purple-500 text-white',
        description: 'Gaming Rewards',
        descriptionTh: 'ของรางวัลเกมส์',
        coinType: 'team',
        coinName: 'Team Coins',
        coinIcon: '/images/ctrlg_token.png',
    },
    {
        id: 'tbf',
        label: 'TBF',
        labelTh: 'TBF',
        icon: 'ship',
        color: 'from-cyan-500 to-blue-500',
        bgActive: 'bg-cyan-500 text-white',
        description: 'Boat Rewards',
        descriptionTh: 'ของรางวัลเรือ',
        coinType: 'tbf',
        coinName: 'TBF Coins',
        coinIcon: '/images/flips_token.png',
    },
];

// Game Teams for CTRL G
export const GAME_TEAMS = [
    {
        id: 'phoenix',
        name: 'Phoenix Rising',
        nameTh: 'ฟีนิกซ์ ไรซิ่ง',
        color: 'from-red-500 to-orange-500',
        bgColor: 'bg-red-50',
        textColor: 'text-red-500',
        hoverBorder: 'hover:border-red-200',
        hoverShadow: 'hover:shadow-red-500/5',
        icon: 'fire',
        coinName: 'Phoenix Coins',
    },
    {
        id: 'shadow',
        name: 'Shadow Wolves',
        nameTh: 'ชาโดว์ วูล์ฟ',
        color: 'from-gray-600 to-gray-800',
        bgColor: 'bg-purple-50',
        textColor: 'text-purple-500',
        hoverBorder: 'hover:border-purple-200',
        hoverShadow: 'hover:shadow-purple-500/5',
        icon: 'ghost',
        coinName: 'Shadow Coins',
    },
    {
        id: 'thunder',
        name: 'Thunder Strike',
        nameTh: 'ธันเดอร์ สไตรค์',
        color: 'from-yellow-400 to-amber-500',
        bgColor: 'bg-amber-50',
        textColor: 'text-amber-500',
        hoverBorder: 'hover:border-amber-200',
        hoverShadow: 'hover:shadow-amber-500/5',
        icon: 'bolt',
        coinName: 'Thunder Coins',
    },
    {
        id: 'dragon',
        name: 'Dragon Force',
        nameTh: 'ดราก้อน ฟอร์ซ',
        color: 'from-green-500 to-emerald-600',
        bgColor: 'bg-emerald-50',
        textColor: 'text-emerald-500',
        hoverBorder: 'hover:border-emerald-200',
        hoverShadow: 'hover:shadow-emerald-500/5',
        icon: 'dragon',
        coinName: 'Dragon Coins',
    },
];

// Privilege Categories (Sub-categories)
export const PRIVILEGE_CATEGORIES = [
    { id: 'all', label: 'All Privileges', labelTh: 'ทั้งหมด', icon: 'layer-group', mainCategory: 'all' },
    { id: 'movie-tickets', label: 'Movie Tickets', labelTh: 'บัตรชมภาพยนตร์', icon: 'ticket-alt', mainCategory: 'colestai' },
    { id: 'meet-greet', label: 'Meet & Greet', labelTh: 'พบทีมผู้สร้าง', icon: 'users', mainCategory: 'colestai' },
    { id: 'credits', label: 'Movie Credits', labelTh: 'เครดิตท้ายหนัง', icon: 'film', mainCategory: 'colestai' },
    { id: 'merchandise', label: 'Merchandise', labelTh: 'สินค้าที่ระลึก', icon: 'gift', mainCategory: 'colestai' },
    { id: 'behind-scenes', label: 'Behind the Scenes', labelTh: 'เบื้องหลัง', icon: 'camera', mainCategory: 'colestai' },
    { id: 'game-items', label: 'In-Game Items', labelTh: 'ไอเทมในเกม', icon: 'gem', mainCategory: 'ctrlg' },
    { id: 'game-merchandise', label: 'Game Merchandise', labelTh: 'สินค้าเกม', icon: 'tshirt', mainCategory: 'ctrlg' },
    { id: 'early-access', label: 'Early Access', labelTh: 'เข้าถึงก่อน', icon: 'rocket', mainCategory: 'ctrlg' },
    { id: 'boat-passes', label: 'Boat Passes', labelTh: 'บัตรล่องเรือ', icon: 'ticket-alt', mainCategory: 'tbf' },
    { id: 'boat-events', label: 'Yacht Events', labelTh: 'อีเว้นท์บนเรือ', icon: 'glass-cheers', mainCategory: 'tbf' },
    { id: 'boat-tours', label: 'Luxury Tours', labelTh: 'ทัวร์หรู', icon: 'map-marked-alt', mainCategory: 'tbf' },
];

// API Configuration
export const API = {
    baseUrl: import.meta.env.VITE_API_URL || '/api',
};
