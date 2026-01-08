import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const AdminSidebar = () => {
    const navigate = useNavigate();
    const [expandedMenus, setExpandedMenus] = useState({
        users: false,
        wallet: false,
        vouchers: false
    });

    const toggleMenu = (menuKey) => {
        setExpandedMenus(prev => ({
            ...prev,
            [menuKey]: !prev[menuKey]
        }));
    };

    const handleLogout = () => {
        if (window.confirm('คุณต้องการออกจากระบบหรือไม่?')) {
            navigate('/login');
        }
    };

    const handleViewWebsite = () => {
        navigate('/');
    };

    const menuItems = [
        {
            id: 'dashboard',
            label: 'แดชบอร์ด',
            icon: 'fa-dashboard',
            path: '/admin/dashboard'
        },
        {
            id: 'users',
            label: 'User',
            icon: 'fa-users',
            expandable: true,
            subItems: [
                { label: 'ผู้ใช้ทั้งหมด', path: '/admin/users' },
                { label: 'รายชื่อใหม่', path: '/admin/users/new' }
            ]
        },
        {
            id: 'wallet',
            label: 'Wallet',
            icon: 'fa-wallet',
            expandable: true,
            subItems: [
                { label: 'Token List Management', path: '/admin/wallet/tokens' },
                { label: 'Wallet & Holder Monitoring', path: '/admin/wallet/monitoring' }
            ]
        },
        {
            id: 'vouchers',
            label: 'Voucher & Reward',
            icon: 'fa-gift',
            expandable: true,
            subItems: [
                { label: 'ภาพรวม', path: '/admin/vouchers' },
                { label: 'Colestia', path: '/admin/vouchers/colestia' },
                { label: 'CtrlG', path: '/admin/vouchers/ctrlg' },
                { label: 'TBF', path: '/admin/vouchers/tbf' }
            ]
        },
        {
            id: 'fractional',
            label: 'Fractional TBF',
            icon: 'fa-ship',
            path: '/admin/fractional'
        },
        {
            id: 'reports',
            label: 'Reports & Export',
            icon: 'fa-chart-bar',
            path: '/admin/reports'
        },
        {
            id: 'roles',
            label: 'Admin Roles & Permissions',
            icon: 'fa-user-shield',
            path: '/admin/roles'
        }
    ];

    return (
        <div className="w-64 bg-gray-900 text-white flex flex-col">
            {/* Logo/Brand */}
            <div className="p-6 border-b border-gray-800">
                <h2 className="text-xl font-bold flex items-center gap-2">
                    <i className="fas fa-coins text-primary"></i>
                    FLIPS Admin
                </h2>
            </div>

            {/* Navigation Menu */}
            <nav className="flex-1 overflow-y-auto py-4">
                <ul className="space-y-1 px-3">
                    {menuItems.map((item) => (
                        <li key={item.id}>
                            {item.expandable ? (
                                <>
                                    <button
                                        onClick={() => toggleMenu(item.id)}
                                        className="w-full flex items-center justify-between px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors"
                                    >
                                        <div className="flex items-center gap-3">
                                            <i className={`fas ${item.icon} w-5`}></i>
                                            <span className="font-medium text-sm">{item.label}</span>
                                        </div>
                                        <i className={`fas fa-chevron-${expandedMenus[item.id] ? 'up' : 'down'} text-xs`}></i>
                                    </button>
                                    {expandedMenus[item.id] && (
                                        <ul className="mt-1 ml-4 space-y-1">
                                            {item.subItems.map((subItem, idx) => (
                                                <li key={idx}>
                                                    <NavLink
                                                        to={subItem.path}
                                                        className={({ isActive }) =>
                                                            `block px-4 py-2 text-sm rounded-lg transition-colors ${isActive
                                                                ? 'bg-primary text-white'
                                                                : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                                                            }`
                                                        }
                                                    >
                                                        {subItem.label}
                                                    </NavLink>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </>
                            ) : (
                                <NavLink
                                    to={item.path}
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                            ? 'bg-primary text-white'
                                            : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                                        }`
                                    }
                                >
                                    <i className={`fas ${item.icon} w-5`}></i>
                                    <span className="font-medium text-sm">{item.label}</span>
                                </NavLink>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Bottom Actions */}
            <div className="p-3 border-t border-gray-800 space-y-2">
                <button
                    onClick={handleViewWebsite}
                    className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors"
                >
                    <i className="fas fa-globe w-5"></i>
                    <span className="font-medium text-sm">View Website</span>
                </button>
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-900/20 hover:text-red-300 rounded-lg transition-colors"
                >
                    <i className="fas fa-sign-out-alt w-5"></i>
                    <span className="font-medium text-sm">Logout</span>
                </button>
            </div>
        </div>
    );
};

export default AdminSidebar;
