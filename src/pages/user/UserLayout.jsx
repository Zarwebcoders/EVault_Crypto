import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import {
    HomeIcon,
    CurrencyDollarIcon,
    ArrowDownTrayIcon,
    UserCircleIcon,
    Bars3Icon,
    XMarkIcon
} from '@heroicons/react/24/outline';
import { useCrypto } from '../../context/CryptoContext';
import eVault_Logo from '../../../public/eVaultLogoWithBG.png';

const UserLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();
    const { user } = useCrypto();

    const navigation = [
        { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
        { name: 'New Investment', href: '/dashboard/invest', icon: CurrencyDollarIcon },
        { name: 'My Investments', href: '/dashboard/my-investments', icon: CurrencyDollarIcon },
        { name: 'Withdrawals', href: '/dashboard/withdraw', icon: ArrowDownTrayIcon },
        { name: 'Profile', href: '/dashboard/profile', icon: UserCircleIcon },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}

            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
                <div className="flex items-center justify-between h-40 px-6 border-b border-gray-100">
                    <img src={eVault_Logo} alt="eVault Logo" />
                    <button className="md:hidden" onClick={() => setSidebarOpen(false)}>
                        <XMarkIcon className="w-6 h-6 text-gray-500" />
                    </button>
                </div>

                <nav className="px-4 py-6 space-y-1">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            to={item.href}
                            className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 group relative overflow-hidden ${isActive(item.href)
                                ? 'text-[#D4AF37] bg-[#D4AF37]/5 border-r-2 border-[#D4AF37]'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                        >
                            <item.icon className="w-5 h-5 mr-3" />
                            {item.name}
                        </Link>
                    ))}
                </nav>

                <div className="absolute bottom-0 w-full p-4 border-t border-gray-100 bg-gray-50/50">
                    <div className="flex items-center p-2 rounded-lg hover:bg-white hover:shadow-sm transition-all cursor-pointer group">
                        <div className="flex-shrink-0">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B4941F] flex items-center justify-center text-white font-bold shadow-md group-hover:scale-105 transition-transform">
                                {(user?.name || 'User').charAt(0)}
                            </div>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900 group-hover:text-[#D4AF37] transition-colors">{user?.name || 'User'}</p>
                            <p className="text-xs text-gray-500">View Profile</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="md:pl-64 flex flex-col min-h-screen">
                {/* Bottom Border to separate header from content */}
                <header className="bg-white shadow-sm h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 border-b border-gray-100">
                    <button
                        type="button"
                        className="md:hidden p-2 text-gray-400 hover:text-gray-500"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <Bars3Icon className="w-6 h-6" />
                    </button>

                    <div className="flex-1 flex justify-end items-center space-x-4">
                        {/* Wallet Status */}
                        <div className="hidden sm:flex items-center px-4 py-1.5 rounded-full border border-[#D4AF37] bg-[#D4AF37]/5">
                            <div className={`w-2 h-2 rounded-full mr-2 ${user?.walletConnected ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                            <span className="text-sm font-medium text-[#D4AF37]">
                                {user?.walletConnected ? 'Wallet Connected' : 'Wallet Disconnected'}
                            </span>
                        </div>

                        <button className="p-1 text-gray-400 hover:text-[#D4AF37] transition-colors">
                            <span className="sr-only">Notifications</span>
                            {/* Notification Bell */}
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                        </button>
                    </div>
                </header>

                {/* Page Content with Mesh Background */}
                <main className="flex-1 p-4 sm:p-6 lg:p-4 overflow-y-auto mesh-bg relative">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default UserLayout;
