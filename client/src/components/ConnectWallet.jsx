import React from 'react';
import { motion } from 'framer-motion';
import { Wallet, Zap, Link, Shield, ChevronRight, Sparkles, Lock, Globe, ArrowRight } from 'lucide-react';

const ConnectWallet = () => {
    const wallets = [
        {
            name: "Coinbase",
            color: "text-blue-600",
            bgColor: "bg-gradient-to-br from-blue-500 to-blue-600",
            icon: <Wallet size={20} />,
            status: "popular"
        },
        {
            name: "METAMASK",
            color: "text-orange-500",
            bgColor: "bg-gradient-to-br from-orange-500 to-amber-600",
            icon: <Shield size={20} />,
            status: "recommended"
        },
        {
            name: "TRUST",
            color: "text-blue-500",
            bgColor: "bg-gradient-to-br from-blue-400 to-blue-500",
            icon: <Lock size={20} />,
            status: "secure"
        },
        {
            name: "WalletConnect",
            color: "text-blue-400",
            bgColor: "bg-gradient-to-br from-blue-300 to-blue-400",
            icon: <Link size={20} />,
            status: "versatile"
        },
        {
            name: "Sender",
            color: "text-blue-600",
            bgColor: "bg-gradient-to-br from-blue-600 to-indigo-600",
            icon: <Zap size={20} />,
            status: "fast"
        },
        {
            name: "Ronin",
            color: "text-gray-800",
            bgColor: "bg-gradient-to-br from-gray-700 to-gray-900",
            icon: <Globe size={20} />,
            status: "gaming"
        },
        {
            name: "Phantom",
            color: "text-purple-500",
            bgColor: "bg-gradient-to-br from-purple-500 to-pink-500",
            icon: <Sparkles size={20} />,
            status: "sleek"
        },
        {
            name: "EXODUS",
            color: "text-gray-700",
            bgColor: "bg-gradient-to-br from-gray-600 to-gray-800",
            icon: <Wallet size={20} />,
            status: "all-in-one"
        },
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'popular': return 'bg-blue-100 text-blue-600 border-blue-200';
            case 'recommended': return 'bg-orange-100 text-orange-600 border-orange-200';
            case 'secure': return 'bg-green-100 text-green-600 border-green-200';
            case 'versatile': return 'bg-cyan-100 text-cyan-600 border-cyan-200';
            case 'fast': return 'bg-indigo-100 text-indigo-600 border-indigo-200';
            case 'gaming': return 'bg-gray-100 text-gray-600 border-gray-200';
            case 'sleek': return 'bg-purple-100 text-purple-600 border-purple-200';
            case 'all-in-one': return 'bg-gray-100 text-gray-600 border-gray-200';
            default: return 'bg-gray-100 text-gray-600 border-gray-200';
        }
    };

    return (
        <section className="py-10 relative overflow-hidden">

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 text-[#D4AF37] font-bold text-xs uppercase tracking-widest mb-6"
                    >
                        <Sparkles size={12} />
                        Seamless Integration
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-black text-[#0F172A] mb-6 tracking-tight leading-tight"
                    >
                        Connect Your <span className="text-gradient-gold">Preferred Wallet</span>
                        <br />
                        Start Growing Your Wealth
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-500 text-lg leading-relaxed"
                    >
                        Secure, instant connection with the world's most trusted crypto wallets.
                        Start earning in less than 60 seconds.
                    </motion.p>
                </div>

                {/* Wallet Grid with Enhanced Design */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                    {wallets.map((wallet, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30, scale: 0.9 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.5,
                                delay: index * 0.05,
                                type: "spring",
                                stiffness: 100
                            }}
                            whileHover={{
                                y: -8,
                                scale: 1.02,
                                transition: { duration: 0.2 }
                            }}
                            className="group relative cursor-pointer"
                        >
                            {/* Card Container */}
                            <div className="relative bg-white rounded-2xl p-6 shadow-xl border-2 border-gray-200 hover:border-[#D4AF37] hover:shadow-2xl hover:shadow-[#D4AF37]/20 transition-all duration-300 overflow-hidden h-full flex flex-col items-center justify-center">

                                {/* Wallet Icon */}
                                <div className={`relative w-16 h-16 rounded-xl ${wallet.bgColor} flex items-center justify-center text-white mb-4 shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-300`}>
                                    {wallet.icon}
                                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center">
                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    </div>
                                </div>

                                {/* Wallet Name */}
                                <span className={`text-xl font-black ${wallet.color} mb-2 group-hover:scale-105 transition-transform duration-300`}>
                                    {wallet.name}
                                </span>

                                {/* Status Badge */}
                                <div className={`px-3 py-1 rounded-full border text-xs font-bold uppercase ${getStatusColor(wallet.status)} mt-2 group-hover:scale-105 transition-transform duration-300`}>
                                    {wallet.status}
                                </div>

                                {/* Corner Accents */}
                                <div className="absolute top-3 left-3 w-2 h-2 rounded-full bg-gray-300 group-hover:bg-[#D4AF37] transition-colors duration-300"></div>
                                <div className="absolute bottom-3 right-3 w-2 h-2 rounded-full bg-gray-300 group-hover:bg-[#D4AF37] transition-colors duration-300"></div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="text-center"
                >
                    <div className="inline-flex flex-col md:flex-row items-center gap-8 bg-gradient-to-r from-white to-gray-50 rounded-2xl p-8 shadow-xl border border-gray-200 max-w-2xl mx-auto">
                        <div className="text-left">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8860B] flex items-center justify-center">
                                    <Zap size={20} className="text-white" />
                                </div>
                                <h3 className="text-xl font-black text-[#0F172A]">Ready to Connect?</h3>
                            </div>
                            <p className="text-gray-500 text-sm">Select your wallet above to start your journey with eVault Crypto Bank.</p>
                        </div>

                        <button className="bg-gradient-to-r from-[#0F172A] to-[#1E293B] text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center gap-2 group">
                            <span>Connect Wallet</span>
                            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>

                    {/* Security Badges */}
                    <div className="flex flex-wrap justify-center gap-6 mt-8">
                        <div className="flex items-center gap-2 text-gray-500 text-sm">
                            <Shield size={14} className="text-green-500" />
                            <span>Bank-level Security</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-500 text-sm">
                            <Zap size={14} className="text-[#D4AF37]" />
                            <span>Instant Connection</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-500 text-sm">
                            <Lock size={14} className="text-blue-500" />
                            <span>No Access to Funds</span>
                        </div>
                    </div>
                </motion.div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-3xl mx-auto">
                    {[
                        { value: "2M+", label: "Wallets Connected", color: "text-[#D4AF37]" },
                        { value: "99.9%", label: "Uptime", color: "text-green-500" },
                        { value: "<60s", label: "Connection Time", color: "text-blue-500" },
                        { value: "50+", label: "Countries", color: "text-purple-500" },
                    ].map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 + index * 0.1 }}
                            className="text-center p-4"
                        >
                            <div className={`text-3xl font-black ${stat.color} mb-2`}>{stat.value}</div>
                            <div className="text-gray-500 text-sm font-medium">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                .text-gradient-gold {
                    background: linear-gradient(135deg, #D4AF37 0%, #B8860B 50%, #DAA520 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }
                @keyframes pulse {
                    0%, 100% { opacity: 0.3; }
                    50% { opacity: 0.1; }
                }
                .animate-pulse {
                    animation: pulse 4s ease-in-out infinite;
                }
                .delay-1000 {
                    animation-delay: 1s;
                }
            `}</style>
        </section>
    );
};

export default ConnectWallet;