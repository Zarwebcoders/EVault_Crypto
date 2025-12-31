import React from 'react';
import { motion } from 'framer-motion';
import { Clock, CheckCircle, Circle, Zap, Target, Rocket, Globe, Shield, Star, Crown, Trophy, Gem } from 'lucide-react';

const roadmapData = [
    {
        date: "Nov 2024",
        title: "Concept & Research",
        description: "Market analysis and architectural design of the high-yield protocol.",
        status: "completed"
    },
    {
        date: "Jan 2025",
        title: "Smart Contract Audit",
        description: "Security verification and optimization of the core staking contracts.",
        status: "completed"
    },
    {
        date: "Mar 2025",
        title: "Beta Launch",
        description: "Early access release for community testing and feedback.",
        status: "active"
    },
    {
        date: "Apr 2025",
        title: "Official Platform Launch",
        description: "Public release with full features and enhanced yield farming algorithms.",
        status: "upcoming"
    },
    {
        date: "Q2 2025",
        title: "Ecosystem Expansion",
        description: "Mobile app launch and cross-chain bridge integration.",
        status: "upcoming"
    }
];

const Roadmap = () => {
    const getStatusIcon = (status) => {
        switch (status) {
            case 'completed': return <CheckCircle size={16} className="text-[#D4AF37]" />;
            case 'active': return <Zap size={16} className="text-[#FFD700] animate-pulse" />;
            case 'upcoming': return <Circle size={16} className="text-gray-300" />;
            default: return <Circle size={16} />;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed': return 'bg-[#FFF8E1] border-[#FFD700] text-[#B8860B]';
            case 'active': return 'bg-[#D4AF37]/10 border-[#D4AF37]/30 text-[#D4AF37]';
            case 'upcoming': return 'bg-gray-100 border-gray-200 text-gray-600';
            default: return 'bg-gray-100 border-gray-200';
        }
    };

    const getIcon = (index) => {
        const icons = [<Target size={20} />, <Shield size={20} />, <Rocket size={20} />, <Globe size={20} />, <Gem size={20} />];
        return icons[index] || <Star size={20} />;
    };

    return (
        <section id="roadmap" className="py-16 relative overflow-hidden">

            <div className="container mx-auto relative z-10">
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block px-4 py-1.5 rounded-full border border-[#D4AF37]/40 bg-gradient-to-r from-[#D4AF37]/10 to-[#FFD700]/10 text-[#B8860B] font-bold text-xs uppercase tracking-widest mb-6"
                    >
                        <Crown size={12} className="inline mr-2" />
                        Strategic Journey
                    </motion.div>
                    
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-black text-[#0F172A] mb-6 tracking-tight"
                    >
                        The Golden Journey of <span className="text-gradient-gold">EVault</span>
                    </motion.h2>
                    
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed"
                    >
                        Following a strategic roadmap to revolutionize the future of decentralized finance.
                    </motion.p>
                </div>

                <div className="relative max-w-8xl mx-auto">
                    {/* Main Vertical Timeline - Gold Gradient */}
                    <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[4px] bg-gradient-to-b from-gray-300 via-[#D4AF37] to-gray-300 -translate-x-1/2">
                        {/* Animated Gold Pulse Effect */}
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[4px] h-16 bg-gradient-to-b from-[#FFD700] via-[#D4AF37] to-transparent animate-gold-pulse"></div>
                    </div>

                    <div className="space-y-10">
                        {roadmapData.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ 
                                    duration: 0.6, 
                                    delay: index * 0.15,
                                    type: "spring",
                                    stiffness: 100
                                }}
                                className={`relative flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                            >
                                {/* Timeline Node - Gold Themed */}
                                <div className="absolute left-1/2 md:left-1/2 transform -translate-x-1/2 md:-translate-x-1/2 z-20">
                                    <div className={`relative w-20 h-20 rounded-full flex items-center justify-center border-4 ${item.status === 'completed' ? 'bg-gradient-to-br from-[#FFF8E1] to-[#FFEBB2] border-[#D4AF37] shadow-xl shadow-[#D4AF37]/30' : item.status === 'active' ? 'bg-gradient-to-br from-[#D4AF37]/30 to-[#FFD700]/30 border-[#FFD700] shadow-2xl shadow-[#FFD700]/40 animate-pulse-gold' : 'bg-white border-gray-300 shadow-lg'}`}>
                                        {/* Gold Ring Effect for Active */}
                                        {item.status === 'active' && (
                                            <div className="absolute -inset-2 rounded-full border-2 border-[#FFD700]/30 animate-ping-slow"></div>
                                        )}
                                        
                                        {/* Icon Container with Gold Gradient */}
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg ${item.status === 'completed' ? 'bg-gradient-to-br from-[#D4AF37] to-[#B8860B] text-white' : item.status === 'active' ? 'bg-gradient-to-br from-[#FFD700] to-[#D4AF37] text-white shadow-[#FFD700]/50' : 'bg-gradient-to-br from-gray-200 to-gray-300 text-gray-500'}`}>
                                            {getIcon(index)}
                                        </div>
                                        
                                        {/* Status Badge with Gold Crown for Completed */}
                                        <div className={`absolute -top-3 -right-3 w-8 h-8 rounded-full flex items-center justify-center border-2 border-white shadow-lg ${item.status === 'completed' ? 'bg-gradient-to-br from-[#D4AF37] to-[#B8860B]' : item.status === 'active' ? 'bg-gradient-to-br from-[#FFD700] to-[#FFA500]' : 'bg-gray-400'}`}>
                                            {item.status === 'completed' ? <Crown size={12} className="text-white" /> : getStatusIcon(item.status)}
                                        </div>
                                    </div>
                                    
                                    {/* Connecting Line (Mobile) */}
                                    {index < roadmapData.length - 1 && (
                                        <div className="md:hidden absolute top-full left-1/2 transform -translate-x-1/2 w-[2px] h-32 bg-gradient-to-b from-[#D4AF37]/30 to-gray-100"></div>
                                    )}
                                </div>

                                {/* Content Card with Gold Accents */}
                                <div className={`w-full md:w-[calc(50%-8rem)] mt-24 md:mt-0 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                                    <motion.div
                                        whileHover={{ scale: 1.02, y: -5 }}
                                        className={`relative bg-gradient-to-br from-white to-[#FFFBF5] p-8 rounded-3xl shadow-2xl border-2 ${item.status === 'completed' ? 'border-[#FFEBB2] shadow-[#D4AF37]/20' : item.status === 'active' ? 'border-[#FFD700]/40 shadow-[#FFD700]/20' : 'border-gray-200'} hover:shadow-[0_25px_50px_-12px_rgba(212,175,55,0.3)] hover:border-[#D4AF37]/60 transition-all duration-500 group overflow-hidden`}
                                    >
                                        
                                        
                                        
                                        {/* Gold Corner Accents */}
                                        <div className="absolute top-4 left-4 w-3 h-3 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8860B] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        <div className="absolute bottom-4 right-4 w-3 h-3 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8860B] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        
                                        {/* Date Badge with Gold Theme */}
                                        <div className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full border ${getStatusColor(item.status)} mb-6 group-hover:border-[#D4AF37] group-hover:bg-gradient-to-r from-[#FFF8E1] to-[#FFEBB2] group-hover:text-[#B8860B] group-hover:shadow-lg group-hover:shadow-[#D4AF37]/20 transition-all duration-300`}>
                                            <Clock size={14} />
                                            <span className="font-bold">{item.date}</span>
                                            {item.status === 'active' && (
                                                <div className="ml-2 w-2 h-2 rounded-full bg-[#FFD700] animate-pulse"></div>
                                            )}
                                        </div>

                                        {/* Title with Gold Icon */}
                                        <h3 className="text-2xl font-black text-[#0F172A] mb-4 group-hover:text-[#B8860B] transition-colors duration-300 flex items-center gap-3">
                                            {index % 2 === 0 ? (
                                                <>
                                                    <span>{item.title}</span>
                                                    <div className={`p-2.5 rounded-xl shadow-lg ${item.status === 'completed' ? 'bg-gradient-to-br from-[#FFF8E1] to-[#FFEBB2] text-[#B8860B]' : item.status === 'active' ? 'bg-gradient-to-br from-[#FFD700] to-[#D4AF37] text-white' : 'bg-gradient-to-br from-gray-200 to-gray-300 text-gray-500'}`}>
                                                        {getIcon(index)}
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <div className={`p-2.5 rounded-xl shadow-lg ${item.status === 'completed' ? 'bg-gradient-to-br from-[#FFF8E1] to-[#FFEBB2] text-[#B8860B]' : item.status === 'active' ? 'bg-gradient-to-br from-[#FFD700] to-[#D4AF37] text-white' : 'bg-gradient-to-br from-gray-200 to-gray-300 text-gray-500'}`}>
                                                        {getIcon(index)}
                                                    </div>
                                                    <span>{item.title}</span>
                                                </>
                                            )}
                                        </h3>

                                        {/* Description */}
                                        <p className={`text-gray-600 leading-relaxed ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'} font-medium text-lg`}>
                                            {item.description}
                                        </p>
                                    </motion.div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Bottom CTA with Gold Theme */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mt-20 pt-12 border-t border-gray-200/50"
                >
                    <button className="inline-flex items-center gap-4 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white font-bold shadow-2xl hover:shadow-[0_25px_50px_-12px_rgba(212,175,55,0.4)] hover:-translate-y-1 transition-all duration-300 group">
                        <span className="text-lg">Join The Golden Journey</span>
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FFD700] to-[#D4AF37] flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Rocket size={18} className="text-[#0F172A]" />
                        </div>
                    </button>
                    <p className="text-gray-500 mt-4 text-lg">Be part of the golden evolution in decentralized finance</p>
                    
                    {/* Golden Stats */}
                    <div className="flex justify-center gap-8 mt-8">
                        <div className="text-center">
                            <div className="text-2xl font-black text-[#B8860B]">5+</div>
                            <div className="text-sm text-gray-500">Strategic Milestones</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-black text-[#B8860B]">100%</div>
                            <div className="text-sm text-gray-500">On Track</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-black text-[#B8860B]">24/7</div>
                            <div className="text-sm text-gray-500">Development</div>
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
                @keyframes gold-pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.7; }
                }
                @keyframes pulse-gold {
                    0%, 100% { 
                        box-shadow: 0 0 0 0 rgba(212, 175, 55, 0.7),
                                    0 0 0 0 rgba(255, 215, 0, 0.5);
                    }
                    50% { 
                        box-shadow: 0 0 0 15px rgba(212, 175, 55, 0),
                                    0 0 0 30px rgba(255, 215, 0, 0);
                    }
                }
                @keyframes ping-slow {
                    75%, 100% {
                        transform: scale(2);
                        opacity: 0;
                    }
                }
                @keyframes shimmer {
                    0% { transform: translateY(-100%); }
                    100% { transform: translateY(100%); }
                }
                @keyframes glow {
                    0%, 100% { box-shadow: 0 0 5px rgba(212, 175, 55, 0.5); }
                    50% { box-shadow: 0 0 20px rgba(212, 175, 55, 0.8); }
                }
                .animate-gold-pulse {
                    animation: gold-pulse 2s ease-in-out infinite;
                }
                .animate-pulse-gold {
                    animation: pulse-gold 2s infinite;
                }
                .animate-ping-slow {
                    animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite;
                }
                .animate-shimmer {
                    animation: shimmer 3s linear infinite;
                }
                .animate-glow {
                    animation: glow 2s ease-in-out infinite;
                }
            `}</style>
        </section>
    );
};

export default Roadmap;