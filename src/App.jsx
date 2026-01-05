import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CategoryProvider } from './context/CategoryContext';
import MainLayout from './components/layout/MainLayout';
import Home from './pages/Home';
import Wallet from './pages/Wallet';
import Profile from './pages/Profile';
import Vouchers from './pages/Vouchers';
import PrivilegeDetail from './pages/PrivilegeDetail';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Register from './pages/Register';
import Security from './pages/Security';
import Settings from './pages/Settings';

function App() {
    return (
        <CategoryProvider>
            <Router>
                <Routes>
                    {/* Auth Routes - No Layout */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    {/* Main Routes with Layout */}
                    <Route element={<MainLayout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/wallet" element={<Wallet />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/vouchers" element={<Vouchers />} />
                        <Route path="/privilege/:id" element={<PrivilegeDetail />} />
                        <Route path="/admin" element={<Admin />} />
                        <Route path="/security" element={<Security />} />
                        <Route path="/settings" element={<Settings />} />
                    </Route>
                </Routes>
            </Router>
        </CategoryProvider>
    );
}

export default App;
