import { useState, useEffect } from "react";
import { auth } from "../../lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  
  useEffect(() => {
    console.log("📌 Login Page Loaded (Only Once)");
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); 

    console.log("📌 Login Button Clicked");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("✅ Login Successful:", userCredential);
      alert("Login successful! Redirecting to home...");
      router.push("/home");
    } catch (err) {
      console.error("❌ Login Error:", err);
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
