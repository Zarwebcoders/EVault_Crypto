import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight, User, CheckCircle2 } from 'lucide-react';
import eVault_Logo from '../../public/evaultbg.png';
import { useCrypto } from '../context/CryptoContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false
    });
    const [error, setError] = useState(null);
    const { register } = useCrypto();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match!');
            return;
        }
        if (!formData.agreeToTerms) {
            setError('Please agree to the terms and conditions');
            return;
        }
        setIsLoading(true);

        try {
            const result = await register(formData.fullName, formData.email, formData.password);
            if (result.success) {
                navigate('/dashboard');
            } else {
                setError(result.message || 'Registration failed');
            }
        } catch (error) {
            console.error(error);
            setError('An error occurred during registration');
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
        if (error) setError(null);
    };

    return (
        <div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-[#0F172A]">
            {/* Animated Golden Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] left-[-20%] w-[50%] h-[50%] bg-gold/15 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-gold/10 rounded-full blur-[100px] animate-pulse delay-700" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
                {/* Mesh Texture Overlay */}
                <div className="absolute inset-0 opacity-[0.2]" style={{ backgroundImage: 'radial-gradient(#D4AF37 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
            </div>

            {/* Register Card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 w-full max-w-sm px-4"
            >
                <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-gold/20 flex flex-col max-h-[90vh]">
                    {/* Gold Accent Top Line */}
                    <div className="h-2 w-full bg-gradient-to-r from-navy via-gold to-navy shrink-0" />

                    <div className="p-8 pb-6 flex flex-col h-full overflow-y-auto custom-scrollbar">
                        {/* Logo & Header */}
                        <div className="text-center mb-6 shrink-0">
                            <div className="flex justify-center mb-4">
                                <div className="p-2 bg-navy/5 rounded-2xl">
                                    <img src={eVault_Logo} alt="eVault Logo" className="h-10 object-contain" />
                                </div>
                            </div>
                            <h1 className="text-2xl font-black text-navy tracking-tight mb-1">Create Account</h1>
                            <p className="text-sm text-gray-500 font-medium">Join eVault today</p>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm font-medium flex items-center justify-center shrink-0"
                            >
                                {error}
                            </motion.div>
                        )}

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-3 shrink-0">
                            {/* Full Name */}
                            <div className="group">
                                <div className="relative">
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-gold transition-colors">
                                        <User size={18} />
                                    </div>
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        required
                                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-navy text-sm font-semibold placeholder-gray-400 focus:border-gold focus:ring-1 focus:ring-gold focus:outline-none transition-all"
                                        placeholder="Full Name"
                                    />
                                </div>
                            </div>

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

                            {/* Confirm Password */}
                            <div className="group">
                                <div className="relative">
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-gold transition-colors">
                                        <Lock size={18} />
                                    </div>
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        required
                                        className="w-full pl-10 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl text-navy text-sm font-semibold placeholder-gray-400 focus:border-gold focus:ring-1 focus:ring-gold focus:outline-none transition-all"
                                        placeholder="Confirm Password"
                                    />
                                    {/* Match Indicator */}
                                    {formData.password && formData.confirmPassword && (
                                        <div className="absolute right-10 top-1/2 -translate-y-1/2">
                                            {formData.password === formData.confirmPassword ? (
                                                <CheckCircle2 size={16} className="text-green-500" />
                                            ) : null}
                                        </div>
                                    )}
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-navy transition-colors"
                                    >
                                        {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </div>


                            {/* Terms */}
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input
                                        id="terms"
                                        name="agreeToTerms"
                                        type="checkbox"
                                        checked={formData.agreeToTerms}
                                        onChange={handleChange}
                                        className="w-4 h-4 border-2 border-gray-300 rounded text-gold focus:ring-gold"
                                    />
                                </div>
                                <div className="ml-2 text-xs">
                                    <label htmlFor="terms" className="font-medium text-gray-500">I agree to the <Link to="/terms" className="text-gold hover:underline">Terms</Link> & <Link to="/privacy" className="text-gold hover:underline">Privacy</Link></label>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <motion.button
                                type="submit"
                                disabled={isLoading}
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full bg-[#0F172A] hover:bg-gold text-white hover:text-navy-light font-bold py-3.5 rounded-xl shadow-lg shadow-navy/20 hover:shadow-gold/30 transition-all duration-300 flex items-center justify-center gap-2 mt-2"
                            >
                                {isLoading ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <span>Create Account</span>
                                        <ArrowRight size={18} />
                                    </>
                                )}
                            </motion.button>
                        </form>

                        {/* Footer */}
                        <div className="mt-4 text-center shrink-0">
                            <p className="text-xs text-gray-500 font-medium">
                                Already have an account?{' '}
                                <Link to="/login" className="text-navy font-bold hover:text-gold transition-colors">
                                    Log in
                                </Link>
                            </p>
                        </div>
                        {/* Back to Home */}
                        <div className="mt-4 text-center shrink-0">
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

export default Register;
