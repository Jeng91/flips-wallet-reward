import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import MobileNav from './MobileNav';

const MainLayout = () => {
    return (
        <div className="min-h-screen bg-gray-50 font-thai text-slate-900 antialiased">
            <Header />
            <main className="pt-24 pb-20 md:pb-8">
                <Outlet />
            </main>
            <MobileNav />
        </div>
    );
};

export default MainLayout;
