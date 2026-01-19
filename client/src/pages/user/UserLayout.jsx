import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
    HomeIcon,
    CurrencyDollarIcon,
    ArrowDownTrayIcon,
    UserCircleIcon,
    Bars3Icon,
    XMarkIcon,
    BellIcon,
    WalletIcon,
    ArrowRightOnRectangleIcon,
    ClockIcon
} from '@heroicons/react/24/outline';
import { useCrypto } from '../../context/CryptoContext';
import eVault_Logo from '../../../public/evaultbg.png';

const UserLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useCrypto();

    const navigation = [
        { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
        { name: 'New Investment', href: '/dashboard/invest', icon: CurrencyDollarIcon },
        { name: 'Withdrawals', href: '/dashboard/withdraw', icon: ArrowDownTrayIcon },
        { name: 'Transactions', href: '/dashboard/transactions', icon: ClockIcon },
        { name: 'Profile', href: '/dashboard/profile', icon: UserCircleIcon },
    ];

    const isActive = (path) => location.pathname === path;

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gray-50/50 font-sans text-gray-900">
            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-gray-900/80 backdrop-blur-sm transition-opacity md:hidden"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}

            {/* Sidebar Navigation */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-100 shadow-2xl md:shadow-none transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } md:translate-x-0 flex flex-col`}
            >
                {/* Logo Area */}
                <div className="h-36 flex items-center justify-between px-8 border-b border-gray-50">
                    <img src={eVault_Logo} alt="eVault Logo" className="h-40 w-auto object-contain" />
                    <button className="md:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors" onClick={() => setSidebarOpen(false)}>
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </div>

                {/* Nav Links */}
                <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto custom-scrollbar">
                    <p className="px-4 text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Main Menu</p>
                    {navigation.map((item) => {
                        const active = isActive(item.href);
                        return (
                            <Link
                                key={item.name}
                                to={item.href}
                                onClick={() => setSidebarOpen(false)}
                                className={`group flex items-center px-4 py-3.5 text-sm font-medium rounded-xl transition-all duration-200 relative overflow-hidden ${active
                                    ? 'bg-gray-900 text-white shadow-lg shadow-gray-200'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                            >
                                {/* Active Indicator Line */}
                                {active && <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#D4AF37]"></div>}

                                <item.icon
                                    className={`w-5 h-5 mr-3 transition-colors ${active ? 'text-[#D4AF37]' : 'text-gray-400 group-hover:text-gray-600'
                                        }`}
                                />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                {/* User Profile Card */}
                <div className="p-4 border-t border-gray-50 bg-gray-50/30">
                    <div className="flex items-center p-3 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer group">
                        <div className="flex-shrink-0 relative">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#8a701f] flex items-center justify-center text-white font-bold text-lg shadow-sm">
                                {(user?.name || 'U').charAt(0).toUpperCase()}
                            </div>
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                        </div>
                        <div className="ml-3 flex-1 overflow-hidden">
                            <p className="text-sm font-bold text-gray-900 truncate group-hover:text-[#D4AF37] transition-colors">
                                {user?.name || 'Investor'}
                            </p>
                            <p className="text-xs text-gray-500 truncate">View Profile</p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="p-1 hover:bg-gray-100 rounded-lg transition-colors group"
                            title="Logout"
                        >
                            <ArrowRightOnRectangleIcon className="w-5 h-5 text-gray-500 group-hover:text-red-500 transition-colors" />
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content Wrapper */}
            <div className="md:pl-64 flex flex-col min-h-screen transition-all duration-300">

                {/* Sticky Glass Header */}
                <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 h-20 px-4 sm:px-8 flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-4">
                        <button
                            type="button"
                            className="md:hidden p-2 -ml-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <Bars3Icon className="w-6 h-6" />
                        </button>

                        {/* Current Page Title (Dynamic) */}
                        <h2 className="text-lg font-bold text-gray-800 hidden sm:block">
                            {navigation.find(n => isActive(n.href))?.name || 'Dashboard'}
                        </h2>
                    </div>

                    <div className="flex items-center gap-3 sm:gap-6">
                        {/* Wallet Badge */}


                        {/* Notification Bell */}
                        <button className="relative p-2.5 text-gray-400 hover:text-gray-600 transition-colors rounded-xl hover:bg-gray-50">
                            <span className="absolute top-2.5 right-3 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white animate-pulse"></span>
                            <BellIcon className="w-6 h-6" />
                        </button>
                    </div>
                </header>

                {/* Content Area */}
                <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
                    <div className="max-w-8xl mx-auto animate-fade-in-up">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default UserLayout;