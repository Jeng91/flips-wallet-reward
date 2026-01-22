import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { privilegePackages } from '../../data/mockData';
import { tbfYachts } from '../../data/adminExtendedData';

// Voucher Type Configuration
const VOUCHER_TYPE_CONFIG = {
    standard: {
        label: 'Standard Reward',
        icon: 'gift',
        color: 'gray',
        bgColor: 'bg-gray-500',
        description: 'Basic rewards like popcorn, discounts, merchandise',
        availableFor: ['colestai', 'ctrlg', 'tbf', 'flipsid']
    },
    event: {
        label: 'Event / Experience',
        icon: 'gift',
        color: 'violet',
        bgColor: 'bg-violet-500',
        description: 'Date-based events like premieres, meet & greet',
        availableFor: ['colestai', 'ctrlg', 'flipsid']
    },
    physical: {
        label: 'Physical Product',
        icon: 'box',
        color: 'orange',
        bgColor: 'bg-orange-500',
        description: 'Physical items requiring shipping (jerseys, posters)',
        availableFor: ['colestai', 'ctrlg', 'flipsid']
    },
    yacht_experience: {
        label: 'Yacht Experience',
        icon: 'anchor',
        color: 'cyan',
        bgColor: 'bg-cyan-500',
        description: 'Yacht cruise experiences with vessel selection',
        availableFor: ['tbf']
    },
    yacht_fraction: {
        label: 'Yacht Fraction',
        icon: 'ship',
        color: 'blue',
        bgColor: 'bg-blue-600',
        description: 'Fractional ownership that generates ticket vouchers',
        availableFor: ['tbf']
    }
};

const TIER_OPTIONS = ['silver', 'gold', 'platinum'];
const CURRENCY_OPTIONS = ['FLIPS', 'TBF', 'THB', 'TBFC'];
const MAIN_CATEGORIES = [
    { id: 'colestai', label: 'Colestia (Movies)', icon: 'film' },
    { id: 'ctrlg', label: 'CTRL G (Gaming)', icon: 'gamepad' },
    { id: 'tbf', label: 'TBF (Yacht)', icon: 'ship' },
    { id: 'flipsid', label: 'FLIPS ID', icon: 'id-card' }
];


