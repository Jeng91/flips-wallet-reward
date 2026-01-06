// ============================================
// ENTITIES - Normalized reference data tables
// Like database lookup tables
// ============================================

// Partner/Brand entities
export const PARTNERS = {
    colestai: {
        id: 'colestai',
        name: 'Colestai',
        logo: '/images/colestai_logo.png',
        description: 'Movie Production Studio',
        color: 'from-amber-500 to-orange-500'
    },
    ctrlg: {
        id: 'ctrlg',
        name: 'CTRL G',
        logo: '/images/ctrlg_logo.png',
        description: 'Esports & Gaming',
        color: 'from-purple-500 to-pink-500'
    },
    tbf: {
        id: 'tbf',
        name: 'TBF',
        logo: '/images/tbf_logo.png',
        description: 'Thailand Boat Festival',
        color: 'from-cyan-500 to-blue-500'
    },
    flipsid: {
        id: 'flipsid',
        name: 'FLIPS ID',
        logo: '/images/flips_logo.png',
        description: 'All Rewards Hub',
        color: 'from-blue-600 to-indigo-600'
    }
};

// Shipping carrier entities
export const CARRIERS = {
    kerry: {
        id: 'kerry',
        name: 'Kerry Express',
        logo: '/images/kerry_logo.png',
        trackingUrl: 'https://th.kerryexpress.com/th/track/?track={id}'
    },
    flash: {
        id: 'flash',
        name: 'Flash Express',
        logo: '/images/flash_logo.png',
        trackingUrl: 'https://www.flashexpress.co.th/tracking/?se={id}'
    },
    'thai-post': {
        id: 'thai-post',
        name: 'Thailand Post',
        logo: '/images/thaipost_logo.png',
        trackingUrl: 'https://track.thailandpost.co.th/?trackNumber={id}'
    },
    jt: {
        id: 'jt',
        name: 'J&T Express',
        logo: '/images/jt_logo.png',
        trackingUrl: 'https://www.jtexpress.co.th/index/query/gzquery.html?billcode={id}'
    },
    'ninja-van': {
        id: 'ninja-van',
        name: 'Ninja Van',
        logo: '/images/ninjavan_logo.png',
        trackingUrl: 'https://www.ninjavan.co/th-th/tracking?id={id}'
    }
};

// Movie entities (for investments and privileges)
export const MOVIES = {
    slr: {
        id: 'slr',
        name: 'Sanam Luang Retro',
        image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2025',
        status: 'completed',
        genre: 'Drama',
        year: 2023
    },
    lpj: {
        id: 'lpj',
        name: 'Luang Phee Jazz 4G',
        image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80',
        status: 'filming',
        genre: 'Comedy',
        year: 2024
    },
    obr: {
        id: 'obr',
        name: 'Ong Bak Remastered',
        image: 'https://images.unsplash.com/photo-1509347528260-ed175e77a5ff?q=80',
        status: 'in-progress',
        genre: 'Action',
        year: 2024
    },
    pm2: {
        id: 'pm2',
        name: 'Pee Mak Part 2',
        image: 'https://images.unsplash.com/photo-1585647347384-2593bc35786b?q=80',
        status: 'pre-production',
        genre: 'Horror/Comedy',
        year: 2025
    },
    bkm: {
        id: 'bkm',
        name: 'Bangkok Midnight',
        image: 'https://placehold.co/600x400/1e1b4b/e0e7ff?text=Bangkok+Midnight',
        status: 'in-progress',
        genre: 'Thriller',
        year: 2024
    },
    lst: {
        id: 'lst',
        name: 'The Last Samurai TH',
        image: 'https://placehold.co/600x400/7c2d12/fef3c7?text=Last+Samurai+TH',
        status: 'funding',
        genre: 'Historical',
        year: 2025
    },
    nnr: {
        id: 'nnr',
        name: 'Nang Nak Returns',
        image: 'https://placehold.co/600x400/1f2937/d1d5db?text=Nang+Nak+Returns',
        status: 'completed',
        genre: 'Horror',
        year: 2024
    },
    mtl: {
        id: 'mtl',
        name: 'Muay Thai Legend',
        image: 'https://placehold.co/600x400/991b1b/fecaca?text=Muay+Thai+Legend',
        status: 'pre-production',
        genre: 'Sports',
        year: 2025
    }
};

// Game teams (for CTRL G privileges)
export const GAME_TEAMS = {
    phoenix: {
        id: 'phoenix',
        name: 'Phoenix Rising',
        color: 'from-red-500 to-orange-500',
        logo: '/images/teams/phoenix.png'
    },
    shadow: {
        id: 'shadow',
        name: 'Shadow Wolves',
        color: 'from-gray-600 to-gray-800',
        logo: '/images/teams/shadow.png'
    },
    thunder: {
        id: 'thunder',
        name: 'Thunder Strike',
        color: 'from-yellow-400 to-amber-500',
        logo: '/images/teams/thunder.png'
    },
    dragon: {
        id: 'dragon',
        name: 'Dragon Force',
        color: 'from-green-500 to-emerald-600',
        logo: '/images/teams/dragon.png'
    }
};

// Default placeholder images
export const PLACEHOLDERS = {
    movie: 'https://placehold.co/400x200/1e293b/94a3b8?text=Movie',
    voucher: 'https://placehold.co/400x200/6366f1/ffffff?text=Voucher',
    product: 'https://placehold.co/400x200/0891b2/ffffff?text=Product',
    event: 'https://placehold.co/400x200/be185d/ffffff?text=Event',
    user: 'https://i.pravatar.cc/150?u=default'
};
