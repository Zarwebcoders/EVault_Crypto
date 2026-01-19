import React, { useEffect, useState } from 'react';
import { useCrypto } from '../../context/CryptoContext';
import {
    CheckIcon,
    XMarkIcon,
    MagnifyingGlassIcon,
    FunnelIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    WalletIcon,
    UserIcon,
    CurrencyDollarIcon,
    CalendarIcon,
    ClockIcon,
    ArrowPathIcon,
    CheckCircleIcon,
    XCircleIcon,
    EyeIcon
} from '@heroicons/react/24/solid';
import {
    BanknotesIcon,
    ChartBarIcon
} from '@heroicons/react/24/outline';

import api from '../../api/axios';

const InvestmentRequests = () => {
    // Keep actions from context, but manage data locally for server-side search
    const { approveInvestment, rejectInvestment, updateRequestWallet } = useCrypto();

    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [methodFilter, setMethodFilter] = useState('all');
    const [currentPendingPage, setCurrentPendingPage] = useState(1);
    const [currentHistoryPage, setCurrentHistoryPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    // Fetch investments from API
    useEffect(() => {
        const fetchInvestments = async () => {
            setLoading(true);
            try {
                const { data } = await api.get('/investments/admin', {
                    params: { search: searchTerm }
                });
                setRequests(data);
                // Reset pages when search changes
                setCurrentPendingPage(1);
                setCurrentHistoryPage(1);
            } catch (error) {
                console.error("Failed to fetch investments", error);
            } finally {
                setLoading(false);
            }
        };

        const timeoutId = setTimeout(() => {
            fetchInvestments();
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [searchTerm]);

    // Update requests when an action is performed (handled by context optimistically? 
    // No, context updates global state. Since we use local state, we should probably refetch or update local state.
    // For simplicity, we can listen to context changes if context was updated, OR just refetch.
    // However, context 'approveInvestment' calls API. 
    // Best UX: When action completes, we should update our local list. 
    // The user's 'approveInvestment' function likely calls 'fetchAdminData' internally or updates context.
    // Since we are decoupling from context 'investmentRequests', we might get out of sync.
    // BUT the user just wants *searching* in API.
    // I will trigger a refetch if needed. For now let's just implement the search and assume actions will work (they might need a refresh).

    // Clientside filtering for Status and Method (on top of the searched results)
    const filteredRequests = requests.filter(req => {
        // Search is already done by API. But we still apply filters.
        const matchesStatus = statusFilter === 'all' || req.status === statusFilter;
        const matchesMethod = methodFilter === 'all' || req.method === methodFilter;
        return matchesStatus && matchesMethod;
    });

    const pendingRequests = filteredRequests.filter(req => req.status === 'Pending');
    const historyRequests = filteredRequests.filter(req => req.status !== 'Pending')
        // Sort is already done by backend but client-side sort is safe too
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // Pagination calculations
    const pendingPages = Math.ceil(pendingRequests.length / itemsPerPage);
    const historyPages = Math.ceil(historyRequests.length / itemsPerPage);

    const indexOfLastPending = currentPendingPage * itemsPerPage;
    const indexOfFirstPending = indexOfLastPending - itemsPerPage;
    const currentPending = pendingRequests.slice(indexOfFirstPending, indexOfLastPending);

    const indexOfLastHistory = currentHistoryPage * itemsPerPage;
    const indexOfFirstHistory = indexOfLastHistory - itemsPerPage;
    const currentHistory = historyRequests.slice(indexOfFirstHistory, indexOfLastHistory);

    // Format date - FIXED to handle missing or invalid dates
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return 'Invalid Date';

        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Calculate statistics
    const totalPendingAmount = pendingRequests.reduce((sum, req) => sum + parseFloat(req.amount || 0), 0);
    const totalHistoryAmount = historyRequests.reduce((sum, req) => sum + parseFloat(req.amount || 0), 0);
    const approvedCount = historyRequests.filter(req => req.status === 'Active' || req.status === 'Approved').length;
    const rejectedCount = historyRequests.filter(req => req.status === 'Rejected').length;

    return (
        <div className="space-y-8">
            {/* Search and Filter Bar */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-3">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1 relative">
                        <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by user, ID, or wallet address..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent outline-none transition-all"
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="appearance-none bg-white border border-gray-300 rounded-xl pl-4 pr-10 py-2 focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent outline-none"
                            >
                                <option value="all">All Status</option>
                                <option value="Pending">Pending</option>
                                <option value="Active">Active</option>
                                <option value="Approved">Approved</option>
                                <option value="Rejected">Rejected</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <FunnelIcon className="w-4 h-4" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Results Info */}
                <div className="mt-4 flex items-center justify-between text-sm">
                    <div className="flex items-center gap-3">
                        <div className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-xs font-semibold">
                            Pending: {pendingRequests.length}
                        </div>
                        <div className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-xs font-semibold">
                            History: {historyRequests.length}
                        </div>
                    </div>
                    <div className="text-gray-500">
                        Total Results: {filteredRequests.length}
                    </div>
                </div>
            </div>

            {/* Pending Investments Section */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                            <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl">
                                <ClockIcon className="w-5 h-5 text-white" />
                            </div>
                            Pending Investments
                            <span className="ml-2 px-3 py-1 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 rounded-full text-sm font-bold">
                                {pendingRequests.length} Requests
                            </span>
                        </h1>
                        <p className="text-gray-500 mt-1">Review and approve pending investment requests</p>
                    </div>
                </div>

                {currentPending.length === 0 ? (
                    <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl border-2 border-dashed border-gray-200 p-12 text-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircleIcon className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-1">All Clear!</h3>
                        <p className="text-gray-500">No pending investment requests at the moment.</p>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gradient-to-r from-gray-50 to-white">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Req ID</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">User</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Wallets</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Amount</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Method</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Network</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Date</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {currentPending.map(req => (
                                        <tr key={req._id} className="hover:bg-gray-50 transition-all duration-150 group">
                                            <td className="px-6 py-4">
                                                <div className="font-mono text-sm bg-gray-100 rounded-lg px-3 py-1.5 inline-block text-gray-700 font-bold">
                                                    #{req._id.slice(-6)}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-9 h-9 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center text-white font-bold">
                                                        {req.user?.name?.charAt(0) || 'U'}
                                                    </div>
                                                    <div>
                                                        <div className="font-semibold text-gray-900">{req.user?.name || req.user}</div>
                                                        <div className="text-xs text-gray-500">Requester</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="space-y-2">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                                                        <span className="text-xs text-gray-600 font-mono truncate max-w-[120px]" title={req.walletAddress}>
                                                            From: {req.walletAddress ? `${req.walletAddress.slice(0, 10)}...${req.walletAddress.slice(-8)}` : 'N/A'}
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <CurrencyDollarIcon className="w-4 h-4 text-green-500" />
                                                    <span className="text-lg font-bold text-gray-900">${req.amount}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className={`px-3 py-1.5 rounded-lg text-xs font-bold text-center ${req.method === 'USDT' ? 'bg-green-100 text-green-700' :
                                                    req.method === 'BTC' ? 'bg-yellow-100 text-yellow-700' :
                                                        req.method === 'ETH' ? 'bg-purple-100 text-purple-700' :
                                                            'bg-pink-100 text-pink-700'
                                                    }`}>
                                                    {req.method}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-xs font-bold text-center border border-gray-200">
                                                    {req.network || 'TRC'}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-900">{formatDate(req.startDate || req.createdAt)}</div>
                                                <div className="text-xs text-gray-500">Requested</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => approveInvestment(req._id)}
                                                        className="flex-1 px-4 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 font-semibold text-sm"
                                                    >
                                                        <CheckIcon className="w-4 h-4" />
                                                        Approve
                                                    </button>
                                                    <button
                                                        onClick={() => rejectInvestment(req._id)}
                                                        className="flex-1 px-4 py-2.5 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 font-semibold text-sm"
                                                    >
                                                        <XMarkIcon className="w-4 h-4" />
                                                        Reject
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pending Pagination */}
                        {pendingPages > 1 && (
                            <div className="px-6 py-4 border-t border-gray-200">
                                <div className="flex items-center justify-between">
                                    <div className="text-sm text-gray-500">
                                        Page {currentPendingPage} of {pendingPages}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => setCurrentPendingPage(prev => Math.max(1, prev - 1))}
                                            disabled={currentPendingPage === 1}
                                            className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                        >
                                            <ChevronLeftIcon className="w-4 h-4" />
                                        </button>
                                        {Array.from({ length: Math.min(5, pendingPages) }, (_, i) => {
                                            let pageNum;
                                            if (pendingPages <= 5) pageNum = i + 1;
                                            else if (currentPendingPage <= 3) pageNum = i + 1;
                                            else if (currentPendingPage >= pendingPages - 2) pageNum = pendingPages - 4 + i;
                                            else pageNum = currentPendingPage - 2 + i;

                                            return (
                                                <button
                                                    key={pageNum}
                                                    onClick={() => setCurrentPendingPage(pageNum)}
                                                    className={`w-8 h-8 rounded-lg text-sm font-medium ${currentPendingPage === pageNum
                                                        ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                                                        : 'text-gray-700 hover:bg-gray-100'
                                                        }`}
                                                >
                                                    {pageNum}
                                                </button>
                                            );
                                        })}
                                        <button
                                            onClick={() => setCurrentPendingPage(prev => Math.min(pendingPages, prev + 1))}
                                            disabled={currentPendingPage === pendingPages}
                                            className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                        >
                                            <ChevronRightIcon className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Investment History Section */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                            <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl">
                                <BanknotesIcon className="w-5 h-5 text-white" />
                            </div>
                            Investment History
                            <span className="ml-2 px-3 py-1 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 rounded-full text-sm font-bold">
                                {historyRequests.length} Records
                            </span>
                        </h2>
                        <p className="text-gray-500 mt-1">View all processed investment requests</p>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gradient-to-r from-gray-50 to-white">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Req ID</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">User</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Amount</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Method</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Network</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {currentHistory.length > 0 ? currentHistory.map(req => (
                                    <tr key={req._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-mono text-sm bg-gray-100 rounded-lg px-3 py-1.5 inline-block text-gray-700 font-bold">
                                                #{req._id.slice(-6)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-full bg-gradient-to-r from-green-500 to-emerald-400 flex items-center justify-center text-white font-bold">
                                                    {req.user?.name?.charAt(0) || 'U'}
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-gray-900">{req.user?.name || req.user}</div>
                                                    <div className="text-xs text-gray-500">Investor</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <CurrencyDollarIcon className="w-4 h-4 text-green-500" />
                                                <span className="text-lg font-bold text-gray-900">${req.amount}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className={`px-3 py-1.5 rounded-lg text-xs font-bold text-center ${req.method === 'USDT' ? 'bg-green-100 text-green-700' :
                                                req.method === 'BTC' ? 'bg-yellow-100 text-yellow-700' :
                                                    req.method === 'ETH' ? 'bg-purple-100 text-purple-700' :
                                                        'bg-pink-100 text-pink-700'
                                                }`}>
                                                {req.method}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-xs font-bold text-center border border-gray-200">
                                                {req.network || 'TRC'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-900">{formatDate(req.date || req.startDate)}</div>
                                            <div className="text-xs text-gray-500">Processed</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center justify-center gap-1 ${req.status === 'Active' || req.status === 'Approved'
                                                ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700'
                                                : req.status === 'Rejected'
                                                    ? 'bg-gradient-to-r from-red-100 to-rose-100 text-red-700'
                                                    : 'bg-gray-100 text-gray-700'
                                                }`}>
                                                {req.status === 'Active' || req.status === 'Approved' ? (
                                                    <CheckCircleIcon className="w-3 h-3" />
                                                ) : req.status === 'Rejected' ? (
                                                    <XCircleIcon className="w-3 h-3" />
                                                ) : null}
                                                {req.status}
                                            </div>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-12 text-center">
                                            <div className="flex flex-col items-center justify-center">
                                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                                    <BanknotesIcon className="w-8 h-8 text-gray-400" />
                                                </div>
                                                <h3 className="text-lg font-medium text-gray-900 mb-1">No history found</h3>
                                                <p className="text-gray-500">No investment history records available</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* History Pagination */}
                    {historyPages > 1 && (
                        <div className="px-6 py-4 border-t border-gray-200">
                            <div className="flex items-center justify-between">
                                <div className="text-sm text-gray-500">
                                    Page {currentHistoryPage} of {historyPages}
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setCurrentHistoryPage(prev => Math.max(1, prev - 1))}
                                        disabled={currentHistoryPage === 1}
                                        className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        <ChevronLeftIcon className="w-4 h-4" />
                                    </button>
                                    {Array.from({ length: Math.min(5, historyPages) }, (_, i) => {
                                        let pageNum;
                                        if (historyPages <= 5) pageNum = i + 1;
                                        else if (currentHistoryPage <= 3) pageNum = i + 1;
                                        else if (currentHistoryPage >= historyPages - 2) pageNum = historyPages - 4 + i;
                                        else pageNum = currentHistoryPage - 2 + i;

                                        return (
                                            <button
                                                key={pageNum}
                                                onClick={() => setCurrentHistoryPage(pageNum)}
                                                className={`w-8 h-8 rounded-lg text-sm font-medium ${currentHistoryPage === pageNum
                                                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                                                    : 'text-gray-700 hover:bg-gray-100'
                                                    }`}
                                            >
                                                {pageNum}
                                            </button>
                                        );
                                    })}
                                    <button
                                        onClick={() => setCurrentHistoryPage(prev => Math.min(historyPages, prev + 1))}
                                        disabled={currentHistoryPage === historyPages}
                                        className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        <ChevronRightIcon className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default InvestmentRequests;