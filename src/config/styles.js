// ============================================
// STYLES - Tailwind class maps for soft-coding
// ============================================

import { STATUS, TIER_LEVELS, REWARD_TYPES } from './constants';

// Status-based styling (single source of truth)
export const STATUS_STYLES = {
    [STATUS.SHIPPING]: {
        bg: 'bg-cyan-50',
        bgGradient: 'bg-gradient-to-r from-cyan-50 to-blue-50',
        text: 'text-cyan-700',
        textDark: 'text-cyan-600',
        border: 'border-cyan-100',
        dot: 'bg-cyan-500',
        icon: 'bg-cyan-100',
        iconColor: 'text-cyan-600'
    },
    [STATUS.PROCESSING]: {
        bg: 'bg-amber-50',
        bgGradient: 'bg-gradient-to-r from-amber-50 to-orange-50',
        text: 'text-amber-700',
        textDark: 'text-amber-600',
        border: 'border-amber-100',
        dot: 'bg-amber-500',
        icon: 'bg-amber-100',
        iconColor: 'text-amber-600'
    },
    [STATUS.DELIVERED]: {
        bg: 'bg-green-50',
        bgGradient: 'bg-gradient-to-r from-green-50 to-emerald-50',
        text: 'text-green-700',
        textDark: 'text-green-600',
        border: 'border-green-100',
        dot: 'bg-green-500',
        icon: 'bg-green-100',
        iconColor: 'text-green-600'
    },
    [STATUS.ACTIVE]: {
        bg: 'bg-blue-50',
        bgGradient: 'bg-gradient-to-r from-blue-50 to-indigo-50',
        text: 'text-blue-700',
        textDark: 'text-blue-600',
        border: 'border-blue-100',
        dot: 'bg-blue-500',
        icon: 'bg-blue-100',
        iconColor: 'text-blue-600'
    },
    default: {
        bg: 'bg-gray-50',
        bgGradient: 'bg-gray-50',
        text: 'text-gray-600',
        textDark: 'text-gray-600',
        border: 'border-gray-100',
        dot: 'bg-gray-400',
        icon: 'bg-gray-100',
        iconColor: 'text-gray-600'
    }
};

// Tier-based styling
export const TIER_STYLES = {
    [TIER_LEVELS.BRONZE]: {
        bg: 'bg-orange-100',
        text: 'text-orange-800',
        border: 'border-orange-200',
        gradient: 'from-orange-400 to-amber-600'
    },
    [TIER_LEVELS.SILVER]: {
        bg: 'bg-slate-100',
        text: 'text-slate-800',
        border: 'border-slate-200',
        gradient: 'from-slate-400 to-gray-600'
    },
    [TIER_LEVELS.GOLD]: {
        bg: 'bg-amber-100',
        text: 'text-amber-800',
        border: 'border-amber-200',
        gradient: 'from-amber-400 to-yellow-600'
    },
    [TIER_LEVELS.PLATINUM]: {
        bg: 'bg-violet-100',
        text: 'text-violet-800',
        border: 'border-violet-200',
        gradient: 'from-violet-400 to-purple-600'
    }
};

// Reward type styling
export const REWARD_TYPE_STYLES = {
    [REWARD_TYPES.PHYSICAL]: {
        badge: 'bg-purple-500 text-white',
        icon: '📦',
        label: 'Physical Item'
    },
    [REWARD_TYPES.DIGITAL]: {
        badge: 'bg-blue-500 text-white',
        icon: '🎫',
        label: 'Digital'
    },
    [REWARD_TYPES.EVENT]: {
        badge: 'bg-pink-500 text-white',
        icon: '🎬',
        label: 'Event'
    }
};

// Investment status styling
export const INVESTMENT_STATUS_STYLES = {
    'Completed': { bg: 'bg-green-500', text: 'text-white' },
    'In Progress': { bg: 'bg-blue-500', text: 'text-white' },
    'Funding': { bg: 'bg-amber-500', text: 'text-white' },
    'Pre-Production': { bg: 'bg-purple-500', text: 'text-white' },
    'Sold Out': { bg: 'bg-gray-500', text: 'text-white' }
};

// Helper to get status style with fallback
export const getStatusStyle = (status) => STATUS_STYLES[status] || STATUS_STYLES.default;
export const getTierStyle = (tier) => TIER_STYLES[tier] || TIER_STYLES[TIER_LEVELS.BRONZE];
