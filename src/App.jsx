import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CategoryProvider } from './context/CategoryContext';
import MainLayout from './components/layout/MainLayout';
import AdminLayout from './components/admin/AdminLayout';
import Home from './pages/Home';
import Wallet from './pages/Wallet';
import Profile from './pages/Profile';
import Vouchers from './pages/Vouchers';
import PrivilegeDetail from './pages/PrivilegeDetail';
import TokenDetail from './pages/TokenDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import Security from './pages/Security';
import Settings from './pages/Settings';

// Admin Components
import AdminDashboard from './components/admin/AdminDashboard';
import AdminUsers from './components/admin/AdminUsers';
import AdminNewUsers from './components/admin/AdminNewUsers';
import AdminTokenManagement from './components/admin/AdminTokenManagement';
import AdminWalletMonitoring from './components/admin/AdminWalletMonitoring';
import AdminColestiaVouchers from './components/admin/AdminColestiaVouchers';
import AdminCtrlGVouchers from './components/admin/AdminCtrlGVouchers';
import AdminVoucherOverview from './components/admin/AdminVoucherOverview';
import AdminVoucherEditPage from './components/admin/AdminVoucherEditPage';
import AdminTBFVouchers from './components/admin/AdminTBFVouchers';
import AdminFractionalTBF from './components/admin/AdminFractionalTBF';
import AdminReports from './components/admin/AdminReports';
import AdminRolesPermissions from './components/admin/AdminRolesPermissions';
import { filmTokens, walletHolders, fundingReports, adminRoles, adminUsers, redemptionQueue } from './data/adminMockData';

function App() {
    return (
        <CategoryProvider>
            <Router>
                <Routes>
                    {/* Auth Routes - No Layout */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    {/* Admin Routes with Admin Layout */}
                    <Route path="/admin" element={<AdminLayout />}>
                        <Route index element={<AdminDashboard />} />
                        <Route path="dashboard" element={<AdminDashboard />} />
                        <Route path="users" element={<AdminUsers />} />
                        <Route path="users/new" element={<AdminNewUsers />} />
                        <Route path="wallet/tokens" element={<AdminTokenManagement tokens={filmTokens} />} />
                        <Route path="wallet/monitoring" element={<AdminWalletMonitoring wallets={walletHolders} />} />

                        {/* Voucher Management */}
                        <Route path="vouchers" element={<AdminVoucherOverview />} />
                        <Route path="vouchers/colestia" element={<AdminColestiaVouchers />} />
                        <Route path="vouchers/ctrlg" element={<AdminCtrlGVouchers />} />
                        <Route path="vouchers/tbf" element={<AdminTBFVouchers />} />
                        <Route path="vouchers/edit/:id" element={<AdminVoucherEditPage />} />
                        <Route path="vouchers/new" element={<AdminVoucherEditPage />} />

                        {/* Fractional Ownership Management (bookings, owners) */}
                        <Route path="fractional" element={<AdminFractionalTBF />} />

                        <Route path="reports" element={<AdminReports reports={fundingReports} />} />
                        <Route path="roles" element={<AdminRolesPermissions roles={adminRoles} adminUsers={adminUsers} />} />
                    </Route>


                    {/* Main Routes with Layout */}
                    <Route element={<MainLayout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/wallet" element={<Wallet />} />
                        <Route path="/token/:tokenId" element={<TokenDetail />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/vouchers" element={<Vouchers />} />
                        <Route path="/privilege/:id" element={<PrivilegeDetail />} />
                        <Route path="/security" element={<Security />} />
                        <Route path="/settings" element={<Settings />} />
                    </Route>
                </Routes>
            </Router>
        </CategoryProvider>
    );
}

export default App;
