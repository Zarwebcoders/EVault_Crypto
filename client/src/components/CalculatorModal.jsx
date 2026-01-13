import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calculator, DollarSign, Calendar, TrendingUp, Sparkles, ArrowRight, ChevronDown } from 'lucide-react';

const COIN_DATA = [
    { id: 'USDT', name: 'USDT', symbol: 'USDT', rate: 5, period: 'Monthly', color: '#F3BA2F', letter: 'U' },
    { id: 'DOGE', name: 'Dodge', symbol: 'DOGE', rate: 3, period: 'Monthly', color: '#BA9F33', letter: 'D' },
    { id: 'XRP', name: 'XRP', symbol: 'XRP', rate: 3, period: 'Monthly', color: '#33BAA0', letter: 'X' }, // Custom color for differentiation
    { id: 'ETH', name: 'Ethereum', symbol: 'ETH', rate: 2.7, period: 'Monthly', color: '#627EEA', letter: 'E' },
    { id: 'SOL', name: 'Solana', symbol: 'SOL', rate: 2.9, period: 'Monthly', color: '#14F195', letter: 'S' },
    { id: 'BNB', name: 'BNB', symbol: 'BNB', rate: 2.91, period: 'Monthly', color: '#F3BA2F', letter: 'B' },
    { id: 'BTC', name: 'Bitcoin', symbol: 'BTC', rate: 3.1, period: 'Monthly', color: '#F7931A', letter: 'B' },
];

