import React from 'react';
import { useCrypto } from '../../context/CryptoContext';
import {
    UsersIcon,
    BanknotesIcon,
    ArrowDownTrayIcon,
    ChartBarIcon,
    ChevronUpIcon,
    ChevronDownIcon,
    ClockIcon,
    // TrendingUpIcon
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
    ArcElement,
    Filler
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    Filler
);

const AdminDashboard = () => {
    const { allUsers, investmentRequests, withdrawalRequests } = useCrypto();

    // Use global data for stats
    const totalUsers = allUsers.length;
    const totalInvestments = investmentRequests.reduce((sum, inv) => sum + parseFloat(inv.amount || 0), 0);
    // Filter out rejected withdrawals for actual withdrawn amount? Usually "Total Withdrawn" implies approved ones.
    // The previous code summed ALL withdrawals. Let's sum Approved withdrawals to be accurate, or all? 
    // Usually admin dashboard shows volume. Let's stick to Approved for "Total Withdrawn" to be strictly accurate, 
    // or All for "Volume". Let's use Approved for accuracy.
    const approvedWithdrawals = withdrawalRequests.filter(w => w.status === 'Approved');
    const totalWithdrawals = approvedWithdrawals.reduce((sum, w) => sum + parseFloat(w.amount || 0), 0);
    const pendingRequests = investmentRequests.filter(i => i.status === 'Pending').length + withdrawalRequests.filter(w => w.status === 'Pending').length;

    // --- Chart 1: Platform Performance (Last 6 Months) ---
    const getLast6Months = () => {
        const months = [];
        const today = new Date();
        for (let i = 5; i >= 0; i--) {
            const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
            months.push({
                name: d.toLocaleString('default', { month: 'short' }),
                month: d.getMonth(),
                year: d.getFullYear()
            });
        }
        return months;
    };

    const last6Months = getLast6Months();
    const chartLabels = last6Months.map(m => m.name);

    const getMonthlyData = (data, dateField) => {
        return last6Months.map(m => {
            return data.reduce((sum, item) => {
                const d = new Date(item[dateField] || item.createdAt);
                if (d.getMonth() === m.month && d.getFullYear() === m.year) {
                    return sum + parseFloat(item.amount || 0);
                }
                return sum;
            }, 0);
        });
    };

    const monthlyInvestments = getMonthlyData(investmentRequests, 'startDate');
    const monthlyWithdrawals = getMonthlyData(withdrawalRequests, 'date');

    const lineData = {
        labels: chartLabels,
        datasets: [
            {
                label: 'Investments',
                data: monthlyInvestments,
                borderColor: '#D4AF37',
                backgroundColor: 'rgba(212, 175, 55, 0.1)',
                borderWidth: 3,
                tension: 0.4,
                fill: true,
                pointBackgroundColor: '#D4AF37',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 5,
                pointHoverRadius: 7,
            },
            {
                label: 'Withdrawals',
                data: monthlyWithdrawals,
                borderColor: '#ef4444',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                borderWidth: 3,
                tension: 0.4,
                fill: true,
                pointBackgroundColor: '#ef4444',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 5,
                pointHoverRadius: 7,
            }
        ]
    };

    // --- Chart 2: Asset Distribution ---
    // Aggregate investments by method
    const assetStats = investmentRequests.reduce((acc, inv) => {
        const method = inv.method || 'Other';
        acc[method] = (acc[method] || 0) + parseFloat(inv.amount || 0);
        return acc;
    }, {});

    // Ensure we have at least these keys for the chart colors order, or dynamic
    const assetLabels = Object.keys(assetStats);
    const assetValues = Object.values(assetStats);

    // Calculate percentages for checking
    const totalAssetValue = assetValues.reduce((a, b) => a + b, 0);
    const assetPercentages = assetValues.map(v => totalAssetValue ? ((v / totalAssetValue) * 100).toFixed(1) : 0);

    const doughnutData = {
        labels: assetLabels.length > 0 ? assetLabels : ['No Data'],
        datasets: [
            {
                data: assetValues.length > 0 ? assetPercentages : [100], // Use percentages or raw values? ChartJS handles raw values but shows relative size. User image shows labels with %.
                // Actually, let's pass RAW values to data, and formatter can show %.
                // But the legend below explicitly iterates data relative to labels.

                backgroundColor: [
                    'rgba(34, 197, 94, 0.8)', // USDT (Green)
                    'rgba(245, 158, 11, 0.8)', // BTC (Orange)
                    'rgba(99, 102, 241, 0.8)', // ETH (Indigo)
                    'rgba(139, 92, 246, 0.8)', // SOL (Purple)
                    'rgba(236, 72, 153, 0.8)', // Pink
                    'rgba(14, 165, 233, 0.8)', // Sky
                ],
                borderColor: [
                    '#16a34a',
                    '#d97706',
                    '#4f46e5',
                    '#7c3aed',
                    '#db2777',
                    '#0ea5e9',
                ],
                borderWidth: 2,
                hoverOffset: 15,
            },
        ],
    };

    // Helper for custom legend below chart
    const assetLegendData = assetLabels.map((label, index) => ({
        label,
        value: assetPercentages[index],
        color: doughnutData.datasets[0].backgroundColor[index % doughnutData.datasets[0].backgroundColor.length]
    }));

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    font: {
                        family: "'Inter', sans-serif"
                    },
                    padding: 20,
                    usePointStyle: true,
                }
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                titleFont: {
                    family: "'Inter', sans-serif"
                },
                bodyFont: {
                    family: "'Inter', sans-serif"
                },
                padding: 12,
                cornerRadius: 8,
            }
        },
        scales: {
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    font: {
                        family: "'Inter', sans-serif"
                    }
                }
            },
            y: {
                grid: {
                    color: 'rgba(0, 0, 0, 0.05)'
                },
                ticks: {
                    font: {
                        family: "'Inter', sans-serif"
                    },
                    callback: function (value) {
                        return '$' + value.toLocaleString();
                    }
                }
            }
        }
    };

    const doughnutOptions = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '70%',
        plugins: {
            legend: {
                position: 'right',
                labels: {
                    font: {
                        family: "'Inter', sans-serif"
                    },
                    padding: 20,
                    usePointStyle: true,
                    pointStyle: 'circle'
                }
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                titleFont: {
                    family: "'Inter', sans-serif"
                },
                bodyFont: {
                    family: "'Inter', sans-serif"
                },
                padding: 12,
                cornerRadius: 8,
                callbacks: {
                    label: function (context) {
                        return `${context.label}: ${context.parsed}%`;
                    }
                }
            }
        }
    };

    return (
        <div className="space-y-8">
            {/* Stats Cards */}
            <h1 className='text-3xl font-bold text-gray-900 flex items-center'>Dashboard Overview</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="group bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="p-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-gray-500 text-sm font-medium">Total Users</p>
                                <h3 className="text-2xl font-bold text-gray-800 mt-2">{totalUsers}</h3>
                            </div>
                            <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl shadow-md">
                                <UsersIcon className="w-6 h-6" />
                            </div>
                        </div>
                    </div>
                    <div className="h-1 bg-gradient-to-r from-blue-500 to-transparent"></div>
                </div>

                <div className="group bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="p-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-gray-500 text-sm font-medium">Total Deposited</p>
                                <h3 className="text-2xl font-bold text-gray-800 mt-2">${totalInvestments.toLocaleString()}</h3>
                            </div>
                            <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl shadow-md">
                                <BanknotesIcon className="w-6 h-6" />
                            </div>
                        </div>
                    </div>
                    <div className="h-1 bg-gradient-to-r from-green-500 to-transparent"></div>
                </div>

                <div className="group bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="p-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-gray-500 text-sm font-medium">Total Withdrawn</p>
                                <h3 className="text-2xl font-bold text-gray-800 mt-2">${totalWithdrawals.toLocaleString()}</h3>
                            </div>
                            <div className="p-3 bg-gradient-to-br from-red-500 to-red-600 text-white rounded-xl shadow-md">
                                <ArrowDownTrayIcon className="w-6 h-6" />
                            </div>
                        </div>
                    </div>
                    <div className="h-1 bg-gradient-to-r from-red-500 to-transparent"></div>
                </div>

                <div className="group bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="p-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-gray-500 text-sm font-medium">Pending Requests</p>
                                <h3 className="text-2xl font-bold text-gray-800 mt-2">{pendingRequests}</h3>
                            </div>
                            <div className="p-3 bg-gradient-to-br from-yellow-500 to-yellow-600 text-white rounded-xl shadow-md">
                                <ChartBarIcon className="w-6 h-6" />
                            </div>
                        </div>
                    </div>
                    <div className="h-1 bg-gradient-to-r from-yellow-500 to-transparent"></div>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Platform Performance Chart */}
                <div className="lg:col-span-2 group bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
                    <div className="p-6 border-b border-gray-100">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                            <div>
                                <h3 className="text-lg font-bold text-gray-800 flex items-center">
                                    {/* <TrendingUpIcon className="w-5 h-5 text-[#D4AF37] mr-2" /> */}
                                    Platform Performance
                                </h3>
                                <p className="text-gray-600 text-sm mt-1">Monthly investments vs withdrawals</p>
                            </div>
                            <div className="mt-2 sm:mt-0 flex space-x-4">
                                <div className="flex items-center">
                                    <div className="w-3 h-3 rounded-full bg-[#D4AF37] mr-2"></div>
                                    <span className="text-sm text-gray-600">Investments</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-3 h-3 rounded-full bg-[#ef4444] mr-2"></div>
                                    <span className="text-sm text-gray-600">Withdrawals</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="p-4">
                        <div className="h-72">
                            <Line options={chartOptions} data={lineData} />
                        </div>
                    </div>
                </div>

                {/* Asset Distribution Chart */}
                <div className="group bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
                    <div className="p-6 border-b border-gray-100">
                        <h3 className="text-lg font-bold text-gray-800">Asset Distribution</h3>
                        <p className="text-gray-600 text-sm mt-1">Portfolio composition by asset</p>
                    </div>
                    <div className="p-4">
                        <div className="h-72">
                            <Doughnut options={doughnutOptions} data={doughnutData} />
                        </div>
                        <div className="mt-6 grid grid-cols-2 gap-4">
                            {assetLegendData.length > 0 ? assetLegendData.map((item, index) => (
                                <div key={item.label} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <div className="flex items-center">
                                        <div
                                            className="w-3 h-3 rounded-full mr-2"
                                            style={{ backgroundColor: item.color }}
                                        ></div>
                                        <span className="text-sm font-medium text-gray-700">{item.label}</span>
                                    </div>
                                    <span className="text-sm font-bold text-gray-900">
                                        {item.value}%
                                    </span>
                                </div>
                            )) : (
                                <div className="col-span-2 text-center text-gray-500 text-sm py-4">No assets found</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;