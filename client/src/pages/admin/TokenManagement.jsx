import React, { useState } from 'react';
import { useCrypto } from '../../context/CryptoContext';
import { 
    CheckCircleIcon, 
    PencilSquareIcon, 
    XMarkIcon, 
    CheckIcon,
    WalletIcon,
    ChartBarIcon,
    AdjustmentsHorizontalIcon,
    SparklesIcon,
    ClockIcon,
    CurrencyDollarIcon,
    ShieldCheckIcon,
    ArrowPathIcon,
    InformationCircleIcon
} from '@heroicons/react/24/outline';

const TokenManagement = () => {
    const { roiRates, updateRoiRate } = useCrypto();
    const [editMode, setEditMode] = useState(null);
    const [tempRate, setTempRate] = useState('');
    const [tempWallet, setTempWallet] = useState('');
    const [message, setMessage] = useState('');
    
    // Mock token icons and colors
    const tokenDetails = {
        USDT: { color: 'from-green-400 to-emerald-600', icon: '₮' },
        DODGE: { color: 'from-yellow-400 to-amber-600', icon: 'Ð' },
        ETH: { color: 'from-purple-400 to-indigo-600', icon: 'Ξ' },
        SOL: { color: 'from-pink-400 to-rose-600', icon: '◎' },
        XRP: { color: 'from-blue-400 to-sky-600', icon: 'X' },
        BNB: { color: 'from-orange-400 to-yellow-600', icon: 'B' }
    };

    const handleEdit = (token) => {
        setEditMode(token);
        setTempRate(roiRates[token].rate);
        setTempWallet(roiRates[token].walletAddress || '');
    };

    const handleSave = (token) => {
        updateRoiRate(token, {
            rate: parseFloat(tempRate),
            walletAddress: tempWallet
        });
        setEditMode(null);
        setMessage(`${token} configuration updated successfully!`);
        setTimeout(() => setMessage(''), 3000);
    };

    const handleCancel = () => {
        setEditMode(null);
    };

    return (
        <div className="space-y-8 max-w-7xl mx-auto pb-12">
            
            {/* Header with Gradient Background */}
            <div className="relative bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl shadow-2xl overflow-hidden">
                <div className="absolute inset-0 bg-grid-white/5"></div>
                <div className="relative p-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] rounded-xl shadow-lg">
                                    <AdjustmentsHorizontalIcon className="w-6 h-6 text-white" />
                                </div>
                                <h1 className="text-3xl font-bold text-white">Asset Configuration</h1>
                            </div>
                            <p className="text-gray-300 max-w-2xl">
                                Manage global ROI rates and liquidity wallet destinations with real-time updates.
                            </p>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 text-white">
                                <div className="flex items-center gap-2">
                                    <ShieldCheckIcon className="w-5 h-5 text-[#D4AF37]" />
                                    <div>
                                        <p className="text-sm font-medium">Total Assets</p>
                                        <p className="text-xl font-bold">{Object.keys(roiRates).length}</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-gradient-to-r from-[#D4AF37]/20 to-[#FFD700]/10 border border-[#D4AF37]/30 rounded-xl px-4 py-3">
                                <div className="flex items-center gap-2">
                                    <ClockIcon className="w-5 h-5 text-[#D4AF37]" />
                                    <div>
                                        <p className="text-sm font-medium text-[#D4AF37]">Last Updated</p>
                                        <p className="text-sm font-bold text-white">Just now</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Success Notification */}
            {message && (
                <div className="animate-fade-in-up bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-4 shadow-lg">
                    <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full shadow-lg">
                        <CheckCircleIcon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-2">
                            <p className="text-green-800 font-bold text-sm">Success!</p>
                            <div className="h-1 w-1 rounded-full bg-green-600"></div>
                            <p className="text-green-700 text-sm">Configuration Updated</p>
                        </div>
                        <p className="text-green-900 font-semibold text-lg mt-1">{message}</p>
                    </div>
                    <button 
                        onClick={() => setMessage('')}
                        className="p-1 hover:bg-green-500/20 rounded-lg transition-colors"
                    >
                        <XMarkIcon className="w-5 h-5 text-green-600" />
                    </button>
                </div>
            )}

            {/* Asset Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(roiRates).map(([token, info]) => {
                    const isEditing = editMode === token;
                    const tokenDetail = tokenDetails[token] || { color: 'from-gray-400 to-gray-600', icon: token[0] };

                    return (
                        <div 
                            key={token} 
                            className={`relative group transition-all duration-500 ${
                                isEditing 
                                ? 'scale-[1.02] z-10' 
                                : 'hover:scale-[1.01]'
                            }`}
                        >
                            {/* Card Background */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${tokenDetail.color} opacity-10 rounded-3xl blur-xl group-hover:opacity-20 transition-opacity duration-500`}></div>
                            
                            {/* Main Card */}
                            <div className={`relative bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden border-2 transition-all duration-300 ${
                                isEditing 
                                ? 'border-[#D4AF37] shadow-2xl' 
                                : 'border-gray-400 shadow-lg hover:shadow-xl hover:border-[#D4AF37]'
                            }`}>
                                
                                {/* Card Header */}
                                <div className="p-6 pb-0">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${tokenDetail.color} flex items-center justify-center shadow-lg`}>
                                                <span className="text-xl font-bold text-white">{tokenDetail.icon}</span>
                                                {info.rate > 10 && (
                                                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] rounded-full flex items-center justify-center shadow-md">
                                                        <SparklesIcon className="w-3 h-3 text-white" />
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-900">{token}</h3>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <div className="px-2 py-0.5 bg-gray-100 rounded-lg border border-gray-200">
                                                        <span className="text-xs font-semibold text-gray-600 flex items-center gap-1">
                                                            <ClockIcon className="w-3 h-3" />
                                                            {info.period} Payouts
                                                        </span>
                                                    </div>
                                                    <div className={`w-2 h-2 rounded-full ${info.walletAddress ? 'bg-green-500 animate-pulse' : 'bg-red-400'}`}></div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        {/* Edit Button */}
                                        {!isEditing ? (
                                            <button 
                                                onClick={() => handleEdit(token)}
                                                className="p-2.5 text-gray-400 hover:text-[#D4AF37] hover:bg-[#D4AF37]/5 rounded-xl transition-all duration-300 group/btn"
                                            >
                                                <div className="relative">
                                                    <PencilSquareIcon className="w-5 h-5" />
                                                    <div className="absolute inset-0 bg-[#D4AF37] rounded-full opacity-0 group-hover/btn:opacity-20 animate-ping"></div>
                                                </div>
                                            </button>
                                        ) : (
                                            <button 
                                                onClick={handleCancel}
                                                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                                            >
                                                <XMarkIcon className="w-5 h-5" />
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {/* Card Content */}
                                <div className="p-6 pt-4 space-y-6">
                                    {/* ROI Section */}
                                    <div className={`p-4 rounded-2xl transition-all duration-300 ${
                                        isEditing ? 'bg-gradient-to-r from-gray-50 to-white ring-1 ring-gray-200' : 'bg-gradient-to-r from-gray-50/50 to-transparent'
                                    }`}>
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-2">
                                                <div className="p-1.5 bg-gray-100 rounded-lg">
                                                    <ChartBarIcon className="w-4 h-4 text-gray-600" />
                                                </div>
                                                <span className="text-sm font-semibold text-gray-700">Target ROI Rate</span>
                                            </div>
                                            <InformationCircleIcon className="w-4 h-4 text-gray-400" />
                                        </div>
                                        
                                        {isEditing ? (
                                            <div className="relative">
                                                <input
                                                    type="number"
                                                    step="0.01"
                                                    value={tempRate}
                                                    onChange={(e) => setTempRate(e.target.value)}
                                                    className="w-full text-3xl font-bold bg-white border-2 border-gray-300 rounded-xl px-4 py-3 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition-all placeholder-gray-300 text-center"
                                                    placeholder="0.00"
                                                />
                                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-lg">%</span>
                                            </div>
                                        ) : (
                                            <div className="text-center">
                                                <div className="flex items-baseline justify-center gap-1">
                                                    <span className="text-4xl font-bold text-gray-900">{info.rate}</span>
                                                    <span className="text-xl font-medium text-gray-500">%</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Wallet Section */}
                                    <div>
                                        <div className="flex items-center gap-2 mb-3">
                                            <div className="p-1.5 bg-gray-100 rounded-lg">
                                                <WalletIcon className="w-4 h-4 text-gray-600" />
                                            </div>
                                            <span className="text-sm font-semibold text-gray-700">Sponsor Wallet Address</span>
                                        </div>

                                        {isEditing ? (
                                            <textarea
                                                value={tempWallet}
                                                onChange={(e) => setTempWallet(e.target.value)}
                                                rows="2"
                                                className="w-full text-sm font-mono bg-gray-50 border-2 border-gray-300 rounded-xl px-4 py-3 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition-all resize-none placeholder-gray-400"
                                                placeholder="0x0000...0000"
                                            />
                                        ) : (
                                            <div className={`p-3 rounded-xl border transition-all duration-300 group/wallet ${
                                                info.walletAddress 
                                                ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 hover:border-green-300' 
                                                : 'bg-gradient-to-r from-red-50 to-rose-50 border-red-200 hover:border-red-300'
                                            }`}>
                                                <div className="flex items-center gap-3">
                                                    <div className={`p-2 rounded-lg ${
                                                        info.walletAddress ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                                                    }`}>
                                                        <WalletIcon className="w-4 h-4" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-xs font-mono text-gray-600 truncate">
                                                            {info.walletAddress || 'Wallet not configured'}
                                                        </p>
                                                        <p className={`text-xs font-medium mt-1 ${
                                                            info.walletAddress ? 'text-green-600' : 'text-red-500'
                                                        }`}>
                                                            {info.walletAddress ? 'Active & Verified' : 'Configuration Required'}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Actions Footer */}
                                {isEditing && (
                                    <div className="p-6 pt-0">
                                        <div className="flex items-center gap-3">
                                            <button 
                                                onClick={handleCancel}
                                                className="flex-1 py-3 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-100 transition-all duration-300 border border-gray-300 hover:border-gray-400"
                                            >
                                                Cancel
                                            </button>
                                            <button 
                                                onClick={() => handleSave(token)}
                                                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-gray-900 to-gray-800 text-white text-sm font-bold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-md"
                                            >
                                                <CheckIcon className="w-4 h-4" />
                                                Save Changes
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default TokenManagement;