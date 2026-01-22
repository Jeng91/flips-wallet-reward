import React, { useState, useEffect } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { tbfYachts, memberFractionProgram } from '../../data/adminExtendedData';

// Voucher Type Configuration - defines which fields appear for each type
const VOUCHER_TYPE_CONFIG = {
    standard: {
        label: 'Standard Reward',
        icon: 'gift',
        color: 'bg-gray-500',
        description: 'Basic rewards like popcorn, discounts, merchandise'
    },
    event: {
        label: 'Event / Experience',
        icon: 'calendar',
        color: 'bg-purple-500',
        description: 'Date-based events like premieres, meet & greet'
    },
    physical: {
        label: 'Physical Product',
        icon: 'box',
        color: 'bg-orange-500',
        description: 'Physical items requiring shipping (jerseys, posters)'
    },
    yacht_experience: {
        label: 'Yacht Experience',
        icon: 'anchor',
        color: 'bg-cyan-500',
        description: 'Yacht cruise experiences with vessel selection'
    },
    yacht_fraction: {
        label: 'Yacht Fraction (Generates Tickets)',
        icon: 'ship',
        color: 'bg-blue-600',
        description: 'Fractional ownership that generates multiple voucher tickets'
    }
};

const TIER_OPTIONS = ['silver', 'gold', 'platinum'];
const CURRENCY_OPTIONS = ['FLIPS', 'TBF', 'THB', 'TBFC'];

