import React from 'react';
import { useCrypto } from '../../context/CryptoContext';
import { ArrowDownTrayIcon, ArrowUpTrayIcon } from '@heroicons/react/24/outline'; // Example icons

const Transactions = () => {
    const { investments } = useCrypto();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Transaction History</h1>
                    <p className="text-gray-500 mt-2">View all your investment activities</p>
                </div>
                {/* Optional: Add Filter/Search here later */}
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full text-left">
                        <thead className="bg-gray-50/50">
                            <tr>
                                <th className="px-8 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Transaction ID</th>
                                <th className="px-8 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Asset</th>
                                <th className="px-8 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Date</th>
                                <th className="px-8 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Amount</th>
                                <th className="px-8 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Profit</th>
                                <th className="px-8 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {investments.map((inv) => (
                                <tr key={inv._id} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="px-8 py-4">
                                        <span className="font-mono text-xs text-gray-500 group-hover:text-[#D4AF37] transition-colors">
                                            #{inv._id.slice(-6).toUpperCase()}
                                        </span>
                                    </td>
                                    <td className="px-8 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-[#D4AF37]"></div>
                                            <span className="font-medium text-gray-900">{inv.method}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-4 text-sm text-gray-500">
                                        {new Date(inv.startDate || inv.createdAt || Date.now()).toLocaleDateString()}
                                    </td>
                                    <td className="px-8 py-4 font-bold text-gray-900">${inv.amount.toLocaleString()}</td>
                                    <td className="px-8 py-4 font-bold text-green-600">+${inv.returns}</td>
                                    <td className="px-8 py-4">
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${inv.status === 'Active' ? 'bg-green-100 text-green-700' :
                                            inv.status === 'Completed' ? 'bg-blue-100 text-blue-700' :
                                                'bg-yellow-100 text-yellow-700'
                                            }`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${inv.status === 'Active' ? 'bg-green-500' :
                                                inv.status === 'Completed' ? 'bg-blue-500' :
                                                    'bg-yellow-500'
                                                }`}></span>
                                            {inv.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                            {investments.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="px-8 py-12 text-center text-gray-500">
                                        No transactions found. Start investing to see data here.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Transactions;
