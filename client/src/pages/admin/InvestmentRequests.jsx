import React, { useEffect } from 'react';
import { useCrypto } from '../../context/CryptoContext';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/solid';

const InvestmentRequests = () => {
    const { investmentRequests, approveInvestment, rejectInvestment, updateRequestWallet, fetchAdminData } = useCrypto();

    useEffect(() => {
        fetchAdminData();
    }, []);

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">Pending Investments</h1>

            {investmentRequests.length === 0 ? (
                <div className="card-premium p-12 rounded-xl text-center text-gray-500">
                    No pending investment requests found.
                </div>
            ) : (
                <div className="card-premium rounded-xl overflow-hidden animate-fade-in-up">
                    <table className="min-w-full text-left text-sm">
                        <thead className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4">Req ID</th>
                                <th className="px-6 py-4">User</th>
                                <th className="px-6 py-4">Wallet Address</th>
                                <th className="px-6 py-4">Amount</th>
                                <th className="px-6 py-4">Method</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {investmentRequests.map(req => (
                                <tr key={req._id}>
                                    <td className="px-6 py-4 text-gray-500">#{req._id.slice(-4)}</td>
                                    <td className="px-6 py-4 font-medium">{req.user?.name || req.user}</td>
                                    <td className="px-6 py-4">
                                        <input
                                            type="text"
                                            value={req.walletAddress || ''}
                                            onChange={(e) => updateRequestWallet(req._id, e.target.value)}
                                            placeholder="Add address..."
                                            className="text-sm border-gray-200 rounded-md focus:border-[#D4AF37] focus:ring-[#D4AF37]"
                                        />
                                    </td>
                                    <td className="px-6 py-4 font-mono text-lg">${req.amount}</td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-bold">
                                            {req.method}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-500">{new Date(req.date || req.createdAt).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 text-right space-x-2">
                                        <button
                                            onClick={() => approveInvestment(req._id)}
                                            className="inline-flex items-center px-3 py-1.5 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-xs font-bold uppercase tracking-wide"
                                        >
                                            <CheckIcon className="w-4 h-4 mr-1" /> Approve
                                        </button>
                                        <button
                                            onClick={() => rejectInvestment(req._id)}
                                            className="inline-flex items-center px-3 py-1.5 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-xs font-bold uppercase tracking-wide"
                                        >
                                            <XMarkIcon className="w-4 h-4 mr-1" /> Reject
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default InvestmentRequests;
