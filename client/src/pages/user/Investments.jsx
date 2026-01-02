import React, { useState, useEffect } from 'react';
import { useCrypto } from '../../context/CryptoContext';
import { CalculatorIcon, ClockIcon } from '@heroicons/react/24/outline';

const Investments = () => {
    const { roiRates, addInvestment, investments, user } = useCrypto();
    const [selectedMethod, setSelectedMethod] = useState('USDT');
    const [amount, setAmount] = useState('');
    const [projectedReturn, setProjectedReturn] = useState(0);
    const [duration, setDuration] = useState('30 Days');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

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

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!amount || amount <= 0) {
            setError('Please enter a valid amount.');
            return;
        }

        // Add investment
        addInvestment({
            method: selectedMethod,
            amount: parseFloat(amount),
            walletAddress: user?.walletAddress || ''
        });

        setSuccess('Investment request submitted successfully!');
        setAmount('');
        setTimeout(() => setSuccess(''), 3000);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">New Investment</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Investment Form */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-xl shadow-lg border border-[#D4AF37]/20 p-8">
                        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                            <CurrencyIcon className="w-6 h-6 mr-2 text-[#D4AF37]" />
                            Create Portfolio
                        </h2>

                        {error && <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">{error}</div>}
                        {success && <div className="mb-4 p-3 bg-green-50 text-green-600 rounded-lg text-sm">{success}</div>}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Asset</label>
                                    <select
                                        value={selectedMethod}
                                        onChange={(e) => setSelectedMethod(e.target.value)}
                                        className="w-full rounded-lg border-gray-300 focus:border-[#D4AF37] focus:ring focus:ring-[#D4AF37]/20 transition-shadow py-3"
                                    >
                                        {Object.keys(roiRates).map(token => (
                                            <option key={token} value={token}>{token}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Investment Amount ($)</label>
                                    <input
                                        type="number"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        placeholder="Min: $50"
                                        className="w-full rounded-lg border-gray-300 focus:border-[#D4AF37] focus:ring focus:ring-[#D4AF37]/20 transition-shadow py-3"
                                    />
                                </div>
                            </div>

                            {/* Dynamic Rate Info */}
                            <div className="bg-gradient-to-r from-gray-50 to-white border border-gray-100 rounded-lg p-5 flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">Expected ROI Rate</p>
                                    <p className="text-lg font-bold text-[#D4AF37]">
                                        {roiRates[selectedMethod].rate}%
                                        <span className="text-sm font-normal text-gray-400 ml-1">{roiRates[selectedMethod].period}</span>
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-gray-500">Duration</p>
                                    <p className="text-lg font-bold text-gray-800">{duration}</p>
                                </div>
                            </div>

                            <div className="flex items-center">
                                <input type="checkbox" required className="h-4 w-4 text-[#D4AF37] focus:ring-[#D4AF37] border-gray-300 rounded" />
                                <label className="ml-2 block text-sm text-gray-600">
                                    I agree to the <a href="#" className="text-[#D4AF37] hover:underline">Terms & Conditions</a> of investment.
                                </label>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-4 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-white font-bold rounded-lg shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all transform"
                            >
                                Invest Now
                            </button>
                        </form>
                    </div>
                </div>

                {/* ROI Calculator Preview Widget */}
                <div className="lg:col-span-1">
                    <div className="bg-gray-900 text-white rounded-xl shadow-xl p-6 relative overflow-hidden">
                        {/* Decorative circle */}
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#D4AF37] opacity-20 rounded-full blur-xl"></div>

                        <h3 className="text-lg font-bold mb-6 flex items-center">
                            <CalculatorIcon className="w-5 h-5 mr-2 text-[#D4AF37]" />
                            Projection
                        </h3>

                        <div className="space-y-6">
                            <div className="flex justify-between items-end border-b border-gray-700 pb-4">
                                <span className="text-gray-400 text-sm">Invested Amount</span>
                                <span className="text-xl font-mono">${amount || '0.00'}</span>
                            </div>
                            <div className="flex justify-between items-end border-b border-gray-700 pb-4">
                                <span className="text-gray-400 text-sm">Total Profit</span>
                                <span className="text-xl font-mono text-[#D4AF37]">+${projectedReturn}</span>
                            </div>
                            <div className="flex justify-between items-end pb-2">
                                <span className="text-gray-300 font-medium">Total Return</span>
                                <div className="text-right">
                                    <span className="text-2xl font-bold block text-white">
                                        ${(parseFloat(amount || 0) + parseFloat(projectedReturn || 0)).toFixed(2)}
                                    </span>
                                    <span className="text-xs text-gray-500">In {duration}</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 p-4 bg-gray-800 rounded-lg text-xs text-gray-400 leading-relaxed">
                            <ClockIcon className="w-4 h-4 inline mr-1 mb-0.5" />
                            Returns are calculated based on current market rates. Settlements are processed automatically to your wallet balance.
                        </div>
                    </div>
                </div>
            </div>

            {/* Simple History Table */}
            <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Investment History</h2>
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-left text-sm">
                            <thead className="bg-gray-50 text-gray-500 font-medium">
                                <tr>
                                    <th className="px-6 py-4">Date</th>
                                    <th className="px-6 py-4">Method</th>
                                    <th className="px-6 py-4">Amount</th>
                                    <th className="px-6 py-4">Returns</th>
                                    <th className="px-6 py-4">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {investments.map((inv) => (
                                    <tr key={inv._id}>
                                        <td className="px-6 py-4 text-gray-500">{new Date(inv.date || inv.createdAt).toLocaleDateString()}</td>
                                        <td className="px-6 py-4 font-medium">{inv.method}</td>
                                        <td className="px-6 py-4">${inv.amount}</td>
                                        <td className="px-6 py-4 text-green-600">+${inv.returns}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${inv.status === 'Active' ? 'bg-green-100 text-green-700' :
                                                inv.status === 'Completed' ? 'bg-blue-100 text-blue-700' :
                                                    'bg-yellow-100 text-yellow-700'
                                                }`}>
                                                {inv.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {investments.length === 0 && (
                            <div className="p-8 text-center text-gray-400">No investment history found.</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Simple Icon component placeholder since we didn't import one for the header
const CurrencyIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export default Investments;
