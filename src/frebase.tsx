import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

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