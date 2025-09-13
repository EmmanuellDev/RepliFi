
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import HomePage from "./pages/Home";
import CodeEditor from "./pages/CodeEditor";
import DeployPage from "./pages/Deploypage";
import HistoryPage from "./pages/History";

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [wallet, setWallet] = useState<string | null>(null);
  // Dummy contract/code state for demonstration
  const [code, setCode] = useState<string>("");
  const [compilationResult, setCompilationResult] = useState<any>(null);
  const [isCompiling, setIsCompiling] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployResult, setDeployResult] = useState<any>(null);
  const [contracts, setContracts] = useState<any[]>([]);

  // Dummy wallet connect function
  const connectWallet = () => {
    setWallet("f1dummywalletaddress1234567890");
  };

  // Dummy compile function
  const onCompile = () => {
    setIsCompiling(true);
    setTimeout(() => {
      setCompilationResult({ success: true, bytecode: "0x123456...", abi: [], errors: [], warnings: [] });
      setIsCompiling(false);
    }, 1000);
  };

  // Dummy save function
  const onSave = () => {
    // Save code logic
  };

  // Dummy deploy function
  const onDeploy = () => {
    setIsDeploying(true);
    setTimeout(() => {
      setDeployResult({ success: true, address: "f1contractaddress1234567890", txHash: "0xabcdef123456" });
      setIsDeploying(false);
    }, 1500);
  };

  // Dummy restore contract function
  const onRestoreContract = (contract: any) => {
    setCode(contract.source);
    setCompilationResult({ success: true, bytecode: contract.compiledBytecode, abi: contract.abi });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-900 via-gray-900 to-purple-900">
      {/* Navbar always visible */}
      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        wallet={wallet}
        connectWallet={connectWallet}
      />

      {/* Page content */}
      <main className="flex-grow p-6 bg-gradient-to-br from-blue-900 via-gray-900 to-purple-900">
        {currentPage === "home" && <HomePage setCurrentPage={setCurrentPage} />}
        {currentPage === "editor" && (
          <CodeEditor
            code={code}
            setCode={setCode}
            compilationResult={compilationResult}
            onCompile={onCompile}
            onSave={onSave}
            isCompiling={isCompiling}
          />
        )}
        {currentPage === "deploy" && (
          <DeployPage
            wallet={wallet}
            lastCompiledContract={compilationResult}
            onDeploy={onDeploy}
            isDeploying={isDeploying}
            deployResult={deployResult}
          />
        )}
        {currentPage === "history" && (
          <HistoryPage
            contracts={contracts}
            wallet={wallet}
            onRestoreContract={onRestoreContract}
          />
        )}
      </main>

      {/* Footer (optional) */}
      <footer className="bg-gray-200 bg-gradient-to-br from-blue-900 via-gray-900 to-purple-900 text-center py-4 text-sm text-white">
        © {new Date().getFullYear()} RepliFi. All rights reserved.
      </footer>
    </div>
  );
}

export default App;



