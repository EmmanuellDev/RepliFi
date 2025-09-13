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