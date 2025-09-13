# RepliFi Dependencies & Installation Guide

## 🚀 Quick Start

### 1. Create React App with TypeScript
```bash
npx create-react-app replifi --template typescript
cd replifi
```

### 2. Install Core Dependencies
```bash
npm install firebase ethers lucide-react @monaco-editor/react
```

### 3. Install Tailwind CSS
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 4. Install Development Dependencies (Optional but Recommended)
```bash
npm install -D @types/node @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-plugin-react-hooks
```

## 📦 Complete Dependencies List

### **Production Dependencies**
```json
{
  "dependencies": {
    "@monaco-editor/react": "^4.6.0",
    "@testing-library/jest-dom": "^5.17.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "@types/jest": "^27.5.2",
    "@types/node": "^16.18.68",
    "@types/react": "^18.2.43",
    "@types/react-dom": "^18.2.17",
    "ethers": "^6.8.1",
    "firebase": "^10.7.1",
    "lucide-react": "^0.294.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1",
    "typescript": "^4.9.5",
    "web-vitals": "^2.1.4"
  }
}
```

### **Development Dependencies**
```json
{
  "devDependencies": {
    "@typescript-eslint/eslint-plugin": "^6.13.1",
    "@typescript-eslint/parser": "^6.13.1",
    "autoprefixer": "^10.4.16",
    "eslint-plugin-react-hooks": "^4.6.0",
    "postcss": "^8.4.32",
    "tailwindcss": "^3.3.6"
  }
}
```

## ⚙️ Configuration Files

### **tailwind.config.js**
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### **postcss.config.js**
```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

### **src/index.css** (Add Tailwind directives)
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom styles can go here */
```

## 🔧 Firebase Configuration

### **Create src/firebase.tsx**
```typescript
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCbhALj4vtfJFxd0uhdMFqCRcL4UdAAEB8",
  authDomain: "replifi-filecoin.firebaseapp.com",
  projectId: "replifi-filecoin",
  storageBucket: "replifi-filecoin.firebasestorage.app",
  messagingSenderId: "929675245590",
  appId: "1:929675245590:web:c1f5c54b4b602647605d37",
  measurementId: "G-BKSXT1K2Z2",
  databaseURL: "https://replifi-filecoin-default-rtdb.asia-southeast1.firebasedatabase.app"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

export { app, analytics, database };
```

## 🛠️ Additional Solidity Compilation Dependencies (Optional)
For real Solidity compilation in the browser:

```bash
npm install solc
```

## 📱 Web3 Wallet Integration Dependencies
For MetaMask and other wallet integrations:

```bash
npm install @metamask/detect-provider web3modal
```

## 🔍 Code Quality Dependencies (Recommended)
```bash
npm install -D prettier eslint-config-prettier eslint-plugin-prettier
```

## 📋 Complete Installation Script

Create a `setup.sh` file:
```bash
#!/bin/bash

# Create React App
npx create-react-app replifi --template typescript
cd replifi

# Install main dependencies
npm install firebase ethers lucide-react @monaco-editor/react

# Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Install additional development dependencies
npm install -D @types/node @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-plugin-react-hooks

# Install Solidity compilation (optional)
npm install solc

# Install Web3 dependencies (optional)
npm install @metamask/detect-provider web3modal

echo "✅ All dependencies installed successfully!"
echo "📝 Don't forget to:"
echo "   1. Add Tailwind directives to src/index.css"
echo "   2. Create src/firebase.tsx with your Firebase config"
echo "   3. Replace src/App.tsx with the RepliFi component"
```

Make it executable and run:
```bash
chmod +x setup.sh
./setup.sh
```

## 🚦 Verification

After installation, your `package.json` should include all the dependencies listed above. Verify with:

```bash
npm ls
```

## 🔥 Environment Variables (Optional)
Create a `.env` file in the root directory for environment-specific configurations:

```env
REACT_APP_FIREBASE_API_KEY=your_api_key_here
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain_here
REACT_APP_FILECOIN_RPC_URL=https://api.calibration.node.glif.io/rpc/v1
REACT_APP_CHAIN_ID=314159
```

## 📖 Next Steps

1. Run the installation commands above
2. Replace `src/App.tsx` with the RepliFi component code
3. Update `src/index.css` with Tailwind directives
4. Create the Firebase configuration file
5. Start the development server:
   ```bash
   npm start
   ```

Your RepliFi application will be ready to run with all necessary dependencies installed!