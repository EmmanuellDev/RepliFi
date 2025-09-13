import React from 'react';
import { Code, FileText, CheckCircle, AlertCircle, Loader } from 'lucide-react';

interface CompilationResult {
  success: boolean;
  bytecode?: string;
  abi?: any[];
  errors?: string[];
  warnings?: string[];
}

const CodeEditor: React.FC<{
  code: string;
  setCode: (code: string) => void;
  compilationResult: CompilationResult | null;
  onCompile: () => void;
  onSave: () => void;
  isCompiling: boolean;
}> = ({ code, setCode, compilationResult, onCompile, onSave, isCompiling }) => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-extrabold text-white drop-shadow-lg tracking-tight">Smart Contract Editor</h2>
        <div className="flex space-x-4">
          <button
            onClick={onSave}
            className="flex items-center space-x-2 bg-gradient-to-r from-gray-700 to-blue-700 hover:from-blue-800 hover:to-purple-700 text-white px-6 py-2 rounded-xl font-bold shadow-lg transition-all duration-200"
          >
            <FileText className="h-5 w-5" />
            <span>Save Draft</span>
          </button>
          <button
            onClick={onCompile}
            disabled={isCompiling}
            className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:bg-gray-600 text-white px-6 py-2 rounded-xl font-bold shadow-lg transition-all duration-200"
          >
            {isCompiling ? <Loader className="h-5 w-5 animate-spin" /> : <Code className="h-5 w-5" />}
            <span>{isCompiling ? 'Compiling...' : 'Compile'}</span>
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-10">
        <div className="space-y-4">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-96 bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 text-gray-100 p-6 rounded-2xl border border-blue-700 focus:border-purple-500 focus:outline-none font-mono text-base shadow-lg transition-all duration-200"
            placeholder={"// SPDX-License-Identifier: MIT\npragma solidity ^0.8.0;\ncontract MyContract {\n    string public name;\n    constructor(string memory _name) {\n        name = _name;\n    }\n    function setName(string memory _name) public {\n        name = _name;\n    }\n}"}
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white mb-2 drop-shadow-lg">Compilation Output</h3>
          <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 rounded-2xl p-6 h-96 overflow-y-auto border border-blue-700 shadow-lg">
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
export default CodeEditor;