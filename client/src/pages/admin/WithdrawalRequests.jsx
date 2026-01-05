import React, { useState, useEffect } from 'react';
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
    ArrowDownTrayIcon,
    CheckCircleIcon,
    XCircleIcon,
    ExclamationTriangleIcon,
    DocumentDuplicateIcon,
    ArrowTrendingDownIcon
} from '@heroicons/react/24/solid';
import {
    BanknotesIcon,
    ChartBarIcon,
    FireIcon
} from '@heroicons/react/24/outline';
import api from '../../api/axios';

const WithdrawalRequests = () => {
    // Keep actions from context
    const { approveWithdrawal, rejectWithdrawal } = useCrypto();

    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [methodFilter, setMethodFilter] = useState('all');
    const [currentPendingPage, setCurrentPendingPage] = useState(1);
    const [currentHistoryPage, setCurrentHistoryPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [copiedAddress, setCopiedAddress] = useState('');

    // Fetch withdrawals from API
    const fetchWithdrawals = async () => {
        setLoading(true);
        try {
            const { data } = await api.get('/transactions/admin', {
                params: { search: searchTerm }
            });
            // Filter only withdrawals just to be safe, though usage in context implies /admin endpoint might return all types?
            // transactionController.getAdminTransactions returns ALL transactions. 
            // We need to filter by type === 'Withdrawal' if the endpoint returns deposits too.
            // Looking at getAdminTransactions code: `Transaction.find(query)`.
            // Context code: `setWithdrawalRequests(txReqRes.data.filter(t => t.type === 'Withdrawal'));`
            // So YES, we must filter.
            // But wait, if we search, we might get matching deposits too.
            // If the user only wants to search withdrawals, we should probably add `type: 'Withdrawal'` to the backend query OR filter here.
            // Filtering here is safer to match existing logic.
            const withdrawalData = data.filter(tx => tx.type === 'Withdrawal');
            setRequests(withdrawalData);

            setCurrentPendingPage(1);
            setCurrentHistoryPage(1);
        } catch (error) {
            console.error("Failed to fetch withdrawals", error);
        } finally {
            setLoading(false);
        }
    };

    // Copy address to clipboard
    const copyToClipboard = (text) => {
        if (!text) return;
        navigator.clipboard.writeText(text);
        setCopiedAddress(text);
        setTimeout(() => setCopiedAddress(''), 2000);
    };

    // Filter requests based on filters (Search is done via API)
    const filteredRequests = requests.filter(req => {
        // Search matches are returned by API.
        // But we still filter by Status and Method locally.
        const matchesStatus = statusFilter === 'all' || req.status === statusFilter;
        const matchesMethod = methodFilter === 'all' || req.method === methodFilter;

        return matchesStatus && matchesMethod;
    });

    const pendingRequests = filteredRequests.filter(req => req.status === 'Pending');
    const historyRequests = filteredRequests.filter(req => req.status !== 'Pending')
        .sort((a, b) => new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt));

    // Pagination calculations
    const pendingPages = Math.ceil(pendingRequests.length / itemsPerPage);
    const historyPages = Math.ceil(historyRequests.length / itemsPerPage);

    const indexOfLastPending = currentPendingPage * itemsPerPage;
    const indexOfFirstPending = indexOfLastPending - itemsPerPage;
    const currentPending = pendingRequests.slice(indexOfFirstPending, indexOfLastPending);

    const indexOfLastHistory = currentHistoryPage * itemsPerPage;
    const indexOfFirstHistory = indexOfLastHistory - itemsPerPage;
    const currentHistory = historyRequests.slice(indexOfFirstHistory, indexOfLastHistory);

    // Format date
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
    const approvedCount = historyRequests.filter(req => req.status === 'Approved').length;
    const rejectedCount = historyRequests.filter(req => req.status === 'Rejected').length;
    const sosCount = pendingRequests.filter(req => req.isSos).length;

    useEffect(() => {
        fetchWithdrawals()
    }, [searchTerm])

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
                        <div className="px-3 py-1.5 bg-red-100 text-red-700 rounded-lg text-xs font-semibold">
                            Pending: {pendingRequests.length}
                        </div>
                        <div className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-xs font-semibold">
                            History: {historyRequests.length}
                        </div>
                        {sosCount > 0 && (
                            <div className="px-3 py-1.5 bg-gradient-to-r from-red-100 to-orange-100 text-red-700 rounded-lg text-xs font-semibold animate-pulse">
                                SOS: {sosCount}
                            </div>
                        )}
                    </div>
                    <div className="text-gray-500">
                        Total Results: {filteredRequests.length}
                    </div>
                </div>
            </div>

            {/* Pending Withdrawals Section */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                            <div className="p-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl">
                                <ArrowDownTrayIcon className="w-5 h-5 text-white" />
                            </div>
                            Pending Withdrawals
                            <span className="ml-2 px-3 py-1 bg-gradient-to-r from-red-100 to-orange-100 text-red-700 rounded-full text-sm font-bold">
                                {pendingRequests.length} Requests
                            </span>
                        </h1>
                        <p className="text-gray-500 mt-1">Review and approve pending withdrawal requests</p>
                    </div>
                </div>

                {currentPending.length === 0 ? (
                    <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl border-2 border-dashed border-gray-200 p-12 text-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircleIcon className="w-8 h-8 text-green-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-1">All Clear!</h3>
                        <p className="text-gray-500">No pending withdrawal requests at the moment.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {currentPending.map(req => (
                            <div
                                key={req._id}
                                className={`bg-white rounded-2xl shadow-lg border-2 overflow-hidden transition-all duration-300 hover:shadow-xl group ${req.isSos
                                    ? 'border-red-200 animate-pulse border-dashed'
                                    : 'border-gray-200 hover:border-gray-300'
                                    }`}
                            >
                                <div className="p-6">
                                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                                        {/* Left Section */}
                                        <div className="flex-1">
                                            <div className="flex items-center flex-wrap gap-3 mb-4">
                                                <div className={`px-3 py-1 rounded-full text-xs font-bold ${req.isSos
                                                    ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white animate-pulse'
                                                    : 'bg-gradient-to-r from-gray-500 to-gray-700 text-white'
                                                    }`}>
                                                    {req.isSos ? 'SOS REQUEST' : 'STANDARD'}
                                                </div>
                                                <div className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-mono font-bold">
                                                    #{req._id.slice(-8)}
                                                </div>
                                                <div className="text-sm text-gray-500 flex items-center gap-1">
                                                    <CalendarIcon className="w-3 h-3" />
                                                    {formatDate(req.date || req.createdAt)}
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-4 mb-4">
                                                <div className="flex items-center gap-2">
                                                    <div className={`p-3 rounded-xl ${req.isSos
                                                        ? 'bg-gradient-to-r from-red-50 to-orange-50'
                                                        : 'bg-gradient-to-r from-gray-50 to-gray-100'
                                                        }`}>
                                                        <CurrencyDollarIcon className={`w-6 h-6 ${req.isSos ? 'text-red-500' : 'text-gray-600'}`} />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-gray-500">Amount</p>
                                                        <h3 className={`text-3xl font-bold ${req.isSos ? 'text-red-600' : 'text-gray-900'}`}>
                                                            ${req.amount}
                                                        </h3>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    <div className="p-2 bg-gray-100 rounded-lg">
                                                        <BanknotesIcon className="w-4 h-4 text-gray-600" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-gray-500">Method</p>
                                                        <span className={`text-sm font-bold ${req.method === 'USDT' ? 'text-green-600' :
                                                            req.method === 'BTC' ? 'text-yellow-600' :
                                                                req.method === 'ETH' ? 'text-purple-600' :
                                                                    'text-pink-600'
                                                            }`}>
                                                            {req.method}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-3">
                                                <div className="flex items-center gap-2">
                                                    <WalletIcon className="w-4 h-4 text-gray-400" />
                                                    <span className="text-sm text-gray-500">Destination Address:</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <div className="flex-1 bg-gray-50 rounded-xl p-3 border border-gray-200">
                                                        <div className="flex items-center justify-between">
                                                            <span className="text-sm font-mono text-gray-700 truncate">
                                                                {req.address}
                                                            </span>
                                                            <button
                                                                onClick={() => copyToClipboard(req.address)}
                                                                className="p-1.5 text-gray-400 hover:text-[#D4AF37] hover:bg-gray-100 rounded-lg transition-colors"
                                                                title="Copy address"
                                                            >
                                                                <DocumentDuplicateIcon className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                        {copiedAddress === req.address && (
                                                            <div className="text-xs text-green-600 mt-1 font-medium animate-fade-in">
                                                                ✓ Copied to clipboard
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                        {/* Right Section - Actions */}
                                        <div className="lg:w-48 space-y-3">
                                            <div className="mt-4 flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center text-white font-bold">
                                                    {req.user?.name?.charAt(0) || 'U'}
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-500">Requested by</p>
                                                    <p className="font-semibold text-gray-900">{req.user?.name || req.user}</p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => approveWithdrawal(req._id)}
                                                className="w-full px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 font-semibold text-sm"
                                            >
                                                <CheckIcon className="w-5 h-5" />
                                                Approve Withdrawal
                                            </button>
                                            <button
                                                onClick={() => rejectWithdrawal(req._id)}
                                                className="w-full px-4 py-3 bg-gradient-to-r from-white to-gray-50 border-2 border-red-200 text-red-600 rounded-xl hover:bg-red-50 hover:border-red-300 transition-all duration-300 flex items-center justify-center gap-2 font-semibold text-sm"
                                            >
                                                <XMarkIcon className="w-5 h-5" />
                                                Reject Request
                                            </button>
                                            {req.isSos && (
                                                <div className="flex items-center gap-2 text-xs text-red-600 bg-red-50 p-2 rounded-lg border border-red-200">
                                                    <ExclamationTriangleIcon className="w-4 h-4 flex-shrink-0" />
                                                    <span>Emergency withdrawal request</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Status Bar */}
                                <div className={`h-1 w-full ${req.isSos
                                    ? 'bg-gradient-to-r from-red-500 to-orange-500'
                                    : 'bg-gradient-to-r from-gray-500 to-gray-700'
                                    }`}></div>
                            </div>
                        ))}

                        {/* Pending Pagination */}
                        {pendingPages > 1 && (
                            <div className="bg-white rounded-xl border border-gray-200 p-4">
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
                                                        ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white'
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

            {/* Withdrawal History Section */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                            <div className="p-2 bg-gradient-to-r from-gray-500 to-gray-700 rounded-xl">
                                <ChartBarIcon className="w-5 h-5 text-white" />
                            </div>
                            Withdrawal History
                            <span className="ml-2 px-3 py-1 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-full text-sm font-bold">
                                {historyRequests.length} Records
                            </span>
                        </h2>
                        <p className="text-gray-500 mt-1">View all processed withdrawal requests</p>
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
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">To Address</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {currentHistory.length > 0 ? currentHistory.map(req => (
                                    <tr key={req._id} className="hover:bg-gray-50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="font-mono text-sm bg-gray-100 rounded-lg px-3 py-1.5 inline-block text-gray-700 font-bold">
                                                #{req._id.slice(-8)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-full bg-gradient-to-r from-gray-500 to-gray-700 flex items-center justify-center text-white font-bold">
                                                    {req.user?.name?.charAt(0) || 'U'}
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-gray-900">{req.user?.name || req.user}</div>
                                                    <div className="text-xs text-gray-500">Withdrawer</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <CurrencyDollarIcon className="w-4 h-4 text-red-500" />
                                                <span className="text-lg font-bold text-gray-900">${req.amount}</span>
                                                <span className={`px-2 py-0.5 text-xs font-bold rounded ${req.method === 'USDT' ? 'bg-green-100 text-green-700' :
                                                    req.method === 'BTC' ? 'bg-yellow-100 text-yellow-700' :
                                                        req.method === 'ETH' ? 'bg-purple-100 text-purple-700' :
                                                            'bg-pink-100 text-pink-700'
                                                    }`}>
                                                    {req.method}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="text-sm font-mono text-gray-600 truncate max-w-[180px]">
                                                    {req.address}
                                                </div>
                                                <button
                                                    onClick={() => copyToClipboard(req.address)}
                                                    className="p-1 text-gray-400 hover:text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-all"
                                                    title="Copy address"
                                                >
                                                    <DocumentDuplicateIcon className="w-3 h-3" />
                                                </button>
                                            </div>
                                            {copiedAddress === req.address && (
                                                <div className="text-xs text-green-600 mt-1 font-medium animate-fade-in">
                                                    ✓ Copied to clipboard
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-900">{formatDate(req.date || req.createdAt)}</div>
                                            <div className="text-xs text-gray-500">Processed</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center justify-center gap-1 w-24 ${req.status === 'Approved'
                                                ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700'
                                                : req.status === 'Rejected'
                                                    ? 'bg-gradient-to-r from-red-100 to-rose-100 text-red-700'
                                                    : 'bg-gray-100 text-gray-700'
                                                }`}>
                                                {req.status === 'Approved' ? (
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
                                                    <ChartBarIcon className="w-8 h-8 text-gray-400" />
                                                </div>
                                                <h3 className="text-lg font-medium text-gray-900 mb-1">No history found</h3>
                                                <p className="text-gray-500">No withdrawal history records available</p>
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
                                                    ? 'bg-gradient-to-r from-gray-500 to-gray-700 text-white'
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

export default WithdrawalRequests;