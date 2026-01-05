import React, { useMemo } from 'react';
import { useCrypto } from '../../context/CryptoContext';
import {
    CurrencyDollarIcon,
    ArrowTrendingUpIcon,
    ArrowDownTrayIcon,
    BriefcaseIcon,
    ClipboardDocumentCheckIcon,
    Square2StackIcon,
    WalletIcon,
    ChartBarIcon,
    ArrowTopRightOnSquareIcon
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
const StatCard = ({ title, value, subtext, icon: Icon, gradient, delay }) => (
    <div className={`rounded-xl p-5 flex justify-between items-start border border-gray-400 hover:border hover:border-[#D4AF37] hover:shadow-md hover:shadow-[#D4AF37] transition-all duration-300 ease-in-out animate-fade-in-up ${delay}`}>
        <div>
            <p className="text-gray-500 text-sm font-medium">{title}</p>
            <h3 className="text-2xl font-bold text-gradient-gold mt-1">
                {value}
            </h3>
            <p className="text-xs text-gray-500 mt-1">{subtext}</p>
        </div>
        <div className={`p-3 rounded-xl bg-gradient-to-br ${gradient} shadow-lg shadow-gray-200`}>
            <Icon className="w-6 h-6 text-white" />
        </div>
    </div>
);

const UserDashboard = () => {
    const { user, investments, roiRates, connectWallet } = useCrypto();

    const totalActiveInvestments = (investments || []).filter(i => i.status === 'Active').length;

    const chartData = useMemo(() => {
        // Calculate current total value
        const currentTotal = (user?.totalInvested || 0) + (user?.balance || 0);

        // Generate realistic-looking historical data working backwards
        // If total is 0, show a flat line of 0s
        // If total > 0, generate a growth curve
        const dataPoints = [];
        const labels = ['Day 1', 'Day 5', 'Day 10', 'Day 15', 'Day 20', 'Day 25', 'Day 30'];

        if (currentTotal === 0) {
            dataPoints.push(0, 0, 0, 0, 0, 0, 0);
        } else {
            // Start from current value and work backwards
            dataPoints[6] = currentTotal;
            for (let i = 5; i >= 0; i--) {
                // Determine a random percentage drop for previous days (e.g., 2-8% growth per period)
                const reductionFactor = 1 - (Math.random() * 0.05 + 0.02);
                dataPoints[i] = dataPoints[i + 1] * reductionFactor;
            }
        }

        return {
            labels,
            datasets: [
                {
                    label: 'Portfolio Value',
                    data: dataPoints,
                    fill: true,
                    borderColor: '#D4AF37',
                    borderWidth: 3,
                    backgroundColor: (context) => {
                        const ctx = context.chart.ctx;
                        const gradient = ctx.createLinearGradient(0, 0, 0, 300);
                        gradient.addColorStop(0, 'rgba(212, 175, 55, 0.25)');
                        gradient.addColorStop(1, 'rgba(212, 175, 55, 0.01)');
                        return gradient;
                    },
                    tension: 0.4,
                    pointBackgroundColor: '#FFFFFF',
                    pointBorderColor: '#D4AF37',
                    pointBorderWidth: 2,
                    pointRadius: 0,
                    pointHoverRadius: 6,
                },
            ],
        };
    }, [user]);

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: '#111827',
                titleColor: '#9CA3AF',
                bodyColor: '#F3F4F6',
                padding: 12,
                cornerRadius: 8,
                displayColors: false,
            }
        },
        scales: {
            x: {
                grid: { display: false },
                ticks: { color: '#9CA3AF', font: { size: 10 } }
            },
            y: {
                border: { display: false },
                grid: { color: '#F3F4F6', borderDash: [4, 4] },
                ticks: { color: '#9CA3AF', font: { size: 10 }, callback: (val) => `$${val}` }
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
            alert("Address copied!");
        }
    };

    return (
        <div className="space-y-8 max-w-7xl mx-auto pb-10">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Overview</h1>
                    <p className="text-gray-500 mt-2 flex items-center gap-2">
                        Welcome back, <span className="font-bold text-gray-900">{user?.name || 'Investor'}</span>
                        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                        Last login: Today, 9:41 AM
                    </p>
                </div>

                {!user?.walletConnected ? (
                    <button
                        onClick={handleConnectWallet}
                        className="group relative inline-flex items-center justify-center px-8 py-3 font-bold text-white transition-all duration-200 bg-gray-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:bg-gray-800 hover:-translate-y-1 shadow-lg"
                    >
                        <WalletIcon className="w-5 h-5 mr-2 text-[#D4AF37]" />
                        Connect Wallet
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-pulse"></div>
                    </button>
                ) : (
                    <div
                        onClick={copyAddress}
                        className="flex items-center gap-3 bg-white border border-gray-200 rounded-2xl p-2 pr-5 shadow-sm hover:shadow-md cursor-pointer transition-all group"
                    >
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#bfa03a] flex items-center justify-center text-white shadow-md">
                            <WalletIcon className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 font-semibold uppercase">Wallet Connected</p>
                            <div className="flex items-center gap-1.5">
                                <span className="text-sm font-bold text-gray-900 font-mono">
                                    {user.walletAddress ? `${user.walletAddress.slice(0, 6)}...${user.walletAddress.slice(-4)}` : '0x...'}
                                </span>
                                <Square2StackIcon className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#D4AF37]" />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Assets"
                    value={`$${(user?.totalInvested || 0).toLocaleString()}`}
                    subtext="Current value"
                    icon={CurrencyDollarIcon}
                    gradient="from-yellow-400 to-yellow-600"
                    delay="delay-0"
                />
                <StatCard
                    title="Total Returns"
                    value={`$${(user?.totalROI || 0).toLocaleString()}`}
                    subtext="Lifetime Profit"
                    icon={ArrowTrendingUpIcon}
                    gradient="from-green-400 to-emerald-600"
                    delay="delay-100"
                />
                <StatCard
                    title="Withdrawn"
                    value={`$${(user?.totalWithdrawn || 0).toLocaleString()}`}
                    subtext="Successfully paid"
                    icon={ArrowDownTrayIcon}
                    gradient="from-blue-400 to-indigo-600"
                    delay="delay-200"
                />
                <StatCard
                    title="Active Pools"
                    value={totalActiveInvestments}
                    subtext="Positions open"
                    icon={BriefcaseIcon}
                    gradient="from-purple-400 to-fuchsia-600"
                    delay="delay-300"
                />
            </div>

            {/* Main Content Split */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Chart Section */}
                <div className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">Portfolio Performance</h3>
                            <p className="text-sm text-gray-500">Growth analysis over time</p>
                        </div>
                        <div className="flex bg-gray-100 rounded-lg p-1 gap-1">
                            {['1D', '1W', '1M', '1Y'].map((period) => (
                                <button key={period} className={`px-3 py-1 text-xs font-bold rounded-md transition-colors ${period === '1M' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}>
                                    {period}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="h-[300px] w-full relative">
                        <Line options={chartOptions} data={chartData} />
                    </div>
                </div>

                {/* Market Rates Widget */}
                <div className="lg:col-span-1 bg-gray-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
                    {/* Decorative Blobs */}
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-60 h-60 bg-[#D4AF37] rounded-full blur-3xl opacity-20"></div>
                    <div className="absolute bottom-0 left-0 -ml-10 -mb-10 w-40 h-40 bg-blue-600 rounded-full blur-2xl opacity-20"></div>

                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-bold text-lg flex items-center gap-2">
                                <ChartBarIcon className="w-5 h-5 text-[#D4AF37]" />
                                Market APY
                            </h3>
                            <span className="text-xs font-medium text-gray-400 bg-gray-800 px-2 py-1 rounded">Live Updates</span>
                        </div>

                        <div className="space-y-4">
                            {Object.entries(roiRates).slice(0, 4).map(([token, info], idx) => (
                                <div key={token} className="group flex items-center justify-between p-3 rounded-xl bg-gray-800/50 hover:bg-gray-800 border border-gray-700/50 transition-all cursor-default">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-gray-900 text-sm ${idx === 0 ? 'bg-[#D4AF37]' : 'bg-gray-700 text-white group-hover:bg-[#D4AF37] group-hover:text-gray-900 transition-colors'
                                            }`}>
                                            {token[0]}
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm">{token}</p>
                                            <p className="text-xs text-gray-400">{info.period} Returns</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-mono font-bold text-[#D4AF37] text-lg">{info.rate}%</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button className="w-full mt-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-sm font-bold transition-colors flex items-center justify-center gap-2">
                            View All Markets
                            <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default UserDashboard;