const AdminVoucherEditModal = ({
    isOpen,
    onClose,
    voucher = null, // null = create new
    onSave,
    defaultCategory = 'tbf' // tbf, colestai, ctrlg, flipsid
}) => {
    // Form state
    const [formData, setFormData] = useState({
        voucherType: 'standard',
        title: '',
        titleTh: '',
        subtitle: '',
        subtitleTh: '',
        description: '',
        descriptionTh: '',
        category: '',
        categoryLabel: '',
        categoryLabelTh: '',
        image: '',
        price: 0,
        currency: 'FLIPS',
        tier: 'gold',
        isPhysical: false,
        rating: 4.5,
        reviews: 0,
        mainCategory: defaultCategory,
        conditions: [],
        conditionsTh: [],

        // Event-specific
        eventDate: '',
        venue: '',
        capacity: '',

        // Physical-specific
        variants: [],
        stock: 100,

        // Yacht experience-specific
        yachtInfo: {
            availableYachts: [],
            duration: 4,
            maxPax: 8,
            location: 'Boat Lagoon Yachting Charter, Phuket',
            startTimes: ['09:00'],
            included: []
        },

        // Yacht fraction-specific
        fractionConfig: {
            priceThb: 99000,
            ticketsPerYear: 2,
            hoursPerTicket: 4,
            programYears: 5,
            totalTickets: 10,
            maxPaxPerTrip: 8,
            ticketAccess: ['merry-fisher', 'cap-camarat'],
            cashOptions: {
                charterMatch: { enabled: true, valuePerTicket: 9900, noticeDays: 90 },
                mvpExchange: { enabled: true }
            }
        },

        // Info page sections
        infoPage: {
            heroImage: '',
            sections: [],
            yachtComparison: false
        }
    });

    const [newCondition, setNewCondition] = useState('');
    const [newConditionTh, setNewConditionTh] = useState('');
    const [newVariant, setNewVariant] = useState({ label: '', priceModifier: 0 });
    const [newIncluded, setNewIncluded] = useState('');

    // Initialize form when voucher changes
    useEffect(() => {
        if (voucher) {
            setFormData({
                ...formData,
                ...voucher,
                yachtInfo: voucher.yachtInfo || formData.yachtInfo,
                fractionConfig: voucher.fractionConfig || formData.fractionConfig,
                infoPage: voucher.infoPage || formData.infoPage
            });
        } else {
            // Reset for new voucher
            setFormData(prev => ({
                ...prev,
                voucherType: 'standard',
                title: '',
                titleTh: '',
                conditions: [],
                conditionsTh: []
            }));
        }
    }, [voucher, isOpen]);

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleNestedChange = (parent, field, value) => {
        setFormData(prev => ({
            ...prev,
            [parent]: { ...prev[parent], [field]: value }
        }));
    };

    const handleYachtToggle = (yachtId) => {
        const current = formData.yachtInfo.availableYachts || [];
        const updated = current.includes(yachtId)
            ? current.filter(id => id !== yachtId)
            : [...current, yachtId];
        handleNestedChange('yachtInfo', 'availableYachts', updated);
    };

    const addCondition = () => {
        if (newCondition.trim()) {
            setFormData(prev => ({
                ...prev,
                conditions: [...prev.conditions, newCondition.trim()],
                conditionsTh: [...prev.conditionsTh, newConditionTh.trim() || newCondition.trim()]
            }));
            setNewCondition('');
            setNewConditionTh('');
        }
    };

    const removeCondition = (index) => {
        setFormData(prev => ({
            ...prev,
            conditions: prev.conditions.filter((_, i) => i !== index),
            conditionsTh: prev.conditionsTh.filter((_, i) => i !== index)
        }));
    };

    const addVariant = () => {
        if (newVariant.label.trim()) {
            setFormData(prev => ({
                ...prev,
                variants: [...(prev.variants || []), {
                    id: `v${Date.now()}`,
                    ...newVariant
                }]
            }));
            setNewVariant({ label: '', priceModifier: 0 });
        }
    };

    const removeVariant = (index) => {
        setFormData(prev => ({
            ...prev,
            variants: prev.variants.filter((_, i) => i !== index)
        }));
    };

    const addIncluded = () => {
        if (newIncluded.trim()) {
            const current = formData.yachtInfo.included || [];
            handleNestedChange('yachtInfo', 'included', [...current, newIncluded.trim()]);
            setNewIncluded('');
        }
    };

    const removeIncluded = (index) => {
        const current = formData.yachtInfo.included || [];
        handleNestedChange('yachtInfo', 'included', current.filter((_, i) => i !== index));
    };

    const handleSave = () => {
        // Generate ID if new
        const savedVoucher = {
            ...formData,
            id: voucher?.id || Date.now()
        };

        // Calculate total tickets for fraction
        if (formData.voucherType === 'yacht_fraction') {
            savedVoucher.fractionConfig.totalTickets =
                formData.fractionConfig.ticketsPerYear * formData.fractionConfig.programYears;
            savedVoucher.generatesTickets = true;
        }

        onSave(savedVoucher);
        onClose();
    };

    const isYachtType = formData.voucherType === 'yacht_experience' || formData.voucherType === 'yacht_fraction';

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={voucher ? `Edit: ${voucher.title}` : 'Create New Voucher'}
            size="xl"
        >
            <div className="space-y-6 max-h-[70vh] overflow-y-auto p-1">

                {/* VOUCHER TYPE SELECTOR */}
                <div className="bg-gray-50 rounded-xl p-4">
                    <label className="block text-sm font-bold text-gray-700 mb-3">
                        <i className="fas fa-tags mr-2"></i>
                        Voucher Type
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                        {Object.entries(VOUCHER_TYPE_CONFIG).map(([key, config]) => (
                            <button
                                key={key}
                                type="button"
                                onClick={() => handleInputChange('voucherType', key)}
                                className={`p-3 rounded-lg border-2 text-left transition-all ${formData.voucherType === key
                                        ? `${config.color} text-white border-transparent shadow-lg scale-105`
                                        : 'bg-white border-gray-200 hover:border-gray-300 text-gray-700'
                                    }`}
                            >
                                <i className={`fas fa-${config.icon} text-lg mb-1`}></i>
                                <p className="text-xs font-bold">{config.label}</p>
                            </button>
                        ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                        {VOUCHER_TYPE_CONFIG[formData.voucherType]?.description}
                    </p>
                </div>

                {/* BASIC INFO */}
                <div className="bg-white rounded-xl border border-gray-200 p-4">
                    <h4 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <i className="fas fa-info-circle text-blue-500"></i>
                        Basic Information
                    </h4>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">Title (English)</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => handleInputChange('title', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                placeholder="e.g., Sunset Yacht Cruise"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">Title (Thai)</label>
                            <input
                                type="text"
                                value={formData.titleTh}
                                onChange={(e) => handleInputChange('titleTh', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                placeholder="ชื่อภาษาไทย"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">Subtitle (English)</label>
                            <input
                                type="text"
                                value={formData.subtitle}
                                onChange={(e) => handleInputChange('subtitle', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                placeholder="Short description"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">Subtitle (Thai)</label>
                            <input
                                type="text"
                                value={formData.subtitleTh}
                                onChange={(e) => handleInputChange('subtitleTh', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                placeholder="คำอธิบายสั้น"
                            />
                        </div>
                    </div>

                    <div className="mt-4">
                        <label className="block text-xs font-medium text-gray-600 mb-1">Description</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => handleInputChange('description', e.target.value)}
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            placeholder="Full description of the voucher..."
                        />
                    </div>

                    <div className="mt-4">
                        <label className="block text-xs font-medium text-gray-600 mb-1">Image URL</label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={formData.image}
                                onChange={(e) => handleInputChange('image', e.target.value)}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                placeholder="https://..."
                            />
                            {formData.image && (
                                <img
                                    src={formData.image}
                                    alt="Preview"
                                    className="w-16 h-16 object-cover rounded-lg border"
                                    onError={(e) => e.target.style.display = 'none'}
                                />
                            )}
                        </div>
                    </div>
                </div>

                {/* PRICING & CATEGORY */}
                <div className="bg-white rounded-xl border border-gray-200 p-4">
                    <h4 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <i className="fas fa-dollar-sign text-green-500"></i>
                        Pricing & Category
                    </h4>

                    <div className="grid md:grid-cols-4 gap-4">
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">Price</label>
                            <input
                                type="number"
                                value={formData.price}
                                onChange={(e) => handleInputChange('price', parseInt(e.target.value) || 0)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                min="0"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">Currency</label>
                            <select
                                value={formData.currency}
                                onChange={(e) => handleInputChange('currency', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            >
                                {CURRENCY_OPTIONS.map(curr => (
                                    <option key={curr} value={curr}>{curr}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">Tier</label>
                            <select
                                value={formData.tier}
                                onChange={(e) => handleInputChange('tier', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            >
                                {TIER_OPTIONS.map(tier => (
                                    <option key={tier} value={tier}>{tier.charAt(0).toUpperCase() + tier.slice(1)}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">Category Label</label>
                            <input
                                type="text"
                                value={formData.categoryLabel}
                                onChange={(e) => handleInputChange('categoryLabel', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                placeholder="e.g., Boat Passes"
                            />
                        </div>
                    </div>

                    <div className="mt-4 flex items-center gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={formData.isPhysical}
                                onChange={(e) => handleInputChange('isPhysical', e.target.checked)}
                                className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                            />
                            <span className="text-sm text-gray-700">Physical Item (requires shipping)</span>
                        </label>
                    </div>
                </div>

                {/* EVENT FIELDS */}
                {formData.voucherType === 'event' && (
                    <div className="bg-purple-50 rounded-xl border border-purple-200 p-4">
                        <h4 className="text-sm font-bold text-purple-900 mb-4 flex items-center gap-2">
                            <i className="fas fa-calendar text-purple-500"></i>
                            Event Details
                        </h4>
                        <div className="grid md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">Event Date</label>
                                <input
                                    type="date"
                                    value={formData.eventDate}
                                    onChange={(e) => handleInputChange('eventDate', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">Venue</label>
                                <input
                                    type="text"
                                    value={formData.venue}
                                    onChange={(e) => handleInputChange('venue', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    placeholder="Location name"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">Capacity</label>
                                <input
                                    type="number"
                                    value={formData.capacity}
                                    onChange={(e) => handleInputChange('capacity', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    placeholder="Max attendees"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* PHYSICAL ITEM FIELDS (Variants) */}
                {(formData.voucherType === 'physical' || formData.isPhysical) && (
                    <div className="bg-orange-50 rounded-xl border border-orange-200 p-4">
                        <h4 className="text-sm font-bold text-orange-900 mb-4 flex items-center gap-2">
                            <i className="fas fa-box text-orange-500"></i>
                            Physical Item Options
                        </h4>

                        <div className="mb-4">
                            <label className="block text-xs font-medium text-gray-600 mb-1">Stock Quantity</label>
                            <input
                                type="number"
                                value={formData.stock}
                                onChange={(e) => handleInputChange('stock', parseInt(e.target.value) || 0)}
                                className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                min="0"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-2">Variants (Size, Color, etc.)</label>
                            <div className="space-y-2 mb-3">
                                {(formData.variants || []).map((variant, idx) => (
                                    <div key={idx} className="flex items-center gap-2 bg-white p-2 rounded-lg">
                                        <span className="flex-1 text-sm">{variant.label}</span>
                                        <span className="text-xs text-orange-600">
                                            {variant.priceModifier > 0 ? `+${variant.priceModifier}` : variant.priceModifier} {formData.currency}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => removeVariant(idx)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <i className="fas fa-times"></i>
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={newVariant.label}
                                    onChange={(e) => setNewVariant(prev => ({ ...prev, label: e.target.value }))}
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                    placeholder="e.g., Size L, Red Color"
                                />
                                <input
                                    type="number"
                                    value={newVariant.priceModifier}
                                    onChange={(e) => setNewVariant(prev => ({ ...prev, priceModifier: parseInt(e.target.value) || 0 }))}
                                    className="w-24 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                    placeholder="+/- price"
                                />
                                <button
                                    type="button"
                                    onClick={addVariant}
                                    className="px-3 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                                >
                                    <i className="fas fa-plus"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* YACHT EXPERIENCE FIELDS */}
                {formData.voucherType === 'yacht_experience' && (
                    <div className="bg-cyan-50 rounded-xl border border-cyan-200 p-4">
                        <h4 className="text-sm font-bold text-cyan-900 mb-4 flex items-center gap-2">
                            <i className="fas fa-anchor text-cyan-500"></i>
                            Yacht Experience Configuration
                        </h4>

                        {/* Yacht Selection */}
                        <div className="mb-4">
                            <label className="block text-xs font-medium text-gray-600 mb-2">Available Yachts</label>
                            <div className="flex gap-3">
                                {tbfYachts.map(yacht => (
                                    <label
                                        key={yacht.id}
                                        className={`flex-1 p-3 rounded-lg border-2 cursor-pointer transition-all ${formData.yachtInfo.availableYachts?.includes(yacht.id)
                                                ? 'border-cyan-500 bg-cyan-100'
                                                : 'border-gray-200 bg-white hover:border-gray-300'
                                            }`}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={formData.yachtInfo.availableYachts?.includes(yacht.id)}
                                            onChange={() => handleYachtToggle(yacht.id)}
                                            className="sr-only"
                                        />
                                        <p className="font-bold text-sm">{yacht.name}</p>
                                        <p className="text-xs text-gray-500">{yacht.specs.lengthFeet} • {yacht.type}</p>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-4 mb-4">
                            <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">Duration (hours)</label>
                                <input
                                    type="number"
                                    value={formData.yachtInfo.duration}
                                    onChange={(e) => handleNestedChange('yachtInfo', 'duration', parseInt(e.target.value) || 4)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                    min="1"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">Max Passengers</label>
                                <input
                                    type="number"
                                    value={formData.yachtInfo.maxPax}
                                    onChange={(e) => handleNestedChange('yachtInfo', 'maxPax', parseInt(e.target.value) || 8)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                    min="1"
                                    max="20"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">Location</label>
                                <input
                                    type="text"
                                    value={formData.yachtInfo.location}
                                    onChange={(e) => handleNestedChange('yachtInfo', 'location', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                />
                            </div>
                        </div>

                        {/* What's Included */}
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-2">What's Included</label>
                            <div className="flex flex-wrap gap-2 mb-2">
                                {(formData.yachtInfo.included || []).map((item, idx) => (
                                    <span key={idx} className="inline-flex items-center gap-1 px-2 py-1 bg-white rounded-lg text-xs border">
                                        <i className="fas fa-check text-cyan-500"></i>
                                        {item}
                                        <button
                                            type="button"
                                            onClick={() => removeIncluded(idx)}
                                            className="text-red-500 hover:text-red-700 ml-1"
                                        >
                                            <i className="fas fa-times text-xs"></i>
                                        </button>
                                    </span>
                                ))}
                            </div>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={newIncluded}
                                    onChange={(e) => setNewIncluded(e.target.value)}
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                    placeholder="e.g., Professional captain & crew"
                                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addIncluded())}
                                />
                                <button
                                    type="button"
                                    onClick={addIncluded}
                                    className="px-3 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600"
                                >
                                    <i className="fas fa-plus"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* YACHT FRACTION FIELDS */}
                {formData.voucherType === 'yacht_fraction' && (
                    <div className="bg-blue-50 rounded-xl border border-blue-200 p-4">
                        <h4 className="text-sm font-bold text-blue-900 mb-4 flex items-center gap-2">
                            <i className="fas fa-ship text-blue-500"></i>
                            Fraction Program Configuration
                        </h4>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                            <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">Price (THB)</label>
                                <input
                                    type="number"
                                    value={formData.fractionConfig.priceThb}
                                    onChange={(e) => handleNestedChange('fractionConfig', 'priceThb', parseInt(e.target.value) || 0)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">Tickets per Year</label>
                                <input
                                    type="number"
                                    value={formData.fractionConfig.ticketsPerYear}
                                    onChange={(e) => handleNestedChange('fractionConfig', 'ticketsPerYear', parseInt(e.target.value) || 1)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                    min="1"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">Program Years</label>
                                <input
                                    type="number"
                                    value={formData.fractionConfig.programYears}
                                    onChange={(e) => handleNestedChange('fractionConfig', 'programYears', parseInt(e.target.value) || 1)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                    min="1"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">Hours per Ticket</label>
                                <input
                                    type="number"
                                    value={formData.fractionConfig.hoursPerTicket}
                                    onChange={(e) => handleNestedChange('fractionConfig', 'hoursPerTicket', parseInt(e.target.value) || 4)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                    min="1"
                                />
                            </div>
                        </div>

                        {/* Preview */}
                        <div className="bg-blue-100 rounded-lg p-3 mb-4">
                            <p className="text-sm font-medium text-blue-900">
                                <i className="fas fa-ticket-alt mr-2"></i>
                                Total Tickets Generated: <strong>{formData.fractionConfig.ticketsPerYear * formData.fractionConfig.programYears}</strong>
                                <span className="text-xs text-blue-700 ml-2">
                                    ({formData.fractionConfig.ticketsPerYear} × {formData.fractionConfig.programYears} years)
                                </span>
                            </p>
                        </div>

                        {/* Cash-Out Options */}
                        <div className="space-y-3">
                            <label className="block text-xs font-medium text-gray-600">Cash-Out Options</label>
                            <div className="flex items-center gap-4 bg-white p-3 rounded-lg">
                                <input
                                    type="checkbox"
                                    checked={formData.fractionConfig.cashOptions?.charterMatch?.enabled}
                                    onChange={(e) => {
                                        const updated = { ...formData.fractionConfig };
                                        updated.cashOptions = updated.cashOptions || {};
                                        updated.cashOptions.charterMatch = updated.cashOptions.charterMatch || {};
                                        updated.cashOptions.charterMatch.enabled = e.target.checked;
                                        handleInputChange('fractionConfig', updated);
                                    }}
                                    className="w-4 h-4 text-blue-600"
                                />
                                <div className="flex-1">
                                    <p className="text-sm font-medium">Charter Match</p>
                                    <p className="text-xs text-gray-500">Match with charter demand</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-gray-500">THB</span>
                                    <input
                                        type="number"
                                        value={formData.fractionConfig.cashOptions?.charterMatch?.valuePerTicket || 9900}
                                        onChange={(e) => {
                                            const updated = { ...formData.fractionConfig };
                                            updated.cashOptions.charterMatch.valuePerTicket = parseInt(e.target.value) || 0;
                                            handleInputChange('fractionConfig', updated);
                                        }}
                                        className="w-24 px-2 py-1 border border-gray-300 rounded text-sm"
                                    />
                                    <span className="text-xs text-gray-500">per ticket</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 bg-white p-3 rounded-lg">
                                <input
                                    type="checkbox"
                                    checked={formData.fractionConfig.cashOptions?.mvpExchange?.enabled}
                                    onChange={(e) => {
                                        const updated = { ...formData.fractionConfig };
                                        updated.cashOptions = updated.cashOptions || {};
                                        updated.cashOptions.mvpExchange = updated.cashOptions.mvpExchange || {};
                                        updated.cashOptions.mvpExchange.enabled = e.target.checked;
                                        handleInputChange('fractionConfig', updated);
                                    }}
                                    className="w-4 h-4 text-blue-600"
                                />
                                <div className="flex-1">
                                    <p className="text-sm font-medium">MVP Exchange</p>
                                    <p className="text-xs text-gray-500">List on marketplace at market price</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* CONDITIONS */}
                <div className="bg-white rounded-xl border border-gray-200 p-4">
                    <h4 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <i className="fas fa-list-check text-green-500"></i>
                        Conditions & Terms
                    </h4>

                    <div className="space-y-2 mb-3">
                        {formData.conditions.map((condition, idx) => (
                            <div key={idx} className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg">
                                <i className="fas fa-check text-green-500 text-xs"></i>
                                <span className="flex-1 text-sm">{condition}</span>
                                <span className="text-xs text-gray-400">{formData.conditionsTh[idx]}</span>
                                <button
                                    type="button"
                                    onClick={() => removeCondition(idx)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <i className="fas fa-times"></i>
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="grid md:grid-cols-2 gap-2">
                        <input
                            type="text"
                            value={newCondition}
                            onChange={(e) => setNewCondition(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                            placeholder="Condition (English)"
                            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCondition())}
                        />
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={newConditionTh}
                                onChange={(e) => setNewConditionTh(e.target.value)}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                placeholder="เงื่อนไข (ไทย)"
                                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCondition())}
                            />
                            <button
                                type="button"
                                onClick={addCondition}
                                className="px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                            >
                                <i className="fas fa-plus"></i>
                            </button>
                        </div>
                    </div>
                </div>

            </div>

            {/* ACTION BUTTONS */}
            <div className="flex gap-3 mt-6 pt-4 border-t">
                <Button
                    onClick={onClose}
                    className="flex-1 bg-gray-200 text-gray-800 hover:bg-gray-300"
                >
                    Cancel
                </Button>
                <Button
                    onClick={handleSave}
                    className="flex-1 bg-primary text-white hover:bg-primary/90"
                >
                    <i className="fas fa-save mr-2"></i>
                    {voucher ? 'Save Changes' : 'Create Voucher'}
                </Button>
            </div>
        </Modal>
    );
};

export default AdminVoucherEditModal;
