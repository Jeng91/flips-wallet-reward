import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    User, Mail, Phone, MapPin, Calendar, Shield, Edit2, Camera,
    ChevronRight, Settings, Bell, Lock, LogOut, HelpCircle,
    CheckCircle, Star, Gift, History
} from 'lucide-react';
import { userProfile } from '../data/mockData';
import AddressBookSection from '../components/profile/AddressBookSection';

// Use consistent profile image
const PROFILE_IMAGE = '/images/profile_v1.jpg';

const Profile = () => {
    const [activeTab, setActiveTab] = useState('profile');

    const menuItems = [
        { id: 'settings', icon: Settings, label: 'Account Settings', link: '/settings' },
        { id: 'security', icon: Lock, label: 'Security', link: '/security' },
        { id: 'notifications', icon: Bell, label: 'Notifications', badge: '3' },
        { id: 'rewards', icon: Gift, label: 'My Rewards History', link: '/vouchers' },
        { id: 'help', icon: HelpCircle, label: 'Help & Support' },
    ];

    const stats = [
        { label: 'Rewards Redeemed', value: '12', icon: Gift, color: 'bg-green-100 text-green-600' },
        { label: 'Member Since', value: 'Jan 2024', icon: Calendar, color: 'bg-blue-100 text-blue-600' },
        { label: 'Loyalty Level', value: 'Gold', icon: Star, color: 'bg-amber-100 text-amber-600' },
    ];

    return (
        <div className="max-w-4xl mx-auto px-4 md:px-6 py-6">
            {/* Profile Header Card */}
            <div className="bg-gradient-to-br from-primary via-primary to-blue-700 rounded-3xl p-6 md:p-8 mb-6 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-1/2 -translate-x-1/2"></div>
                </div>

                <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6">
                    {/* Profile Picture */}
                    <div className="relative group">
                        <div className="w-28 h-28 md:w-32 md:h-32 rounded-2xl border-4 border-white/30 overflow-hidden shadow-2xl">
                            <img
                                src={PROFILE_IMAGE}
                                alt={userProfile.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <button className="absolute bottom-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                            <Camera className="w-4 h-4 text-gray-600" />
                        </button>
                        {/* Online Indicator */}
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-primary"></div>
                    </div>

                    {/* Profile Info */}
                    <div className="flex-1 text-center md:text-left">
                        <div className="flex flex-col md:flex-row items-center gap-3 mb-2">
                            <h1 className="text-2xl md:text-3xl font-bold text-white">{userProfile.name}</h1>
                            {userProfile.kycStatus === 'Verified' && (
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                                    <CheckCircle className="w-4 h-4" />
                                    KYC Verified
                                </span>
                            )}
                        </div>
                        <p className="text-white/80 mb-1">{userProfile.email}</p>
                        <p className="text-white/60 flex items-center justify-center md:justify-start gap-1.5 text-sm">
                            <MapPin className="w-4 h-4" />
                            {userProfile.address}
                        </p>

                        <Link
                            to="/settings"
                            className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 bg-white text-primary rounded-xl font-semibold hover:bg-gray-100 transition-colors shadow-lg"
                        >
                            <Edit2 className="w-4 h-4" />
                            Edit Profile
                        </Link>
                    </div>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                {stats.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <div key={i} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm text-center">
                            <div className={`w-10 h-10 ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                                <Icon className="w-5 h-5" />
                            </div>
                            <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                            <p className="text-xs text-gray-500">{stat.label}</p>
                        </div>
                    );
                })}
            </div>

            {/* Personal Information Card */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <User className="w-5 h-5 text-primary" />
                    Personal Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                        <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                            <Mail className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-400">Email</p>
                            <p className="font-medium text-gray-800">{userProfile.email}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                        <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
                            <Phone className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-400">Phone</p>
                            <p className="font-medium text-gray-800">{userProfile.phone}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                        <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600">
                            <Calendar className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-400">Date of Birth</p>
                            <p className="font-medium text-gray-800">{userProfile.dob} ({userProfile.age} years old)</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                        <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600">
                            <MapPin className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-400">Primary Address</p>
                            <p className="font-medium text-gray-800">{userProfile.address}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Address Book Section */}
            <AddressBookSection initialAddresses={userProfile.addresses || []} />

            {/* Menu Items */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                {menuItems.map((item, i) => {
                    const Icon = item.icon;
                    const Component = item.link ? Link : 'button';
                    return (
                        <Component
                            key={item.id}
                            to={item.link}
                            className={`w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors ${i !== menuItems.length - 1 ? 'border-b border-gray-50' : ''
                                }`}
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-gray-600">
                                    <Icon className="w-5 h-5" />
                                </div>
                                <span className="font-medium text-gray-800">{item.label}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                {item.badge && (
                                    <span className="px-2 py-0.5 bg-red-500 text-white text-xs rounded-full font-bold">
                                        {item.badge}
                                    </span>
                                )}
                                <ChevronRight className="w-5 h-5 text-gray-400" />
                            </div>
                        </Component>
                    );
                })}
            </div>

            {/* Logout Button */}
            <button className="w-full mt-6 flex items-center justify-center gap-2 p-4 bg-red-50 text-red-600 rounded-2xl font-semibold hover:bg-red-100 transition-colors">
                <LogOut className="w-5 h-5" />
                Sign Out
            </button>

            {/* Footer */}
            <div className="text-center mt-8 text-xs text-gray-400">
                <p>FLIPS ID v1.0.0</p>
                <p className="mt-1">© 2024 FLIPS ID Corporation</p>
            </div>
        </div>
    );
};

export default Profile;
