// Handles user authentication for login and signup using Firebase 

import { useState } from "react";
import { useRouter } from 'next/router';
import { auth } from "../lib/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import styles from "../styles/AuthModal.module.css";

export default function AuthModal({ isLogin, onClose, toggleMode }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter(); 

  const handleAuth = async () => {
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        router.push('/home'); 
        onClose();
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        router.push('/home'); 
        onClose(); 
      }
    } catch (error) {
      alert(error.message); 
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>✖</button>
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>
        <input
          type="email"
          placeholder="Email"
          className={styles.inputField}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password (min 6 chars)"
          className={styles.inputField}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className={styles.submitButton} onClick={handleAuth}>
          {isLogin ? "Login" : "Sign Up"}
        </button>
        <p>
          {isLogin ? "New here? " : "Already have an account? "}
          <span className={styles.toggleLink} onClick={toggleMode}>
            {isLogin ? "Sign up" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
}