const AdminVoucherEditPage = () => {
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const isNew = !id;
    const defaultCategory = searchParams.get('category') || 'colestai';

    // Find existing voucher if editing
    const existingVoucher = !isNew ? privilegePackages.find(p => p.id === parseInt(id)) : null;

    // Form state
    const [formData, setFormData] = useState({
        voucherType: 'standard',
        mainCategory: defaultCategory,
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
        }
    });

    const [expandedSections, setExpandedSections] = useState({
        basic: true,
        pricing: true,
        typeSpecific: true,
        conditions: false
    });

    const [newCondition, setNewCondition] = useState('');
    const [newConditionTh, setNewConditionTh] = useState('');
    const [newVariant, setNewVariant] = useState({ label: '', priceModifier: 0 });
    const [newIncluded, setNewIncluded] = useState('');

    // Initialize form with existing voucher data
    useEffect(() => {
        if (existingVoucher) {
            setFormData(prev => ({
                ...prev,
                ...existingVoucher,
                yachtInfo: existingVoucher.yachtInfo || prev.yachtInfo,
                fractionConfig: existingVoucher.fractionConfig || prev.fractionConfig
            }));
        }
    }, [existingVoucher]);

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleNestedChange = (parent, field, value) => {
        setFormData(prev => ({
            ...prev,
            [parent]: { ...prev[parent], [field]: value }
        }));
    };

    const toggleSection = (section) => {
        setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
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
        const savedVoucher = {
            ...formData,
            id: existingVoucher?.id || Date.now()
        };

        // Calculate total tickets for fraction
        if (formData.voucherType === 'yacht_fraction') {
            savedVoucher.fractionConfig.totalTickets =
                formData.fractionConfig.ticketsPerYear * formData.fractionConfig.programYears;
            savedVoucher.generatesTickets = true;
        }

        // In real app, this would save to backend
        console.log('Saving voucher:', savedVoucher);
        alert(isNew ? 'Voucher created successfully!' : 'Voucher updated successfully!');

        // Navigate back to the appropriate voucher list
        navigate(`/admin/vouchers/${formData.mainCategory}`);
    };

    const handleCancel = () => {
        navigate(-1);
    };

    const typeConfig = VOUCHER_TYPE_CONFIG[formData.voucherType] || VOUCHER_TYPE_CONFIG.standard;

    return (
        <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                    <button
                        onClick={handleCancel}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <i className="fas fa-arrow-left text-gray-600"></i>
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            {isNew ? 'Create New Voucher (Updated)' : `Edit: ${existingVoucher?.title || 'Voucher'}`}
                        </h1>
                        <p className="text-gray-600 text-sm">
                            {isNew ? 'Add a new voucher to the system' : 'Modify voucher details'}
                        </p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <Button
                        onClick={handleCancel}
                        className="bg-gray-200 text-gray-800 hover:bg-gray-300"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSave}
                        className="bg-primary text-white hover:bg-primary/90"
                    >
                        <i className="fas fa-save mr-2"></i>
                        {isNew ? 'Create Voucher' : 'Save Changes'}
                    </Button>
                </div>
            </div>

            <div className="flex gap-6">
                {/* Left Panel - Type Selector */}
                <div className="w-80 flex-shrink-0 space-y-4">
                    {/* Main Category */}
                    <Card>
                        <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                            <i className="fas fa-folder text-gray-500"></i>
                            Main Category
                        </h3>
                        <div className="space-y-2">
                            {MAIN_CATEGORIES.map(cat => (
                                <button
                                    key={cat.id}
                                    onClick={() => handleInputChange('mainCategory', cat.id)}
                                    className={`w-full p-3 rounded-lg text-left transition-all flex items-center gap-3 ${formData.mainCategory === cat.id
                                        ? 'bg-primary text-white'
                                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                                        }`}
                                >
                                    <i className={`fas fa-${cat.icon}`}></i>
                                    <span className="font-medium">{cat.label}</span>
                                </button>
                            ))}
                        </div>
                    </Card>

                    {/* Voucher Type */}
                    <Card>
                        <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                            <i className="fas fa-tags text-gray-500"></i>
                            Voucher Type
                        </h3>
                        <div className="space-y-2">
                            {Object.entries(VOUCHER_TYPE_CONFIG)
                                .filter(([key, config]) => config.availableFor?.includes(formData.mainCategory))
                                .map(([key, config]) => (
                                    <button
                                        key={key}
                                        onClick={() => handleInputChange('voucherType', key)}
                                        className={`w-full p-3 rounded-lg text-left transition-all ${formData.voucherType === key
                                            ? `${config.bgColor} text-white shadow-lg`
                                            : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <i className={`fas fa-${config.icon}`}></i>
                                            <div>
                                                <p className="font-medium text-sm">{config.label}</p>
                                                <p className={`text-xs ${formData.voucherType === key ? 'text-white/80' : 'text-gray-500'}`}>
                                                    {config.description}
                                                </p>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                        </div>
                    </Card>

                    {/* Preview Card */}
                    <Card className="bg-gradient-to-br from-gray-800 to-gray-900 text-white">
                        <h3 className="font-bold mb-3 flex items-center gap-2">
                            <i className="fas fa-eye"></i>
                            Preview
                        </h3>
                        <div className="aspect-video bg-gray-700 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
                            {formData.image ? (
                                <img
                                    src={formData.image}
                                    alt="Preview"
                                    className="w-full h-full object-cover"
                                    onError={(e) => e.target.style.display = 'none'}
                                />
                            ) : (
                                <i className={`fas fa-${typeConfig.icon} text-4xl text-gray-500`}></i>
                            )}
                        </div>
                        <div className={`inline-block px-2 py-1 ${typeConfig.bgColor} rounded text-xs mb-2`}>
                            {typeConfig.label}
                        </div>
                        <p className="font-bold text-lg">{formData.titleTh || formData.title || 'ชื่อ Voucher'}</p>
                        <p className="text-sm text-gray-400">{formData.subtitleTh || formData.subtitle || 'คำอธิบายสั้น'}</p>
                        <div className="mt-3 pt-3 border-t border-gray-700">
                            <p className="text-xl font-bold text-primary">
                                {formData.price} {formData.currency}
                            </p>
                        </div>
                    </Card>
                </div>

                {/* Right Panel - Form */}
                <div className="flex-1 space-y-4">
                    {/* Basic Information */}
                    <Card>
                        <button
                            onClick={() => toggleSection('basic')}
                            className="w-full flex items-center justify-between text-left"
                        >
                            <h3 className="font-bold text-gray-900 flex items-center gap-2">
                                <i className="fas fa-info-circle text-blue-500"></i>
                                Basic Information
                            </h3>
                            <i className={`fas fa-chevron-${expandedSections.basic ? 'up' : 'down'} text-gray-400`}></i>
                        </button>

                        {expandedSections.basic && (
                            <div className="mt-4 space-y-4">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Title (English)</label>
                                        <input
                                            type="text"
                                            value={formData.title}
                                            onChange={(e) => handleInputChange('title', e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                            placeholder="e.g., Sunset Yacht Cruise"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Title (Thai)</label>
                                        <input
                                            type="text"
                                            value={formData.titleTh}
                                            onChange={(e) => handleInputChange('titleTh', e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                            placeholder="ชื่อภาษาไทย"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle (English)</label>
                                        <input
                                            type="text"
                                            value={formData.subtitle}
                                            onChange={(e) => handleInputChange('subtitle', e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                            placeholder="Short description"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle (Thai)</label>
                                        <input
                                            type="text"
                                            value={formData.subtitleTh}
                                            onChange={(e) => handleInputChange('subtitleTh', e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                            placeholder="คำอธิบายสั้น"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => handleInputChange('description', e.target.value)}
                                        rows={3}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                        placeholder="Full description of the voucher..."
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={formData.image}
                                            onChange={(e) => handleInputChange('image', e.target.value)}
                                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                            placeholder="https://..."
                                        />
                                        {formData.image && (
                                            <img
                                                src={formData.image}
                                                alt="Preview"
                                                className="w-12 h-12 object-cover rounded-lg border"
                                                onError={(e) => e.target.style.display = 'none'}
                                            />
                                        )}
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Category Label</label>
                                        <input
                                            type="text"
                                            value={formData.categoryLabel}
                                            onChange={(e) => handleInputChange('categoryLabel', e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                            placeholder="e.g., Movie Tickets"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Category Label (Thai)</label>
                                        <input
                                            type="text"
                                            value={formData.categoryLabelTh}
                                            onChange={(e) => handleInputChange('categoryLabelTh', e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                            placeholder="ป้ายหมวดหมู่"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </Card>

                    {/* Pricing & Settings */}
                    <Card>
                        <button
                            onClick={() => toggleSection('pricing')}
                            className="w-full flex items-center justify-between text-left"
                        >
                            <h3 className="font-bold text-gray-900 flex items-center gap-2">
                                <i className="fas fa-tags text-green-500"></i>
                                Pricing & Settings
                            </h3>
                            <i className={`fas fa-chevron-${expandedSections.pricing ? 'up' : 'down'} text-gray-400`}></i>
                        </button>

                        {expandedSections.pricing && (
                            <div className="mt-4 space-y-4">
                                <div className="grid md:grid-cols-4 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                                        <input
                                            type="number"
                                            value={formData.price}
                                            onChange={(e) => handleInputChange('price', parseInt(e.target.value) || 0)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                            min="0"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                                        <select
                                            value={formData.currency}
                                            onChange={(e) => handleInputChange('currency', e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                        >
                                            {CURRENCY_OPTIONS.map(curr => (
                                                <option key={curr} value={curr}>{curr}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Tier</label>
                                        <select
                                            value={formData.tier}
                                            onChange={(e) => handleInputChange('tier', e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                        >
                                            {TIER_OPTIONS.map(tier => (
                                                <option key={tier} value={tier}>
                                                    {tier.charAt(0).toUpperCase() + tier.slice(1)}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                                        <input
                                            type="number"
                                            value={formData.stock}
                                            onChange={(e) => handleInputChange('stock', parseInt(e.target.value) || 0)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                            min="0"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
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
                        )}
                    </Card>

                    {/* Type-Specific Fields */}
                    {formData.voucherType !== 'standard' && (
                        <Card className={`border-2 border-${typeConfig.color}-200 bg-${typeConfig.color}-50/30`}>
                            <button
                                onClick={() => toggleSection('typeSpecific')}
                                className="w-full flex items-center justify-between text-left"
                            >
                                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                                    <i className={`fas fa-${typeConfig.icon} text-${typeConfig.color}-500`}></i>
                                    {typeConfig.label} Settings
                                </h3>
                                <i className={`fas fa-chevron-${expandedSections.typeSpecific ? 'up' : 'down'} text-gray-400`}></i>
                            </button>

                            {expandedSections.typeSpecific && (
                                <div className="mt-4 space-y-4">
                                    {/* Event Fields */}
                                    {formData.voucherType === 'event' && (
                                        <div className="grid md:grid-cols-3 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Event Date</label>
                                                <input
                                                    type="date"
                                                    value={formData.eventDate}
                                                    onChange={(e) => handleInputChange('eventDate', e.target.value)}
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Venue</label>
                                                <input
                                                    type="text"
                                                    value={formData.venue}
                                                    onChange={(e) => handleInputChange('venue', e.target.value)}
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                                    placeholder="Location name"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
                                                <input
                                                    type="number"
                                                    value={formData.capacity}
                                                    onChange={(e) => handleInputChange('capacity', e.target.value)}
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                                    placeholder="Max attendees"
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {/* Physical Item Fields */}
                                    {(formData.voucherType === 'physical' || formData.isPhysical) && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Variants (Size, Color, etc.)</label>
                                            <div className="space-y-2 mb-3">
                                                {(formData.variants || []).map((variant, idx) => (
                                                    <div key={idx} className="flex items-center gap-2 bg-white p-2 rounded-lg border">
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
                                    )}

                                    {/* Yacht Experience Fields */}
                                    {formData.voucherType === 'yacht_experience' && (
                                        <>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Available Yachts</label>
                                                <div className="grid md:grid-cols-2 gap-3">
                                                    {tbfYachts.map(yacht => (
                                                        <label
                                                            key={yacht.id}
                                                            className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${formData.yachtInfo.availableYachts?.includes(yacht.id)
                                                                ? 'border-cyan-500 bg-cyan-50'
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
                                                            <p className="text-xs text-gray-500">{yacht.specs?.lengthFeet || yacht.length} • {yacht.type}</p>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="grid md:grid-cols-3 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Duration (hours)</label>
                                                    <input
                                                        type="number"
                                                        value={formData.yachtInfo.duration}
                                                        onChange={(e) => handleNestedChange('yachtInfo', 'duration', parseInt(e.target.value) || 4)}
                                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                                        min="1"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Max Passengers</label>
                                                    <input
                                                        type="number"
                                                        value={formData.yachtInfo.maxPax}
                                                        onChange={(e) => handleNestedChange('yachtInfo', 'maxPax', parseInt(e.target.value) || 8)}
                                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                                        min="1"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                                                    <input
                                                        type="text"
                                                        value={formData.yachtInfo.location}
                                                        onChange={(e) => handleNestedChange('yachtInfo', 'location', e.target.value)}
                                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">What's Included</label>
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
                                        </>
                                    )}

                                    {/* Yacht Fraction Fields */}
                                    {formData.voucherType === 'yacht_fraction' && (
                                        <>
                                            <div className="grid md:grid-cols-4 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Price (THB)</label>
                                                    <input
                                                        type="number"
                                                        value={formData.fractionConfig.priceThb}
                                                        onChange={(e) => handleNestedChange('fractionConfig', 'priceThb', parseInt(e.target.value) || 0)}
                                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Tickets per Year</label>
                                                    <input
                                                        type="number"
                                                        value={formData.fractionConfig.ticketsPerYear}
                                                        onChange={(e) => handleNestedChange('fractionConfig', 'ticketsPerYear', parseInt(e.target.value) || 1)}
                                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                                        min="1"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Program Years</label>
                                                    <input
                                                        type="number"
                                                        value={formData.fractionConfig.programYears}
                                                        onChange={(e) => handleNestedChange('fractionConfig', 'programYears', parseInt(e.target.value) || 1)}
                                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                                        min="1"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Hours per Ticket</label>
                                                    <input
                                                        type="number"
                                                        value={formData.fractionConfig.hoursPerTicket}
                                                        onChange={(e) => handleNestedChange('fractionConfig', 'hoursPerTicket', parseInt(e.target.value) || 4)}
                                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                                        min="1"
                                                    />
                                                </div>
                                            </div>

                                            {/* Ticket Preview */}
                                            <div className="bg-blue-100 rounded-lg p-4">
                                                <p className="font-medium text-blue-900">
                                                    <i className="fas fa-ticket-alt mr-2"></i>
                                                    Total Tickets Generated: <strong>{formData.fractionConfig.ticketsPerYear * formData.fractionConfig.programYears}</strong>
                                                    <span className="text-sm text-blue-700 ml-2">
                                                        ({formData.fractionConfig.ticketsPerYear} × {formData.fractionConfig.programYears} years)
                                                    </span>
                                                </p>
                                            </div>

                                            {/* Cash-Out Options */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Cash-Out Options</label>
                                                <div className="space-y-3">
                                                    <div className="flex items-center gap-4 bg-white p-3 rounded-lg border">
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
                                                            <p className="font-medium text-sm">Charter Match</p>
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

                                                    <div className="flex items-center gap-4 bg-white p-3 rounded-lg border">
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
                                                            <p className="font-medium text-sm">MVP Exchange</p>
                                                            <p className="text-xs text-gray-500">List on marketplace at market price</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            )}
                        </Card>
                    )}

                    {/* Conditions */}
                    <Card>
                        <button
                            onClick={() => toggleSection('conditions')}
                            className="w-full flex items-center justify-between text-left"
                        >
                            <h3 className="font-bold text-gray-900 flex items-center gap-2">
                                <i className="fas fa-list-check text-amber-500"></i>
                                Conditions & Terms ({formData.conditions.length})
                            </h3>
                            <i className={`fas fa-chevron-${expandedSections.conditions ? 'up' : 'down'} text-gray-400`}></i>
                        </button>

                        {expandedSections.conditions && (
                            <div className="mt-4 space-y-3">
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
                        )}
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default AdminVoucherEditPage;
