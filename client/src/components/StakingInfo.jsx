import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Wallet, Coins, TrendingUp, Unlock } from 'lucide-react';

const steps = [
    {
        number: "01",
        title: "Connect Your Wallet",
        description: "Start by analyzing the market and creating your account.",
        icon: <Wallet size={20} />
    },
    {
        number: "02",
        title: "Stake Your Assets",
        description: "Deposit your crypto assets into our secure staking pools.",
        icon: <Coins size={20} />
    },
    {
        number: "03",
        title: "Watch Earnings Grow!",
        description: "Monitor your yield in real-time and withdraw rewards daily.",
        icon: <TrendingUp size={20} />
    },
    {
        number: "04",
        title: "Withdraw Anytime",
        description: "Withdraw your assets anytime without any lock-in period.",
        icon: <Unlock size={20} />
    }
];

const StakingInfo = () => {
    return (
        <section id="how-it-works" className="py-24 bg-[#FAFAF9] relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-20">

                    {/* Content Side */}
                    <div className="flex-1">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] text-xs font-bold uppercase tracking-wider mb-6 border border-[#D4AF37]/20"
                        >
                            <span className="w-2 h-2 rounded-full bg-[#dfb92a] animate-pulse" />
                            Start Earning Today
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-black text-[#0F172A] mb-8 tracking-tight leading-tight"
                        >
                            How to Grow Your <br />
                            <span className="text-gradient-gold">Crypto Wealth</span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-gray-500 text-lg mb-12 leading-relaxed"
                        >
                            We've simplified the process. Join the most trusted platform for generating passive income.
                        </motion.p>

                        <div className="space-y-8 relative">
                            {/* Connecting Line - Darker/Subtle to match normal state */}
                            <div className="absolute left-[29px] top-6 bottom-6 w-0.5 bg-gray-600" />

                            {steps.map((step, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 + (index * 0.1) }}
                                    className="flex gap-8 group relative z-10 items-start "
                                >
                                    {/* Circle Indicator */}
                                    <div className="w-16 h-16 rounded-full bg-white border border-[#1E293B] group-hover:border-[#D4AF37] flex items-center justify-center text-[#1E293B] group-hover:text-[#D4AF37] bg-white group-hover:bg-white shadow-sm hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] transition-all duration-300 relative shrink-0">
                                        <span className="font-bold text-lg relative z-10">{step.number}</span>
                                    </div>

                                    <div className="pt-2">
                                        <h3 className="text-2xl font-bold text-[#0F172A] mb-2 group-hover:text-[#D4AF37] transition-colors">{step.title}</h3>
                                        <p className="text-gray-500 text-lg leading-relaxed">{step.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                            className="mt-12 bg-[#0F172A] text-white font-bold py-4 px-10 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex items-center gap-2 border-2 border-transparent hover:border-[#D4AF37]"
                        >
                            Start Staking Now <ArrowRight size={18} className="text-[#D4AF37]" />
                        </motion.button>
                    </div>

                    {/* Visual Side - Phone Composite */}
                    <div className="flex-1 w-full relative">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="relative z-10 bg-white p-4 rounded-[2.5rem] shadow-2xl shadow-gray-400 border-3 border-[#FFD700] ring-1 ring-gray-100 max-w-sm mx-auto"
                        >
                            <div className="bg-[#0F172A] rounded-3xl p-6 text-white mb-6 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                                <div className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Total Balance</div>
                                <div className="text-3xl font-bold mb-6 tracking-tight">$142,593<span className="text-[#D4AF37]">.00</span></div>
                                <div className="flex gap-3">
                                    <button className="flex-1 bg-gradient-gold hover:brightness-110 text-white py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-[#D4AF37]/20">Deposit</button>
                                    <button className="flex-1 bg-white/5 hover:bg-white/10 text-white py-2.5 rounded-xl font-bold text-sm transition-colors border border-white/10">Withdraw</button>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center text-sm font-bold text-gray-400 uppercase tracking-wider px-2">
                                    <span>Asset</span>
                                    <span>APY</span>
                                </div>
                                {[
                                    { name: 'Bitcoin', sub: 'BTC Network', apy: '5.2%', color: 'bg-orange-500' },
                                    { name: 'Ethereum', sub: 'ERC-20', apy: '7.8%', color: 'bg-indigo-500' },
                                    { name: 'Tether', sub: 'TRC-20', apy: '12.5%', color: 'bg-green-500' },
                                    { name: 'Solana', sub: 'SOL Network', apy: '9.4%', color: 'bg-purple-500' },
                                ].map((coin, i) => (
                                    <div key={i} className="flex items-center justify-between p-3 hover:bg-[#D4AF37]/5 rounded-xl transition-colors cursor-pointer group border border-transparent hover:border-[#D4AF37]/20">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-10 h-10 rounded-full ${coin.color} flex items-center justify-center text-white font-bold text-xs shadow-md`}>
                                                {coin.name[0]}
                                            </div>
                                            <div>
                                                <div className="font-bold text-[#0F172A]">{coin.name}</div>
                                                <div className="text-xs text-gray-400">{coin.sub}</div>
                                            </div>
                                        </div>
                                        <div className="font-bold text-green-600 bg-green-50 px-3 py-1 rounded-lg group-hover:bg-green-100 transition-colors">
                                            {coin.apy}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Decor Elements */}
                        <div className="absolute z-10 top-1/2 -translate-y-1/2 -right-4 md:-right-12 bg-white p-4 rounded-2xl shadow-2xl animate-bounce duration-[4000ms] border-2 border-[#FFD700]">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                    <TrendingUp size={20} />
                                </div>
                                <div>
                                    <div className="text-xs font-bold text-gray-400 uppercase">Daily Yield</div>
                                    <div className="text-lg font-bold text-[#0F172A]">+$1,240.50</div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default StakingInfo;
