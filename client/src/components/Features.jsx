import React from 'react';
import { Shield, Zap, BarChart3, Globe, Lock, TrendingUp, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
    {
        icon: <Shield size={24} />,
        title: "Bank-Grade Security",
        description: "Multi-layered encryption and cold storage protocols ensure your assets remain impenetrable."
    },
    {
        icon: <Zap size={24} />,
        title: "Instant Rewards",
        description: "Get paid daily. Our smart contracts distribute staking rewards automatically to your wallet."
    },
    {
        icon: <BarChart3 size={24} />,
        title: "Industry Leading APY",
        description: "Maximize efficiency with competitive rates on stablecoins and blue-chip crypto assets."
    },
    {
        icon: <Globe size={24} />,
        title: "Global Access",
        description: "Manage your portfolio from anywhere. Our platform is accessible 24/7 with 99.9% uptime."
    },
    {
        icon: <Lock size={24} />,
        title: "Asset Insurance",
        description: "Peace of mind included. All staked assets are covered by our comprehensive insurance policy."
    },
    {
        icon: <TrendingUp size={24} />,
        title: "Auto-Compounding",
        description: "Let your money work for you. Re-stake rewards automatically to accelerate your portfolio growth."
    }
];

const Features = () => {
    return (
        <section id="features" className="py-20 bg-[#FAFAF9] relative">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block px-4 py-1.5 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 text-[#D4AF37] font-bold text-xs uppercase tracking-widest mb-6"
                    >
                        World Class Features
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-5xl font-black text-[#0F172A] mb-6 tracking-tight"
                    >
                        Why Smart Investors Choose <span className="text-gradient-gold">eVault Crypto Bank</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-500 text-lg leading-relaxed"
                    >
                        A fusion of military-grade security and premium user experience, designed for the next generation of wealth.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-3xl p-5 border-2 border-gray-400 hover:border-[#D4AF37] shadow-xl shadow-gray-200/50 hover:shadow-[0_20px_40px_-10px_rgba(212,175,55,0.4)] transition-all duration-300 group relative overflow-hidden"
                        >
                            {/* Gold Accent Corner */}
                            <div className="absolute top-0 right-0 w-20 h-20">
                                <div className="absolute top-0 right-0 w-0 h-0 border-l-[80px] border-l-transparent border-t-[80px] border-t-[#D4AF37]/40 group-hover:border-t-[#D4AF37]/50 transition-all duration-300"></div>
                            </div>

                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0F172A] to-[#1E293B] flex items-center justify-center text-white mb-8 group-hover:scale-110 group-hover:from-[#D4AF37] group-hover:to-[#B8860B] transition-all duration-300 shadow-lg">
                                {feature.icon}
                            </div>

                            <h3 className="text-xl font-bold text-[#0F172A] mb-4 group-hover:text-[#D4AF37] transition-colors">
                                {feature.title}
                            </h3>

                            <p className="text-gray-600 leading-relaxed mb-8">
                                {feature.description}
                            </p>

                            <div className="flex items-center text-[#0F172A] font-bold text-sm group-hover:text-[#D4AF37] transition-colors duration-300">
                                Learn More <ChevronRight size={16} className="ml-1 group-hover:translate-x-2 transition-transform" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;