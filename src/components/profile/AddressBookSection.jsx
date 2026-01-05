import React, { useState } from 'react';
import { MapPin, Plus, Trash2, Check, Star, X } from 'lucide-react';

const AddressBookSection = ({ initialAddresses = [] }) => {
    const [addresses, setAddresses] = useState(initialAddresses);
    const [showAddModal, setShowAddModal] = useState(false);
    const [newAddress, setNewAddress] = useState({ label: '', address: '', phone: '' });

    const handleAddAddress = () => {
        if (addresses.length >= 3) return;

        const id = Math.max(...addresses.map(a => a.id), 0) + 1;
        const addressToAdd = {
            id,
            ...newAddress,
            isDefault: addresses.length === 0 // Make default if first address
        };

        setAddresses([...addresses, addressToAdd]);
        setNewAddress({ label: '', address: '', phone: '' });
        setShowAddModal(false);
    };

    const handleDelete = (id) => {
        setAddresses(addresses.filter(a => a.id !== id));
    };

    const handleSetDefault = (id) => {
        setAddresses(addresses.map(a => ({
            ...a,
            isDefault: a.id === id
        })));
    };

    return (
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    Address Book
                </h2>
                <button
                    onClick={() => setShowAddModal(true)}
                    disabled={addresses.length >= 3}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${addresses.length >= 3
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-primary/10 text-primary hover:bg-primary/20'
                        }`}
                >
                    <Plus className="w-4 h-4" />
                    Add New ({addresses.length}/3)
                </button>
            </div>

            <div className="space-y-3">
                {addresses.length === 0 && (
                    <p className="text-center text-gray-400 py-4 text-sm">No addresses saved yet.</p>
                )}

                {addresses.map((addr) => (
                    <div key={addr.id} className={`p-4 rounded-xl border transition-all ${addr.isDefault ? 'border-primary/30 bg-primary/5' : 'border-gray-100 hover:border-gray-200'}`}>
                        <div className="flex justify-between items-start">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="font-bold text-gray-800">{addr.label}</span>
                                    {addr.isDefault && (
                                        <span className="px-2 py-0.5 bg-primary text-white text-[10px] uppercase font-bold rounded-full">Default</span>
                                    )}
                                </div>
                                <p className="text-sm text-gray-600 leading-relaxed max-w-lg">{addr.address}</p>
                                {addr.phone && <p className="text-xs text-gray-400 mt-1">Tel: {addr.phone}</p>}
                            </div>

                            <div className="flex items-center gap-2">
                                {!addr.isDefault && (
                                    <button
                                        onClick={() => handleSetDefault(addr.id)}
                                        className="p-2 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                                        title="Set as Default"
                                    >
                                        <Star className="w-4 h-4" />
                                    </button>
                                )}
                                <button
                                    onClick={() => handleDelete(addr.id)}
                                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                    title="Delete"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add Address Modal */}
            {showAddModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowAddModal(false)}></div>
                    <div className="bg-white rounded-2xl p-6 w-full max-w-md relative z-10 shadow-2xl animate-scale-up">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold text-gray-900">Add New Address</h3>
                            <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="space-y-4 mb-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Label (e.g., Home, Office)</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    placeholder="Home"
                                    value={newAddress.label}
                                    onChange={(e) => setNewAddress({ ...newAddress, label: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Items Receiver Name & Phone</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    placeholder="Name - 099-999-9999"
                                    value={newAddress.phone}
                                    onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Address</label>
                                <textarea
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 h-24 resize-none"
                                    placeholder="House No, Street, Sub-district, District, Province, Zip Code"
                                    value={newAddress.address}
                                    onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowAddModal(false)}
                                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-semibold hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddAddress}
                                disabled={!newAddress.label || !newAddress.address}
                                className={`flex-1 py-2.5 rounded-xl text-white font-bold shadow-lg transition-all ${!newAddress.label || !newAddress.address
                                        ? 'bg-gray-300 cursor-not-allowed'
                                        : 'bg-primary hover:bg-primary-dark hover:shadow-primary/30'
                                    }`}
                            >
                                Save Address
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddressBookSection;
