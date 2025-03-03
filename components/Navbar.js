// The navigation bar with authentication buttons and links to home, news and review pages.

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from '../context/AuthContext';   
import styles from "../styles/Navbar.module.css";
import AuthModal from "./AuthModal";

export default function Navbar() {
    const { currentUser, logout } = useAuth();
    const [showModal, setShowModal] = useState(false);
    const [isLogin, setIsLogin] = useState(true);

    return (
        <>
            <nav className={styles.navbar}>
                <div className={styles.topRow}>
                    <Link href="/">
                        <span className={styles.logo}>EverythingCar</span>
                    </Link>

                    {currentUser ? (
                        <div className={styles.userSection}>
                            <span>Welcome, {currentUser.email}</span>
                            <button onClick={logout} className={styles.logout}>Logout</button>
                        </div>
                    ) : (
                        <div className={styles.authButtons}>
                            <button onClick={() => { setShowModal(true); setIsLogin(true); }}>Login</button>
                            <button onClick={() => { setShowModal(true); setIsLogin(false); }}>Sign Up</button>
                        </div>
                    )}
                </div>

                <div className={styles.navLinks}>
                    <Link href="/home"><span>Home</span></Link>
                    <Link href="/newspage"><span>News</span></Link>
                    <Link href="/reviews"><span>Reviews</span></Link>
                </div>
            </nav>

            {showModal && (
                <AuthModal isLogin={isLogin} onClose={() => setShowModal(false)} />
            )}
        </>
    );
}
