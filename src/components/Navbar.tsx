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
export default Navbar;