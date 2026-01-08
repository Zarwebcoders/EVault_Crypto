import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';

const CryptoContext = createContext();

export const useCrypto = () => useContext(CryptoContext);

export const CryptoProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Data States
    const [investments, setInvestments] = useState([]);
    const [withdrawals, setWithdrawals] = useState([]);
    const [investmentRequests, setInvestmentRequests] = useState([]);
    const [withdrawalRequests, setWithdrawalRequests] = useState([]);
    const [allUsers, setAllUsers] = useState([]);

    // ROI Rates (Could be fetched from backend config)
    const [roiRates, setRoiRates] = useState({
        USDT: { rate: 3.5, period: 'Daily', walletAddress: '' },
        DODGE: { rate: 0.66, period: 'Monthly', walletAddress: '' },
        XRP: { rate: 0.66, period: 'Monthly', walletAddress: '' },
        ETH: { rate: 0.66, period: 'Monthly', walletAddress: '' },
        SOL: { rate: 0.83, period: 'Monthly', walletAddress: '' },
        BNB: { rate: 0.83, period: 'Monthly', walletAddress: '' },
        BTC: { rate: 1.0, period: 'Monthly', walletAddress: '' },
    });



    // Valid Token Check & Fetch Config
    useEffect(() => {
        const init = async () => {
            // 1. Fetch Config (Rates & Wallets)
            try {
                const { data } = await api.get('/config');
                if (data && data.roiRates) {
                    // Normalize map to object if needed
                    const rates = data.roiRates; // Assuming API returns object map
                    setRoiRates(prev => ({
                        ...prev,
                        ...rates
                    }));
                }
            } catch (err) {
                console.error("Failed to load config", err);
            }

            // 2. Hydrate User
            const token = localStorage.getItem('evault_token');
            if (token) {
                try {
                    const { data } = await api.get('/auth/profile');
                    setUser({ ...data, walletConnected: false });
                    if (data.isAdmin) {
                        fetchAdminData();
                    } else {
                        fetchUserData();
                    }
                } catch (err) {
                    console.error('Session expired', err);
                    localStorage.removeItem('evault_token');
                    setUser(null);
                }
            }
            setLoading(false);
        };
        init();
    }, []);

    const fetchUserData = async () => {
        try {
            const invRes = await api.get('/investments');
            setInvestments(invRes.data);
            const txRes = await api.get('/transactions');
            setWithdrawals(txRes.data.filter(tx => tx.type === 'Withdrawal'));
        } catch (err) {
            console.error('Error fetching user data', err);
        }
    };

    const fetchAdminData = async () => {
        try {
            const invReqRes = await api.get('/investments/admin');
            setInvestmentRequests(invReqRes.data);

            const txReqRes = await api.get('/transactions/admin');
            setWithdrawalRequests(txReqRes.data.filter(t => t.type === 'Withdrawal'));

            // Fetch all users
            const usersRes = await api.get('/auth/users');
            setAllUsers(usersRes.data);
        } catch (err) {
            console.error('Error fetching admin data', err);
        }
    };

    // ... (lines 101-240 unchanged methods for addFunds, login, etc. keep them)
    // I need to be careful not to delete lines between here.
    // The user's replace_file_content tool requires me to target specific blocks. 
    // I am replacing the useEffect block and the updateRoiRate function separately or together.
    // Let's target the useEffect block first.

    // Wait, the tool requires CONTINUOUS block replacement.
    // Splitting this into two calls for safety.

    // CALL 1: UPDATE useEffect


    const addFunds = async () => {
        try {
            const { data } = await api.put('/auth/profile/funds');
            setUser(prev => ({ ...prev, balance: data.balance }));
            return { success: true, message: 'Funds added successfully!' };
        } catch (error) {
            return { success: false, message: error.response?.data?.message || 'Failed to add funds' };
        }
    };

    // --- Auth Actions ---
    const login = async (email, password) => {
        try {
            const { data } = await api.post('/auth/login', { email, password });
            localStorage.setItem('evault_token', data.token);
            setUser(data);
            if (data.isAdmin) fetchAdminData();
            else fetchUserData();
            return { success: true };
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
            return { success: false, message: err.response?.data?.message };
        }
    };

    const register = async (name, email, password) => {
        try {
            const { data } = await api.post('/auth/register', { name, email, password });
            localStorage.setItem('evault_token', data.token);
            setUser(data);
            fetchUserData();
            return { success: true };
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
            return { success: false, message: err.response?.data?.message };
        }
    };

    const forgotPassword = async (email, password) => {
        try {
            const { data } = await api.post('/auth/forgot-password', { email, password });
            return { success: true, message: data.message };
        } catch (err) {
            return { success: false, message: err.response?.data?.message || 'Password reset failed' };
        }
    };

    const updateUserProfile = async (userData) => {
        try {
            const { data } = await api.put('/auth/profile', userData);
            setUser(prev => ({ ...prev, ...data }));
            return { success: true, message: 'Profile updated successfully' };
        } catch (err) {
            return { success: false, message: err.response?.data?.message || 'Update failed' };
        }
    };

    const logout = () => {
        localStorage.removeItem('evault_token');
        setUser(null);
        setInvestments([]);
        setWithdrawals([]);
    };

    // --- User Actions ---
    const connectWallet = (address) => {
        setUser(prev => ({ ...prev, walletConnected: true, walletAddress: address }));
        // Optionally save to backend: api.put('/users/profile', { walletAddress: address })
    };

    const addInvestment = async (inv) => {
        try {
            const { data } = await api.post('/investments', inv);
            // Optimistic update
            // Inject full user object so Admin panel can display name immediately
            const newInv = { ...data, status: 'Pending', user: user };
            setInvestments(prev => [newInv, ...prev]);

            // If user is admin (e.g. self-testing), update admin view too
            if (user?.isAdmin) {
                setInvestmentRequests(prev => [newInv, ...prev]);
            }
            return { success: true };
        } catch (err) {
            return { success: false, message: err.message };
        }
    };

    const requestWithdrawal = async (req) => {
        try {
            const { data } = await api.post('/transactions/withdraw', req);
            setWithdrawals(prev => [data, ...prev]);
            return { success: true };
        } catch (err) {
            return { success: false, message: err.message };
        }
    };

    // --- Admin Actions ---
    const approveInvestment = async (id) => {
        try {
            await api.put(`/investments/${id}`, { status: 'Active' });
            setInvestmentRequests(prev => prev.filter(req => req._id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    const rejectInvestment = async (id) => {
        try {
            await api.put(`/investments/${id}`, { status: 'Rejected' }); // Or delete?
            setInvestmentRequests(prev => prev.filter(req => req._id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    const updateRequestWallet = async (id, address) => {
        try {
            // Optimistic update for UI input
            setInvestmentRequests(prev => prev.map(req =>
                req._id === id ? { ...req, receiverWalletAddress: address } : req
            ));
            // Debounce actual API call in a real app, or save on blur/button.
            // For now, let's assume this updates state locally and we need a "Save" button or call API on change?
            // User requested "editable". I'll trigger API update
            await api.put(`/investments/${id}`, { receiverWalletAddress: address });
        } catch (err) {
            console.error(err);
        }
    };

    const approveWithdrawal = async (id) => {
        try {
            await api.put(`/transactions/${id}`, { status: 'Approved' });
            setWithdrawalRequests(prev => prev.filter(req => req._id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    const rejectWithdrawal = async (id) => {
        try {
            await api.put(`/transactions/${id}`, { status: 'Rejected' });
            setWithdrawalRequests(prev => prev.filter(req => req._id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    const claimROI = async (id) => {
        try {
            const { data } = await api.post(`/investments/${id}/claim`);
            // Update local state
            setInvestments(prev => prev.map(inv =>
                inv._id === id ? {
                    ...inv,
                    returns: data.investment.returns,
                    lastClaimedAt: data.investment.lastClaimedAt
                } : inv
            ));
            setUser(prev => ({
                ...prev,
                balance: data.newBalance,
                totalROI: prev.totalROI + data.claimedAmount
            }));
            return { success: true, message: `Claimed $${data.claimedAmount.toFixed(4)}` };
        } catch (err) {
            return { success: false, message: err.response?.data?.message || 'Claim failed' };
        }
    };

    const updateRoiRate = async (token, updates) => {
        // Optimistic update
        setRoiRates(prev => ({
            ...prev,
            [token]: { ...prev[token], ...updates }
        }));

        try {
            await api.put('/config', {
                roiRates: {
                    [token]: updates
                }
            });
        } catch (err) {
            console.error("Failed to save ROI config", err);
            // Optionally revert state here if critical
        }
    };

    return (
        <CryptoContext.Provider value={{
            user,
            loading,
            error,
            roiRates,
            investments,
            withdrawals,
            investmentRequests,
            withdrawalRequests,
            allUsers,
            fetchAdminData,
            addFunds,
            login,
            register,
            updateUserProfile,
            logout,
            connectWallet,
            addInvestment,
            requestWithdrawal,
            updateRoiRate,
            approveInvestment,
            fetchUserData,
            rejectInvestment,
            approveWithdrawal,
            rejectWithdrawal,
            updateRequestWallet,

            claimROI,
            forgotPassword
        }}>
            {children}
        </CryptoContext.Provider>
    );
};

