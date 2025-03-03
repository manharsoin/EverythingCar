import { useState, useEffect } from "react";
import { auth } from "../../lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();


  useEffect(() => {
    console.log("📌 Signup Page Loaded (Only Once)");
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(""); 

    
    if (password.length < 6) {
      setError("❌ Password must be at least 6 characters long.");
      return;
    }

    console.log("📌 Signup Button Clicked");

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("✅ Signup Successful");
      alert("Signup successful! Redirecting to home...");
      router.push("/home");
    } catch (err) {
      console.error("❌ Signup Error:", err);
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSignup}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password (min 6 chars)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
