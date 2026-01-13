import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NetworkGrowth = () => {
    const navigate = useNavigate();
    return (
        <section className="relative py-14 overflow-hidden bg-gradient-to-br from-white via-[#FFFBF0] to-[#FFF8E1]">


            {/* Animated Golden Orbs */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.4, 0.2]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-[#D4AF37]/60 to-[#FFD700]/60 rounded-full blur-xl"
            />
            <motion.div
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.15, 0.3, 0.15]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-tl from-[#FFD700]/15 to-[#D4AF37]/10 rounded-full blur-3xl"
            />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left Column: Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-[#0F172A]"
                    >
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 text-[#D4AF37] font-bold text-xs uppercase tracking-widest mb-8">
                            <TrendingUp size={12} />
                            Join The Movement
                        </div>

                        <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">
                            Major In Community Using<br />
                            <span className="text-gradient-gold">eVAULT Crypto Bank.</span><br />
                            You can, too.
                        </h2>

                        <button onClick={() => navigate('/login')} className="group inline-flex items-center gap-3 bg-gradient-to-r from-[#0F172A] to-[#1E293B] text-white font-bold py-4 px-8 rounded-xl shadow-2xl hover:shadow-[#D4AF37]/30 hover:-translate-y-1 transition-all duration-300">
                            <span className="text-lg">Join the Network</span>
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FFD700] to-[#D4AF37] flex items-center justify-center group-hover:scale-110 transition-transform">
                                <ArrowUpRight size={16} className="text-[#0F172A]" />
                            </div>
                        </button>

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-6 mt-12 pt-8 border-t border-[#D4AF37]/20">
                            <div>
                                <div className="text-4xl font-black mb-2 text-[#D4AF37]">45K+</div>
                                <div className="text-gray-600 text-sm">Active Users</div>
                            </div>
                            <div>
                                <div className="text-4xl font-black mb-2 text-[#D4AF37]">$500M+</div>
                                <div className="text-gray-600 text-sm">Total Volume</div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column: Phone Mockups */}
                    <div className="hidden md:block relative h-[600px] perspective-[2000px]">

                        {/* Phone 1: Left - Transaction History */}
                        <motion.div
                            initial={{ opacity: 0, y: 50, rotateY: -15 }}
                            whileInView={{ opacity: 1, y: 0, rotateY: -8 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            whileHover={{
                                y: -20,
                                rotateY: -12,
                                scale: 1.05,
                                transition: { duration: 0.3 }
                            }}
                            className="absolute top-20 left-0 md:left-10 w-64 h-[480px] bg-white rounded-[2.5rem] shadow-2xl border-[6px] border-[#0F172A] p-3 transform-gpu z-10"
                        >
                            {/* Phone Header */}
                            <div className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] rounded-2xl p-4 mb-4 text-white relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-16 h-16 bg-[#D4AF37]/20 rounded-full blur-xl" />
                                <div className="p-3 bg-gray-50 rounded-xl">
                                    <div className="text-xs opacity-80 mb-1">eVault Crypto Bank</div>
                                    <div className="text-sm font-bold text-navy">Global Network</div>
                                </div>
                            </div>

                            {/* Transaction List */}
                            <div className="space-y-3">
                                {[
                                    { amount: "$1,500.00", type: "Deposit", color: "text-green-600", icon: "↓", bg: "bg-green-100" },
                                    { amount: "$850.00", type: "Withdraw", color: "text-red-600", icon: "↑", bg: "bg-red-100" },
                                    { amount: "$2,100.00", type: "Deposit", color: "text-green-600", icon: "↓", bg: "bg-green-100" },
                                    { amount: "$650.00", type: "Reward", color: "text-[#D4AF37]", icon: "★", bg: "bg-[#D4AF37]/10" }
                                ].map((tx, i) => (
                                    <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-8 h-8 rounded-full ${tx.bg} flex items-center justify-center text-sm font-bold ${tx.color}`}>
                                                {tx.icon}
                                            </div>
                                            <div>
                                                <div className="text-xs font-bold text-gray-900">{tx.type}</div>
                                                <div className="text-xs text-gray-400">Today</div>
                                            </div>
                                        </div>
                                        <div className={`text-sm font-bold ${tx.color}`}>{tx.amount}</div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Phone 2: Center - Income Dashboard */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            whileHover={{
                                y: -25,
                                scale: 1.08,
                                transition: { duration: 0.3 }
                            }}
                            className="absolute top-10 left-1/2 -translate-x-1/2 w-72 h-[520px] bg-white rounded-[2.5rem] shadow-2xl border-[6px] border-[#0F172A] p-3 transform-gpu z-20"
                        >
                            {/* Phone Header */}
                            <div className="bg-gradient-to-br from-[#D4AF37] to-[#B8860B] rounded-2xl p-5 mb-5 text-white relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-white/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                                <div className="relative">
                                    <div className="text-xs opacity-90 mb-1">eVault Crypto Bank</div>
                                    <div className="text-xl font-bold mb-4">Income Dashboard</div>
                                    <div className="text-xs opacity-90 mb-1">Total Balance</div>
                                    <div className="text-3xl font-black">$3,221.00</div>
                                </div>
                            </div>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-2 gap-3 mb-4">
                                <div className="bg-gradient-to-br from-green-50 to-green-100/50 rounded-xl p-4 text-center border border-green-200">
                                    <div className="text-xs text-gray-600 font-bold uppercase mb-1">ROI</div>
                                    <div className="text-green-600 font-bold text-xl">$844.00</div>
                                </div>
                                <div className="bg-gradient-to-br from-[#FFF8E1] to-[#FFEBB2] rounded-xl p-4 text-center border border-[#D4AF37]/30">
                                    <div className="text-xs text-gray-600 font-bold uppercase mb-1">Staked</div>
                                    <div className="text-[#D4AF37] font-bold text-xl">$2,377</div>
                                </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-xs font-bold text-gray-600">Monthly Goal</span>
                                    <span className="text-xs font-bold text-[#D4AF37]">78%</span>
                                </div>
                                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <div className="w-3/4 h-full bg-gradient-to-r from-[#D4AF37] to-[#FFD700] rounded-full shadow-inner"></div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Phone 3: Right - Details */}
                        <motion.div
                            initial={{ opacity: 0, y: 50, rotateY: 15 }}
                            whileInView={{ opacity: 1, y: 0, rotateY: 8 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            whileHover={{
                                y: -20,
                                rotateY: 12,
                                scale: 1.05,
                                transition: { duration: 0.3 }
                            }}
                            className="absolute top-20 right-0 md:right-10 w-64 h-[480px] bg-white rounded-[2.5rem] shadow-2xl border-[6px] border-[#0F172A] p-3 transform-gpu z-10"
                        >
                            {/* Phone Header */}
                            <div className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] rounded-2xl p-4 mb-4 text-white relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-16 h-16 bg-[#D4AF37]/20 rounded-full blur-xl" />
                                <div className="p-3 bg-gray-50 rounded-xl">
                                    <div className="text-xs opacity-80 mb-1">eVault Crypto Bank</div>
                                    <div className="text-sm font-bold text-navy">Active Stakers</div>
                                </div>
                            </div>

                            {/* Activity List */}
                            <div className="space-y-3">
                                {[
                                    { title: "Staking Reward", desc: "You earned $45.00", time: "2h ago", color: "text-[#D4AF37]" },
                                    { title: "Deposit Confirmed", desc: "Added $1,500.00", time: "5h ago", color: "text-green-600" },
                                    { title: "Withdrawal Complete", desc: "Sent $850.00", time: "1d ago", color: "text-blue-600" },
                                    { title: "Bonus Unlocked", desc: "Earned $120.00", time: "2d ago", color: "text-[#D4AF37]" }
                                ].map((activity, i) => (
                                    <div key={i} className="p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors border border-gray-100">
                                        <div className="flex items-start justify-between mb-1">
                                            <div className={`text-sm font-bold ${activity.color}`}>{activity.title}</div>
                                            <div className="text-xs text-gray-400">{activity.time}</div>
                                        </div>
                                        <div className="text-xs text-gray-500">{activity.desc}</div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .perspective-2000 {
                    perspective: 2000px;
                }
                .transform-gpu {
                    transform-style: preserve-3d;
                }
                .text-gradient-gold {
                    background: linear-gradient(135deg, #D4AF37 0%, #FFD700 50%, #DAA520 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }
            `}</style>
        </section>
    );
};

export default NetworkGrowth;
