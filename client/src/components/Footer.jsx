import React, { useState } from 'react';
import { Twitter, Linkedin, Facebook, Instagram, Mail, ArrowUpRight, Loader2, Check, AlertCircle } from 'lucide-react';
import axiosInstance from '../api/axios';

const Footer = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [message, setMessage] = useState('');

    const handleSubscribe = async (e) => {
        e.preventDefault();
        if (!email) return;

        setStatus('loading');
        setMessage('');

        try {
            await axiosInstance.post('/newsletter', { email });
            setStatus('success');
            setMessage('Subscribed successfully!');
            setEmail('');
            setTimeout(() => {
                setStatus('idle');
                setMessage('');
            }, 3000);
        } catch (error) {
            setStatus('error');
            setMessage(error.response?.data?.error || 'Subscription failed. Try again.');
            setTimeout(() => {
                setStatus('idle');
                setMessage('');
            }, 3000);
        }
    };

    return (
        <footer className="bg-[#0F172A] py-10 text-white border-t border-gold/20 relative overflow-hidden">
            {/* Shooting Stars / Meteor Rain Effect */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="meteor absolute top-0 bg-gradient-to-b from-transparent to-white/40 w-[1px] h-[150px]"
                        style={{
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${5 + Math.random() * 3}s`,
                            opacity: 0.1 + Math.random() * 0.3
                        }}
                    />
                ))}
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-6 gap-12 mb-16">

                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2">
                        {/* <div className="flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 rounded-lg bg-gradient-gold flex items-center justify-center text-[#0F172A] font-bold">E</div>
                            <div className="text-2xl font-black tracking-tighter text-white">
                                VAULT
                            </div>
                        </div> */}
                        <img src="/evaultbg.png" alt="Logo" className="w-52 h-32 mb-6 bg-white rounded-2xl" />
                        <p className="text-gray-400 leading-relaxed mb-8 text-sm">
                            The world's most trusted staking platform. Secure your future with intelligent crypto investment solutions.
                        </p>
                        <div className="flex gap-4">
                            {[Twitter, Linkedin, Facebook, Instagram].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-gold hover:text-white transition-all border border-white/5 hover:border-gold">
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="font-bold text-gold mb-6 uppercase tracking-wider text-sm">Platform</h4>
                        <ul className="space-y-4 text-gray-400 text-sm">
                            {['Staking', 'Earn', 'Wallet', 'Institutional'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="hover:text-gold transition-colors flex items-center gap-1 group">
                                        {item} <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-gold mb-6 uppercase tracking-wider text-sm">Company</h4>
                        <ul className="space-y-4 text-gray-400 text-sm">
                            {['About Us', 'Careers', 'Blog', 'Security'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="hover:text-gold transition-colors">{item}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="col-span-1 md:col-span-2">
                        <h4 className="font-bold text-gold mb-6 uppercase tracking-wider text-sm">Newsletter</h4>
                        <p className="text-gray-400 text-sm mb-6">Subscribe to our newsletter for the latest staking rates.</p>

                        <div className="flex items-center gap-3 mb-6 bg-white/5 p-3 rounded-lg border border-white/5">
                            <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                                <Mail size={16} />
                            </div>
                            <div>
                                <div className="text-xs text-gray-400 font-bold uppercase">Support Email</div>
                                <a href="mailto:support@evaultcryptobank.com" className="text-white hover:text-gold transition-colors text-sm font-medium">
                                    support@evaultcryptobank.com
                                </a>
                            </div>
                        </div>

                        <form onSubmit={handleSubscribe} className="flex bg-white/5 p-1 rounded-lg border border-white/10 focus-within:border-gold/50 transition-colors relative">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="bg-transparent border-none outline-none text-white px-4 py-2 w-full text-sm placeholder-gray-500"
                                disabled={status === 'loading' || status === 'success'}
                            />
                            <button
                                type="submit"
                                disabled={status === 'loading' || status === 'success'}
                                className={`bg-gradient-gold hover:brightness-110 text-white px-4 py-2 rounded-md font-bold transition-colors shadow-lg shadow-gold/20 flex items-center justify-center min-w-[50px] ${status === 'success' ? 'bg-green-500' : ''}`}
                            >
                                {status === 'loading' ? (
                                    <Loader2 size={18} className="animate-spin" />
                                ) : status === 'success' ? (
                                    <Check size={18} />
                                ) : (
                                    <Mail size={18} />
                                )}
                            </button>
                        </form>
                        {message && (
                            <div className={`mt-2 text-xs flex items-center gap-1 ${status === 'error' ? 'text-red-400' : 'text-green-400'}`}>
                                {status === 'error' && <AlertCircle size={12} />}
                                {message}
                            </div>
                        )}
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
                    <p>
                        © {new Date().getFullYear()} eVault Crypto Bank. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes meteor {
                    0% { transform: translateY(-100vh); opacity: 0; }
                    50% { opacity: 1; }
                    100% { transform: translateY(100vh); opacity: 0; }
                }
                .meteor {
                    animation: meteor linear infinite;
                }
            `}</style>
        </footer>
    );
};

export default Footer;