// use this incase of emergency...
{/* 
import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, set, onValue, off } from 'firebase/database';
import { Code, Zap, History, Wallet, FileText, Shield, Users, ArrowRight, ExternalLink, Copy, CheckCircle, AlertCircle, Loader } from 'lucide-react';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCbhALj4vtfJFxd0uhdMFqCRcL4UdAAEB8",
  authDomain: "replifi-filecoin.firebaseapp.com",
  projectId: "replifi-filecoin",
  storageBucket: "replifi-filecoin.firebasestorage.app",
  messagingSenderId: "929675245590",
  appId: "1:929675245590:web:c1f5c54b4b602647605d37",
  measurementId: "G-BKSXT1K2Z2",
  databaseURL: "https://replifi-filecoin-default-rtdb.asia-southeast1.firebasestorage.app"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Types
interface Contract {
  id: string;
  name: string;
  source: string;
  compiledBytecode?: string;
  abi?: any[];
  timestamp: number;
  deployment?: {
    txHash: string;
    address: string;
    date: string;
  };
}

interface CompilationResult {
  success: boolean;
  bytecode?: string;
  abi?: any[];
  errors?: string[];
  warnings?: string[];
}

// Navbar Component
const Navbar: React.FC<{ currentPage: string; setCurrentPage: (page: string) => void; wallet: string | null; connectWallet: () => void }> = ({ currentPage, setCurrentPage, wallet, connectWallet }) => {
  const menuItems = [
    { id: 'home', label: 'Home', icon: FileText },
    { id: 'editor', label: 'Write & Compile', icon: Code },
    { id: 'deploy', label: 'Deploy', icon: Zap },
    { id: 'history', label: 'History', icon: History }
  ];

  return (
    <nav className="bg-gray-900 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-blue-500" />
              <span className="text-xl font-bold text-white">RepliFi</span>
            </div>
            <div className="flex space-x-4">
              {menuItems.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setCurrentPage(id)}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentPage === id 
                      ? 'bg-gray-800 text-white' 
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={connectWallet}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
          >
            <Wallet className="h-4 w-4" />
            <span>{wallet ? `${wallet.slice(0, 6)}...${wallet.slice(-4)}` : 'Connect Wallet'}</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

// Home Page Component
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6">
            RepliFi – Smart Contract Version Control
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            The first decentralized platform for smart contract version control, collaboration, and deployment. 
            Build, track, and deploy your contracts with confidence on Filecoin.
          </p>
          <button
            onClick={() => setCurrentPage('editor')}
            className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
          >
            <span>Get Started</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map(({ icon: Icon, title, description }, index) => (
            <div key={index} className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-gray-600 transition-colors">
              <Icon className="h-12 w-12 text-blue-500 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-3">{title}</h3>
              <p className="text-gray-400">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Code Editor Component
const CodeEditor: React.FC<{ 
  code: string; 
  setCode: (code: string) => void; 
  compilationResult: CompilationResult | null;
  onCompile: () => void;
  onSave: () => void;
  isCompiling: boolean;
}> = ({ code, setCode, compilationResult, onCompile, onSave, isCompiling }) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Smart Contract Editor</h2>
        <div className="flex space-x-3">
          <button
            onClick={onSave}
            className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition-colors"
          >
            <FileText className="h-4 w-4" />
            <span>Save Draft</span>
          </button>
          <button
            onClick={onCompile}
            disabled={isCompiling}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-4 py-2 rounded-md transition-colors"
          >
            {isCompiling ? <Loader className="h-4 w-4 animate-spin" /> : <Code className="h-4 w-4" />}
            <span>{isCompiling ? 'Compiling...' : 'Compile'}</span>
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-96 bg-gray-900 text-gray-100 p-4 rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none font-mono text-sm"
            placeholder="// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MyContract {
    string public name;
    
    constructor(string memory _name) {
        name = _name;
    }
    
    function setName(string memory _name) public {
        name = _name;
    }
}"
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Compilation Output</h3>
          <div className="bg-gray-900 rounded-lg p-4 h-96 overflow-y-auto border border-gray-700">
            {!compilationResult ? (
              <p className="text-gray-400">Click "Compile" to see results</p>
            ) : compilationResult.success ? (
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-green-400">
                  <CheckCircle className="h-5 w-5" />
                  <span>Compilation successful!</span>
                </div>
                <div>
                  <p className="text-sm text-gray-300 mb-2">Bytecode:</p>
                  <code className="text-xs text-green-300 break-all">{compilationResult.bytecode?.slice(0, 100)}...</code>
                </div>
                <div>
                  <p className="text-sm text-gray-300 mb-2">ABI:</p>
                  <code className="text-xs text-blue-300">{JSON.stringify(compilationResult.abi, null, 2).slice(0, 200)}...</code>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-red-400">
                  <AlertCircle className="h-5 w-5" />
                  <span>Compilation failed</span>
                </div>
                {compilationResult.errors?.map((error, index) => (
                  <div key={index} className="text-red-300 text-sm">{error}</div>
                ))}
                {compilationResult.warnings?.map((warning, index) => (
                  <div key={index} className="text-yellow-300 text-sm">{warning}</div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Deploy Page Component
const DeployPage: React.FC<{ 
  wallet: string | null; 
  lastCompiledContract: CompilationResult | null;
  onDeploy: () => void;
  isDeploying: boolean;
  deployResult: any;
}> = ({ wallet, lastCompiledContract, onDeploy, isDeploying, deployResult }) => {
  const networkInfo = {
    name: "Filecoin Calibration Testnet",
    rpc: "https://api.calibration.node.glif.io/rpc/v1",
    chainId: "314159",
    currency: "tFIL",
    explorer: "https://calibration.filscan.io"
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">Deploy Contract</h2>
        <p className="text-gray-400">Deploy your compiled smart contract to Filecoin Calibration testnet</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Network Information</h3>
          <div className="space-y-3">
            <div>
              <span className="text-gray-400">Network:</span>
              <span className="text-white ml-2">{networkInfo.name}</span>
            </div>
            <div>
              <span className="text-gray-400">RPC URL:</span>
              <span className="text-white ml-2 font-mono text-sm">{networkInfo.rpc}</span>
            </div>
            <div>
              <span className="text-gray-400">Chain ID:</span>
              <span className="text-white ml-2">{networkInfo.chainId}</span>
            </div>
            <div>
              <span className="text-gray-400">Currency:</span>
              <span className="text-white ml-2">{networkInfo.currency}</span>
            </div>
            <div>
              <span className="text-gray-400">Explorer:</span>
              <a href={networkInfo.explorer} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 ml-2 inline-flex items-center">
                {networkInfo.explorer}
                <ExternalLink className="h-4 w-4 ml-1" />
              </a>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Deployment Status</h3>
          {!wallet ? (
            <div className="text-yellow-400">
              <AlertCircle className="h-5 w-5 inline mr-2" />
              Please connect your wallet first
            </div>
          ) : !lastCompiledContract?.success ? (
            <div className="text-yellow-400">
              <AlertCircle className="h-5 w-5 inline mr-2" />
              Please compile your contract first
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-green-400">
                <CheckCircle className="h-5 w-5 inline mr-2" />
                Ready to deploy
              </div>
              <button
                onClick={onDeploy}
                disabled={isDeploying}
                className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white py-3 rounded-md transition-colors"
              >
                {isDeploying ? <Loader className="h-4 w-4 animate-spin" /> : <Zap className="h-4 w-4" />}
                <span>{isDeploying ? 'Deploying...' : 'Deploy Contract'}</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {deployResult && (
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Deployment Result</h3>
          {deployResult.success ? (
            <div className="space-y-3">
              <div className="text-green-400">
                <CheckCircle className="h-5 w-5 inline mr-2" />
                Contract deployed successfully!
              </div>
              <div>
                <span className="text-gray-400">Contract Address:</span>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-white font-mono bg-gray-900 px-3 py-1 rounded">{deployResult.address}</span>
                  <button className="text-blue-400 hover:text-blue-300">
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div>
                <span className="text-gray-400">Transaction Hash:</span>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-white font-mono bg-gray-900 px-3 py-1 rounded">{deployResult.txHash}</span>
                  <a 
                    href={`${networkInfo.explorer}/tx/${deployResult.txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-red-400">
              <AlertCircle className="h-5 w-5 inline mr-2" />
              Deployment failed: {deployResult.error}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// History Page Component
const HistoryPage: React.FC<{ 
  contracts: Contract[]; 
  wallet: string | null;
  onRestoreContract: (contract: Contract) => void;
}> = ({ contracts, wallet, onRestoreContract }) => {
  if (!wallet) {
    return (
      <div className="text-center py-20">
        <Wallet className="h-16 w-16 text-gray-500 mx-auto mb-4" />
        <p className="text-gray-400">Please connect your wallet to view contract history</p>
      </div>
    );
  }

  if (contracts.length === 0) {
    return (
      <div className="text-center py-20">
        <History className="h-16 w-16 text-gray-500 mx-auto mb-4" />
        <p className="text-gray-400">No contracts found. Start by writing and compiling your first contract!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">Contract History</h2>
        <p className="text-gray-400">Your smart contract versions and deployments</p>
      </div>

      <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Contract Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Created</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Contract Address</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {contracts.map((contract) => (
                <tr key={contract.id} className="hover:bg-gray-750">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-white font-medium">{contract.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-400">
                    {new Date(contract.timestamp).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      contract.deployment 
                        ? 'bg-green-900 text-green-200' 
                        : 'bg-yellow-900 text-yellow-200'
                    }`}>
                      {contract.deployment ? 'Deployed' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {contract.deployment ? (
                      <div className="flex items-center space-x-2">
                        <span className="text-white font-mono text-sm">
                          {contract.deployment.address.slice(0, 10)}...
                        </span>
                        <a 
                          href={`https://calibration.filscan.io/address/${contract.deployment.address}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </div>
                    ) : (
                      <span className="text-gray-500">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => onRestoreContract(contract)}
                      className="text-blue-400 hover:text-blue-300 text-sm"
                    >
                      Restore
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Mock compilation function (in real app, this would use solc-js)
const compileContract = async (source: string): Promise<CompilationResult> => {
  // Simulate compilation delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Simple validation
  if (!source.includes('contract') || !source.includes('pragma solidity')) {
    return {
      success: false,
      errors: ['Contract must include pragma solidity and contract definition']
    };
  }
  
  // Mock successful compilation
  return {
    success: true,
    bytecode: '0x608060405234801561001057600080fd5b50336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550610431806100606000396000f3fe',
    abi: [
      {
        "inputs": [],
        "name": "name",
        "outputs": [{"internalType": "string", "name": "", "type": "string"}],
        "stateMutability": "view",
        "type": "function"
      }
    ]
  };
};

// Mock deployment function
const deployContract = async (bytecode: string, abi: any[], wallet: string): Promise<any> => {
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Mock deployment result
  const mockAddress = `0x${Math.random().toString(16).substring(2, 42)}`;
  const mockTxHash = `0x${Math.random().toString(16).substring(2, 66)}`;
  
  return {
    success: true,
    address: mockAddress,
    txHash: mockTxHash
  };
};

// Main App Component
const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [wallet, setWallet] = useState<string | null>(null);
  const [code, setCode] = useState('');
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [compilationResult, setCompilationResult] = useState<CompilationResult | null>(null);
  const [isCompiling, setIsCompiling] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployResult, setDeployResult] = useState<any>(null);

  // Connect wallet function
  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setWallet(accounts[0]);
      } catch (error) {
        console.error('Error connecting wallet:', error);
        // Mock wallet for demo purposes
        setWallet('0x742d35Cc1111111111111111111111111111111');
      }
    } else {
      // Mock wallet for demo purposes
      setWallet('0x742d35Cc1111111111111111111111111111111');
    }
  };

  // Load contracts from Firebase
  useEffect(() => {
    if (wallet) {
      const contractsRef = ref(database, `wallets/${wallet}/contracts`);
      onValue(contractsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const contractsList = Object.entries(data).map(([key, value]: [string, any]) => ({
            id: key,
            name: value.name || key,
            source: value.source,
            compiledBytecode: value.compiledBytecode,
            abi: value.abi,
            timestamp: value.timestamp,
            deployment: value.deployment
          }));
          setContracts(contractsList);
        }
      });

      return () => {
        off(contractsRef);
      };
    }
  }, [wallet]);

  // Compile contract
  const handleCompile = async () => {
    setIsCompiling(true);
    try {
      const result = await compileContract(code);
      setCompilationResult(result);
    } catch (error) {
      setCompilationResult({
        success: false,
        errors: ['Compilation failed: ' + error]
      });
    }
    setIsCompiling(false);
  };

  // Save contract draft
  const handleSave = async () => {
    if (!wallet || !code) return;

    const contractName = `Contract_${Date.now()}`;
    const contractData = {
      name: contractName,
      source: code,
      timestamp: Date.now(),
      ...(compilationResult?.success && {
        compiledBytecode: compilationResult.bytecode,
        abi: compilationResult.abi
      })
    };

    const contractsRef = ref(database, `wallets/${wallet}/contracts`);
    await push(contractsRef, contractData);
  };

  // Deploy contract
  const handleDeploy = async () => {
    if (!wallet || !compilationResult?.success) return;

    setIsDeploying(true);
    try {
      const result = await deployContract(
        compilationResult.bytecode!,
        compilationResult.abi!,
        wallet
      );
      
      if (result.success) {
        // Save deployment info to Firebase
        const contractName = `Contract_${Date.now()}`;
        const contractData = {
          name: contractName,
          source: code,
          timestamp: Date.now(),
          compiledBytecode: compilationResult.bytecode,
          abi: compilationResult.abi,
          deployment: {
            address: result.address,
            txHash: result.txHash,
            date: new Date().toISOString()
          }
        };

        const contractsRef = ref(database, `wallets/${wallet}/contracts`);
        await push(contractsRef, contractData);
      }
      
      setDeployResult(result);
    } catch (error) {
      setDeployResult({
        success: false,
        error: error.toString()
      });
    }
    setIsDeploying(false);
  };

  // Restore contract
  const handleRestoreContract = (contract: Contract) => {
    setCode(contract.source);
    if (contract.compiledBytecode && contract.abi) {
      setCompilationResult({
        success: true,
        bytecode: contract.compiledBytecode,
        abi: contract.abi
      });
    }
    setCurrentPage('editor');
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage}
        wallet={wallet}
        connectWallet={connectWallet}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentPage === 'home' && (
          <HomePage setCurrentPage={setCurrentPage} />
        )}
        
        {currentPage === 'editor' && (
          <CodeEditor
            code={code}
            setCode={setCode}
            compilationResult={compilationResult}
            onCompile={handleCompile}
            onSave={handleSave}
            isCompiling={isCompiling}
          />
        )}
        
        {currentPage === 'deploy' && (
          <DeployPage
            wallet={wallet}
            lastCompiledContract={compilationResult}
            onDeploy={handleDeploy}
            isDeploying={isDeploying}
            deployResult={deployResult}
          />
        )}
        
        {currentPage === 'history' && (
          <HistoryPage
            contracts={contracts}
            wallet={wallet}
            onRestoreContract={handleRestoreContract}
          />
        )}
      </main>
    </div>
  );
};

export default App; 
*/}