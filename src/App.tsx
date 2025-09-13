import React, { useState, useEffect } from 'react';
import { Code, Zap, History, Wallet, Github, CheckCircle, AlertCircle, ExternalLink, Play, Save, Upload } from 'lucide-react';
import './App.css';

// Types
interface ContractData {
  source: string;
  compiledBytecode?: string;
  abi?: any[];
  deployment?: {
    txHash: string;
    address: string;
    date: string;
  };
}

interface WalletContracts {
  [contractName: string]: ContractData;
}

// Mock Firebase functions (replace with actual Firebase implementation)
const mockFirebase = {
  saveContract: async (walletAddress: string, contractName: string, data: ContractData) => {
    const key = `${walletAddress}_contracts`;
    const existing = JSON.parse(localStorage.getItem(key) || '{}');
    existing[contractName] = data;
    localStorage.setItem(key, JSON.stringify(existing));
  },
  
  getContracts: async (walletAddress: string): Promise<WalletContracts> => {
    const key = `${walletAddress}_contracts`;
    return JSON.parse(localStorage.getItem(key) || '{}');
  }
};

// Components
const Navbar: React.FC<{
  currentPage: string;
  onPageChange: (page: string) => void;
  walletAddress: string;
  onConnectWallet: () => void;
}> = ({ currentPage, onPageChange, walletAddress, onConnectWallet }) => {
  return (
    <nav className="bg-gray-900 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Github className="h-8 w-8 text-blue-400" />
              <span className="ml-2 text-xl font-bold text-white">RepliFi</span>
            </div>
            <div className="hidden md:block ml-10">
              <div className="flex space-x-8">
                {['Home', 'Write & Compile', 'Deploy', 'History'].map((page) => (
                  <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      currentPage === page
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:text-white hover:bg-gray-700'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <button
              onClick={onConnectWallet}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center"
            >
              <Wallet className="h-4 w-4 mr-2" />
              {walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : 'Connect Wallet'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
}> = ({ icon, title, description }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-blue-500 transition-colors">
      <div className="flex items-center mb-4">
        <div className="text-blue-400 mr-3">{icon}</div>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
      </div>
      <p className="text-gray-400">{description}</p>
    </div>
  );
};

const HomePage: React.FC<{ onGetStarted: () => void }> = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            RepliFi – Smart Contract Version Control
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            Professional version control system for smart contracts. Collaborate, audit, and deploy with confidence 
            on the Filecoin network. Track every change, maintain contract history, and ensure seamless development workflows.
          </p>
          <button
            onClick={onGetStarted}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-medium inline-flex items-center transition-colors"
          >
            <Play className="h-5 w-5 mr-2" />
            Get Started
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            icon={<Code className="h-6 w-6" />}
            title="Write & Compile Smart Contracts"
            description="Advanced code editor with Solidity syntax highlighting and real-time compilation feedback."
          />
          <FeatureCard
            icon={<Zap className="h-6 w-6" />}
            title="Deploy to Filecoin Calibration Testnet"
            description="Seamless deployment to Filecoin's testnet with comprehensive transaction tracking."
          />
          <FeatureCard
            icon={<History className="h-6 w-6" />}
            title="Track Contract History & Versions"
            description="Complete version control with diff tracking, rollback capabilities, and audit trails."
          />
          <FeatureCard
            icon={<Wallet className="h-6 w-6" />}
            title="Wallet-based Mapping & Authentication"
            description="Secure wallet-based authentication with personal contract repositories and team collaboration."
          />
        </div>
      </div>
    </div>
  );
};

const WriteCompilePage: React.FC<{
  walletAddress: string;
  onSave: (contractName: string, source: string, compiled?: any) => void;
}> = ({ walletAddress, onSave }) => {
  const [code, setCode] = useState(`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HelloWorld {
    string public message;
    
    constructor(string memory _message) {
        message = _message;
    }
    
    function setMessage(string memory _message) public {
        message = _message;
    }
    
    function getMessage() public view returns (string memory) {
        return message;
    }
}`);
  const [contractName, setContractName] = useState('HelloWorld');
  const [compileOutput, setCompileOutput] = useState<string>('');
  const [isCompiling, setIsCompiling] = useState(false);
  const [compiledData, setCompiledData] = useState<any>(null);

  const handleCompile = async () => {
    setIsCompiling(true);
    setCompileOutput('Compiling...');
    
    // Mock compilation process
    setTimeout(() => {
      const mockCompiled = {
        bytecode: '0x608060405234801561001057600080fd5b50...',
        abi: [
          {
            "inputs": [{"internalType": "string", "name": "_message", "type": "string"}],
            "stateMutability": "nonpayable",
            "type": "constructor"
          },
          {
            "inputs": [],
            "name": "getMessage",
            "outputs": [{"internalType": "string", "name": "", "type": "string"}],
            "stateMutability": "view",
            "type": "function"
          }
        ]
      };
      
      setCompiledData(mockCompiled);
      setCompileOutput('✓ Compilation successful!\n\nBytecode generated: ' + mockCompiled.bytecode.slice(0, 50) + '...\nABI extracted successfully.');
      setIsCompiling(false);
    }, 2000);
  };

  const handleSave = () => {
    if (!walletAddress) {
      alert('Please connect your wallet first');
      return;
    }
    onSave(contractName, code, compiledData);
    alert('Contract saved successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Write & Compile Smart Contract</h2>
          <div className="flex items-center space-x-4 mb-4">
            <input
              type="text"
              value={contractName}
              onChange={(e) => setContractName(e.target.value)}
              placeholder="Contract Name"
              className="bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
            />
            <button
              onClick={handleCompile}
              disabled={isCompiling}
              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white px-4 py-2 rounded flex items-center"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              {isCompiling ? 'Compiling...' : 'Compile'}
            </button>
            <button
              onClick={handleSave}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Draft
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Source Code</h3>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-96 bg-gray-800 border border-gray-700 rounded p-4 font-mono text-sm text-white resize-none"
              placeholder="Write your Solidity code here..."
            />
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">Compilation Output</h3>
            <pre className="w-full h-96 bg-gray-800 border border-gray-700 rounded p-4 text-sm text-green-400 overflow-auto whitespace-pre-wrap">
              {compileOutput || 'Click "Compile" to see output...'}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

const DeployPage: React.FC<{
  walletAddress: string;
  onDeploy: (contractName: string, txHash: string, address: string) => void;
}> = ({ walletAddress, onDeploy }) => {
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployResult, setDeployResult] = useState<{txHash: string, address: string} | null>(null);

  const networkDetails = {
    rpc: 'https://api.calibration.node.glif.io/rpc/v1',
    chainId: '314159',
    currency: 'tFIL',
    explorer: 'https://calibration.filscan.io'
  };

  const handleDeploy = async () => {
    if (!walletAddress) {
      alert('Please connect your wallet first');
      return;
    }

    setIsDeploying(true);
    
    // Mock deployment process
    setTimeout(() => {
      const mockResult = {
        txHash: '0x' + Math.random().toString(16).slice(2, 66),
        address: '0x' + Math.random().toString(16).slice(2, 42)
      };
      
      setDeployResult(mockResult);
      onDeploy('HelloWorld', mockResult.txHash, mockResult.address);
      setIsDeploying(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Deploy to Filecoin Calibration Testnet</h2>
        
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Network Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-400">RPC URL:</span>
              <div className="text-blue-400 font-mono">{networkDetails.rpc}</div>
            </div>
            <div>
              <span className="text-gray-400">Chain ID:</span>
              <div className="text-blue-400 font-mono">{networkDetails.chainId}</div>
            </div>
            <div>
              <span className="text-gray-400">Currency:</span>
              <div className="text-blue-400 font-mono">{networkDetails.currency}</div>
            </div>
            <div>
              <span className="text-gray-400">Explorer:</span>
              <div className="text-blue-400 font-mono">{networkDetails.explorer}</div>
            </div>
          </div>
        </div>

        <div className="text-center mb-6">
          <button
            onClick={handleDeploy}
            disabled={isDeploying || !walletAddress}
            className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white px-8 py-3 rounded-lg text-lg font-medium inline-flex items-center"
          >
            <Upload className="h-5 w-5 mr-2" />
            {isDeploying ? 'Deploying...' : 'Deploy Contract'}
          </button>
        </div>

        {deployResult && (
          <div className="bg-green-900 border border-green-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4 text-green-400">Deployment Successful!</h3>
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-gray-400">Transaction Hash:</span>
                <div className="text-green-400 font-mono break-all">{deployResult.txHash}</div>
              </div>
              <div>
                <span className="text-gray-400">Contract Address:</span>
                <div className="text-green-400 font-mono break-all">{deployResult.address}</div>
              </div>
              <div className="mt-4">
                <a
                  href={`${networkDetails.explorer}/tx/${deployResult.txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 inline-flex items-center"
                >
                  View on Filscan <ExternalLink className="h-4 w-4 ml-1" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const HistoryPage: React.FC<{ walletAddress: string; contracts: WalletContracts }> = ({ 
  walletAddress, 
  contracts 
}) => {
  const contractList = Object.entries(contracts).map(([name, data]) => ({
    name,
    ...data
  }));

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Contract History</h2>
        
        {contractList.length === 0 ? (
          <div className="text-center text-gray-400 py-12">
            <History className="h-16 w-16 mx-auto mb-4 opacity-50" />
            <p>No contracts found. Deploy your first contract to see it here.</p>
          </div>
        ) : (
          <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="text-left p-4 text-sm font-medium text-gray-300">Contract Name</th>
                    <th className="text-left p-4 text-sm font-medium text-gray-300">Version</th>
                    <th className="text-left p-4 text-sm font-medium text-gray-300">Deployment Date</th>
                    <th className="text-left p-4 text-sm font-medium text-gray-300">Contract Address</th>
                    <th className="text-left p-4 text-sm font-medium text-gray-300">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {contractList.map((contract, index) => (
                    <tr key={index} className="border-t border-gray-700 hover:bg-gray-750">
                      <td className="p-4 font-medium">{contract.name}</td>
                      <td className="p-4 text-gray-400">v1.0</td>
                      <td className="p-4 text-gray-400">
                        {contract.deployment?.date || 'Not deployed'}
                      </td>
                      <td className="p-4 font-mono text-sm text-blue-400">
                        {contract.deployment?.address ? (
                          <span className="break-all">{contract.deployment.address}</span>
                        ) : (
                          'Not deployed'
                        )}
                      </td>
                      <td className="p-4">
                        {contract.deployment?.address && (
                          <a
                            href={`https://calibration.filscan.io/address/${contract.deployment.address}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 inline-flex items-center text-sm"
                          >
                            View <ExternalLink className="h-3 w-3 ml-1" />
                          </a>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Main App Component
const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('Home');
  const [walletAddress, setWalletAddress] = useState('');
  const [contracts, setContracts] = useState<WalletContracts>({});

  useEffect(() => {
    if (walletAddress) {
      loadContracts();
    }
  }, [walletAddress]);

  const loadContracts = async () => {
    try {
      const contractsData = await mockFirebase.getContracts(walletAddress);
      setContracts(contractsData);
    } catch (error) {
      console.error('Error loading contracts:', error);
    }
  };

  const connectWallet = async () => {
    // Mock wallet connection - replace with actual MetaMask/Filecoin wallet integration
    const mockAddress = '0x' + Math.random().toString(16).slice(2, 42);
    setWalletAddress(mockAddress);
  };

  const handleSaveContract = async (contractName: string, source: string, compiled?: any) => {
    const contractData: ContractData = {
      source,
      compiledBytecode: compiled?.bytecode,
      abi: compiled?.abi
    };
    
    try {
      await mockFirebase.saveContract(walletAddress, contractName, contractData);
      await loadContracts();
    } catch (error) {
      console.error('Error saving contract:', error);
    }
  };

  const handleDeploy = async (contractName: string, txHash: string, address: string) => {
    const existingContract = contracts[contractName] || { source: '' };
    const updatedContract: ContractData = {
      ...existingContract,
      deployment: {
        txHash,
        address,
        date: new Date().toISOString()
      }
    };
    
    try {
      await mockFirebase.saveContract(walletAddress, contractName, updatedContract);
      await loadContracts();
    } catch (error) {
      console.error('Error updating deployment:', error);
    }
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'Home':
        return <HomePage onGetStarted={() => setCurrentPage('Write & Compile')} />;
      case 'Write & Compile':
        return <WriteCompilePage walletAddress={walletAddress} onSave={handleSaveContract} />;
      case 'Deploy':
        return <DeployPage walletAddress={walletAddress} onDeploy={handleDeploy} />;
      case 'History':
        return <HistoryPage walletAddress={walletAddress} contracts={contracts} />;
      default:
        return <HomePage onGetStarted={() => setCurrentPage('Write & Compile')} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        walletAddress={walletAddress}
        onConnectWallet={connectWallet}
      />
      {renderCurrentPage()}
    </div>
  );
};

export default App;