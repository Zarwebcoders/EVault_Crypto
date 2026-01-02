import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import {
    HomeIcon,
    UsersIcon,
    BanknotesIcon,
    Cog6ToothIcon,
    Bars3Icon,
    XMarkIcon,
    DocumentCheckIcon
} from '@heroicons/react/24/outline';
import eVault_Logo from '../../../public/eVaultLogoTransparent2.png';

const AdminLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();

    const navigation = [
        { name: 'Admin Overview', href: '/admin', icon: HomeIcon },
        { name: 'Token ROI', href: '/admin/tokens', icon: Cog6ToothIcon },
        { name: 'User Management', href: '/admin/users', icon: UsersIcon },
        { name: 'Investment Requests', href: '/admin/investments', icon: BanknotesIcon },
        { name: 'Withdrawal Requests', href: '/admin/withdrawals', icon: DocumentCheckIcon },
    ];

    const isActive = (path) => location.pathname === path || (path !== '/admin' && location.pathname.startsWith(path));

    return (
        <div className="min-h-screen bg-gray-100 font-sans">
            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-gray-900 bg-opacity-75 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}

            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 text-white shadow-xl transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
                <div className="flex items-center justify-between h-30 px-6 border-b border-gray-800">
                    {/* <h1 className="text-xl font-bold text-[#FFD700]">
                        EVault <span className="text-white font-light">Admin</span>
                    </h1> */}
                    <img src={eVault_Logo} alt="eVault Logo" />
                    <button className="md:hidden" onClick={() => setSidebarOpen(false)}>
                        <XMarkIcon className="w-6 h-6 text-gray-400" />
                    </button>
                </div>

                <nav className="px-4 py-6 space-y-2">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            to={item.href}
                            className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${isActive(item.href)
                                ? 'bg-[#D4AF37] text-white'
                                : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                                }`}
                        >
                            <item.icon className="w-5 h-5 mr-3" />
                            {item.name}
                        </Link>
                    ))}
                </nav>
            </div>

            {/* Main Content */}
            <div className="md:pl-64 flex flex-col min-h-screen">
                {/* Top Header */}
                <header className="bg-white shadow-sm h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8">
                    <button
                        type="button"
                        className="md:hidden p-2 text-gray-400"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <Bars3Icon className="w-6 h-6" />
                    </button>

                    <div className="flex-1 flex justify-end items-center">
                        <span className="text-sm text-gray-500 mr-4">Administrator Mode</span>
                        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                            <UsersIcon className="h-4 w-4 text-gray-500" />
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-4 sm:p-6 lg:p-4 overflow-y-auto mesh-bg relative">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
