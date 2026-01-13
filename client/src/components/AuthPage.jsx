import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, User, CheckCircle2 } from 'lucide-react';
import eVault_Logo from '../../public/evaultbg.png';

import { useCrypto } from '../context/CryptoContext';

const AuthPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isSignUp, setIsSignUp] = useState(false);

    const [showForgotModal, setShowForgotModal] = useState(false);

    useEffect(() => {
        setIsSignUp(location.pathname === '/register');
    }, [location.pathname]);

    const toggleMode = () => {
        const newMode = !isSignUp;
        setIsSignUp(newMode);
        navigate(newMode ? '/register' : '/login', { replace: true });
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[#0F172A] p-2 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 opacity-[0.4]" style={{ backgroundImage: 'radial-gradient(#D4AF37 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
            </div>

            {/* Forgot Password Modal */}
            {showForgotModal && (
                <ForgotPasswordModal onClose={() => setShowForgotModal(false)} />
            )}

            <div className={`relative bg-white rounded-[2rem] shadow-2xl w-full max-w-[1000px] overflow-hidden flex flex-col md:flex-row min-h-[600px] md:min-h-[600px]`}>

                {/* --- MOBILE VIEW TOGGLE --- */}
                <div className="md:hidden absolute top-6 right-6 z-50">
                    <button
                        onClick={toggleMode}
                        className="text-xs font-bold text-[#D4AF37] border border-[#D4AF37] px-3 py-1.5 rounded-full hover:bg-[#D4AF37] hover:text-white transition-colors"
                    >
                        {isSignUp ? 'Sign In Instead' : 'Create Account'}
                    </button>
                </div>

                {/* --- DESKTOP SLIDING LAYOUT --- */}

                {/* Sign Up Form Container */}
                <div className={`w-full md:w-1/2 flex items-center justify-center p-8 bg-white z-10 
                    ${isSignUp ? 'block' : 'hidden md:flex md:opacity-0 md:z-0'} 
                    md:absolute md:top-0 md:h-full md:transition-all md:duration-700 md:ease-in-out 
                    ${isSignUp ? 'md:left-1/2 md:opacity-100' : 'md:left-0'}
                `}>
                    <SignUpForm toggleMode={toggleMode} />
                </div>

                {/* Sign In Form Container */}
                <div className={`w-full md:w-1/2 flex items-center justify-center p-8 bg-white z-10 
                    ${!isSignUp ? 'block' : 'hidden md:flex md:opacity-0 md:z-0'}
                    md:absolute md:top-0 md:h-full md:transition-all md:duration-700 md:ease-in-out
                    ${isSignUp ? 'md:left-0' : 'md:left-0 md:opacity-100'}
                `}>
                    <SignInForm toggleMode={toggleMode} onForgotClick={() => setShowForgotModal(true)} />
                </div>

                {/* Overlay Container (Desktop Only) */}
                <div className={`hidden md:block absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform duration-700 ease-in-out z-50 ${isSignUp ? '-translate-x-full rounded-r-[2rem] rounded-l-[2rem]' : 'rounded-l-[2rem]'}`}>
                    <div className={`bg-[#0F172A] text-white relative -left-full h-full w-[200%] transform transition-transform duration-700 ease-in-out ${isSignUp ? 'translate-x-1/2' : 'translate-x-0'}`}>

                        {/* Overlay Left */}
                        <div className={`absolute top-0 flex flex-col items-center justify-center w-1/2 h-full px-12 text-center transition-transform duration-700 ease-in-out ${isSignUp ? 'translate-x-0' : '-translate-x-[20%]'}`}>
                            <div className="p-4 bg-white/5 rounded-2xl mb-6 backdrop-blur-sm border border-white/10 shadow-xl">
                                <img src={eVault_Logo} alt="Logo" className="h-36 object-contain" />
                            </div>
                            <h1 className="text-4xl font-bold mb-4 text-[#D4AF37]">Welcome Back!</h1>
                            <p className="text-gray-300 mb-8 max-w-xs text-lg">
                                To keep connected with us please login with your personal info
                            </p>
                            <button
                                onClick={toggleMode}
                                className="px-10 py-3 rounded-xl border-2 border-[#D4AF37] text-[#D4AF37] font-bold uppercase tracking-wider hover:bg-[#D4AF37] hover:text-[#0F172A] transition-all duration-300 shadow-lg shadow-[#D4AF37]/20"
                            >
                                Sign In
                            </button>
                        </div>

                        {/* Overlay Right */}
                        <div className={`absolute top-0 right-0 flex flex-col items-center justify-center w-1/2 h-full px-12 text-center transition-transform duration-700 ease-in-out ${isSignUp ? 'translate-x-[20%]' : 'translate-x-0'}`}>
                            <div className="p-4 bg-white/5 rounded-2xl mb-6 backdrop-blur-sm border border-white/10 shadow-xl">
                                <img src={eVault_Logo} alt="Logo" className="h-36 object-contain" />
                            </div>
                            <h1 className="text-4xl font-bold mb-4 text-[#D4AF37]">Hello, Friend!</h1>
                            <p className="text-gray-300 mb-8 max-w-xs text-lg">
                                Enter your personal details and start journey with us
                            </p>
                            <button
                                onClick={toggleMode}
                                className="px-10 py-3 rounded-xl border-2 border-[#D4AF37] text-[#D4AF37] font-bold uppercase tracking-wider hover:bg-[#D4AF37] hover:text-[#0F172A] transition-all duration-300 shadow-lg shadow-[#D4AF37]/20"
                            >
                                Sign Up
                            </button>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

// --- Sub Components ---



const SignInForm = ({ toggleMode, onForgotClick }) => {
    const { login } = useCrypto();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const res = await login(email, password);
        if (res.success) {
            navigate(res.isAdmin ? '/admin' : '/dashboard');
        } else {
            alert(res.message || 'Login failed');
        }
        setLoading(false);
    };

    return (
        <form className="w-full max-w-sm space-y-3 py-0" onSubmit={handleSubmit}>
            <div className="text-center">
                {/* Mobile Logo */}
                <div className="md:hidden flex justify-center">
                    <img src={eVault_Logo} alt="Logo" className="h-36 object-contain" />
                </div>

                <h2 className="text-3xl font-bold text-[#0F172A] tracking-tight mb-6">Sign In</h2>
            </div>

            <div className="space-y-2">
                <div className="relative group">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#D4AF37] transition-colors">
                        <Mail size={20} />
                    </div>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email Address"
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border-2 border-gray-500 rounded-xl text-gray-900 placeholder-gray-400 focus:border-[#D4AF37] focus:ring-4 focus:ring-[#D4AF37]/10 outline-none transition-all font-medium"
                        required
                    />
                </div>
                <div className="relative group">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#D4AF37] transition-colors">
                        <Lock size={20} />
                    </div>
                    <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="w-full pl-10 pr-12 py-3 bg-gray-50 border-2 border-gray-500 rounded-xl text-gray-900 placeholder-gray-400 focus:border-[#D4AF37] focus:ring-4 focus:ring-[#D4AF37]/10 outline-none transition-all font-medium"
                        required
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#0F172A]">
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>
            </div>

            <div className="flex items-center justify-between text-sm mt-2 font-medium">
                <button type="button" onClick={onForgotClick} className="text-[#0F172A] hover:text-[#D4AF37] transition-colors">Forgot Password?</button>
            </div>

            <button type="submit" disabled={loading} className="w-full bg-[#0F172A] text-white font-bold py-4 rounded-xl hover:bg-[#D4AF37] hover:text-[#0F172A] transition-all duration-300 mt-6 shadow-xl shadow-[#0F172A]/20 transform hover:-translate-y-0.5 disabled:opacity-50">
                {loading ? 'Signing In...' : 'Sign In'}
            </button>

            {/* Mobile only switch */}
            <div className="md:hidden text-center mt-0 pt-3 border-t border-gray-100">
                <p className="text-sm text-gray-600">
                    Don't have an account?{' '}
                    <button type="button" onClick={toggleMode} className="font-bold text-[#D4AF37] hover:underline ml-1">Sign Up</button>
                </p>
            </div>
        </form>
    );
};

const SignUpForm = ({ toggleMode }) => {
    const { register } = useCrypto();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const res = await register(name, email, password);
        if (res.success) {
            navigate('/dashboard');
        } else {
            alert(res.message || 'Registration failed');
        }
        setLoading(false);
    };

    return (
        <form className="w-full max-w-sm space-y-5 py-8 md:py-0" onSubmit={handleSubmit}>
            <div className="text-center mb-6">
                {/* Mobile Logo */}
                <div className="md:hidden flex justify-center mb-6">
                    <img src={eVault_Logo} alt="Logo" className="h-12 object-contain" />
                </div>

                <h2 className="text-4xl font-bold text-[#0F172A] tracking-tight mb-8">Create Account</h2>
            </div>

            <div className="space-y-4">
                <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#D4AF37] transition-colors">
                        <User size={20} />
                    </div>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Full Name"
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-500 rounded-xl text-gray-900 placeholder-gray-400 focus:border-[#D4AF37] focus:ring-4 focus:ring-[#D4AF37]/10 outline-none transition-all font-medium"
                        required
                    />
                </div>
                <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#D4AF37] transition-colors">
                        <Mail size={20} />
                    </div>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email Address"
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-500 rounded-xl text-gray-900 placeholder-gray-400 focus:border-[#D4AF37] focus:ring-4 focus:ring-[#D4AF37]/10 outline-none transition-all font-medium"
                        required
                    />
                </div>
                <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#D4AF37] transition-colors">
                        <Lock size={20} />
                    </div>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-500 rounded-xl text-gray-900 placeholder-gray-400 focus:border-[#D4AF37] focus:ring-4 focus:ring-[#D4AF37]/10 outline-none transition-all font-medium"
                        required
                    />
                </div>
            </div>

            <button type="submit" disabled={loading} className="w-full bg-[#0F172A] text-white font-bold py-4 rounded-xl hover:bg-[#D4AF37] hover:text-[#0F172A] transition-all duration-300 mt-6 shadow-xl shadow-[#0F172A]/20 transform hover:-translate-y-0.5 disabled:opacity-50">
                {loading ? 'Signing Up...' : 'Sign Up'}
            </button>

            {/* Mobile only switch */}
            <div className="md:hidden text-center mt-8 pt-6 border-t border-gray-100">
                <p className="text-sm text-gray-600">
                    Already have an account?{' '}
                    <button type="button" onClick={toggleMode} className="font-bold text-[#D4AF37] hover:underline ml-1">Sign In</button>
                </p>
            </div>
        </form>
    );
};

const ForgotPasswordModal = ({ onClose }) => {
    const { forgotPassword } = useCrypto();
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        setError('');

        const res = await forgotPassword(email, newPassword);

        if (res.success) {
            setMessage(res.message);
            setTimeout(() => {
                onClose();
            }, 2000);
        } else {
            setError(res.message);
        }
        setLoading(false);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl p-8 w-full max-w-md relative animate-fade-in shadow-2xl">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                    ✕
                </button>
                <h3 className="text-2xl font-bold text-[#0F172A] mb-2">Reset Password</h3>
                <p className="text-gray-500 mb-6">Enter your email and a new password.</p>

                {message && (
                    <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg flex items-center gap-2">
                        <CheckCircle2 size={18} /> {message}
                    </div>
                )}

                {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative group">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#D4AF37] transition-colors">
                            <Mail size={20} />
                        </div>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email Address"
                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:ring-4 focus:ring-[#D4AF37]/10 outline-none transition-all"
                            required
                        />
                    </div>
                    <div className="relative group">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#D4AF37] transition-colors">
                            <Lock size={20} />
                        </div>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="New Password"
                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:ring-4 focus:ring-[#D4AF37]/10 outline-none transition-all"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#0F172A] text-white font-bold py-3 rounded-xl hover:bg-[#D4AF37] hover:text-[#0F172A] transition-all disabled:opacity-50"
                    >
                        {loading ? 'Updating...' : 'Update Password'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AuthPage;
