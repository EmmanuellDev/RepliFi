import React from 'react';
import {History, Wallet, ExternalLink } from 'lucide-react';

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
export default HistoryPage;