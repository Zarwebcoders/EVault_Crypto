import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = ['Features', 'Staking', 'Roadmap', 'Testimonials'];

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                        ? 'glass-panel py-3 shadow-lg'
                        : 'bg-transparent py-5'
                    }`}
            >
                <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                    {/* Logo */}
                    <a href="#" className="flex items-center gap-2 group">
                        {/* Animated Gold Logo Container */}
                        <div className="w-10 h-10 rounded-xl bg-gradient-gold flex items-center justify-center text-white font-black text-xl shadow-lg shadow-gold/30 group-hover:scale-105 transition-transform duration-300">
                            E
                        </div>
                        <div className="text-2xl font-black tracking-tighter text-gray-900">
                            VAULT
                            <span className="text-gold">.</span>
                        </div>
                    </a>

                    {/* Desktop Nav - Centered */}
                    <nav className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
                        {navLinks.map((link) => (
                            <a
                                key={link}
                                href={`#${link.toLowerCase()}`}
                                className="text-gray-600 font-bold hover:text-gold transition-colors text-xs uppercase tracking-[0.2em]"
                            >
                                {link}
                            </a>
                        ))}
                    </nav>

                    {/* CTA Button */}
                    <div className="hidden md:block">
                        <button className="bg-[#0F172A] hover:bg-gold hover:text-white text-white font-bold py-2.5 px-6 rounded-lg transition-all shadow-xl shadow-gold/10 hover:shadow-gold/30 border border-white/10 hover:border-gold/50">
                            Get Started
                        </button>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden text-gray-900 pl-4"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden fixed top-[70px] left-0 right-0 bg-white/95 backdrop-blur-xl shadow-xl z-40 overflow-hidden border-t border-gold/20"
                    >
                        <div className="p-6 flex flex-col gap-6">
                            {navLinks.map((link) => (
                                <a
                                    key={link}
                                    href={`#${link.toLowerCase()}`}
                                    className="text-gray-900 font-bold text-xl hover:text-gold tracking-wide"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link}
                                </a>
                            ))}
                            <hr className="border-gray-100" />
                            <button className="bg-gradient-gold text-white font-bold py-4 rounded-lg w-full shadow-lg shadow-gold/30">
                                Get Started
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Header;
