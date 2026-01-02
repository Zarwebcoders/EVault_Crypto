import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import eVault_Logo from '../../public/eVaultLogoWithBG.png';

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
                    ? 'glass-panel py-4 shadow-lg'
                    : 'bg-transparent py-5'
                    }`}
            >
                <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                    {/* Logo */}
                    <div>
                        <img className='w-35 h-20' src={eVault_Logo} alt="eVault_Logo" />
                    </div>

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

                    {/* Auth Buttons */}
                    <div className="hidden md:flex items-center gap-3">
                        <Link to="/login">
                            <button className="text-navy font-bold py-2.5 px-6 rounded-lg hover:text-gold transition-all">
                                Login
                            </button>
                        </Link>
                        <Link to="/register">
                            <button className="bg-gradient-to-r from-navy to-navy-light hover:from-gold hover:to-gold-dark text-black border font-bold py-2.5 px-6 rounded-lg transition-all shadow-lg shadow-navy/20 hover:shadow-gold/30">
                                Sign Up
                            </button>
                        </Link>
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
                            <div className="flex flex-col gap-3">
                                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                                    <button className="border-2 border-navy text-navy font-bold py-4 rounded-lg w-full hover:bg-navy hover:text-white transition-all">
                                        Login
                                    </button>
                                </Link>
                                <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>
                                    <button className="bg-gradient-to-r from-navy to-navy-light text-white font-bold py-4 rounded-lg w-full shadow-lg shadow-navy/30">
                                        Sign Up
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Header;
