import React, { useState } from 'react';
import { useCrypto } from '../../context/CryptoContext';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';

const Withdrawals = () => {
    const { user, withdrawals, requestWithdrawal, roiRates, addFunds, loading } = useCrypto();

    if (loading || !user) {
        return <div className="p-10 text-center text-gray-500">Loading user data...</div>;
    }
    const [amount, setAmount] = useState('');
    const [method, setMethod] = useState('USDT');
    const [walletAddress, setWalletAddress] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

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
            walletAddress
        });

        setSuccess('Withdrawal request submitted for approval!');
        setAmount('');
        setWalletAddress('');
        setTimeout(() => setSuccess(''), 3000);
    };

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Withdraw Funds</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Withdrawal Form */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
                        <div className="mb-6 bg-gradient-to-r from-[#D4AF37]/10 to-transparent p-4 rounded-lg border-l-4 border-[#D4AF37]">
                            <p className="text-gray-600 text-sm">Available Balance</p>
                            <div className="flex justify-between items-center">
                                <p className="text-3xl font-bold text-[#D4AF37]">${user.balance.toFixed(2)}</p>
                                {user.balance < 50 && (
                                    <button
                                        onClick={async () => {
                                            const res = await addFunds();
                                            if (res.success) setSuccess(res.message);
                                            else setError(res.message);
                                        }}
                                        className="text-xs bg-gray-900 text-white px-3 py-1.5 rounded-lg hover:bg-gray-800 transition-colors"
                                    >
                                        + Add Test Funds
                                    </button>
                                )}
                            </div>
                        </div>

                        {error && <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">{error}</div>}
                        {success && <div className="mb-4 p-3 bg-green-50 text-green-600 rounded-lg text-sm">{success}</div>}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Withdrawal Method</label>
                                    <select
                                        value={method}
                                        onChange={e => setMethod(e.target.value)}
                                        className="w-full rounded-lg border-gray-300 py-3 focus:ring-[#D4AF37]"
                                    >
                                        {Object.keys(roiRates).map(token => (
                                            <option key={token} value={token}>{token}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Amount ($)</label>
                                    <input
                                        type="number"
                                        value={amount}
                                        onChange={e => setAmount(e.target.value)}
                                        max={user.balance}
                                        className="w-full rounded-lg border-gray-300 py-3 focus:ring-[#D4AF37]"
                                        placeholder="0.00"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Wallet Address</label>
                                <input
                                    type="text"
                                    value={walletAddress}
                                    onChange={e => setWalletAddress(e.target.value)}
                                    className="w-full rounded-lg border-gray-300 py-3 focus:ring-[#D4AF37]"
                                    placeholder="Enter your wallet address"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full flex justify-center items-center py-4 bg-gray-900 text-white font-bold rounded-lg hover:bg-gray-800 transition-colors"
                            >
                                <PaperAirplaneIcon className="w-5 h-5 mr-2 -ml-1 text-[#D4AF37]" />
                                Request Withdrawal
                            </button>
                        </form>
                    </div>
                </div>

                {/* Info Panel */}
                <div className="lg:col-span-1">
                    <div className="bg-[#D4AF37] rounded-xl shadow-lg p-6 text-white">
                        <h3 className="text-lg font-bold mb-4">Important Info</h3>
                        <ul className="space-y-3 text-sm text-yellow-50">
                            <li className="flex items-start">
                                <span className="mr-2">•</span>
                                Withdrawals are processed within 24 hours.
                            </li>
                            <li className="flex items-start">
                                <span className="mr-2">•</span>
                                Minimum withdrawal amount is $50.
                            </li>
                            <li className="flex items-start">
                                <span className="mr-2">•</span>
                                Ensure your wallet address matches the selected network (e.g., TRC20 for USDT).
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* History */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mt-8">
                <div className="px-6 py-4 border-b border-gray-100">
                    <h3 className="font-bold text-gray-900">Withdrawal History</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-sm">
                        <thead className="bg-gray-50 text-gray-500 font-medium">
                            <tr>
                                <th className="px-6 py-4">Request ID</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Amount</th>
                                <th className="px-6 py-4">Method</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Transaction ID</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {withdrawals.map((w) => (
                                <tr key={w._id}>
                                    <td className="px-6 py-4 text-gray-500">#{w._id.slice(-6)}...</td>
                                    <td className="px-6 py-4 text-gray-500">{new Date(w.date || w.createdAt).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 font-medium text-gray-900">${w.amount}</td>
                                    <td className="px-6 py-4">{w.method}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${w.status === 'Approved' ? 'bg-green-100 text-green-700' :
                                            w.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                                                'bg-yellow-100 text-yellow-700'
                                            }`}>
                                            {w.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-mono text-xs text-gray-500">{w.txId || '-'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Withdrawals;
