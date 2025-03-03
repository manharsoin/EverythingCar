import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyD8dnxOPVmm9l81Qm6M2jPyyvoLMbJUs5o",
    authDomain: "everythingcar-17f91.firebaseapp.com",
    projectId: "everythingcar-17f91",
    storageBucket: "everythingcar-17f91.firebasestorage.app",
    messagingSenderId: "676376273590",
    appId: "1:676376273590:web:13f0ab895defb71775fc17"
  };

let app;
if (!global._firebaseApp) {
  app = initializeApp(firebaseConfig);
  global._firebaseApp = app;
} else {
  app = global._firebaseApp;
}

const auth = getAuth(app);

export { auth };
