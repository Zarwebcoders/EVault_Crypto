import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, Shield, Zap, DollarSign, Lock, TrendingUp } from 'lucide-react';

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(0);

    const faqs = [
        {
            question: "What is Grow Your Network?",
            answer: "Grow Your Network is a decentralized finance (DeFi) platform that allows users to stake USDT and earn passive income through secure blockchain protocols. Our platform leverages cutting-edge smart contracts to provide transparent, reliable, and high-yield staking opportunities.",
            icon: <HelpCircle size={20} />,
            color: "from-blue-500 to-cyan-500"
        },
        {
            question: "How do I start staking my USDT?",
            answer: "Getting started is simple! First, connect your preferred crypto wallet (MetaMask, Trust Wallet, etc.). Then, deposit your USDT into our staking pool. Your rewards will start accumulating immediately and can be tracked in real-time on your dashboard.",
            icon: <Zap size={20} />,
            color: "from-[#D4AF37] to-[#B8860B]"
        },
        {
            question: "How are staking rewards calculated?",
            answer: "Staking rewards are calculated based on your staked amount, the duration of staking, and current APY rates. Our platform uses a transparent algorithm that distributes rewards proportionally. You can view detailed calculations and projections in your dashboard.",
            icon: <TrendingUp size={20} />,
            color: "from-green-500 to-emerald-500"
        },
        {
            question: "Is there a fee for staking or withdrawing?",
            answer: "We maintain a transparent fee structure with minimal costs. There's a small network gas fee for transactions, and a 2% platform fee on earned rewards. Withdrawals are free, and there are no hidden charges. All fees are clearly displayed before any transaction.",
            icon: <DollarSign size={20} />,
            color: "from-purple-500 to-pink-500"
        },
        {
            question: "Is my USDT safe while staked?",
            answer: "Absolutely! Your funds are secured through audited smart contracts and industry-leading security protocols. We employ multi-signature wallets, regular security audits, and insurance coverage up to $1M. Your assets remain in your control at all times.",
            icon: <Shield size={20} />,
            color: "from-red-500 to-orange-500"
        },
        {
            question: "Can I withdraw my staked USDT and rewards at any time?",
            answer: "Yes! We offer flexible withdrawals with no lock-in periods. You can withdraw your staked USDT and accumulated rewards at any time. Withdrawals are processed instantly on the blockchain, though network confirmation times may vary.",
            icon: <Lock size={20} />,
            color: "from-indigo-500 to-blue-500"
        }
    ];

    return (
        <section className="py-24 relative overflow-hidden bg-gradient-to-b from-white via-[#FAFAF9] to-white">
            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 text-[#D4AF37] font-bold text-xs uppercase tracking-widest mb-6"
                    >
                        <HelpCircle size={12} />
                        Got Questions?
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-black text-[#0F172A] mb-6 tracking-tight"
                    >
                        Frequently Asked <span className="text-gradient-gold">Questions</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-500 text-lg leading-relaxed"
                    >
                        Below is a list of frequently asked questions and answers from partners and 3D artist.
                        Please check this FAQ first before contacting us.
                    </motion.p>
                </div>

                {/* FAQ Accordion */}
                <div className="max-w-7xl mx-auto space-y-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group"
                        >
                            <div
                                className={`relative rounded-2xl overflow-hidden transition-all duration-300 ${openIndex === index
                                        ? 'bg-gradient-to-r from-[#D4AF37]/10 to-[#FFD700]/5 shadow-2xl shadow-[#D4AF37]/20'
                                        : 'bg-white shadow-lg hover:shadow-xl'
                                    } border-2 ${openIndex === index ? 'border-[#D4AF37]/40' : 'border-gray-200 hover:border-[#D4AF37]/20'
                                    }`}
                            >
                                {/* Question Button */}
                                <button
                                    onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                                    className="w-full p-6 flex items-center justify-between gap-4 text-left transition-all"
                                >
                                    <div className="flex items-center gap-4 flex-1">
                                        {/* Icon */}
                                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${faq.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                            {faq.icon}
                                        </div>

                                        {/* Question Text */}
                                        <h3 className={`text-lg font-bold transition-colors ${openIndex === index ? 'text-[#D4AF37]' : 'text-[#0F172A] group-hover:text-[#D4AF37]'
                                            }`}>
                                            {faq.question}
                                        </h3>
                                    </div>

                                    {/* Chevron Icon */}
                                    <motion.div
                                        animate={{ rotate: openIndex === index ? 180 : 0 }}
                                        transition={{ duration: 0.3 }}
                                        className={`flex-shrink-0 ${openIndex === index ? 'text-[#D4AF37]' : 'text-gray-400'}`}
                                    >
                                        <ChevronDown size={24} />
                                    </motion.div>
                                </button>

                                {/* Answer */}
                                <AnimatePresence>
                                    {openIndex === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-6 pb-6 pl-[88px]">
                                                <div className="border-l-2 border-[#D4AF37]/30 pl-6">
                                                    <p className="text-gray-600 leading-relaxed">
                                                        {faq.answer}
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Shine Effect */}
                                {openIndex === index && (
                                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
                                )}
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
                    className="text-center mt-16"
                >
                    <div className="inline-flex flex-col items-center gap-6 bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 shadow-2xl border border-gray-200 max-w-2xl mx-auto">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8860B] flex items-center justify-center">
                            <HelpCircle size={32} className="text-white" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-black text-[#0F172A] mb-2">Still have questions?</h3>
                            <p className="text-gray-500 mb-6">Can't find the answer you're looking for? Our support team is here to help.</p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="bg-gradient-to-r from-[#0F172A] to-[#1E293B] text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                Contact Support
                            </button>
                            <button className="border-2 border-[#D4AF37] text-[#D4AF37] font-bold py-3 px-8 rounded-xl hover:bg-[#D4AF37]/5 transition-all duration-300">
                                View Documentation
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>

            <style jsx>{`
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

export default FAQ;
