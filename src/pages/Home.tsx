import React from 'react';
import { Code, Zap, History, Users, ArrowRight } from 'lucide-react';

const HomePage: React.FC<{ setCurrentPage: (page: string) => void }> = ({ setCurrentPage }) => {
  const features = [
    {
      icon: Code,
      title: "Write & Compile Smart Contracts",
      description: "Built-in Solidity editor with real-time compilation and error detection"
    },
    {
      icon: Zap,
      title: "Deploy to Filecoin Calibration Testnet",
      description: "One-click deployment to Filecoin testnet with automatic transaction tracking"
    },
    {
      icon: History,
      title: "Track Contract History & Versions",
      description: "Complete version control system for your smart contracts with diff tracking"
    },
    {
      icon: Users,
      title: "Wallet-based Authentication",
      description: "Secure, decentralized authentication using your Filecoin wallet"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-gray-900 to-purple-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-extrabold text-white mb-6 drop-shadow-lg tracking-tight bg-gradient-to-r from-blue-400 via-blue-600 to-purple-400 bg-clip-text text-transparent animate-fade-in">
            RepliFi – Smart Contract Version Control
          </h1>
          <p className="text-2xl text-gray-200 max-w-3xl mx-auto mb-8 animate-fade-in delay-100">
            The first decentralized platform for smart contract version control, collaboration, and deployment.<br />
            <span className="text-blue-300">Build, track, and deploy your contracts with confidence on Filecoin.</span>
          </p>
          <button
            onClick={() => setCurrentPage('editor')}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-4 rounded-2xl font-bold shadow-xl transition-all duration-200 animate-bounce"
          >
            <span>Get Started</span>
            <ArrowRight className="h-6 w-6" />
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {features.map(({ icon: Icon, title, description }, index) => (
            <div
              key={index}
              className="transform hover:scale-105 transition-transform duration-300 bg-gradient-to-br from-gray-800 via-gray-900 to-blue-900 rounded-2xl p-8 border border-gray-700 shadow-lg hover:shadow-2xl animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Icon className="h-14 w-14 text-blue-500 mb-5 drop-shadow-lg" />
              <h3 className="text-xl font-bold text-white mb-3 tracking-tight drop-shadow-lg">{title}</h3>
              <p className="text-gray-200 text-base leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default HomePage;