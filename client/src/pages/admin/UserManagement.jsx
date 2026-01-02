import React from 'react';
import { useCrypto } from '../../context/CryptoContext';

const UserManagement = () => {
    const { allUsers } = useCrypto();

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">User Management</h1>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                    <span className="font-semibold text-gray-700">All Registered Users</span>
                    <input
                        type="text"
                        placeholder="Search users..."
                        className="rounded-lg border-gray-300 py-1.5 text-sm focus:ring-[#D4AF37]"
                    />
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-sm">
                        <thead className="bg-gray-100 text-gray-500 font-medium">
                            <tr>
                                <th className="px-6 py-3">ID</th>
                                <th className="px-6 py-3">User</th>
                                <th className="px-6 py-3">Email</th>
                                <th className="px-6 py-3">Join Date</th>
                                <th className="px-6 py-3">Total Invested</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {allUsers.map(u => (
                                <tr key={u.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-3 text-gray-500">#{u.id}</td>
                                    <td className="px-6 py-3 font-medium text-gray-900">{u.name}</td>
                                    <td className="px-6 py-3 text-gray-500">{u.email}</td>
                                    <td className="px-6 py-3 text-gray-500">{u.joinDate}</td>
                                    <td className="px-6 py-3 font-mono">${u.totalInvested?.toLocaleString() || 0}</td>
                                    <td className="px-6 py-3">
                                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                                            {u.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-3 text-right">
                                        <button className="text-gray-400 hover:text-[#D4AF37] font-medium text-xs uppercase tracking-wide">
                                            Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default UserManagement;
