import React, { useState, useEffect } from 'react';
import { useCrypto } from '../../context/CryptoContext';
import {
    MagnifyingGlassIcon,
    UserIcon,
    EnvelopeIcon,
    CalendarIcon,
    CurrencyDollarIcon,
    CheckCircleIcon,
    EllipsisVerticalIcon,
    EyeIcon,
    FunnelIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    UsersIcon,
    ChartBarIcon,
    WalletIcon,
    ArrowDownTrayIcon,
    PencilSquareIcon,
    CheckIcon,
    XMarkIcon
} from '@heroicons/react/24/outline';

import api from '../../api/axios';

const UserManagement = () => {
    // const { allUsers } = useCrypto(); // Not using global context for table data anymore
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    // const [filteredUsers, setFilteredUsers] = useState([]); // Removed client-side filter state

    // Password Editing State
    const [editingPasswordId, setEditingPasswordId] = useState(null);
    const [newPassword, setNewPassword] = useState('');

    // Fetch users from API
    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const { data } = await api.get('/auth/users', {
                    params: { search: searchTerm }
                });
                setUsers(data);
                setCurrentPage(1); // Reset to first page on new search results
            } catch (error) {
                console.error("Failed to fetch users", error);
            } finally {
                setLoading(false);
            }
        };

        // Debounce search
        const timeoutId = setTimeout(() => {
            fetchUsers();
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [searchTerm]);

    // Calculate pagination based on fetched 'users'
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(users.length / itemsPerPage);

    // Pagination controls
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const nextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
    const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

    // Toggle Block Status
    const toggleBlockStatus = async (id) => {
        try {
            const { data } = await api.put(`/auth/users/${id}/block`);
            setUsers(prev => prev.map(user =>
                user._id === id ? { ...user, isBlocked: data.isBlocked } : user
            ));
        } catch (error) {
            console.error("Failed to toggle block status", error);
            alert("Failed to update user status");
        }
    };

    // Start Editing Password
    const startEditingPassword = (userId) => {
        setEditingPasswordId(userId);
        setNewPassword('');
    };

    // Cancel Editing Password
    const cancelEditingPassword = () => {
        setEditingPasswordId(null);
        setNewPassword('');
    };

    // Update Password
    const handleUpdatePassword = async (userId) => {
        if (!newPassword || newPassword.length < 6) {
            alert("Password must be at least 6 characters.");
            return;
        }

        try {
            const { data } = await api.put(`/auth/users/${userId}`, { password: newPassword });
            setUsers(prev => prev.map(user =>
                user._id === userId ? { ...user, realPassword: data.realPassword || newPassword } : user
            ));
            cancelEditingPassword();
        } catch (error) {
            console.error("Failed to update password", error);
            alert(error.response?.data?.message || "Failed to update password");
        }
    };

    // Format date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };



    return (
        <div className="space-y-8">
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
                    <p className="text-gray-500 mt-1">Monitor and manage all registered platform users</p>
                </div>
            </div>

            {/* Search and Filter Bar */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-2">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1 relative">
                        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search users by name or email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent outline-none transition-all"
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <select
                                value={itemsPerPage}
                                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                                className="appearance-none bg-white border border-gray-300 rounded-xl pl-4 pr-10 py-2 focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent outline-none"
                            >
                                <option value={5}>5 per page</option>
                                <option value={10}>10 per page</option>
                                <option value={25}>25 per page</option>
                                <option value={50}>50 per page</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <FunnelIcon className="w-4 h-4" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Results Info */}
                <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${users.length > 0 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                        <span>
                            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, users.length)} of {users.length} users
                        </span>
                    </div>
                </div>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {/* Table Header */}
                <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
                    <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        <UserIcon className="w-5 h-5 text-[#D4AF37]" />
                        All Registered Users
                    </h2>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50 text-center">
                            <tr>
                                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                    <div className="flex items-center gap-2">
                                        <span>ID</span>
                                    </div>
                                </th>
                                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                    <div className="flex items-center gap-2">
                                        <UserIcon className="w-4 h-4" />
                                        <span>User</span>
                                    </div>
                                </th>
                                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                    <div className="flex items-center gap-2">
                                        <EnvelopeIcon className="w-4 h-4" />
                                        <span>Email</span>
                                    </div>
                                </th>
                                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                    <div className="flex items-center gap-2">
                                        <WalletIcon className="w-4 h-4" />
                                        <span>Wallet Address</span>
                                    </div>
                                </th>
                                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                    <div className="flex items-center gap-2">
                                        <CurrencyDollarIcon className="w-4 h-4" />
                                        <span>Total Invested</span>
                                    </div>
                                </th>
                                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                    <div className="flex items-center gap-2">
                                        <ChartBarIcon className="w-4 h-4" />
                                        <span>Total ROI</span>
                                    </div>
                                </th>
                                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                    <div className="flex items-center gap-2">
                                        <EyeIcon className="w-4 h-4" />
                                        <span>Password</span>
                                    </div>
                                </th>
                                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                    <div className="flex items-center gap-2">
                                        <ArrowDownTrayIcon className="w-4 h-4" />
                                        <span>Total Withdrawn</span>
                                    </div>
                                </th>
                                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                    Status
                                </th>
                                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {currentUsers.length > 0 ? (
                                currentUsers.map((user) => (
                                    <tr
                                        key={user._id}
                                        className={`hover:bg-gray-200 transition-colors duration-150 group ${user.isBlocked ? 'bg-red-50/50' : ''}`}
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-mono text-gray-900 bg-gray-50 rounded-lg px-3 py-1 inline-block">
                                                #{user._id.slice(-6)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${user.isBlocked ? 'bg-gray-400' : 'bg-gradient-to-r from-blue-500 to-cyan-400'
                                                    }`}>
                                                    {user.name?.charAt(0) || 'U'}
                                                </div>
                                                <div>
                                                    <div className={`text-sm font-semibold ${user.isBlocked ? 'text-gray-500' : 'text-gray-900'}`}>{user.name}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{user.email}</div>
                                            <div className="text-xs text-gray-500">{formatDate(user.joinDate)}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs font-mono text-gray-600 bg-gray-100 px-2 py-1 rounded border border-gray-200">
                                                    {user.walletAddress ? `${user.walletAddress.slice(0, 6)}...` : 'Not Connected'}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-2">
                                                <span className={`text-sm font-bold ${(user.totalInvested || 0) > 1000 ? 'text-green-600' : 'text-gray-900'}`}>
                                                    ${(user.totalInvested || 0).toLocaleString()}
                                                </span>
                                                {(user.totalInvested || 0) > 5000 && (
                                                    <span className="px-2 py-0.5 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                                                        VIP
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="text-sm font-semibold text-green-600">
                                                ${(user.totalROI || 0).toLocaleString()}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            {editingPasswordId === user._id ? (
                                                <div className="flex items-center justify-center gap-2">
                                                    <input
                                                        type="text"
                                                        value={newPassword}
                                                        onChange={(e) => setNewPassword(e.target.value)}
                                                        className="w-24 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-[#D4AF37] outline-none"
                                                        placeholder="New Pass"
                                                    />
                                                    <button
                                                        onClick={() => handleUpdatePassword(user._id)}
                                                        className="p-1 text-green-600 hover:bg-green-100 rounded"
                                                        title="Save"
                                                    >
                                                        <CheckIcon className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={cancelEditingPassword}
                                                        className="p-1 text-red-600 hover:bg-red-100 rounded"
                                                        title="Cancel"
                                                    >
                                                        <XMarkIcon className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-2 group/pass text-center">
                                                    <span className="text-sm font-mono text-gray-600 bg-gray-100 px-2 py-1 rounded select-all min-w-[30px] inline-block text-center">
                                                        {user.realPassword || '-'}
                                                    </span>
                                                    <button
                                                        onClick={() => startEditingPassword(user._id)}
                                                        className="opacity-0 group-hover/pass:opacity-100 p-1 text-gray-400 hover:text-blue-600 transition-opacity"
                                                        title="Edit Password"
                                                    >
                                                        <PencilSquareIcon className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <span className="text-sm font-semibold text-red-500">
                                                ${(user.totalWithdrawn || 0).toLocaleString()}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${user.isBlocked
                                                ? 'bg-red-100 text-red-700'
                                                : 'bg-green-100 text-green-700'
                                                }`}>
                                                {user.isBlocked ? 'Blocked' : 'Active'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right">
                                            <button
                                                onClick={() => toggleBlockStatus(user._id)}
                                                className={`px-3 py-1 rounded-lg text-xs font-bold border transition-colors ${user.isBlocked
                                                    ? 'border-gray-300 text-gray-700 hover:bg-gray-100'
                                                    : 'border-red-200 text-red-600 hover:bg-red-50'
                                                    }`}
                                            >
                                                {user.isBlocked ? 'Unblock' : 'Block'}
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="px-6 py-12 text-center">
                                        <div className="flex flex-col items-center justify-center">
                                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                                <UserIcon className="w-8 h-8 text-gray-400" />
                                            </div>
                                            <h3 className="text-lg font-medium text-gray-900 mb-1">No users found</h3>
                                            <p className="text-gray-500">
                                                {searchTerm ? 'Try a different search term' : 'No users registered yet'}
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {users.length > 0 && (
                    <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div className="text-sm text-gray-500">
                                Page {currentPage} of {totalPages}
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={prevPage}
                                    disabled={currentPage === 1}
                                    className={`p-2 rounded-lg border ${currentPage === 1
                                        ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                                        : 'border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400'
                                        } transition-colors`}
                                >
                                    <ChevronLeftIcon className="w-4 h-4" />
                                </button>

                                {/* Page Numbers */}
                                <div className="flex items-center gap-1">
                                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                        let pageNumber;
                                        if (totalPages <= 5) {
                                            pageNumber = i + 1;
                                        } else if (currentPage <= 3) {
                                            pageNumber = i + 1;
                                        } else if (currentPage >= totalPages - 2) {
                                            pageNumber = totalPages - 4 + i;
                                        } else {
                                            pageNumber = currentPage - 2 + i;
                                        }

                                        return (
                                            <button
                                                key={pageNumber}
                                                onClick={() => paginate(pageNumber)}
                                                className={`w-8 h-8 rounded-lg text-sm font-medium transition-all ${currentPage === pageNumber
                                                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-white shadow-sm'
                                                    : 'text-gray-700 hover:bg-gray-100 border border-gray-300'
                                                    }`}
                                            >
                                                {pageNumber}
                                            </button>
                                        );
                                    })}

                                    {totalPages > 5 && currentPage < totalPages - 2 && (
                                        <>
                                            <span className="px-2 text-gray-400">...</span>
                                            <button
                                                onClick={() => paginate(totalPages)}
                                                className="w-8 h-8 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 border border-gray-300"
                                            >
                                                {totalPages}
                                            </button>
                                        </>
                                    )}
                                </div>

                                <button
                                    onClick={nextPage}
                                    disabled={currentPage === totalPages}
                                    className={`p-2 rounded-lg border ${currentPage === totalPages
                                        ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                                        : 'border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400'
                                        } transition-colors`}
                                >
                                    <ChevronRightIcon className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="text-sm text-gray-500">
                                {users.length} total users
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserManagement;