import React from 'react';

const Exchanges = () => {
    const row1 = [
        { name: "Gate.io", color: "text-blue-500" },
        { name: "OKX", color: "text-black" },
        { name: "KuCoin", color: "text-green-500" },
        { name: "MEXC Global", color: "text-blue-600" },
        { name: "UPbit", color: "text-indigo-600" },
        { name: "XT.COM", color: "text-black" },
    ];

    const row2 = [
        { name: "BINANCE", color: "text-yellow-500" },
        { name: "LBANK", color: "text-orange-500" },
        { name: "BingX", color: "text-blue-500" },
        { name: "HTX", color: "text-green-600" },
        { name: "BitMart", color: "text-black" },
        { name: "Bitstamp", color: "text-green-700" },
    ];

    const ExchangeCard = ({ item, index }) => (
        <div className="relative group min-w-[220px] h-24 bg-white rounded-2xl shadow-xl border-2 border-gray-200 flex items-center justify-center px-6 
                        hover:border-[#D4AF37] hover:shadow-[0_25px_50px_-12px_rgba(212,175,55,0.35)] 
                        hover:scale-[1.03] hover:-translate-y-2 transition-all duration-500 ease-out cursor-pointer">

            {/* Corner Accents */}
            <div className="absolute top-3 left-3 w-2 h-2 rounded-full bg-gray-300 
                            group-hover:bg-[#D4AF37] group-hover:scale-125 transition-all duration-300"></div>
            <div className="absolute bottom-3 right-3 w-2 h-2 rounded-full bg-gray-300 
                            group-hover:bg-[#D4AF37] group-hover:scale-125 transition-all duration-300"></div>

            {/* Main Text */}
            <span className={`text-2xl font-black ${item.color} tracking-tight relative z-10 
                             group-hover:scale-105 group-hover:text-shadow-lg transition-all duration-300`}>
                {item.name}
            </span>

            {/* Floating Badge for Premium Exchanges */}
            {['BINANCE', 'OKX', 'KuCoin'].includes(item.name) && (
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-white text-xs font-bold px-3 py-1 rounded-full 
                               shadow-lg shadow-[#D4AF37]/30 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    TOP
                </div>
            )}

            {/* Hover Indicator Line */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-[#D4AF37] to-[#B8860B] 
                            rounded-full group-hover:w-3/4 transition-all duration-500 ease-out"></div>
        </div>
    );

    return (
        <section id="exchanges" className="py-10 bg-gradient-to-b from-[#FAFAF9] to-white overflow-hidden relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.8]">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[#F9E79F] blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-[#0F172A]/40 blur-3xl"></div>
            </div>

            <div className="container mx-auto px-6 mb-16 text-center relative z-10">
                <div className="inline-block px-4 py-1.5 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 text-[#D4AF37] font-bold text-xs uppercase tracking-widest mb-6">
                    Global Partnerships
                </div>

                <h2 className="text-4xl md:text-6xl font-black text-[#0F172A] mb-4 tracking-tight leading-tight">
                    Trade on <span className="text-gradient-gold">Leading Exchanges</span>
                </h2>
                <p className="text-lg md:text-xl text-gray-500 font-medium mb-8">
                    Buy USDT from trusted platforms worldwide
                </p>

                <div className="w-24 h-1.5 bg-gradient-to-r from-[#D4AF37] to-[#B8860B] mx-auto rounded-full"></div>
            </div>

            <div className="space-y-10 relative z-10">
                {/* Row 1: Right to Left */}
                <div className="relative overflow-hidden py-4">
                    <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#FAFAF9] to-transparent z-20 pointer-events-none"></div>
                    <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#FAFAF9] to-transparent z-20 pointer-events-none"></div>

                    <div className="flex gap-8 animate-scroll hover:pause-animation">
                        {[...row1, ...row1, ...row1].map((item, i) => (
                            <ExchangeCard key={`row1-${i}`} item={item} index={i} />
                        ))}
                    </div>
                </div>

                {/* Row 2: Left to Right (Reverse) */}
                <div className="relative overflow-hidden py-4">
                    <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#FAFAF9] to-transparent z-20 pointer-events-none"></div>
                    <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#FAFAF9] to-transparent z-20 pointer-events-none"></div>

                    <div className="flex gap-8 animate-scroll-reverse hover:pause-animation" style={{ animationDuration: '35s' }}>
                        {[...row2, ...row2, ...row2].map((item, i) => (
                            <ExchangeCard key={`row2-${i}`} item={item} index={i} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Stats Bar */}
            <div className="container mx-auto px-6 mt-20 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border-2 border-gray-200 shadow-lg hover:border-[#D4AF37]/50 hover:shadow-xl transition-all duration-300">
                        <div className="text-3xl font-black text-[#0F172A] mb-2">50M+</div>
                        <div className="text-gray-600 text-sm font-medium">Active Traders</div>
                        <div className="w-full h-1 bg-gray-200 rounded-full mt-4 overflow-hidden">
                            <div className="w-3/4 h-full bg-gradient-to-r from-[#D4AF37] to-[#B8860B] rounded-full"></div>
                        </div>
                    </div>
                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border-2 border-gray-200 shadow-lg hover:border-[#D4AF37]/50 hover:shadow-xl transition-all duration-300">
                        <div className="text-3xl font-black text-[#0F172A] mb-2">$2T+</div>
                        <div className="text-gray-600 text-sm font-medium">Daily Volume</div>
                        <div className="w-full h-1 bg-gray-200 rounded-full mt-4 overflow-hidden">
                            <div className="w-4/5 h-full bg-gradient-to-r from-[#D4AF37] to-[#B8860B] rounded-full"></div>
                        </div>
                    </div>
                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border-2 border-gray-200 shadow-lg hover:border-[#D4AF37]/50 hover:shadow-xl transition-all duration-300">
                        <div className="text-3xl font-black text-[#0F172A] mb-2">24/7</div>
                        <div className="text-gray-600 text-sm font-medium">Trading Support</div>
                        <div className="w-full h-1 bg-gray-200 rounded-full mt-4 overflow-hidden">
                            <div className="w-full h-full bg-gradient-to-r from-[#D4AF37] to-[#B8860B] rounded-full"></div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(calc(-220px * 6 - 2rem * 6)); }
                }
                @keyframes scroll-reverse {
                    0% { transform: translateX(calc(-220px * 6 - 2rem * 6)); }
                    100% { transform: translateX(0); }
                }
                .animate-scroll {
                    animation: scroll 30s linear infinite;
                    display: flex;
                    width: fit-content;
                }
                .animate-scroll-reverse {
                    animation: scroll-reverse 35s linear infinite;
                    display: flex;
                    width: fit-content;
                }
                .text-gradient-gold {
                    background: linear-gradient(135deg, #D4AF37 0%, #B8860B 50%, #DAA520 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }
                
                /* Pause animation on hover */
                .hover\:pause-animation:hover {
                    animation-play-state: paused;
                }
                
                /* Text shadow for better readability */
                .text-shadow-lg {
                    text-shadow: 0 4px 8px rgba(212, 175, 55, 0.2);
                }
            `}</style>
        </section>
    );
};

export default Exchanges;