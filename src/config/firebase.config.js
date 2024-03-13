import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAK6loeJbGaMOx8utFgMPMCn6WiCJGGr54",
  authDomain: "snapstore-1a7d9.firebaseapp.com",
  projectId: "snapstore-1a7d9",
  storageBucket: "snapstore-1a7d9.appspot.com",
  messagingSenderId: "440597777660",
  appId: "1:440597777660:web:6a42402d06193b95de9b79",
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

const auth = getAuth(app);
const firestoreDB = getFirestore(app);

export { app, auth, firestoreDB };
