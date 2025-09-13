
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