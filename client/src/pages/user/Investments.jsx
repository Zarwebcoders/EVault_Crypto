import React, { useState, useEffect } from 'react';
import QRCode from 'react-qr-code';
import { useCrypto } from '../../context/CryptoContext';
import {
    CalculatorIcon,
    ClockIcon,
    CurrencyDollarIcon,
    WalletIcon,
    ChartBarIcon,
    CheckCircleIcon,
    ExclamationCircleIcon,
    ArrowTrendingUpIcon
} from '@heroicons/react/24/outline';

const Investments = () => {
    const { roiRates, addInvestment, investments, user, claimROI, fetchUserData } = useCrypto();
    const [selectedMethod, setSelectedMethod] = useState('USDT');
    const [network, setNetwork] = useState('TRC'); // Network State
    const [amount, setAmount] = useState('');
    const [receiverWalletAddress, setReceiverWalletAddress] = useState('');
    const [senderWalletAddress, setSenderWalletAddress] = useState('');
    const [transactionHash, setTransactionHash] = useState('');
    const [projectedReturn, setProjectedReturn] = useState(0);
    const [duration, setDuration] = useState('30 Days');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleClaim = async (id) => {
        const res = await claimROI(id);
        if (res.success) {
            setSuccess(res.message);
            setTimeout(() => setSuccess(''), 3000);
        } else {
            setError(res.message);
            setTimeout(() => setError(''), 3000);
        }
    };

    useEffect(() => {
        if (!amount || isNaN(amount)) {
            setProjectedReturn(0);
            return;
        }
        const rate = roiRates[selectedMethod]?.rate || 0;
        const period = roiRates[selectedMethod]?.period || 'Monthly';

        // Simple calc for demo
        // If daily, 30 days. If monthly, 1 month.
        let multiplier = 1;
        if (period === 'Daily') multiplier = 30;

        const roiAmt = (parseFloat(amount) * rate / 100) * multiplier;
        setProjectedReturn(roiAmt.toFixed(2));

        setDuration(period === 'Daily' ? '30 Days' : '1 Month');

    }, [amount, selectedMethod, roiRates]);


    // Initialize sender address from profile
    useEffect(() => {
        if (user?.walletAddress) {
            setSenderWalletAddress(user.walletAddress);
        }
    }, [user]);

    // DEBUG: Direct Fetch to verify Backend Data
    useEffect(() => {
        const checkConfig = async () => {
            try {
                const { data } = await import('../../api/axios').then(m => m.default.get('/config'));
                console.log("DEBUG DIRECT FETCH:", data);
                if (data?.roiRates?.[selectedMethod]?.walletAddress) {
                    console.log("Found wallet:", data.roiRates[selectedMethod].walletAddress);
                } else {
                    console.log("No wallet found in direct fetch for", selectedMethod);
                }
            } catch (e) {
                console.error("Direct fetch failed", e);
            }
        };
        checkConfig();
    }, [selectedMethod]);

    // Initialize receiver wallet address from user profile if available
    // AND Auto-fill Receiver Wallet based on Admin Config (Primary) or History (Secondary)
    useEffect(() => {
        // 1. Check if Admin has configured a wallet for this token
        // Use optional chaining for safety
        const rateObj = roiRates?.[selectedMethod];
        const adminWallet = rateObj?.walletAddress;

        console.log("Investments Debug - Selected:", selectedMethod);
        console.log("Investments Debug - RateObj:", rateObj);
        console.log("Investments Debug - AdminWallet:", adminWallet);

        if (adminWallet) {
            setReceiverWalletAddress(adminWallet);
            return;
        }

        // 2. Fallback: Find last investment for this method
        if (investments.length > 0) {
            const historyForMethod = investments
                .filter(inv => inv.method === selectedMethod)
                .sort((a, b) => new Date(b.createdAt || b.startDate) - new Date(a.createdAt || a.startDate));

            if (historyForMethod.length > 0 && historyForMethod[0].receiverWalletAddress) {
                setReceiverWalletAddress(historyForMethod[0].receiverWalletAddress);
                return;
            }
        }

        // 3. Keep empty if no data
        setReceiverWalletAddress('');

    }, [selectedMethod, investments, roiRates]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Add investment
        addInvestment({
            method: selectedMethod,
            amount: parseFloat(amount),
            walletAddress: senderWalletAddress, // Sender (Manual Input)
            receiverWalletAddress: receiverWalletAddress, // Receiver input
            transactionHash: transactionHash,
            network: network // Include Network
        });

        setSuccess('Investment request submitted successfully!');
        setAmount('');
        setTimeout(() => setSuccess(''), 3000);
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    return (
        <div className="space-y-8 max-w-7xl mx-auto pb-12">

            {/* Header */}
            <div>
                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Investment Portfolio</h1>
                <p className="text-gray-500 mt-1">Grow your assets with our high-yield staking pools.</p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Left Side: Investment Form */}
                <div className="xl:col-span-2">
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-8 border-b border-gray-100 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                <ChartBarIcon className="w-6 h-6 text-[#D4AF37]" />
                                Create New Position
                            </h2>
                            <span className="text-xs font-semibold bg-[#D4AF37]/10 text-[#D4AF37] px-3 py-1 rounded-full uppercase tracking-wide">
                                Guaranteed Returns
                            </span>
                        </div>

                        {error && (
                            <div className="bg-red-50 border-l-4 border-red-500 p-4 mx-8 mt-6 flex items-center gap-3">
                                <ExclamationCircleIcon className="w-5 h-5 text-red-500" />
                                <span className="text-red-700 text-sm font-medium">{error}</span>
                            </div>
                        )}
                        {success && (
                            <div className="bg-green-50 border-l-4 border-green-500 p-4 mx-8 mt-6 flex items-center gap-3">
                                <CheckCircleIcon className="w-5 h-5 text-green-500" />
                                <span className="text-green-700 text-sm font-medium">{success}</span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="p-8 space-y-8">

                            {/* Asset Selection */}
                            <div className="space-y-4">
                                <label className="block text-sm font-semibold text-gray-700">Select Asset Class</label>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                                    {Object.entries(roiRates).map(([token, info]) => (
                                        <div
                                            key={token}
                                            onClick={() => setSelectedMethod(token)}
                                            className={`group cursor-pointer rounded-2xl p-4 transition-all duration-200 border relative overflow-hidden ${selectedMethod === token
                                                ? 'bg-gray-900 border-gray-900 shadow-xl -translate-y-1'
                                                : 'bg-white border-gray-200 hover:border-[#D4AF37] hover:shadow-md'
                                                }`}
                                        >
                                            {selectedMethod === token && (
                                                <div className="absolute top-0 right-0 w-16 h-16 bg-[#D4AF37] opacity-10 rounded-bl-full -mr-8 -mt-8"></div>
                                            )}
                                            <div className="flex flex-col items-center justify-center text-center space-y-3 relative z-10">
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold transition-colors ${selectedMethod === token ? 'bg-[#D4AF37] text-white' : 'bg-gray-100 text-gray-600 group-hover:bg-[#D4AF37]/10 group-hover:text-[#D4AF37]'
                                                    }`}>
                                                    {token[0]}
                                                </div>
                                                <div>
                                                    <p className={`font-bold transition-colors ${selectedMethod === token ? 'text-white' : 'text-gray-700'}`}>{token}</p>
                                                    <p className={`text-xs ${selectedMethod === token ? 'text-gray-400' : 'text-gray-500'}`}>{info.rate}% {info.period}</p>
                                                    {token === 'USDT' && (
                                                        <p className={`text-[10px] mt-0.5 font-medium ${selectedMethod === token ? 'text-gray-400' : 'text-gray-500'}`}>including principal</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>


                            {/* Network Selection */}
                            <div className="space-y-4">
                                <label className="block text-sm font-semibold text-gray-700">Select Network</label>
                                <div className="grid grid-cols-2 gap-4">
                                    {['TRC', 'BEP'].map((net) => (
                                        <div
                                            key={net}
                                            onClick={() => setNetwork(net)}
                                            className={`cursor-pointer rounded-xl p-4 border flex items-center gap-3 transition-all ${network === net
                                                ? 'bg-gray-900 border-gray-900 text-white shadow-lg'
                                                : 'bg-white border-gray-200 text-gray-700 hover:border-[#D4AF37]'
                                                }`}
                                        >
                                            <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${network === net ? 'border-[#D4AF37]' : 'border-gray-400'
                                                }`}>
                                                {network === net && <div className="w-2.5 h-2.5 rounded-full bg-[#D4AF37]"></div>}
                                            </div>
                                            <div>
                                                <p className="font-bold">{net}</p>
                                                <p className={`text-xs ${network === net ? 'text-gray-400' : 'text-gray-500'}`}>
                                                    {net === 'TRC' ? 'Tron Network (TRC20)' : 'BNB Smart Chain (BEP20)'}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Sender Wallet Address (Read-Only) */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700">Your Wallet Address (Sender)</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <WalletIcon className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            required
                                            type="text"
                                            value={senderWalletAddress}
                                            onChange={(e) => setSenderWalletAddress(e.target.value)}
                                            placeholder="Enter your wallet address"
                                            className="block w-full pl-10 pr-4 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                                        />
                                    </div>
                                </div>


                                {/* Receiver Wallet Address (Editable) & QR Code */}
                                <div className="space-y-4 md:col-span-2">
                                    <label className="text-sm font-semibold text-gray-700">Receiver Wallet Details</label>

                                    <div className="flex flex-col md:flex-row gap-6 items-start">
                                        {/* QR Code Container */}
                                        <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm flex-shrink-0 mx-auto md:mx-0">
                                            {receiverWalletAddress ? (
                                                <QRCode
                                                    value={receiverWalletAddress}
                                                    size={120}
                                                    style={{ height: "auto", maxWidth: "100%", width: "120px" }}
                                                    viewBox={`0 0 256 256`}
                                                />
                                            ) : (
                                                <div className="w-[120px] h-[120px] bg-gray-100 rounded-lg flex items-center justify-center text-xs text-gray-400 text-center px-2">
                                                    No Address
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex-grow space-y-2 w-full">
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <WalletIcon className="h-5 w-5 text-[#D4AF37]" />
                                                </div>
                                                <input
                                                    type="text"
                                                    readOnly
                                                    value={receiverWalletAddress}
                                                    placeholder="Address will auto-populate..."
                                                    className="block w-full pl-10 pr-4 py-3.5 border border-gray-200 rounded-xl bg-gray-100 text-gray-500 cursor-not-allowed focus:ring-0 focus:border-gray-200 transaction-all"
                                                />
                                            </div>
                                            <p className="text-xs text-gray-500">Scan this code to send payment directly to the receiver wallet.</p>
                                        </div>
                                    </div>
                                </div>



                                {/* Transaction Hash Input */}
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-sm font-semibold text-gray-700">Investment Hash (Transaction ID)</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                                            </svg>
                                        </div>
                                        <input
                                            type="text"
                                            value={transactionHash}
                                            onChange={(e) => setTransactionHash(e.target.value)}
                                            placeholder="Enter transaction hash / ID"
                                            className="block w-full pl-10 pr-4 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                                        />
                                    </div>
                                </div>

                                {/* Amount */}
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-sm font-semibold text-gray-700 flex justify-between">
                                        <span>Investment Amount</span>
                                        <span className="text-xs text-[#D4AF37] font-medium">Min: $50</span>
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <CurrencyDollarIcon className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="number"
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                            placeholder="0.00"
                                            className="block w-full pl-10 pr-4 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all bg-gray-50 focus:bg-white font-medium"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                                <div className="mb-6">
                                    <p className="text-sm text-gray-500 font-medium mb-1">Current ROI Rate</p>
                                    <div className="flex items-baseline gap-2">
                                        <p className="text-3xl font-bold text-[#D4AF37]">{roiRates[selectedMethod].rate}%</p>
                                        <span className="text-xs font-semibold text-gray-400 uppercase bg-gray-100 px-2 py-0.5 rounded">{roiRates[selectedMethod].period}</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-gray-100">
                                    <div>
                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Monthly</p>
                                        <p className="text-lg font-bold text-gray-700">
                                            {(roiRates[selectedMethod].period === 'Daily'
                                                ? (roiRates[selectedMethod].rate * 30)
                                                : roiRates[selectedMethod].rate).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}%
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Quarterly</p>
                                        <p className="text-lg font-bold text-gray-700">
                                            {(roiRates[selectedMethod].period === 'Daily'
                                                ? (roiRates[selectedMethod].rate * 90)
                                                : (roiRates[selectedMethod].rate * 3)).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}%
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Half Yearly</p>
                                        <p className="text-lg font-bold text-gray-700">
                                            {(roiRates[selectedMethod].period === 'Daily'
                                                ? (roiRates[selectedMethod].rate * 180)
                                                : (roiRates[selectedMethod].rate * 6)).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}%
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Yearly</p>
                                        <p className="text-lg font-bold text-gray-700">
                                            {(roiRates[selectedMethod].period === 'Daily'
                                                ? (roiRates[selectedMethod].rate * 365)
                                                : (roiRates[selectedMethod].rate * 12)).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}%
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Terms & Submit */}
                            <div className="pt-2">
                                <div className="flex items-center mb-6">
                                    <input
                                        type="checkbox"
                                        required
                                        className="h-5 w-5 text-[#D4AF37] focus:ring-[#D4AF37] border-gray-300 rounded cursor-pointer transition-colors"
                                        id="terms"
                                    />
                                    <label htmlFor="terms" className="ml-3 block text-sm text-gray-600 cursor-pointer select-none">
                                        I agree to the <span className="text-[#D4AF37] font-semibold hover:underline">Terms & Conditions</span> of the smart contract.
                                    </label>
                                </div>

                                <button
                                    type="submit"
                                    className={`w-full py-4 bg-gradient-to-r from-gray-900 to-gray-800 hover:shadow-xl hover:-translate-y-1 text-white font-bold rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group`}
                                >
                                    <span>START INVESTMENT</span>
                                    <ArrowTrendingUpIcon className="w-5 h-5 text-[#D4AF37] group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Right Side: Calculator Widget */}
                <div className="xl:col-span-1">
                    <div className="sticky top-8">
                        <div className="bg-gray-900 text-white rounded-3xl shadow-2xl p-8 relative overflow-hidden border border-gray-800">
                            {/* Abstract Background Elements */}
                            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-[#D4AF37] opacity-10 blur-3xl"></div>
                            <div className="absolute bottom-0 left-0 -ml-10 -mb-10 w-40 h-40 rounded-full bg-blue-500 opacity-5 blur-2xl"></div>

                            <div className="relative z-10">
                                <h3 className="text-lg font-bold mb-8 flex items-center gap-2 text-[#D4AF37]">
                                    <CalculatorIcon className="w-6 h-6" />
                                    Projection Analysis
                                </h3>

                                <div className="space-y-6">
                                    <div className="flex justify-between items-end border-b border-gray-800 pb-4">
                                        <span className="text-gray-400 text-sm">Principal Amount</span>
                                        <span className="text-xl font-mono tracking-wide">${amount || '0.00'}</span>
                                    </div>
                                    <div className="flex justify-between items-end border-b border-gray-800 pb-4">
                                        <span className="text-gray-400 text-sm">Est. Profit</span>
                                        <span className="text-xl font-mono text-[#D4AF37]">+${projectedReturn}</span>
                                    </div>

                                    <div className="pt-4 pb-2">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-gray-300 font-medium text-sm">Total Maturity Value</span>
                                            <span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded">In {duration}</span>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-4xl font-bold block text-white tracking-tight">
                                                ${(parseFloat(amount || 0) + parseFloat(projectedReturn || 0)).toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 p-4 bg-gray-800/50 rounded-xl text-xs text-gray-400 leading-relaxed border border-gray-700/50 backdrop-blur-sm">
                                    <div className="flex gap-2">
                                        <ClockIcon className="w-4 h-4 text-gray-500 shrink-0 mt-0.5" />
                                        <p>Returns are calculated based on current APY. Settlements are processed automatically to your wallet balance upon maturity.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >

            {/* Investment History */}
            < div className="space-y-4" >
                <div className="flex items-center justify-between px-2">
                    <h2 className="text-xl font-bold text-gray-900">Active Portfolio</h2>
                    <span className="text-sm text-gray-500">{investments.length} Active Positions</span>
                </div>

                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-left">
                            <thead className="bg-gray-50/80 border-b border-gray-100">
                                <tr>
                                    <th className="px-8 py-5 text-xs font-semibold text-gray-400 uppercase tracking-wider">Started Date</th>
                                    <th className="px-8 py-5 text-xs font-semibold text-gray-400 uppercase tracking-wider">Method</th>
                                    <th className="px-8 py-5 text-xs font-semibold text-gray-400 uppercase tracking-wider">Principal</th>
                                    <th className="px-8 py-5 text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Returns</th>
                                    <th className="px-8 py-5 text-xs font-semibold text-gray-400 uppercase tracking-wider">Next Claim</th>
                                    <th className="px-8 py-5 text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                                    <th className="px-8 py-5 text-xs font-semibold text-gray-400 uppercase tracking-wider">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {investments.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="px-8 py-16 text-center">
                                            <div className="flex flex-col items-center justify-center text-gray-400">
                                                <ChartBarIcon className="w-12 h-12 mb-3 text-gray-300" />
                                                <p className="font-medium">No investments found.</p>
                                                <p className="text-sm mt-1">Start your portfolio using the form above.</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    investments.map((inv) => {
                                        const lastClaim = new Date(inv.lastClaimedAt).getTime();
                                        const periodDays = inv.roiPeriod === 'Daily' ? 1 : 30;
                                        const periodMs = periodDays * 24 * 60 * 60 * 1000;
                                        const nextClaimTime = lastClaim + periodMs;
                                        const now = Date.now();
                                        const isClaimable = now >= nextClaimTime && inv.status === 'Active';

                                        const timeDiff = nextClaimTime - now;
                                        const hoursLeft = Math.ceil(timeDiff / (1000 * 60 * 60));
                                        const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

                                        let nextClaimText = 'Available Now';
                                        if (!isClaimable && inv.status === 'Active') {
                                            if (inv.roiPeriod === 'Daily') {
                                                nextClaimText = `in ${hoursLeft} hrs`;
                                            } else {
                                                nextClaimText = `in ${daysLeft} days`;
                                            }
                                        } else if (inv.status !== 'Active') {
                                            nextClaimText = '-';
                                        }

                                        return (
                                            <tr key={inv._id} className="hover:bg-gray-50/50 transition-colors">
                                                <td className="px-8 py-5 text-sm text-gray-600">
                                                    {inv.startDate ? new Date(inv.startDate).toLocaleDateString() : 'Pending'}
                                                </td>
                                                <td className="px-8 py-5">
                                                    <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md text-xs font-bold bg-gray-100 text-gray-700 border border-gray-200">
                                                        {inv.method}
                                                    </span>
                                                </td>
                                                <td className="px-8 py-5 text-sm font-medium text-gray-900 font-mono">${inv.amount}</td>
                                                <td className="px-8 py-5 text-sm font-bold text-green-600 font-mono">
                                                    +${inv.returns ? inv.returns.toFixed(2) : '0.00'}
                                                </td>
                                                <td className="px-8 py-5 text-xs text-gray-500 font-medium">
                                                    {nextClaimText === 'Available Now' ? (
                                                        <span className="text-green-600 animate-pulse font-bold">{nextClaimText}</span>
                                                    ) : (
                                                        nextClaimText
                                                    )}
                                                </td>
                                                <td className="px-8 py-5">
                                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${inv.status === 'Active' ? 'bg-green-100 text-green-700 border border-green-200' :
                                                        inv.status === 'Completed' ? 'bg-blue-100 text-blue-700 border border-blue-200' :
                                                            'bg-yellow-100 text-yellow-800 border border-yellow-200'
                                                        }`}>
                                                        <span className={`w-1.5 h-1.5 rounded-full ${inv.status === 'Active' ? 'bg-green-500' :
                                                            inv.status === 'Completed' ? 'bg-blue-500' :
                                                                'bg-yellow-500'
                                                            }`}></span>
                                                        {inv.status}
                                                    </span>
                                                </td>
                                                <td className="px-8 py-5">
                                                    {inv.status === 'Active' && (
                                                        <button
                                                            onClick={() => handleClaim(inv._id)}
                                                            disabled={!isClaimable}
                                                            className={`px-4 py-2 text-xs font-bold rounded-lg shadow-sm transition-all duration-200 flex items-center gap-2 ${isClaimable
                                                                ? 'bg-[#D4AF37] text-white hover:bg-[#b5952f] hover:shadow-md cursor-pointer hover:-translate-y-0.5'
                                                                : 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
                                                                }`}
                                                        >
                                                            {isClaimable && <ArrowTrendingUpIcon className="w-3 h-3" />}
                                                            CLAIM ROI
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        )
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div >
        </div >
    );
};

export default Investments;