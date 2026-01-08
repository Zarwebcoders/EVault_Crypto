import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Globe, Zap, CheckCircle2, ArrowRight } from 'lucide-react';
import eVaultLogo from '../../public/eVaultLogoTransparent3.png';

const AboutUs = () => {
    const features = [
        "Decentralized Banking",
        "Instant Withdrawals",
        "High Yield Staking",
        "Global Access"
    ];

    return (
        <section id="about" className="py-24 relative overflow-hidden bg-white">
            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

                    {/* Left Column: Visuals */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex-1 relative"
                    >
                        {/* Main Image Container */}
                        <div className="relative z-10">
                            <div className="relative bg-gradient-to-br from-[#FAFAF9] to-white rounded-[40px] p-8 shadow-2xl border border-gray-100">
                                <img
                                    src={eVaultLogo}
                                    alt="EVault Logo"
                                    className="w-80 mx-auto drop-shadow-2xl transform hover:scale-105 transition-transform duration-500"
                                />

                                {/* Floating Stats Card */}
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.5, duration: 0.5 }}
                                    className="absolute -bottom-8 -right-8 bg-white p-3 rounded-2xl shadow-xl border border-gray-100 hidden md:block"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                                            <Shield size={20} />
                                        </div>
                                        <div>
                                            <div className="text-xs text-gray-500 font-bold uppercase">Security Rating</div>
                                            <div className="text-base font-black text-navy">AAA+</div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Decorative Elements */}
                            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-gold/20 rounded-full animate-spin-slow" style={{ animationDuration: '20s' }}></div>
                            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] border border-navy/5 rounded-full animate-spin-slow placeholder-dashed" style={{ animationDuration: '30s', borderStyle: 'dashed' }}></div>
                        </div>
                    </motion.div>

                    {/* Right Column: Content */}
                    <div className="flex-1">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/30 bg-gold/5 text-gold font-bold text-xs tracking-widest mb-6">
                                <Globe size={12} />
                                ABOUT eVAULT CRYPTO BANK
                            </div>

                            <h2 className="text-4xl md:text-5xl font-black text-navy mb-6 leading-tight">
                                The Future of <br />
                                <span className="text-gradient-gold">Decentralized Finance</span>
                            </h2>

                            <p className="text-gray-500 text-lg mb-8 leading-relaxed">
                                eVault Crypto Bank bridges the gap between traditional banking reliability and DeFi innovation. We provide a secure, transparent, and high-yield platform for investors to grow their wealth through automated staking strategies.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                                {features.map((feature, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.2 + (index * 0.1) }}
                                        className="flex items-center gap-3"
                                    >
                                        <div className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center text-gold">
                                            <CheckCircle2 size={14} strokeWidth={3} />
                                        </div>
                                        <span className="font-bold text-navy">{feature}</span>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <button className="border-2 border-black text-black font-bold py-3 px-6 rounded-xl shadow-lg hover:translate-y-[-2px] transition-all group flex items-center justify-center gap-2">
                                    Start Journey
                                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                                <button className="border-2 border-gray-500 text-navy font-bold py-3 px-6 rounded-xl">
                                    Learn More
                                </button>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default AboutUs;
