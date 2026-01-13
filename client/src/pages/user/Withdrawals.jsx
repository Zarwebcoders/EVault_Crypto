import React, { useEffect, useState } from 'react';
import { useCrypto } from '../../context/CryptoContext';
import {
    PaperAirplaneIcon,
    WalletIcon,
    CurrencyDollarIcon,
    ExclamationTriangleIcon,
    ClockIcon,
    CheckCircleIcon,
    XCircleIcon,
    ArrowPathIcon
} from '@heroicons/react/24/outline';

const Withdrawals = () => {
    const { user, withdrawals, investments, requestWithdrawal, roiRates, addFunds, loading, fetchUserData } = useCrypto();

    const [amount, setAmount] = useState('');
    const [method, setMethod] = useState('USDT');
    const [walletAddress, setWalletAddress] = useState('');
    const [isSos, setIsSos] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        fetchUserData();
    }, []);

    // Helper to calculate max amount
    const handleMaxClick = () => {
        if (user) setAmount(user.balance.toString());
    };

    if (loading || !user) {
        return (
            <div className="min-h-[400px] flex flex-col items-center justify-center space-y-4">
                <div className="w-12 h-12 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
                <div className="text-gray-500 font-medium animate-pulse">Loading secure data...</div>
            </div>
        );
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!amount || amount <= 0) {
            setError('Please enter a valid amount.');
            return;
        }

        if (amount > user.balance) {
            setError('Insufficient available balance.');
            return;
        }

        if (!walletAddress) {
            setError('Please enter a wallet address.');
            return;
        }

        requestWithdrawal({
            method,
            amount: parseFloat(amount),
            walletAddress,
            isSos
        });

        setSuccess('Withdrawal request submitted for approval!');
        setAmount('');
        setWalletAddress('');
        setIsSos(false); // Reset SOS
        setTimeout(() => setSuccess(''), 3000);
    };

    return (
        <div className="space-y-8 max-w-7xl mx-auto pb-10">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Withdraw Funds</h1>
                    <p className="text-gray-500 mt-1">Manage your payouts and transfer assets securely.</p>
                </div>

                {/* Balance Card */}
                <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-5 rounded-2xl shadow-xl flex items-center justify-between min-w-[300px] border border-gray-700">
                    <div>
                        <p className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-1">Available Balance</p>
                        <p className="text-3xl font-bold text-[#D4AF37]">${user.balance.toFixed(2)}</p>
                    </div>

                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Main Withdrawal Form */}
                <div className="xl:col-span-2 space-y-6">
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">

                        {/* Status Messages */}
                        {error && (
                            <div className="bg-red-50 border-l-4 border-red-500 p-4 mx-8 mt-8 flex items-center gap-3">
                                <ExclamationTriangleIcon className="w-5 h-5 text-red-500" />
                                <span className="text-red-700 text-sm font-medium">{error}</span>
                            </div>
                        )}
                        {success && (
                            <div className="bg-green-50 border-l-4 border-green-500 p-4 mx-8 mt-8 flex items-center gap-3">
                                <CheckCircleIcon className="w-5 h-5 text-green-500" />
                                <span className="text-green-700 text-sm font-medium">{success}</span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="p-8 space-y-8">

                            {/* Method Selection */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-4">Select Asset</label>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                                    {Object.entries(roiRates).map(([token, info]) => {
                                        // Calculate Withdrawable Balance for this Asset
                                        const totalClaimed = investments
                                            .filter(inv => inv.method === token)
                                            .reduce((sum, inv) => sum + (inv.totalClaimed || 0), 0);

                                        const totalWithdrawn = withdrawals
                                            .filter(w => w.method === token && w.status !== 'Rejected')
                                            .reduce((sum, w) => sum + w.amount, 0);

                                        const assetBalance = Math.max(0, totalClaimed - totalWithdrawn);

                                        // Calculate Total Invested (Principal) for SOS
                                        const totalInvested = investments
                                            .filter(inv => inv.method === token)
                                            .reduce((sum, inv) => sum + inv.amount, 0);

                                        return (
                                            <div
                                                key={token}
                                                onClick={() => setMethod(token)}
                                                className={`relative group cursor-pointer rounded-2xl p-4 transition-all duration-300 border ${method === token
                                                    ? 'bg-gray-900 border-gray-900 shadow-lg -translate-y-1'
                                                    : 'bg-white border-gray-200 hover:border-[#D4AF37] hover:shadow-md'
                                                    }`}
                                            >
                                                {method === token && (
                                                    <div className="absolute top-2 right-2 w-2 h-2 bg-[#D4AF37] rounded-full animate-pulse" />
                                                )}
                                                <div className="flex flex-col items-center text-center space-y-3">
                                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold transition-colors ${method === token ? 'bg-[#D4AF37] text-gray-900' : 'bg-gray-100 text-gray-500 group-hover:bg-[#D4AF37]/10 group-hover:text-[#D4AF37]'
                                                        }`}>
                                                        {token[0]}
                                                    </div>
                                                    <div>
                                                        <p className={`font-bold transition-colors ${method === token ? 'text-white' : 'text-gray-700'}`}>{token}</p>
                                                        <p className={`text-xs ${method === token ? 'text-gray-400' : 'text-gray-400'}`}>{info.rate}% {info.period}</p>

                                                        {/* Display Balance (ROI or Principal if SOS) */}
                                                        <div className={`mt-2 text-xs py-1 px-2 rounded font-mono ${method === token ? 'bg-gray-800 text-[#D4AF37]' : 'bg-gray-50 text-gray-600'
                                                            }`}>
                                                            ${isSos ? totalInvested.toFixed(2) : assetBalance.toFixed(2)}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Amount Input */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700 flex justify-between">
                                        <span>Withdrawal Amount</span>
                                        <span className="text-xs text-gray-400">Min: $50.00</span>
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <CurrencyDollarIcon className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="number"
                                            value={amount}
                                            onChange={e => setAmount(e.target.value)}
                                            max={user.balance}
                                            className="block w-full pl-10 pr-16 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all bg-gray-50 focus:bg-white font-medium"
                                            placeholder="0.00"
                                        />
                                        <button
                                            type="button"
                                            onClick={handleMaxClick}
                                            className="absolute inset-y-0 right-0 px-4 text-xs font-bold text-[#D4AF37] hover:text-yellow-600 transition-colors uppercase"
                                        >
                                            Max
                                        </button>
                                    </div>
                                </div>

                                {/* Wallet Address Input */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700">Wallet Address</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <WalletIcon className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            value={walletAddress}
                                            onChange={e => setWalletAddress(e.target.value)}
                                            className="block w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                                            placeholder={`Enter ${method} Address`}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* SOS Feature */}
                            <div className={`relative overflow-hidden rounded-xl border transition-all duration-300 ${isSos ? 'border-red-200 bg-red-50/50' : 'border-gray-200 bg-gray-50'
                                }`}>
                                <div className="p-5 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className={`p-3 rounded-full ${isSos ? 'bg-red-100 text-red-600' : 'bg-gray-200 text-gray-500'}`}>
                                            <ExclamationTriangleIcon className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className={`font-bold ${isSos ? 'text-red-700' : 'text-gray-700'}`}>Emergency SOS Withdrawal</h4>
                                            <p className="text-xs text-gray-500 max-w-sm mt-1">
                                                {isSos ? 'Priority enabled. Request will be flagged for immediate review.' : 'Enable this only for urgent priority processing.'}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Toggle Switch */}
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="sr-only peer"
                                            checked={isSos}
                                            onChange={(e) => setIsSos(e.target.checked)}
                                        />
                                        <div className="w-14 h-7 bg-gray-300 border border-gray-500 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-red-500"></div>
                                    </label>
                                </div>
                                {isSos && (
                                    <div className="h-1 w-full bg-red-100 overflow-hidden">
                                        <div className="h-full bg-red-500 animate-progress-indeterminate"></div>
                                    </div>
                                )}
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className={`w-full group relative py-4 px-6 rounded-xl text-white font-bold shadow-lg transition-all duration-300 overflow-hidden ${isSos
                                    ? 'bg-gradient-to-r from-red-600 to-red-500 hover:shadow-red-200'
                                    : 'bg-gradient-to-r from-gray-900 to-gray-800 hover:shadow-gray-300 hover:-translate-y-1'
                                    }`}
                            >
                                <div className="relative flex items-center justify-center gap-2 z-10">
                                    <PaperAirplaneIcon className={`w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 ${isSos ? '' : 'text-[#D4AF37]'}`} />
                                    <span>{isSos ? 'REQUEST SOS WITHDRAWAL' : 'CONFIRM WITHDRAWAL'}</span>
                                </div>
                            </button>
                        </form>
                    </div>
                </div>

                {/* Side Panel (Info) */}
                <div className="xl:col-span-1">
                    <div className="bg-[#101828] bg-opacity-90 backdrop-blur-lg rounded-3xl p-8 text-white shadow-xl h-full relative overflow-hidden">
                        {/* Decorative Background Circles */}
                        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white opacity-80 mix-blend-overlay"></div>
                        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 rounded-full bg-white opacity-80 mix-blend-overlay"></div>

                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <ClockIcon className="w-6 h-6" />
                            Important Info
                        </h3>

                        <ul className="space-y-6 relative z-10">
                            <li className="flex gap-4">
                                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0 text-sm font-bold">1</div>
                                <p className="text-sm leading-relaxed text-yellow-50">Withdrawals are manually processed within <span className="font-bold text-white">24 hours</span> to ensure security.</p>
                            </li>
                            <li className="flex gap-4">
                                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0 text-sm font-bold">2</div>
                                <p className="text-sm leading-relaxed text-yellow-50">Minimum withdrawal limit is <span className="font-bold text-white">$50.00</span> for all asset types.</p>
                            </li>
                            <li className="flex gap-4">
                                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0 text-sm font-bold">3</div>
                                <p className="text-sm leading-relaxed text-yellow-50">Please double-check your <span className="font-bold text-white">Wallet Address</span> and Network selection. Transfers cannot be reversed.</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* History Section */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between">
                    <h3 className="text-lg font-bold text-gray-900">Transaction History</h3>
                    <span className="text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{withdrawals.length} Records</span>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full text-left">
                        <thead className="bg-gray-50/50">
                            <tr>
                                <th className="px-8 py-5 text-xs font-semibold text-gray-400 uppercase tracking-wider">Request ID</th>
                                <th className="px-8 py-5 text-xs font-semibold text-gray-400 uppercase tracking-wider">Date</th>
                                <th className="px-8 py-5 text-xs font-semibold text-gray-400 uppercase tracking-wider">Amount</th>
                                <th className="px-8 py-5 text-xs font-semibold text-gray-400 uppercase tracking-wider">Method</th>
                                <th className="px-8 py-5 text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                                <th className="px-8 py-5 text-xs font-semibold text-gray-400 uppercase tracking-wider">TXID</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {withdrawals.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="px-8 py-12 text-center text-gray-400 text-sm">
                                        No withdrawal history found.
                                    </td>
                                </tr>
                            ) : (
                                withdrawals.map((w) => (
                                    <tr key={w._id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-8 py-4 text-sm font-mono text-gray-500">#{w._id.slice(-6).toUpperCase()}</td>
                                        <td className="px-8 py-4 text-sm text-gray-600">{new Date(w.date || w.createdAt).toLocaleDateString()}</td>
                                        <td className="px-8 py-4 text-sm font-bold text-gray-900">${w.amount.toFixed(2)}</td>
                                        <td className="px-8 py-4">
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
                                                {w.method}
                                            </span>
                                        </td>
                                        <td className="px-8 py-4">
                                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${w.status === 'Approved' ? 'bg-green-100 text-green-700 border border-green-200' :
                                                w.status === 'Rejected' ? 'bg-red-100 text-red-700 border border-red-200' :
                                                    'bg-yellow-100 text-yellow-800 border border-yellow-200'
                                                }`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${w.status === 'Approved' ? 'bg-green-500' :
                                                    w.status === 'Rejected' ? 'bg-red-500' :
                                                        'bg-yellow-500'
                                                    }`}></span>
                                                {w.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-4 text-xs font-mono text-gray-400">
                                            {w.txId ? (
                                                <span className="text-blue-600 hover:underline cursor-pointer">{w.txId.substring(0, 10)}...</span>
                                            ) : '-'}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Withdrawals;