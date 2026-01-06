// ============================================
// DATA HELPERS - Lookup and utility functions
// ============================================

import { PARTNERS, CARRIERS, MOVIES, GAME_TEAMS, PLACEHOLDERS } from '../data/entities';
import { PRIVILEGE_CATEGORIES } from '../config/theme';
import { STATUS, REWARD_TYPES } from '../config/constants';

// =============================================
// ENTITY LOOKUPS
// =============================================

/**
 * Get partner by ID
 * @param {string} partnerId - Partner ID (e.g., 'colestai', 'ctrlg')
 * @returns {Object|null} Partner object or null
 */
export const getPartner = (partnerId) => PARTNERS[partnerId] || null;

/**
 * Get carrier by ID
 * @param {string} carrierId - Carrier ID (e.g., 'kerry', 'flash')
 * @returns {Object|null} Carrier object or null
 */
export const getCarrier = (carrierId) => CARRIERS[carrierId] || null;

/**
 * Get movie by ID
 * @param {string} movieId - Movie ID (e.g., 'slr', 'lpj')
 * @returns {Object|null} Movie object or null
 */
export const getMovie = (movieId) => MOVIES[movieId] || null;

/**
 * Get game team by ID
 * @param {string} teamId - Team ID (e.g., 'phoenix', 'shadow')
 * @returns {Object|null} Team object or null
 */
export const getTeam = (teamId) => GAME_TEAMS[teamId] || null;

/**
 * Get category by ID
 * @param {string} categoryId - Category ID (e.g., 'movie-tickets', 'game-items')
 * @returns {Object|null} Category object or null
 */
export const getCategory = (categoryId) =>
    PRIVILEGE_CATEGORIES?.find(c => c.id === categoryId) || null;

// =============================================
// TRACKING HELPERS
// =============================================

/**
 * Get carrier tracking URL with tracking ID inserted
 * @param {string} carrierId - Carrier ID
 * @param {string} trackingId - Tracking number
 * @returns {string|null} Full tracking URL or null
 */
export const getCarrierTrackingUrl = (carrierId, trackingId) => {
    const carrier = getCarrier(carrierId);
    if (!carrier || !trackingId) return null;
    return carrier.trackingUrl.replace('{id}', trackingId);
};

/**
 * Get carrier tracking URL by carrier name (legacy support)
 * @param {string} carrierName - Carrier name (e.g., 'Kerry Express')
 * @param {string} trackingId - Tracking number
 * @returns {string|null} Full tracking URL or null
 */
export const getCarrierTrackingUrlByName = (carrierName, trackingId) => {
    const carrierMap = {
        'Kerry Express': 'kerry',
        'Flash Express': 'flash',
        'Thailand Post': 'thai-post',
        'J&T Express': 'jt',
        'Ninja Van': 'ninja-van'
    };
    const carrierId = carrierMap[carrierName];
    return carrierId ? getCarrierTrackingUrl(carrierId, trackingId) : null;
};

// =============================================
// FILTER HELPERS
// =============================================

/**
 * Filter items by category
 * @param {Array} items - Array of items with categoryId
 * @param {string} categoryId - Category to filter by
 * @returns {Array} Filtered items
 */
export const filterByCategory = (items, categoryId) =>
    categoryId === 'all' ? items : items.filter(i => i.categoryId === categoryId);

/**
 * Filter items by partner
 * @param {Array} items - Array of items with partnerId
 * @param {string} partnerId - Partner to filter by
 * @returns {Array} Filtered items
 */
export const filterByPartner = (items, partnerId) =>
    partnerId === 'all' ? items : items.filter(i => i.partnerId === partnerId);

/**
 * Filter items by status
 * @param {Array} items - Array of items with status
 * @param {string} status - Status to filter by
 * @returns {Array} Filtered items
 */
export const filterByStatus = (items, status) =>
    status === 'all' ? items : items.filter(i => i.status === status);

// =============================================
// REWARD TYPE HELPERS
// =============================================

/**
 * Check if reward is physical
 * @param {Object} item - Item with isPhysical or rewardType
 * @returns {boolean}
 */
export const isPhysicalReward = (item) =>
    item?.isPhysical === true || item?.rewardType === REWARD_TYPES.PHYSICAL;

/**
 * Check if reward is digital
 * @param {Object} item - Item with isPhysical or rewardType
 * @returns {boolean}
 */
export const isDigitalReward = (item) =>
    item?.isPhysical === false || item?.rewardType === REWARD_TYPES.DIGITAL;

/**
 * Check if reward is an event
 * @param {Object} item - Item with rewardType
 * @returns {boolean}
 */
export const isEventReward = (item) =>
    item?.rewardType === REWARD_TYPES.EVENT;

// =============================================
// IMAGE HELPERS
// =============================================

/**
 * Get fallback image URL based on type
 * @param {string} type - Type of placeholder ('movie', 'voucher', 'product', 'event')
 * @param {string} text - Optional text to display
 * @returns {string} Placeholder URL
 */
export const getPlaceholderImage = (type, text = '') => {
    if (PLACEHOLDERS[type]) {
        return text
            ? PLACEHOLDERS[type].replace('text=', `text=${encodeURIComponent(text)}`)
            : PLACEHOLDERS[type];
    }
    return `https://placehold.co/400x200/94a3b8/ffffff?text=${encodeURIComponent(text || 'Image')}`;
};

/**
 * Handle image error with fallback
 * @param {Event} e - Error event from img onError
 * @param {string} fallbackText - Text to show in fallback
 */
export const handleImageError = (e, fallbackText = 'Image') => {
    e.target.onerror = null;
    e.target.src = getPlaceholderImage('voucher', fallbackText);
};
