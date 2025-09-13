import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { Code, Zap, History, Wallet, FileText, Shield } from "lucide-react";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCbhALj4vtfJFxd0uhdMFqCRcL4UdAAEB8",
  authDomain: "replifi-filecoin.firebaseapp.com",
  projectId: "replifi-filecoin",
  storageBucket: "replifi-filecoin.firebasestorage.app",
  messagingSenderId: "929675245590",
  appId: "1:929675245590:web:c1f5c54b4b602647605d37",
  measurementId: "G-BKSXT1K2Z2",
  databaseURL:
    "https://replifi-filecoin-default-rtdb.asia-southeast1.firebasedatabase.app",
};

initializeApp(firebaseConfig);

const FILECOIN_CHAIN_ID = "0x4cb2f"; // 314159 in hex

const Navbar: React.FC<{ currentPage: string; setCurrentPage: (page: string) => void }> = ({
  currentPage,
  setCurrentPage,
}) => {
  const [wallet, setWallet] = useState<string | null>(null);

  const connectWallet = async () => {
    if (typeof window.ethereum === "undefined") {
      alert("MetaMask not found! Please install MetaMask with Filecoin snap.");
      return;
    }

    try {
      const accounts: string[] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      const address = accounts[0];
      const chainId = await window.ethereum.request({ method: "eth_chainId" });

      // Switch network if not Filecoin Calibration
      if (chainId !== FILECOIN_CHAIN_ID) {
        try {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: FILECOIN_CHAIN_ID }],
          });
        } catch (switchError: any) {
          if (switchError.code === 4902) {
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: FILECOIN_CHAIN_ID,
                  chainName: "Filecoin Calibration",
                  rpcUrls: ["https://api.calibration.node.glif.io/rpc/v1"],
                  nativeCurrency: {
                    name: "tFIL",
                    symbol: "tFIL",
                    decimals: 18,
                  },
                  blockExplorerUrls: ["https://calibration.filscan.io"],
                },
              ],
            });
          } else {
            console.error("Error switching chain:", switchError);
          }
        }
      }

      setWallet(address);
    } catch (err) {
      console.error("Wallet connection failed:", err);
    }
  };

  // auto-update when user switches account or network
  useEffect(() => {
    if (!window.ethereum) return;

    window.ethereum.on("accountsChanged", (accounts: string[]) => {
      setWallet(accounts.length > 0 ? accounts[0] : null);
    });

    window.ethereum.on("chainChanged", () => {
      window.location.reload();
    });
  }, []);

  const menuItems = [
    { id: "home", label: "Home", icon: FileText },
    { id: "editor", label: "Write & Compile", icon: Code },
    { id: "deploy", label: "Deploy", icon: Zap },
    { id: "history", label: "History", icon: History },
  ];

  return (
    <nav className="bg-gradient-to-r from-blue-900/80 via-gray-900/80 to-blue-800/80 border-b border-gray-800 backdrop-blur-lg shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-10">
            <div className="flex items-center space-x-3">
              <Shield className="h-10 w-10 text-blue-500 drop-shadow-lg" />
              <span className="text-2xl font-extrabold text-white tracking-tight bg-gradient-to-r from-blue-400 via-blue-600 to-purple-400 bg-clip-text text-transparent">
                RepliFi
              </span>
            </div>
            <div className="flex space-x-2">
              {menuItems.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setCurrentPage(id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-base font-semibold transition-all duration-200 shadow-sm ${
                    currentPage === id
                      ? "bg-blue-600 text-white shadow-lg scale-105"
                      : "bg-gray-800 text-gray-300 hover:bg-blue-700 hover:text-white hover:scale-105"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={connectWallet}
            className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-xl font-bold shadow-lg transition-all duration-200"
          >
            <Wallet className="h-5 w-5" />
            <span>
              {wallet
                ? `${wallet.slice(0, 6)}...${wallet.slice(-4)}`
                : "Connect Wallet"}
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;