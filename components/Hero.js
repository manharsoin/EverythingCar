// The hero section of the homepage. It provides a welcome message and get started button.

import { useRouter } from "next/router";
import styles from "../styles/Hero.module.css";

export default function Hero() {
  const router = useRouter();

  return (
    <section className={styles.heroSection}>
      <div className={styles.heroOverlay}></div>
      <div className={styles.heroContent}>
        <h1>Welcome to EverythingCar</h1>
        <p>Get the best car reviews, latest news, and expert opinions!</p>
        
        <div className={styles.buttonGroup}>
          <button className={styles.getStarted} onClick={() => router.push("/home")}>Get Started</button>
          <button className={styles.authButton} onClick={() => router.push("/auth/login")}>Login</button>
          <button className={styles.authButton} onClick={() => router.push("/auth/signup")}>Sign Up</button>
        </div>
      </div>
    </section>
  );
}
