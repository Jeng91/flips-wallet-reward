// ============================================
// VOUCHER HELPERS - Date & Status Utilities
// ============================================

import { STATUS } from '../config/constants';

/**
 * Check if a voucher has expired based on its expiryDate
 * @param {Object} voucher - Voucher object with expiryDate field
 * @returns {boolean} - True if expired
 */
export const isVoucherExpired = (voucher) => {
    if (!voucher?.expiryDate) return false;

    const expiryDate = new Date(voucher.expiryDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Compare dates only, not time

    return expiryDate < today;
};

/**
 * Check if a voucher is expiring soon (within threshold days)
 * @param {Object} voucher - Voucher object with expiryDate field
 * @param {number} daysThreshold - Days before expiry to trigger warning (default: 7)
 * @returns {boolean} - True if expiring within threshold
 */
export const isVoucherExpiringSoon = (voucher, daysThreshold = 7) => {
    if (!voucher?.expiryDate) return false;
    if (isVoucherExpired(voucher)) return false; // Already expired

    const expiryDate = new Date(voucher.expiryDate);
    const today = new Date();
    const warningDate = new Date(today);
    warningDate.setDate(warningDate.getDate() + daysThreshold);

    return expiryDate <= warningDate;
};

/**
 * Check if a voucher has started (past its startDate)
 * @param {Object} voucher - Voucher object with startDate field
 * @returns {boolean} - True if started or no startDate specified
 */
export const isVoucherStarted = (voucher) => {
    if (!voucher?.startDate) return true; // No start date = already active

    const startDate = new Date(voucher.startDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return startDate <= today;
};

/**
 * Get computed voucher status based on dates and manual status
 * @param {Object} voucher - Voucher object
 * @returns {string} - Computed status (Active, Expired, Scheduled, Inactive)
 */
export const getVoucherComputedStatus = (voucher) => {
    // If manually set to inactive, respect that
    if (voucher?.status === 'inactive' || voucher?.status === 'draft') {
        return voucher.status.charAt(0).toUpperCase() + voucher.status.slice(1);
    }

    // Check if expired by date
    if (isVoucherExpired(voucher)) {
        return STATUS.EXPIRED;
    }

    // Check if not yet started
    if (!isVoucherStarted(voucher)) {
        return 'Scheduled';
    }

    // Default to active
    return STATUS.ACTIVE;
};

/**
 * Get status badge styling based on computed status
 * @param {Object} voucher - Voucher object
 * @returns {Object} - Object with bg, text, label properties
 */
export const getVoucherStatusBadge = (voucher) => {
    const status = getVoucherComputedStatus(voucher);

    const styles = {
        [STATUS.ACTIVE]: {
            bg: 'bg-green-100',
            text: 'text-green-700',
            dot: 'bg-green-500',
            label: 'Active'
        },
        [STATUS.EXPIRED]: {
            bg: 'bg-red-100',
            text: 'text-red-700',
            dot: 'bg-red-500',
            label: 'Expired'
        },
        'Scheduled': {
            bg: 'bg-blue-100',
            text: 'text-blue-700',
            dot: 'bg-blue-500',
            label: 'Scheduled'
        },
        'Draft': {
            bg: 'bg-gray-100',
            text: 'text-gray-600',
            dot: 'bg-gray-400',
            label: 'Draft'
        },
        'Inactive': {
            bg: 'bg-gray-100',
            text: 'text-gray-600',
            dot: 'bg-gray-400',
            label: 'Inactive'
        }
    };

    // Add expiring soon warning
    if (status === STATUS.ACTIVE && isVoucherExpiringSoon(voucher)) {
        return {
            bg: 'bg-orange-100',
            text: 'text-orange-700',
            dot: 'bg-orange-500',
            label: 'Expiring Soon'
        };
    }

    return styles[status] || styles[STATUS.ACTIVE];
};

/**
 * Format a date for display
 * @param {string|Date} date - Date to format
 * @param {string} locale - Locale for formatting (default: 'en-GB')
 * @returns {string} - Formatted date string
 */
export const formatDate = (date, locale = 'en-GB') => {
    if (!date) return '-';

    const d = new Date(date);
    if (isNaN(d.getTime())) return '-';

    return d.toLocaleDateString(locale, {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });
};

/**
 * Format date for input[type="date"] value (YYYY-MM-DD)
 * @param {string|Date} date - Date to format
 * @returns {string} - Formatted date string for input
 */
export const formatDateForInput = (date) => {
    if (!date) return '';

    const d = new Date(date);
    if (isNaN(d.getTime())) return '';

    return d.toISOString().split('T')[0];
};

/**
 * Calculate days until expiry
 * @param {Object} voucher - Voucher object with expiryDate
 * @returns {number|null} - Days until expiry, or null if no expiry date
 */
export const getDaysUntilExpiry = (voucher) => {
    if (!voucher?.expiryDate) return null;

    const expiryDate = new Date(voucher.expiryDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const diffTime = expiryDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
};

/**
 * Calculate stock remaining percentage
 * @param {Object} voucher - Voucher with totalStock and redeemed fields
 * @returns {number} - Percentage remaining (0-100)
 */
export const getStockPercentage = (voucher) => {
    if (!voucher?.totalStock || voucher.totalStock === 0) return 100;

    const redeemed = voucher.redeemed || 0;
    const remaining = voucher.totalStock - redeemed;

    return Math.round((remaining / voucher.totalStock) * 100);
};

/**
 * Check if voucher is low on stock (below threshold %)
 * @param {Object} voucher - Voucher with totalStock and redeemed
 * @param {number} threshold - Percentage threshold (default: 20%)
 * @returns {boolean} - True if stock is low
 */
export const isLowStock = (voucher, threshold = 20) => {
    const percentage = getStockPercentage(voucher);
    return percentage <= threshold && percentage > 0;
};

/**
 * Check if voucher is out of stock
 * @param {Object} voucher - Voucher with totalStock and redeemed
 * @returns {boolean} - True if out of stock
 */
export const isOutOfStock = (voucher) => {
    if (!voucher?.totalStock) return false;
    return getStockPercentage(voucher) === 0;
};
