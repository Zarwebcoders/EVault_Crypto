import React, { useEffect } from 'react';
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

function App() {
  // Smooth scroll behavior for anchor links
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Header />
      <main className="flex-grow">
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
      </main>
      <Footer />
    </div>
  );
}

export default App;
