import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; 


// configration de firebase 
const firebaseConfig = {
  apiKey: "AIzaSyBUKhLOcbSm-jafCbPE5e3UtlcguSCkEKM",
  authDomain: "fir-app-67864.firebaseapp.com",
  projectId: "fir-app-67864",
  storageBucket: "fir-app-67864.firebasestorage.app",
  messagingSenderId: "1070902209863",
  appId: "1:1070902209863:web:19e4c22d4ee3270293b062",
  measurementId: "G-KSHE3DYQ7P"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);

export { db }; 
export default app;
