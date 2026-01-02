import React from 'react';
import { useCrypto } from '../../context/CryptoContext';
import {
    UsersIcon,
    BanknotesIcon,
    ArrowDownTrayIcon,
    ChartBarIcon
} from '@heroicons/react/24/outline';
import { Line, Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

const AdminDashboard = () => {
    const { allUsers, investments, withdrawals, investmentRequests } = useCrypto();

    const totalUsers = allUsers.length;
    const totalInvestments = investments.reduce((sum, inv) => sum + parseFloat(inv.amount), 0);
    const totalWithdrawals = withdrawals.reduce((sum, w) => sum + parseFloat(w.amount), 0);
    const pendingRequests = investmentRequests.length;

    const lineData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Investments',
                data: [12000, 19000, 15000, 25000, 22000, 30000],
                borderColor: '#D4AF37',
                backgroundColor: 'rgba(212, 175, 55, 0.5)',
            },
            {
                label: 'Withdrawals',
                data: [2000, 5000, 3000, 8000, 6000, 9000],
                borderColor: '#ef4444',
                backgroundColor: 'rgba(239, 68, 68, 0.5)',
            }
        ]
    };

    const doughnutData = {
        labels: ['USDT', 'BTC', 'ETH', 'SOL'],
        datasets: [
            {
                data: [45, 25, 20, 10],
                backgroundColor: [
                    '#22c55e',
                    '#f59e0b',
                    '#6366f1',
                    '#8b5cf6'
                ],
                borderWidth: 0,
            },
        ],
    };

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">Admin Overview</h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-gray-500 text-sm">Total Users</p>
                            <h3 className="text-2xl font-bold text-gray-800">{totalUsers}</h3>
                        </div>
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                            <UsersIcon className="w-6 h-6" />
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-gray-500 text-sm">Total Deposited</p>
                            <h3 className="text-2xl font-bold text-gray-800">${totalInvestments.toLocaleString()}</h3>
                        </div>
                        <div className="p-3 bg-green-50 text-green-600 rounded-lg">
                            <BanknotesIcon className="w-6 h-6" />
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-gray-500 text-sm">Total Withdrawn</p>
                            <h3 className="text-2xl font-bold text-gray-800">${totalWithdrawals.toLocaleString()}</h3>
                        </div>
                        <div className="p-3 bg-red-50 text-red-600 rounded-lg">
                            <ArrowDownTrayIcon className="w-6 h-6" />
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-gray-500 text-sm">Pending Requests</p>
                            <h3 className="text-2xl font-bold text-gray-800">{pendingRequests}</h3>
                        </div>
                        <div className="p-3 bg-yellow-50 text-yellow-600 rounded-lg">
                            <ChartBarIcon className="w-6 h-6" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="font-bold text-gray-800 mb-4">Platform Performance</h3>
                    <div className="h-64">
                        <Line options={{ responsive: true, maintainAspectRatio: false }} data={lineData} />
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="font-bold text-gray-800 mb-4">Asset Distribution</h3>
                    <div className="h-64 flex justify-center">
                        <Doughnut options={{ responsive: true, maintainAspectRatio: false }} data={doughnutData} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
