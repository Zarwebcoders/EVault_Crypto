import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import StakingInfo from './components/StakingInfo';
import Roadmap from './components/Roadmap';
import Partners from './components/Partners';
import Exchanges from './components/Exchanges';
import ConnectWallet from './components/ConnectWallet';
import SecurityFeatures from './components/SecurityFeatures';
import NetworkGrowth from './components/NetworkGrowth';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import AuthPage from './components/AuthPage';

// Landing Page Component
const LandingPage = () => (
  <>
    <Hero />
    <Partners />
    <Features />
    <Exchanges />
    <StakingInfo />
    <SecurityFeatures />
    <Roadmap />
    <ConnectWallet />
    <Testimonials />
    <NetworkGrowth />
    <FAQ />
  </>
);

import { CryptoProvider } from './context/CryptoContext';
import UserLayout from './pages/user/UserLayout';
import UserDashboard from './pages/user/Dashboard';
import Investments from './pages/user/Investments';
import Withdrawals from './pages/user/Withdrawals';
import Transactions from './pages/user/Transactions';
import Profile from './pages/user/Profile';
import AdminLayout from './pages/admin/AdminLayout';

import AdminDashboard from './pages/admin/AdminDashboard';
import TokenManagement from './pages/admin/TokenManagement';
import UserManagement from './pages/admin/UserManagement';
import InvestmentRequests from './pages/admin/InvestmentRequests';
import WithdrawalRequests from './pages/admin/WithdrawalRequests';

function App() {
  return (
    <CryptoProvider>
      <Router>
        <div className="min-h-screen bg-transparent flex flex-col font-sans">
          <Routes>
            {/* Routes with Header and Footer */}
            <Route path="/" element={
              <>
                <Header />
                <main className="flex-grow">
                  <LandingPage />
                </main>
                <Footer />
              </>
            } />

            {/* Auth Routes - Full Screen */}
            <Route path="/login" element={<AuthPage />} />
            <Route path="/register" element={<AuthPage />} />

            {/* User Dashboard Routes */}
            <Route path="/dashboard" element={<UserLayout />}>
              <Route index element={<UserDashboard />} />
              <Route path="invest" element={<Investments />} />
              <Route path="withdraw" element={<Withdrawals />} />
              <Route path="transactions" element={<Transactions />} />
              <Route path="profile" element={<Profile />} />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="tokens" element={<TokenManagement />} />
              <Route path="users" element={<UserManagement />} />
              <Route path="investments" element={<InvestmentRequests />} />
              <Route path="withdrawals" element={<WithdrawalRequests />} />
            </Route>

          </Routes>
        </div>
      </Router>
    </CryptoProvider>
  );
}

export default App;
