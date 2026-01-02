import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import eVault_Logo from '../../public/eVaultLogoWithBG.png';
import { useCrypto } from '../context/CryptoContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [error, setError] = useState(null);
    const { login } = useCrypto();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const result = await login(formData.email, formData.password);
            if (result.success) {
                navigate(result.isAdmin ? '/admin' : '/dashboard');
            } else {
                setError(result.message || 'Login failed. Please check your credentials.');
            }
        } catch (error) {
            console.error(error);
            setError('An error occurred during login. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        // Clear error when user types
        if (error) setError(null);
    };

    return (
        <div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-[#0F172A]">
            {/* Animated Golden Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-gold/20 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-gold/10 rounded-full blur-[100px] animate-pulse delay-1000" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-gradient-radial from-navy-light/50 to-transparent opacity-50" />
                {/* Mesh Texture Overlay */}
                <div className="absolute inset-0 opacity-[0.2]" style={{ backgroundImage: 'radial-gradient(#D4AF37 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
            </div>

            {/* Login Card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 w-full max-w-sm px-4"
            >
                <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-gold/20">
                    {/* Gold Accent Top Line */}
                    <div className="h-2 w-full bg-gradient-to-r from-navy via-gold to-navy" />

                    <div className="p-8 pb-6">
                        {/* Logo & Header - Compact */}
                        <div className="text-center mb-6">
                            <div className="flex justify-center mb-4">
                                <div className="p-2 bg-navy/5 rounded-2xl">
                                    <img src={eVault_Logo} alt="eVault Logo" className="h-10 object-contain" />
                                </div>
                            </div>
                            <h1 className="text-2xl font-black text-navy tracking-tight mb-1">Welcome Back</h1>
                            <p className="text-sm text-gray-500 font-medium">Log in to manage your vault</p>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm font-medium flex items-center justify-center"
                            >
                                {error}
                            </motion.div>
                        )}

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Email */}
                            <div className="group">
                                <div className="relative">
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-gold transition-colors">
                                        <Mail size={18} />
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-navy text-sm font-semibold placeholder-gray-400 focus:border-gold focus:ring-1 focus:ring-gold focus:outline-none transition-all"
                                        placeholder="Email Address"
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="group">
                                <div className="relative">
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-gold transition-colors">
                                        <Lock size={18} />
                                    </div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        className="w-full pl-10 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl text-navy text-sm font-semibold placeholder-gray-400 focus:border-gold focus:ring-1 focus:ring-gold focus:outline-none transition-all"
                                        placeholder="Password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-navy transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center justify-between text-xs">
                                <label className="flex items-center cursor-pointer select-none">
                                    <input type="checkbox" className="w-3 h-3 rounded text-gold focus:ring-gold border-gray-300" />
                                    <span className="ml-2 text-gray-500 font-medium">Remember</span>
                                </label>
                                <Link to="/forgot-password" className="text-gold hover:text-gold-dark font-bold hover:underline">
                                    Forgot Password?
                                </Link>
                            </div>

                            {/* Submit Button */}
                            <motion.button
                                type="submit"
                                disabled={isLoading}
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full bg-[#0F172A] hover:bg-gold text-white hover:text-navy-light font-bold py-3.5 rounded-xl shadow-lg shadow-navy/20 hover:shadow-gold/30 transition-all duration-300 flex items-center justify-center gap-2"
                            >
                                {isLoading ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <span>Sign In</span>
                                        <ArrowRight size={18} />
                                    </>
                                )}
                            </motion.button>
                        </form>

                        {/* Footer */}
                        <div className="mt-6 text-center">
                            <p className="text-xs text-gray-500 font-medium">
                                Don't have an account?{' '}
                                <Link to="/register" className="text-navy font-bold hover:text-gold transition-colors">
                                    Sign up free
                                </Link>
                            </p>
                        </div>
                        {/* Back to Home */}
                        <div className="mt-4 text-center">
                            <Link to="/" className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold text-gray-400 hover:text-gold transition-colors">
                                <ArrowRight size={12} className="rotate-180" />
                                Back to Home
                            </Link>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;


