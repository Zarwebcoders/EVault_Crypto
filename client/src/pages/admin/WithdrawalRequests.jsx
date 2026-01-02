import React from 'react';
import { useCrypto } from '../../context/CryptoContext';
import { CheckIcon, XMarkIcon, ExclamationTriangleIcon } from '@heroicons/react/24/solid';

const WithdrawalRequests = () => {
    const { withdrawalRequests, approveWithdrawal, rejectWithdrawal } = useCrypto();

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">Withdrawal Requests</h1>

            {withdrawalRequests.length === 0 ? (
                <div className="bg-white p-12 rounded-xl border border-gray-200 text-center text-gray-500">
                    No pending withdrawal requests.
                </div>
            ) : (
                <div className="space-y-4">
                    {withdrawalRequests.map(req => (
                        <div key={req._id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col md:flex-row justify-between items-center gap-4">
                            <div className="flex-1">
                                <div className="flex items-center mb-2">
                                    <span className="px-2 py-0.5 bg-red-100 text-red-600 rounded text-xs font-bold mr-2">OUTGOING</span>
                                    <span className="text-gray-400 text-sm">#{req._id}</span>
                                    <span className="mx-2 text-gray-300">•</span>
                                    <span className="text-gray-500 text-sm">{new Date(req.date || req.createdAt).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center">
                                    <h3 className="text-2xl font-bold text-gray-900 mr-4">${req.amount}</h3>
                                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-bold">
                                        {req.method}
                                    </span>
                                </div>
                                <div className="mt-2 text-sm text-gray-600 font-mono bg-gray-50 p-2 rounded inline-block border border-gray-100">
                                    To: {req.address}
                                </div>
                                <p className="mt-2 text-sm text-gray-500">Requested by <span className="font-medium text-gray-900">{req.user?.name || req.user}</span></p>
                            </div>

                            <div className="flex flex-col gap-2 min-w-[150px]">
                                <button
                                    onClick={() => approveWithdrawal(req._id)}
                                    className="flex justify-center items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors shadow-sm font-medium"
                                >
                                    <CheckIcon className="w-5 h-5 mr-2" /> Approve
                                </button>
                                <button
                                    onClick={() => rejectWithdrawal(req._id)}
                                    className="flex justify-center items-center px-4 py-2 bg-white border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors font-medium"
                                >
                                    <XMarkIcon className="w-5 h-5 mr-2" /> Reject
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default WithdrawalRequests;
