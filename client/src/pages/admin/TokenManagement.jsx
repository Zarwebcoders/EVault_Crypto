import React, { useState } from 'react';
import { useCrypto } from '../../context/CryptoContext';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

const TokenManagement = () => {
    const { roiRates, updateRoiRate } = useCrypto();
    const [editMode, setEditMode] = useState(null);
    const [tempRate, setTempRate] = useState('');
    const [message, setMessage] = useState('');

    const handleEdit = (token) => {
        setEditMode(token);
        setTempRate(roiRates[token].rate);
    };

    const handleSave = (token) => {
        updateRoiRate(token, parseFloat(tempRate));
        setEditMode(null);
        setMessage(`Updated ${token} ROI rate successfully.`);
        setTimeout(() => setMessage(''), 3000);
    };

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">Token ROI Configuration</h1>

            {message && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
                    <strong className="font-bold">Success! </strong>
                    <span className="block sm:inline">{message}</span>
                </div>
            )}

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="min-w-full text-left text-sm">
                    <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-4">Token</th>
                            <th className="px-6 py-4">Current ROI Rate (%)</th>
                            <th className="px-6 py-4">Period</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {Object.entries(roiRates).map(([token, info]) => (
                            <tr key={token} className="hover:bg-gray-50">
                                <td className="px-6 py-4 font-bold text-gray-900 flex items-center">
                                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3 text-xs">
                                        {token[0]}
                                    </div>
                                    {token}
                                </td>
                                <td className="px-6 py-4">
                                    {editMode === token ? (
                                        <input
                                            type="number"
                                            value={tempRate}
                                            onChange={(e) => setTempRate(e.target.value)}
                                            step="0.01"
                                            className="w-24 rounded border-gray-300 py-1 px-2 focus:ring-[#D4AF37] focus:border-[#D4AF37]"
                                        />
                                    ) : (
                                        <span className="text-lg font-mono font-medium text-green-600">{info.rate}%</span>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-gray-500">{info.period}</td>
                                <td className="px-6 py-4 text-right">
                                    {editMode === token ? (
                                        <div className="space-x-2">
                                            <button
                                                onClick={() => handleSave(token)}
                                                className="text-green-600 hover:text-green-800 font-medium"
                                            >
                                                Save
                                            </button>
                                            <button
                                                onClick={() => setEditMode(null)}
                                                className="text-gray-400 hover:text-gray-600"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => handleEdit(token)}
                                            className="text-[#D4AF37] hover:text-yellow-600 font-medium"
                                        >
                                            Edit Rate
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TokenManagement;
