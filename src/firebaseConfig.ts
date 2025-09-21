// src/firebaseConfig.ts
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDAFuagatR30NdTSa3nxIYB14BSDa0NlVY",
  authDomain: "verbix-bc6cf.firebaseapp.com",
  projectId: "verbix-bc6cf",
  storageBucket: "verbix-bc6cf.firebasestorage.app",
  messagingSenderId: "857529788867",
  appId: "1:857529788867:web:68e29e1344a97ab1eff576"
};

export const app = initializeApp(firebaseConfig);