const CalculatorModal = ({ isOpen, onClose }) => {
    const [amount, setAmount] = useState(1000);
    const [duration, setDuration] = useState(30);
    const [selectedCoin, setSelectedCoin] = useState(COIN_DATA[0]);
    const [showCoinDropdown, setShowCoinDropdown] = useState(false);

    // Prevent background scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const calculateReturns = () => {
        let dailyProfit;

        if (selectedCoin.period === 'Daily') {
            dailyProfit = amount * (selectedCoin.rate / 100);
        } else {
            // Monthly rate / 30 for daily estimation
            dailyProfit = amount * (selectedCoin.rate / 100 / 30);
        }

        const totalProfit = dailyProfit * duration;
        const totalReturn = amount + totalProfit;

        return {
            daily: dailyProfit.toFixed(2),
            total: totalProfit.toFixed(2),
            final: totalReturn.toFixed(2),
            rateLabel: selectedCoin.period === 'Daily'
                ? `${selectedCoin.rate}% Daily`
                : `${selectedCoin.rate}% Monthly`
        };
    };

    const results = calculateReturns();

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-[#0F172A]/80 backdrop-blur-md"
                />

                {/* Modal */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ type: "spring", duration: 0.5 }}
                    className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-[#D4AF37]/30 flex flex-col max-h-[90vh] overflow-hidden"
                >
                    {/* Decorative Top Bar */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#D4AF37] shrink-0" />

                    {/* Header */}
                    <div className="bg-[#FAFAF9] p-5 border-b border-gray-100 flex justify-between items-center relative overflow-hidden shrink-0">
                        {/* Background Blur Splatter */}
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-2xl" />

                        <div className="flex items-center gap-4 relative z-10">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0F172A] to-[#1E293B] flex items-center justify-center text-[#D4AF37] shadow-lg shadow-navy/20">
                                <Calculator size={22} />
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-[#0F172A]">Yield Calculator</h3>
                                <div className="flex items-center gap-1.5 text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
                                    <Sparkles size={10} />
                                    Calculate Your Profits
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="w-10 h-10 rounded-full bg-white border border-gray-200 text-gray-400 flex items-center justify-center hover:bg-[#0F172A] hover:text-white hover:border-[#0F172A] transition-all relative z-10"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Body - Scrollable if needed */}
                    <div className="p-5 space-y-8 overflow-y-auto">
                        {/* Input Section */}
                        <div className="space-y-6">

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Coin Selector */}
                                <div className="relative z-20">
                                    <label className="block text-sm font-bold text-[#0F172A] mb-2 px-1">
                                        Select Asset
                                    </label>
                                    <div className="relative">
                                        <button
                                            onClick={() => setShowCoinDropdown(!showCoinDropdown)}
                                            className="w-full pl-4 pr-4 py-3 bg-white border-2 border-gray-100 rounded-xl hover:border-[#D4AF37] focus:border-[#D4AF37] flex items-center justify-between transition-all"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs"
                                                    style={{ backgroundColor: selectedCoin.color }}
                                                >
                                                    {selectedCoin.letter}
                                                </div>
                                                <div className="text-left">
                                                    <div className="font-bold text-[#0F172A] leading-tight">{selectedCoin.symbol}</div>
                                                    <div className="text-[10px] text-gray-400 font-bold">{selectedCoin.rate}% {selectedCoin.period}</div>
                                                </div>
                                            </div>
                                            <ChevronDown className={`text-gray-400 transition-transform ${showCoinDropdown ? 'rotate-180' : ''}`} size={20} />
                                        </button>

                                        {/* Dropdown Menu */}
                                        <AnimatePresence>
                                            {showCoinDropdown && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: 10 }}
                                                    className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden max-h-60 overflow-y-auto p-1 z-30"
                                                >
                                                    {COIN_DATA.map((coin) => (
                                                        <button
                                                            key={coin.id}
                                                            onClick={() => {
                                                                setSelectedCoin(coin);
                                                                setShowCoinDropdown(false);
                                                            }}
                                                            className={`w-full p-2 flex items-center gap-3 rounded-lg transition-colors ${selectedCoin.id === coin.id ? 'bg-[#D4AF37]/10' : 'hover:bg-gray-50'}`}
                                                        >
                                                            <div
                                                                className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs"
                                                                style={{ backgroundColor: coin.color }}
                                                            >
                                                                {coin.letter}
                                                            </div>
                                                            <div className="text-left">
                                                                <div className="font-bold text-[#0F172A] text-sm">{coin.name}</div>
                                                                <div className="text-[10px] text-gray-400 font-bold">{coin.rate}% {coin.period}</div>
                                                            </div>
                                                            {selectedCoin.id === coin.id && (
                                                                <div className="ml-auto text-[#D4AF37]">
                                                                    <Sparkles size={14} />
                                                                </div>
                                                            )}
                                                        </button>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>

                                <div>
                                    <label className="flex justify-between text-sm font-bold text-[#0F172A] mb-2 px-1">
                                        <span>Investment Amount</span>
                                        <span className="text-[#D4AF37]">{selectedCoin.symbol}</span>
                                    </label>
                                    <div className="relative group">
                                        <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#D4AF37] transition-colors" size={20} />
                                        <input
                                            type="number"
                                            value={amount}
                                            onChange={(e) => setAmount(Number(e.target.value))}
                                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-[#D4AF37] focus:bg-white focus:ring-4 focus:ring-[#D4AF37]/10 font-bold text-[#0F172A] outline-none transition-all text-lg"
                                            placeholder="Enter amount..."
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="flex justify-between text-sm font-bold text-[#0F172A] mb-2 px-1">
                                    <span>Staking Duration</span>
                                    <span className="text-gray-400">Locked Period</span>
                                </label>
                                <div className="relative group">
                                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#D4AF37] transition-colors" size={20} />
                                    <select
                                        value={duration}
                                        onChange={(e) => setDuration(Number(e.target.value))}
                                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-[#D4AF37] focus:bg-white focus:ring-4 focus:ring-[#D4AF37]/10 font-bold text-[#0F172A] outline-none appearance-none transition-all text-lg cursor-pointer"
                                    >
                                        <option value={7}>7 Days</option>
                                        <option value={15}>15 Days</option>
                                        <option value={30}>30 Days (1 Month)</option>
                                        <option value={90}>90 Days (3 Months)</option>
                                        <option value={180}>180 Days (6 Months)</option>
                                        <option value={365}>365 Days (1 Year)</option>
                                    </select>
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                        <ArrowRight size={16} className="text-gray-400 rotate-90" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Results Section */}
                        <div className="relative overflow-hidden bg-[#0F172A] text-white rounded-2xl p-4 shadow-xl shadow-[#0F172A]/20">

                            <div className="relative z-10 grid grid-cols-2 gap-4 mb-2 pb-2 border-b border-white/10">
                                <div>
                                    <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Daily Profit</div>
                                    <div className="text-xl font-black text-green-400 flex items-center gap-1">
                                        <span className="text-sm opacity-60">$</span>{results.daily}
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Total Reward</div>
                                    <div className="text-xl font-black text-[#D4AF37] flex items-center justify-end gap-1">
                                        <span className="text-sm opacity-60">$</span>{results.total}
                                    </div>
                                </div>
                            </div>

                            <div className="relative z-10 flex justify-between items-end">
                                <div>
                                    <div className="text-sm font-bold text-gray-400 mb-1">Total Return</div>
                                    <div className="text-3xl lg:text-4xl font-black text-white flex items-baseline gap-1">
                                        <span className="text-lg text-[#D4AF37]">$</span>
                                        {results.final}
                                    </div>
                                </div>
                                <div className="ml-auto">
                                    <div className="px-3 py-1 rounded-full bg-white/10 border border-white/5 text-[10px] font-bold text-white/60">
                                        {results.rateLabel} APY
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button className="w-full group bg-gradient-to-r from-[#D4AF37] to-[#B8860B] hover:from-[#EDC967] hover:to-[#CF9500] text-white font-black py-4 rounded-xl shadow-lg shadow-[#D4AF37]/30 hover:shadow-xl hover:shadow-[#D4AF37]/40 hover:-translate-y-1 transition-all flex items-center justify-center gap-3">
                            Start Earning Now
                            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <ArrowRight size={14} />
                            </div>
                        </button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default CalculatorModal;
