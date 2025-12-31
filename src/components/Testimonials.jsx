import React from 'react';
import { Star, Quote, Sparkles, Trophy, TrendingUp, Shield, Zap, ChevronRight, Award, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const testimonials = [
    {
        name: "Alex Thompson",
        role: "Professional Investor",
        content: "The best staking platform I've used. The interface is clean, and the rewards are consistently higher than other exchanges.",
        avatarColor: "from-blue-500 to-cyan-500",
        rating: 5,
        joined: "Jan 2023",
        earnings: "$42,850+",
        verified: true
    },
    {
        name: "Sarah Chen",
        role: "DeFi Analyst",
        content: "Security was my main concern, but EVault's transparent protocols and insurance coverage gave me peace of mind.",
        avatarColor: "from-purple-500 to-pink-500",
        rating: 5,
        joined: "Mar 2023",
        earnings: "$28,500+",
        verified: true
    },
    {
        name: "Michael Roberts",
        role: "Crypto Holder",
        content: "I love the auto-compounding feature. It's truly passive income without the headache of managing daily claims.",
        avatarColor: "from-[#D4AF37] to-[#B8860B]",
        rating: 5,
        joined: "Nov 2022",
        earnings: "$67,200+",
        verified: true
    },
    {
        name: "Emma Wilson",
        role: "Web3 Developer",
        content: "The API integration is seamless. Built my entire dApp around EVault's smart contracts with zero issues.",
        avatarColor: "from-green-500 to-emerald-500",
        rating: 5,
        joined: "Jun 2023",
        earnings: "$15,300+",
        verified: true
    },
    {
        name: "David Park",
        role: "Crypto Trader",
        content: "Daily rewards distribution is flawless. Never missed a single payment in my 18 months of using EVault.",
        avatarColor: "from-red-500 to-orange-500",
        rating: 5,
        joined: "Feb 2023",
        earnings: "$89,750+",
        verified: true
    },
    {
        name: "Lisa Rodriguez",
        role: "Financial Advisor",
        content: "Recommended EVault to all my clients. The yield stability outperforms traditional investment options.",
        avatarColor: "from-indigo-500 to-blue-500",
        rating: 5,
        joined: "Sep 2023",
        earnings: "$124,500+",
        verified: true
    }
];

const Testimonials = () => {
    return (
        <section id="testimonials" className="py-24 relative overflow-hidden">
            

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 text-[#D4AF37] font-bold text-xs uppercase tracking-widest mb-6"
                    >
                        <Sparkles size={12} />
                        Community Love
                    </motion.div>
                    
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-black text-[#0F172A] mb-6 tracking-tight"
                    >
                        Trusted by <span className="text-gradient-gold">45,000+</span> Investors
                    </motion.h2>
                    
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed"
                    >
                        Join thousands of satisfied users who are growing their wealth with EVault's premium staking platform.
                    </motion.p>
                </div>

                {/* Testimonial Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30, scale: 0.95 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ 
                                duration: 0.5, 
                                delay: i * 0.1,
                                type: "spring",
                                stiffness: 100
                            }}
                            whileHover={{ 
                                y: -8, 
                                scale: 1.02,
                                transition: { duration: 0.2 }
                            }}
                            className="group relative"
                        >
                            {/* Card Container */}
                            <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 shadow-xl border-2 border-gray-200 hover:border-[#D4AF37]/80 hover:shadow-2xl hover:shadow-[#D4AF37]/20 transition-all duration-500 h-full overflow-hidden">
                                
                                {/* Background Pattern */}
                                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#D4AF37]/50 to-[#D4AF37]/50 rounded-bl-3xl -translate-y-16 translate-x-16 rotate-12"></div>
                                
                                {/* Verified Badge */}
                                {t.verified && (
                                    <div className="absolute top-6 right-6 flex items-center gap-1 bg-green-50 border border-green-200 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
                                        <CheckCircle size={12} />
                                        Verified
                                    </div>
                                )}
                                
                                {/* Content */}
                                <div className="relative z-10">
                                    {/* Stars */}
                                    <div className="flex gap-1 mb-6">
                                        {[...Array(t.rating)].map((_, s) => (
                                            <Star key={s} size={18} className="fill-[#D4AF37] text-[#D4AF37]" />
                                        ))}
                                    </div>
                                    
                                    {/* Testimonial Text */}
                                    <p className="text-gray-700 text-lg leading-relaxed mb-8 font-medium italic">
                                        "{t.content}"
                                    </p>
                                    
                                    {/* User Info */}
                                    <div className="flex items-start gap-4 border-t border-gray-200/50 pt-6 group-hover:border-[#D4AF37]/20 transition-colors">
                                        {/* Avatar */}
                                        <div className={`relative w-14 h-14 rounded-xl bg-gradient-to-br ${t.avatarColor} flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                            {t.name.substring(0, 2)}
                                            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center">
                                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                            </div>
                                        </div>
                                        
                                        {/* User Details */}
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h4 className="font-bold text-[#0F172A] text-lg">{t.name}</h4>
                                                <Award size={14} className="text-[#D4AF37]" />
                                            </div>
                                            <div className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider mb-2">{t.role}</div>
                                            
                                            {/* Stats */}
                                            <div className="flex items-center gap-4 text-xs text-gray-500">
                                                <div className="flex items-center gap-1">
                                                    <TrendingUp size={10} />
                                                    <span>Earned: {t.earnings}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Zap size={10} />
                                                    <span>Since: {t.joined}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Stats Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="bg-gradient-to-r from-[#0F172A] to-[#1E293B] rounded-3xl p-8 shadow-2xl mb-12"
                >
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="text-4xl font-black text-white mb-2">45K+</div>
                            <div className="text-gray-300 text-sm font-medium">Happy Investors</div>
                            <div className="w-12 h-1 bg-gradient-to-r from-[#D4AF37] to-transparent mx-auto mt-3"></div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-black text-white mb-2">99.7%</div>
                            <div className="text-gray-300 text-sm font-medium">Satisfaction Rate</div>
                            <div className="w-12 h-1 bg-gradient-to-r from-[#D4AF37] to-transparent mx-auto mt-3"></div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-black text-white mb-2">$2.1B+</div>
                            <div className="text-gray-300 text-sm font-medium">Total Assets Staked</div>
                            <div className="w-12 h-1 bg-gradient-to-r from-[#D4AF37] to-transparent mx-auto mt-3"></div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-black text-white mb-2">24/7</div>
                            <div className="text-gray-300 text-sm font-medium">Support Available</div>
                            <div className="w-12 h-1 bg-gradient-to-r from-[#D4AF37] to-transparent mx-auto mt-3"></div>
                        </div>
                    </div>
                </motion.div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="text-center"
                >
                    <div className="inline-flex flex-col md:flex-row items-center gap-5 bg-gradient-to-r from-white to-gray-50 rounded-3xl p-4 shadow-2xl border border-gray-200 max-w-3xl mx-auto">
                        <div className="text-left">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8860B] flex items-center justify-center">
                                    <Trophy size={24} className="text-white" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black text-[#0F172A]">Join Our Community</h3>
                                    <p className="text-gray-500 text-sm">Start earning with the platform trusted by thousands.</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex flex-col gap-2">
                            <button className="bg-gradient-to-r from-[#0F172A] to-[#1E293B] text-white font-bold p-3 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 group">
                                <span>Get Started Free</span>
                                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button className="border-2 border-[#D4AF37] text-[#D4AF37] font-bold p-3 rounded-xl hover:bg-[#D4AF37]/5 transition-all duration-300 flex items-center justify-center gap-2">
                                <Shield size={16} />
                                <span>Read Reviews</span>
                            </button>
                        </div>
                    </div>
                    
                    {/* Trust Badges */}
                    <div className="flex flex-wrap justify-center gap-8 mt-8">
                        <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-white to-gray-50 border border-gray-200 shadow-sm">
                            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                                <CheckCircle size={16} className="text-green-600" />
                            </div>
                            <div className="text-sm">
                                <div className="font-bold text-[#0F172A]">5-Star Reviews</div>
                                <div className="text-gray-500 text-xs">4.9/5 Average Rating</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-white to-gray-50 border border-gray-200 shadow-sm">
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                                <Shield size={16} className="text-blue-600" />
                            </div>
                            <div className="text-sm">
                                <div className="font-bold text-[#0F172A]">Security Verified</div>
                                <div className="text-gray-500 text-xs">Bank-Level Protection</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-white to-gray-50 border border-gray-200 shadow-sm">
                            <div className="w-8 h-8 rounded-full bg-[#D4AF37]/10 flex items-center justify-center">
                                <TrendingUp size={16} className="text-[#D4AF37]" />
                            </div>
                            <div className="text-sm">
                                <div className="font-bold text-[#0F172A]">Highest APY</div>
                                <div className="text-gray-500 text-xs">Industry-Leading Returns</div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            <style jsx>{`
                .text-gradient-gold {
                    background: linear-gradient(135deg, #D4AF37 0%, #B8860B 50%, #DAA520 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }
            `}</style>
        </section>
    );
};

export default Testimonials;