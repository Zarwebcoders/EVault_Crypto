import React, { useMemo } from 'react';
import { useCrypto } from '../../context/CryptoContext';
import {
    CurrencyDollarIcon,
    ArrowTrendingUpIcon,
    ArrowDownTrayIcon,
    BriefcaseIcon,
    ClipboardDocumentCheckIcon,
    Square2StackIcon
} from '@heroicons/react/24/outline';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const StatCard = ({ title, value, subtext, icon: Icon, color, delay }) => (
    <div className={`card-premium rounded-xl p-6 flex justify-between items-start animate-fade-in-up ${delay}`}>
        <div>
            <p className="text-gray-500 text-sm font-medium">{title}</p>
            <h3 className="text-2xl font-bold text-gradient-gold mt-1">
                {value}
            </h3>
            <p className="text-xs text-gray-500 mt-1">{subtext}</p>
        </div>
        <div className={`p-3 rounded-lg shadow-lg ${color}`}>
            <Icon className="w-6 h-6 text-white" />
        </div>
    </div>
);

const UserDashboard = () => {
    const { user, investments, roiRates, connectWallet } = useCrypto();

    const totalActiveInvestments = (investments || []).filter(i => i.status === 'Active').length;

    const chartData = useMemo(() => {
        // Mock chart data - in real app would come from historical snapshots or calculations
        const labels = ['Day 1', 'Day 5', 'Day 10', 'Day 15', 'Day 20', 'Day 25', 'Day 30'];
        return {
            labels,
            datasets: [
                {
                    label: 'Portfolio Value',
                    data: [5000, 5200, 5350, 5500, 5800, 6100, (user?.totalInvested || 0) + (user?.balance || 0)], // Mock trend
                    fill: 'start',
                    borderColor: '#D4AF37',
                    backgroundColor: (context) => {
                        const ctx = context.chart.ctx;
                        const gradient = ctx.createLinearGradient(0, 0, 0, 300);
                        gradient.addColorStop(0, 'rgba(212, 175, 55, 0.2)');
                        gradient.addColorStop(1, 'rgba(212, 175, 55, 0)');
                        return gradient;
                    },
                    tension: 0.4,
                    pointBackgroundColor: '#FFFFFF',
                    pointBorderColor: '#D4AF37',
                    pointBorderWidth: 2,
                    pointRadius: 4,
                    pointHoverRadius: 6,
                },
            ],
        };
    }, [user]);

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: false,
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
            },
            y: {
                border: {
                    display: false
                },
                grid: {
                    color: '#f3f4f6'
                }
            }
        },
    };

    const handleConnectWallet = async () => {
        if (typeof window.ethereum !== 'undefined') {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                connectWallet(accounts[0]);
            } catch (error) {
                console.error("User rejected request", error);
                alert("Connection failed or rejected.");
            }
        } else {
            alert("Please install MetaMask to connect your wallet!");
        }
    };

    const copyAddress = () => {
        if (user?.walletAddress) {
            navigator.clipboard.writeText(user.walletAddress);
            // Could add toast here
            alert("Address copied!");
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 animate-fade-in-up">Dashboard Overview</h1>
                    <p className="text-gray-500 text-sm animate-fade-in-up delay-100">Welcome back, {user?.name || 'User'}</p>
                </div>
                {!user?.walletConnected ? (
                    <button
                        onClick={handleConnectWallet}
                        className="mt-4 sm:mt-0 px-6 py-2 btn-gold text-white font-medium rounded-full transition-transform hover:scale-105 active:scale-95"
                    >
                        Connect Wallet
                    </button>
                ) : (
                    <button
                        onClick={copyAddress}
                        className="mt-4 sm:mt-0 flex items-center px-4 py-2 bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37] rounded-full hover:bg-[#D4AF37] hover:text-white transition-all group"
                        title="Copy Address"
                    >
                        <span className="font-mono text-sm mr-2">
                            {user.walletAddress ? `${user.walletAddress.slice(0, 6)}...${user.walletAddress.slice(-4)}` : 'Connected'}
                        </span>
                        <Square2StackIcon className="w-4 h-4 group-hover:hidden" />
                        <ClipboardDocumentCheckIcon className="w-4 h-4 hidden group-hover:block" />
                    </button>
                )}
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Invested"
                    value={`$${(user?.totalInvested || 0).toLocaleString()}`}
                    subtext="+12% from last month"
                    icon={CurrencyDollarIcon}
                    color="bg-gradient-to-br from-[#D4AF37] to-[#B4941F]"
                    delay="delay-100"
                />
                <StatCard
                    title="Total ROI Earned"
                    value={`$${(user?.totalROI || 0).toLocaleString()}`}
                    subtext="Lifetime earnings"
                    icon={ArrowTrendingUpIcon}
                    color="bg-gradient-to-br from-green-500 to-emerald-600"
                    delay="delay-200"
                />
                <StatCard
                    title="Total Withdrawals"
                    value={`$${(user?.totalWithdrawn || 0).toLocaleString()}`}
                    subtext="Processed successfully"
                    icon={ArrowDownTrayIcon}
                    color="bg-gradient-to-br from-blue-500 to-blue-600"
                    delay="delay-300"
                />
                <StatCard
                    title="Active Investments"
                    value={totalActiveInvestments}
                    subtext="Running portfolios"
                    icon={BriefcaseIcon}
                    color="bg-gradient-to-br from-purple-500 to-purple-600"
                    delay="delay-300"
                />
            </div>

            {/* Charts & Recent - 2 Columns */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in-up delay-300">
                {/* Main Chart */}
                <div className="lg:col-span-2 card-premium p-6 rounded-xl">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-gray-900">Portfolio Growth</h3>
                        <select className="text-sm bg-white/50 border-none rounded-md text-gray-600 focus:ring-1 focus:ring-[#D4AF37]">
                            <option>Last 30 Days</option>
                            <option>Last 6 Months</option>
                            <option>All Time</option>
                        </select>
                    </div>
                    <div className="h-64">
                        <Line options={chartOptions} data={chartData} />
                    </div>
                </div>

                {/* Quick Daily Stats Widget */}
                <div className="card-premium p-6 rounded-xl">
                    <h3 className="font-bold text-gray-900 mb-4">Market Rates (Daily/Monthly)</h3>
                    <div className="space-y-4">
                        {Object.entries(roiRates).slice(0, 5).map(([token, info]) => (
                            <div key={token} className="flex justify-between items-center p-3 rounded-lg bg-white/40 hover:bg-white/60 transition-colors border border-white/50">
                                <div className="flex items-center">
                                    <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center font-bold text-xs text-gray-700 mr-3">
                                        {token[0]}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">{token}</p>
                                        <p className="text-xs text-gray-500">{info.period}</p>
                                    </div>
                                </div>
                                <span className="text-[#D4AF37] font-bold">
                                    {info.rate}%
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Recent Activity Table */}
            <div className="card-premium rounded-xl overflow-hidden animate-fade-in-up delay-300">
                <div className="px-6 py-4 border-b border-gray-100/50 flex justify-between items-center">
                    <h3 className="font-bold text-gray-900">Recent Investments</h3>
                    <button className="text-sm text-[#D4AF37] hover:underline">View All</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-3">ID</th>
                                <th className="px-6 py-3">Method</th>
                                <th className="px-6 py-3">Date</th>
                                <th className="px-6 py-3">Amount</th>
                                <th className="px-6 py-3">Returns</th>
                                <th className="px-6 py-3">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100/50">
                            {investments.slice(0, 5).map((inv) => (
                                <tr key={inv._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-3 text-gray-500">#{inv._id.slice(-4)}</td>
                                    <td className="px-6 py-3 font-medium text-gray-900">{inv.method}</td>
                                    <td className="px-6 py-3 text-gray-500">{new Date(inv.date || inv.createdAt).toLocaleDateString()}</td>
                                    <td className="px-6 py-3 font-medium text-gray-900">${inv.amount}</td>
                                    <td className="px-6 py-3 text-green-600 font-medium">+${inv.returns}</td>
                                    <td className="px-6 py-3">
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
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
