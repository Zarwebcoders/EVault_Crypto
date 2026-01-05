import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const Partners = () => {
    const partners = [
        { name: "BlackRock", type: "text", color: "text" },
        { name: "VISA", type: "text", color: "text" },
        { name: "worldpay", type: "text", color: "text" },
        { name: "BNY MELLON", type: "text", color: "text" },
        { name: "WINTERMUTE", type: "text", color: "text" },
        { name: "BNY MELLON", type: "text", color: "text" },
        { name: "worldpay", type: "text", color: "text" },
        { name: "VISA", type: "text", color: "text" },
        { name: "BlackRock", type: "text", color: "text" },
    ];

    return (
        <section id="partners" className="bg-white border-y border-gold/20 flex relative z-20 overflow-hidden h-28 shadow-lg">
            {/* Fixed Title Section - Golden Theme */}
            <div className="bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white p-6 flex items-center z-30 min-w-[320px] shadow-2xl shadow-gold/20 relative overflow-hidden">

                {/* Content */}
                <div className="relative z-10 flex items-center gap-3">
                    <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FFD700] to-[#D4AF37] flex items-center justify-center shadow-lg shadow-gold/50"
                    >
                        <Sparkles size={20} className="text-[#0F172A]" />
                    </motion.div>
                    <h3 className="text-xl font-black leading-tight">
                        A Global network of <br />
                        <span className="text-gradient-gold">Partners!</span>
                    </h3>
                </div>
            </div>

            {/* Scrolling Marquee - Enhanced */}
            <div className="flex-1 flex items-center overflow-hidden bg-gradient-to-r from-gray-50 via-white to-gray-50 relative">

                {/* Marquee Container */}
                <div className="flex animate-scroll whitespace-nowrap">
                    {/* First Set */}
                    <div className="flex items-center gap-16 px-16">
                        {partners.map((partner, i) => (
                            <motion.span
                                key={i}
                                whileHover={{ scale: 1.1, color: '#D4AF37' }}
                                className={`text-2xl font-black opacity-60 hover:opacity-100 transition-all whitespace-nowrap cursor-pointer ${partner.color || 'text-gray-600'}`}
                            >
                                {partner.name}
                            </motion.span>
                        ))}
                    </div>
                    {/* Second Set for seamless loop */}
                    <div className="flex items-center gap-16 px-16">
                        {partners.map((partner, i) => (
                            <motion.span
                                key={`dup-${i}`}
                                whileHover={{ scale: 1.1, color: '#D4AF37' }}
                                className={`text-2xl font-black opacity-50 hover:opacity-100 transition-all whitespace-nowrap cursor-pointer ${partner.color || 'text-gray-600'}`}
                            >
                                {partner.name}
                            </motion.span>
                        ))}
                    </div>
                </div>
            </div>

            <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 25s linear infinite;
        }
      `}</style>
        </section>
    );
};

export default Partners;
