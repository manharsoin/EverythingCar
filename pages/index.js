import { useRouter } from "next/router";
import styles from "../styles/Hero.module.css";

export default function Home() {
  const router = useRouter();

  return (
    <section className={styles.heroSection}>
      <div className={styles.heroOverlay}></div>
      <div className={styles.heroContent}>
        <h1>Welcome to EverythingCar</h1>
        <p>Get the best car reviews, latest news, and expert opinions!</p>

        <button className={styles.getStarted} onClick={() => router.push("/home")}>
          Get Started
        </button>
      </div>
    </section>
  );
}
