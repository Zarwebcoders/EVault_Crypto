import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Zap, Settings, DollarSign, TrendingUp, Shield, Facebook, Instagram, Send, X } from 'lucide-react';

const SecurityFeatures = () => {
    const features = [
        {
            icon: <Lock size={24} />,
            title: "Secure & Transparent",
            description: "Powered by audited smart contracts and top-tier DeFi protocols.",
            color: "from-green-500 to-emerald-500",
            iconBg: "bg-green-100",
            iconColor: "text-green-600"
        },
        {
            icon: <Zap size={24} />,
            title: "Flexible Withdrawals",
            description: "Deposit or withdraw your funds anytime with no lock-ins",
            color: "from-blue-500 to-cyan-500",
            iconBg: "bg-blue-100",
            iconColor: "text-blue-600"
        },
        {
            icon: <Settings size={24} />,
            title: "Multi-Chain Support",
            description: "Compatible with major blockchain networks for faster, cheaper transactions.",
            color: "from-purple-500 to-pink-500",
            iconBg: "bg-purple-100",
            iconColor: "text-purple-600"
        },
        {
            icon: <DollarSign size={24} />,
            title: "Stablecoin Farming",
            description: "Earn rewards using USDT, a stablecoin pegged to the US Dollar, minimizing volatility risks.",
            color: "from-[#D4AF37] to-[#B8860B]",
            iconBg: "bg-[#D4AF37]/10",
            iconColor: "text-[#D4AF37]"
        },
        {
            icon: <TrendingUp size={24} />,
            title: "Real-Time Earnings",
            description: "Track your yield growth in real-time with a user-friendly dashboard.",
            color: "from-orange-500 to-red-500",
            iconBg: "bg-orange-100",
            iconColor: "text-orange-600"
        }
    ];

    return (
        <section className="py-10 relative overflow-hidden bg-gradient-to-br from-[#FAFAF9] via-white to-[#F8FAFC]">
            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left Column: Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 text-[#D4AF37] font-bold text-xs uppercase tracking-widest mb-8">
                            <Shield size={12} />
                            Enterprise-Grade Security
                        </div>

                        {/* Main Heading */}
                        <h2 className="text-5xl md:text-6xl font-black text-[#0F172A] mb-6 leading-tight">
                            Highly secure.<br />
                            <span className="text-gradient-gold">Hard to beat.</span>
                        </h2>

                        {/* Description */}
                        <p className="text-xl text-gray-600 leading-relaxed mb-10 max-w-xl">
                            farming is a fast, scalable blockchain with low fees. Earn benefits through staking and enjoy top-tier security, making it ideal for decentralized applications and cryptocurrency transactions.
                        </p>

                        {/* CTA Button */}
                        <button className="group inline-flex items-center gap-3 bg-gradient-to-r from-[#0F172A] to-[#1E293B] text-white font-bold py-4 px-8 rounded-xl shadow-2xl hover:shadow-[0_20px_40px_-10px_rgba(212,175,55,0.4)] hover:-translate-y-1 transition-all duration-300">
                            <span className="text-lg">Explore Security Features</span>
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FFD700] to-[#D4AF37] flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Shield size={16} className="text-[#0F172A]" />
                            </div>
                        </button>

                        {/* Trust Indicators */}
                        <div className="flex items-center gap-6 mt-10 pt-8 border-t border-gray-200">
                            <div className="flex items-center gap-2">
                                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                                    <Shield size={18} className="text-green-600" />
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-[#0F172A]">Audited</div>
                                    <div className="text-xs text-gray-500">Smart Contracts</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                    <Lock size={18} className="text-blue-600" />
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-[#0F172A]">Insured</div>
                                    <div className="text-xs text-gray-500">Up to $1M</div>
                                </div>
                            </div>
                        </div>

                        {/* Decorative Element */}
                        <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-gradient-to-br from-[#D4AF37]/80 to-[#D4AF37]/30 rounded-full blur-2xl -z-10" />
                    </motion.div>

                    {/* Right Column: Features List */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="space-y-6"
                    >
                        {/* Central Icon/Logo */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="flex justify-center mb-8"
                        >
                            <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#B8860B] flex items-center justify-center shadow-2xl shadow-[#D4AF37]/30">
                                <div className="text-white text-4xl font-black">E</div>
                                <div className="absolute -inset-2 rounded-2xl border-2 border-[#D4AF37]/60 animate-ping" />
                            </div>
                        </motion.div>

                        {/* Feature Cards */}
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                                whileHover={{ x: 10, scale: 1.02 }}
                                className="group relative bg-white rounded-2xl p-4 shadow-lg border-2 border-gray-500 hover:border-[#D4AF37]/70 hover:shadow-2xl hover:shadow-[#D4AF37]/10 transition-all duration-300 cursor-pointer overflow-hidden"
                            >

                                {/* Icon */}
                                <div className="flex items-start gap-4 relative z-10">
                                    <div className={`w-12 h-12 rounded-xl ${feature.iconBg} flex items-center justify-center ${feature.iconColor} group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                                        {feature.icon}
                                    </div>

                                    <div className="flex-1">
                                        <h3 className="text-lg font-black text-[#0F172A] mb-2 group-hover:text-[#D4AF37] transition-colors">
                                            {feature.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Corner Accent */}
                                <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-gray-300 group-hover:bg-[#D4AF37] transition-colors duration-300" />

                                {/* Shine Effect */}
                                <div className="absolute top-0 left-[-100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg] opacity-0 group-hover:opacity-100 group-hover:left-[150%] transition-all duration-700" />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>

            <style jsx>{`
                .text-gradient-gold {
                    background: linear-gradient(135deg, #D4AF37 0%, #FFD700 50%, #DAA520 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }
                @keyframes ping-slow {
                    75%, 100% {
                        transform: scale(2);
                        opacity: 0;
                    }
                }
                .animate-ping-slow {
                    animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite;
                }
            `}</style>
        </section>
    );
};

export default SecurityFeatures;
