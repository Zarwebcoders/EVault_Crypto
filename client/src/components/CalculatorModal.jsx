import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calculator, DollarSign, Calendar, TrendingUp, Sparkles, ArrowRight } from 'lucide-react';

const CalculatorModal = ({ isOpen, onClose }) => {
    const [amount, setAmount] = useState(1000);
    const [duration, setDuration] = useState(30);
    const [dailyRoi, setDailyRoi] = useState(0.6); // 0.6% daily default

    const calculateReturns = () => {
        const dailyProfit = amount * (dailyRoi / 100);
        const totalProfit = dailyProfit * duration;
        const totalReturn = amount + totalProfit;
        return {
            daily: dailyProfit.toFixed(2),
            total: totalProfit.toFixed(2),
            final: totalReturn.toFixed(2)
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
                    className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden border border-[#D4AF37]/30"
                >
                    {/* Decorative Top Bar */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#D4AF37]" />

                    {/* Header */}
                    <div className="bg-[#FAFAF9] p-6 border-b border-gray-100 flex justify-between items-center relative overflow-hidden">
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

                    {/* Body */}
                    <div className="p-8 space-y-8">
                        {/* Input Section */}
                        <div className="space-y-6">
                            <div>
                                <label className="flex justify-between text-sm font-bold text-[#0F172A] mb-2 px-1">
                                    <span>Investment Amount</span>
                                    <span className="text-[#D4AF37]">USDT</span>
                                </label>
                                <div className="relative group">
                                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#D4AF37] transition-colors" size={20} />
                                    <input
                                        type="number"
                                        value={amount}
                                        onChange={(e) => setAmount(Number(e.target.value))}
                                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-[#D4AF37] focus:bg-white focus:ring-4 focus:ring-[#D4AF37]/10 font-bold text-[#0F172A] outline-none transition-all text-lg"
                                        placeholder="Enter amount..."
                                    />
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
                                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-[#D4AF37] focus:bg-white focus:ring-4 focus:ring-[#D4AF37]/10 font-bold text-[#0F172A] outline-none appearance-none transition-all text-lg cursor-pointer"
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
                        <div className="relative overflow-hidden bg-[#0F172A] text-white rounded-2xl p-6 shadow-xl shadow-[#0F172A]/20">
                            {/* Decorative Background */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-[60px] translate-x-1/2 -translate-y-1/2" />
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-[40px] -translate-x-1/2 translate-y-1/2" />

                            <div className="relative z-10 grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-white/10">
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

                            <div className="relative z-10 flex justifying-between items-end">
                                <div>
                                    <div className="text-sm font-bold text-gray-400 mb-1">Total Return</div>
                                    <div className="text-3xl lg:text-4xl font-black text-white flex items-baseline gap-1">
                                        <span className="text-lg text-[#D4AF37]">$</span>
                                        {results.final}
                                    </div>
                                </div>
                                <div className="ml-auto">
                                    <div className="px-3 py-1 rounded-full bg-white/10 border border-white/5 text-[10px] font-bold text-white/60">
                                        0.6% Daily APY
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
