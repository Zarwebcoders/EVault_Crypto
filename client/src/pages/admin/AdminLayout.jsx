import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
    HomeIcon,
    UsersIcon,
    BanknotesIcon,
    Cog6ToothIcon,
    Bars3Icon,
    XMarkIcon,
    DocumentCheckIcon,
    ChevronRightIcon,
    ShieldCheckIcon,
    ArrowRightOnRectangleIcon,
    EnvelopeIcon
} from '@heroicons/react/24/outline';
import eVault_Logo from '../../../public/evaultbg.png';

import { useCrypto } from '../../context/CryptoContext';

const AdminLayout = () => {
    const { user, allUsers, logout } = useCrypto();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    // Calculate Stats
    const activeUsersCount = allUsers?.length || 0;
    const totalDeposited = allUsers?.reduce((acc, u) => acc + (u.totalInvested || 0), 0) || 0;

    const navigation = [
        { name: 'Admin Overview', href: '/admin', icon: HomeIcon },
        { name: 'Token ROI', href: '/admin/tokens', icon: Cog6ToothIcon },
        { name: 'User Management', href: '/admin/users', icon: UsersIcon },
        { name: 'Investment Requests', href: '/admin/investments', icon: BanknotesIcon },
        { name: 'Withdrawal Requests', href: '/admin/withdrawals', icon: DocumentCheckIcon },
        { name: 'Newsletter', href: '/admin/newsletter', icon: EnvelopeIcon },
    ];

    const isActive = (path) => location.pathname === path || (path !== '/admin' && location.pathname.startsWith(path));

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 font-sans">
            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-gray-900/80 backdrop-blur-sm md:hidden"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}

            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 z-50 bg-[#fbfcf7] text-black shadow-2xl transition-all duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} ${collapsed ? 'md:w-20' : 'md:w-64'} md:translate-x-0`}>

                {/* Logo Section */}
                <div className="flex items-center justify-between p-6 relative">
                    {!collapsed && (
                        <div className="flex items-center space-x-3">
                            <div className={`relative`}>
                                <img src={eVault_Logo} alt="eVault Logo" className={`w-40 h-30 rounded-lg`} />
                            </div>
                        </div>
                    )}

                    <div className="flex items-center space-x-2">
                        <button
                            className="hidden md:flex items-center text-white justify-center w-8 h-8 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition-colors"
                            onClick={() => setCollapsed(!collapsed)}
                        >
                            <ChevronRightIcon className={`w-4 h-4 transition-transform ${collapsed ? 'rotate-180' : ''}`} />
                        </button>
                        <button className="md:hidden" onClick={() => setSidebarOpen(false)}>
                            <XMarkIcon className="w-6 h-6 text-gray-400 hover:text-white transition-colors" />
                        </button>
                    </div>
                </div>

                {/* Admin Status */}
                <div className={`px-4 ${collapsed ? 'hidden' : 'block'}`}>
                    <div className="flex items-center space-x-3 px-3 py-2 bg-gradient-to-r from-[#D4AF37] to-[#D4AF37]/40 rounded-lg">
                        <div className="relative">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4AF37] to-gray-900/40 flex items-center justify-center">
                                <ShieldCheckIcon className="w-5 h-5 text-white" />
                            </div>
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></div>
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium">{user?.name || 'Admin'}</p>
                            <p className="text-xs text-gray-600">Super Admin</p>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="px-4 py-6 space-y-1">
                    {navigation.map((item) => {
                        const Icon = item.icon;
                        const active = isActive(item.href);
                        return (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={`relative flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group ${active
                                    ? 'bg-gradient-to-r from-[#D4AF37]/20 to-transparent text-[#D4AF37] border-l-4 border-[#D4AF37]'
                                    : 'text-gray-700 hover:bg-[#D4AF37]/40 hover:text-black hover:border-l-4 hover:border-gray-700'
                                    } ${collapsed ? 'justify-center px-0' : ''}`}
                            >
                                <div className={`relative ${collapsed ? '' : 'mr-3'}`}>
                                    <Icon className={`w-5 h-5 ${active ? 'text-[#D4AF37]' : 'group-hover:text-[#D4AF37]'}`} />
                                    {active && (
                                        <div className="absolute inset-0 animate-ping opacity-20">
                                            <Icon className="w-5 h-5 text-[#D4AF37]" />
                                        </div>
                                    )}
                                </div>

                                {!collapsed && (
                                    <>
                                        <span className={`transition-opacity duration-200 ${active ? 'font-semibold' : ''}`}>
                                            {item.name}
                                        </span>
                                        {item.badge && (
                                            <span className={`ml-auto px-2 py-1 text-xs rounded-full ${active
                                                ? 'bg-[#D4AF37] text-gray-900'
                                                : 'bg-gray-800 text-gray-300 group-hover:bg-gray-700'
                                                }`}>
                                                {item.badge}
                                            </span>
                                        )}
                                    </>
                                )}

                                {active && !collapsed && (
                                    <div className="absolute right-3 w-2 h-2 bg-[#D4AF37] rounded-full animate-pulse"></div>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Sidebar Footer */}
                {!collapsed && (
                    <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-gray-800/50">
                        <button
                            onClick={handleLogout}
                            className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-300 bg-gray-800/50 hover:bg-gray-800 rounded-lg transition-colors"
                        >
                            <ArrowRightOnRectangleIcon className="w-4 h-4 mr-2" />
                            Logout
                        </button>
                    </div>
                )}
            </div>

            {/* Main Content */}
            <div className={`flex flex-col min-h-screen transition-all duration-300 ${collapsed ? 'md:pl-20' : 'md:pl-64'}`}>
                {/* Top Header */}
                <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md shadow-sm h-16 border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center space-x-4">
                        <button
                            type="button"
                            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <Bars3Icon className="w-6 h-6" />
                        </button>

                        {/* Breadcrumb */}
                        <div className="hidden md:flex items-center space-x-2 text-sm text-gray-600">
                            <span className="font-medium">Admin</span>
                            <ChevronRightIcon className="w-3 h-3" />
                            <span className="text-gray-900 font-semibold">
                                {navigation.find(nav => isActive(nav.href))?.name || 'Dashboard'}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center space-x-6">
                        {/* Stats */}
                        <div className="hidden md:flex items-center space-x-4">
                            <div className="text-right">
                                <p className="text-xs text-gray-500">Active Users</p>
                                <p className="text-sm font-semibold">{activeUsersCount}</p>
                            </div>
                            <div className="h-8 w-px bg-gray-200"></div>
                            <div className="text-right">
                                <p className="text-xs text-gray-500">Total Deposited</p>
                                <p className="text-sm font-semibold">${totalDeposited?.toLocaleString()}</p>
                            </div>
                        </div>

                        {/* User Profile */}
                        <div className="flex items-center space-x-3">
                            <div className="text-right hidden md:block">
                                <p className="text-sm font-medium text-gray-900">{user?.name || 'Admin User'}</p>
                                <p className="text-xs text-gray-500">{user?.email || 'admin@evault.com'}</p>
                            </div>
                            <div className="relative">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4AF37] to-gray-800 flex items-center justify-center shadow-lg">
                                    <ShieldCheckIcon className="w-5 h-5 text-white" />
                                </div>
                                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-4 sm:p-6 lg:p-3 overflow-y-auto">
                    {/* Decorative background elements */}
                    <div className="fixed inset-0 -z-10 overflow-hidden">
                        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-[#D4AF37]/5 to-transparent rounded-full blur-3xl"></div>
                        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-[#FFD700]/5 to-transparent rounded-full blur-3xl"></div>
                    </div>

                    {/* Content Container */}
                    <div className="max-w-7xl mx-auto">
                        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                            <div className="p-6">
                                <Outlet />
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;