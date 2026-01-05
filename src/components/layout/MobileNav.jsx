import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Gift, Wallet, User } from 'lucide-react';

const MobileNav = () => {
    const location = useLocation();

    const isActive = (path) => {
        if (path === '/' && location.pathname === '/') return true;
        if (path !== '/' && location.pathname.startsWith(path)) return true;
        return false;
    };

    const navItems = [
        { path: '/', icon: Gift, label: 'สิทธิพิเศษ' },
        { path: '/wallet', icon: Wallet, label: 'กระเป๋า' },
        { path: '/profile', icon: User, label: 'โปรไฟล์' },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden z-50 safe-area-bottom">
            <div className="flex justify-around items-center py-2">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.path);

                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex flex-col items-center gap-1 py-2 px-4 transition-colors
                ${active ? 'text-primary' : 'text-gray-500 hover:text-primary'}`}
                        >
                            <Icon className="w-5 h-5" />
                            <span className="text-[10px] font-medium">{item.label}</span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
};

export default MobileNav;
