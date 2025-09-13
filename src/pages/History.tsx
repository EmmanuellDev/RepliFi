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
const RepliFiApp: React.FC = () => {
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
    // Mock wallet connection
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
