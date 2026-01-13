import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Facebook, Twitter, Instagram, Send, X, TrendingUp, DollarSign, Calendar, Zap, Gamepad2, Share2, Shield, BarChart3, ArrowRight, Wallet, Users, Globe, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CalculatorModal from './CalculatorModal';

const Hero = () => {
    const navigate = useNavigate();
    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(100);
    const [dailyIncome, setDailyIncome] = useState(0);
    const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
    const [isSocialsVisible, setIsSocialsVisible] = useState(true);

    const words = ['Passive Income', 'Daily Rewards', 'Automatic Yield'];

    const targetDailyIncome = 843.72;
    const animationDuration = 2000; // 2 seconds

    useEffect(() => {
        // Typewriter effect
        const handleTyping = () => {
            const i = loopNum % words.length;
            const fullText = words[i];

            setText(isDeleting
                ? fullText.substring(0, text.length - 1)
                : fullText.substring(0, text.length + 1)
            );

            setTypingSpeed(isDeleting ? 50 : 100);

            if (!isDeleting && text === fullText) {
                setTimeout(() => setIsDeleting(true), 1500);
            } else if (isDeleting && text === '') {
                setIsDeleting(false);
                setLoopNum(loopNum + 1);
            }
        };

        const timer = setTimeout(handleTyping, typingSpeed);
        return () => clearTimeout(timer);
    }, [text, isDeleting, loopNum, typingSpeed, words]);

    useEffect(() => {
        // Daily income counter animation
        const increment = targetDailyIncome / (animationDuration / 16); // 60fps
        let current = 0;
        let animationFrameId;

        const animate = () => {
            current += increment;
            if (current >= targetDailyIncome) {
                setDailyIncome(targetDailyIncome);
                return;
            }
            setDailyIncome(current);
            animationFrameId = requestAnimationFrame(animate);
        };

        animationFrameId = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    return (
        <section className="relative pt-0 pb-20 md:pt-28 md:min-h-screen flex items-center overflow-hidden bg-[#FAFAF9]">
            {/* Background Gradients - Gold Enhanced */}
            <div className="absolute top-0 right-0 w-[60%] h-full bg-gradient-to-l from-gold/5 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-gradient-to-t from-gold/10 to-transparent pointer-events-none" />

            {/* Mesh Pattern Overlay */}
            <div className="absolute inset-0 opacity-[0.4] mix-blend-multiply pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(#D4AF37 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}
            />

            {/* Reopen Socials Button */}
            <button
                onClick={() => setIsSocialsVisible(true)}
                className={`fixed right-0 top-60 md:top-32 z-30 bg-blue-600 text-white p-3 rounded-l-xl shadow-lg hover:pl-4 transition-all duration-300 ${!isSocialsVisible ? 'translate-x-0' : 'translate-x-full'} md:scale-100 scale-75 origin-right`}
            >
                <Share2 size={20} />
            </button>

            {/* Floating Social Sidebar - Fixed Position (Right Side) */}
            <div className={`fixed right-0 top-60 md:top-32 z-40 transition-transform duration-500 ease-in-out ${isSocialsVisible ? 'translate-x-0' : 'translate-x-[200%]'} md:scale-100 scale-75 origin-right`}>
                <div className="flex flex-col gap-3 pr-2 bg-white/80 backdrop-blur-sm py-4 pl-3 rounded-l-2xl border-y border-l border-gray-400 shadow-2xl shadow-black relative">

                    {/* Cancel Button */}
                    <button
                        onClick={() => setIsSocialsVisible(false)}
                        className="absolute -left-3 -top-3 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 shadow-lg cursor-pointer transition-transform hover:scale-110 z-50 border border-white"
                        title="Hide Socials"
                    >
                        <X size={14} strokeWidth={3} />
                    </button>

                    {[
                        { Icon: Facebook, color: "bg-blue-600" },
                        { Icon: Instagram, color: "bg-pink-600" },
                        { Icon: Send, color: "bg-blue-400" },
                        { Icon: Twitter, color: "bg-black" },
                        { Icon: Gamepad2, color: "bg-[#5865F2]" }
                    ].map((item, index) => (
                        <a
                            key={index}
                            href="#"
                            className={`w-10 h-10 rounded-full ${item.color} text-white flex items-center justify-center shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-300`}
                        >
                            <item.Icon size={18} />
                        </a>
                    ))}
                </div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-12">

                    {/* Left Column: Text */}
                    <div className="flex-1 text-center lg:text-left pt-36 lg:pt-0">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-4xl md:text-6xl font-black text-[#0F172A] leading-[1.1] md:leading-[1.05] mb-6 md:mb-8 font-sans tracking-tight"
                        >
                            Earn <br />
                            <span className="text-gradient-gold">
                                {text}
                                <span className="inline-block w-[3px] h-[1em] bg-[#D4AF37] ml-1 animate-pulse" />
                            </span> <br />
                            with eVault Crypto Bank
                        </motion.h1>



                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className="text-md sm:text-lg text-gray-500 mb-10 leading-relaxed font-medium max-w-lg sm:max-w-full mx-auto lg:mx-0"
                        >
                            Maximize your USDT returns through secure and efficient yield farming strategies. Join thousands of successful investors earning passive income.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="flex flex-col xs:flex-row gap-3 xs:gap-4 justify-center lg:justify-start w-full"
                        >
                            <button
                                onClick={() => navigate('/login')}
                                className="bg-gradient-to-r from-[#0F172A] to-[#1E293B] hover:from-[#1E293B] hover:to-[#0F172A] text-white text-sm xs:text-base sm:text-lg font-semibold xs:font-bold py-3 xs:py-3.5 sm:py-4 px-4 xs:px-6 sm:px-8 md:px-10 lg:px-12 rounded-lg sm:rounded-xl shadow-lg sm:shadow-xl shadow-navy/30 hover:translate-y-[-2px] transition-all relative overflow-hidden group w-full xs:w-auto"
                            >
                                <span className="relative z-10 flex items-center justify-center xs:justify-start gap-1.5 xs:gap-2">
                                    <span className="truncate">Start Earning</span>
                                    <TrendingUp className="w-4 h-4 xs:w-5 xs:h-5 text-[#D4AF37] flex-shrink-0" />
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </button>

                            <button
                                onClick={() => setIsCalculatorOpen(true)}
                                className="border-2 border-[#0F172A] text-[#0F172A] hover:bg-[#0F172A] hover:text-white text-sm xs:text-base sm:text-lg font-semibold xs:font-bold py-3 xs:py-3.5 sm:py-4 px-4 xs:px-5 sm:px-6 md:px-8 rounded-lg sm:rounded-xl transition-all duration-300 flex items-center justify-center gap-1.5 xs:gap-2 w-full xs:w-auto"
                            >
                                <DollarSign className="w-4 h-4 xs:w-5 xs:h-5" />
                                <span className="whitespace-nowrap">Calculate APY</span>
                            </button>
                        </motion.div>

                        {/* Stats Row */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                            className="flex flex-wrap gap-6 mt-12 justify-center lg:justify-start"
                        >
                            <div className="text-center">
                                <div className="text-3xl font-black text-[#0F172A]">45k+</div>
                                <div className="text-gray-500 text-sm">Active Users</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-black text-[#0F172A]">25.4M</div>
                                <div className="text-gray-500 text-sm">Total Stake</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-black text-[#0F172A]">30-36%</div>
                                <div className="text-gray-500 text-sm">Avg. APY</div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: 3D Visualization */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="hidden md:block flex-1 w-full relative h-[500px] md:h-[600px] perspective-[2000px] md:-mr-20 mt-10 md:mt-0"
                    >

                        {/* Accent Glow Behind Phones - Stronger */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-[#FFD700]/20 blur-[100px] rounded-full pointer-events-none z-0" />

                        <div className="relative w-full h-full preserve-3d md:scale-100 scale-75 origin-center">

                            {/* Phone 2: Back Left (Income) */}
                            <motion.div
                                animate={{ y: [0, -15, 0] }}
                                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute top-10 md:top-20 left-4 md:left-10 w-56 md:w-64 h-[350px] md:h-[400px] bg-white rounded-3xl shadow-2xl border border-gray-600 p-2 transform rotate-y-12 -rotate-z-6 translate-z-[-50px] z-0 opacity-90"
                            >
                                <div className="bg-[#0F172A] h-24 rounded-2xl mb-4 p-4 flex flex-col justify-between relative overflow-hidden">
                                    <div className="absolute right-0 top-0 w-16 h-16 bg-gold/20 rounded-full blur-xl transform translate-x-1/2 -translate-y-1/2" />
                                    <div className="flex justify-between items-center text-white/80 text-xs font-bold uppercase">
                                        <span>eVault Crypto Bank</span>
                                        <span>ID: 8392</span>
                                    </div>
                                    <div className="text-white font-bold text-lg">Income Dashboard</div>
                                </div>
                                <div className="grid grid-cols-2 gap-3 mb-4">
                                    <div className="bg-gray-50 rounded-xl p-3 text-center">
                                        <div className="text-xs text-gray-400 font-bold uppercase">Total</div>
                                        <div className="text-gold font-bold text-lg">$5,221</div>
                                    </div>
                                    <div className="bg-gray-50 rounded-xl p-3 text-center">
                                        <div className="text-xs text-gray-400 font-bold uppercase">ROI</div>
                                        <div className="text-green-500 font-bold text-lg">$844</div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Phone 3: Back Right (History) */}
                            <motion.div
                                animate={{ y: [0, -12, 0] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                className="absolute top-6 md:top-12 right-4 md:right-10 w-56 md:w-64 h-[350px] md:h-[400px] text-black bg-white rounded-3xl shadow-2xl border border-gray-600 p-2 transform -rotate-y-12 rotate-z-3 translate-z-[-100px] z-0 opacity-80 hidden sm:block"
                            >
                                <div className="bg-gradient-gold h-24 rounded-2xl mb-4 p-4 relative overflow-hidden">
                                    <div className="text-black font-bold text-lg mt-8">Transaction History</div>
                                </div>
                                <div className="space-y-2">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="flex justify-between items-center p-2 border-b border-gray-50">
                                            <div className="w-8 h-8 rounded-full bg-gray-400" />
                                            <div className="w-16 h-2 bg-gray-400 rounded-full" />
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Phone 1: Main Front (Wallet) */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 md:w-80 h-[450px] md:h-[520px] bg-white rounded-4xl shadow-[0_35px_60px_-15px_rgba(0,0,0,0.15)] border-2 border-gray-600 ring-1 ring-gray-100 z-20 p-3 flex flex-col"
                            >
                                {/* Header */}
                                <div className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] rounded-2xl p-6 mb-6 shadow-lg shadow-navy/20 text-white relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-gold/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />

                                    <div className="flex justify-between items-start mb-6">
                                        <div className="text-xl font-black">eVault Crypto Bank</div>
                                        <div className="bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">Active</div>
                                    </div>

                                    <div className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Available Balance</div>
                                    <div className="text-4xl font-black mb-4 tracking-tight flex items-baseline gap-1">
                                        <span className="text-green-400 text-2xl">₮</span> 4,000.00
                                    </div>

                                    <button className="w-full py-3 bg-green-500 hover:bg-green-400 text-white rounded-xl font-bold text-sm shadow-lg shadow-green-500/30 transition-all">
                                        Withdraw Funds
                                    </button>
                                </div>

                                {/* Stats Row */}
                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div className="p-3 border border-gray-100 rounded-xl">
                                        <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center text-green-600 mb-2">
                                            <div className="w-4 h-4 bg-current rounded-full" />
                                        </div>
                                        <div className="text-[10px] text-gray-400 uppercase font-bold">Total Staked</div>
                                        <div className="text-[#0F172A] font-bold">1,040.00</div>
                                    </div>
                                    <div className="p-3 border border-gray-100 rounded-xl">
                                        <div className="w-8 h-8 rounded-lg bg-gold/20 flex items-center justify-center text-gold mb-2">
                                            <div className="w-4 h-4 bg-current rounded-full" />
                                        </div>
                                        <div className="text-[10px] text-gray-400 uppercase font-bold">Total Rewards</div>
                                        <div className="text-[#0F172A] font-bold">$0.00</div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between mb-4">
                                    <div className="font-bold text-[#0F172A]">Recent</div>
                                    <div className="text-xs text-gold font-bold cursor-pointer">View All</div>
                                </div>

                                {/* List items */}
                                <div className="space-y-3 flex-1 overflow-hidden">
                                    <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xs font-bold">In</div>
                                            <div>
                                                <div className="text-xs font-bold text-[#0F172A]">Deposit</div>
                                                <div className="text-[10px] text-gray-400">Apr 21</div>
                                            </div>
                                        </div>
                                        <div className="text-xs font-bold text-green-600">+500.00</div>
                                    </div>
                                </div>
                            </motion.div>

                        </div>
                    </motion.div>

                </div>
            </div>

            <CalculatorModal isOpen={isCalculatorOpen} onClose={() => setIsCalculatorOpen(false)} />
        </section>
    );
};

export default Hero;