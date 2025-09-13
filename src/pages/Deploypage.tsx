import React from 'react';
import { Zap, ExternalLink, Copy, CheckCircle, AlertCircle, Loader } from 'lucide-react';

interface CompilationResult {
  success: boolean;
  bytecode?: string;
  abi?: any[];
  errors?: string[];
  warnings?: string[];
}

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
export default DeployPage;