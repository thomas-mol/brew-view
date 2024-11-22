import { useState } from "react";
import { auth } from "../../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
        setMessage("Account created successfully! You can now log in.");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (err: any) {
      setError(err.message || "An error occurred. Please try again.");
    }
  };

  const handlePasswordReset = async () => {
    setError(null);
    setMessage(null);

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent! Check your inbox.");
    } catch (err: any) {
      setError(err.message || "Failed to send password reset email.");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <h1>{isSignUp ? "Sign Up" : "Login"}</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {message && <p style={{ color: "green" }}>{message}</p>}
      <form onSubmit={handleFormSubmit} style={{ marginBottom: "20px" }}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ display: "block", width: "100%", marginBottom: "10px" }}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ display: "block", width: "100%", marginBottom: "10px" }}
          />
        </div>
        <button
          type="submit"
          style={{ display: "block", width: "100%", marginBottom: "10px" }}
        >
          {isSignUp ? "Sign Up" : "Login"}
        </button>
      </form>
      <button
        onClick={() => setIsSignUp((prev) => !prev)}
        style={{
          display: "block",
          width: "100%",
          marginBottom: "10px",
          backgroundColor: "#ccc",
          padding: "10px",
          border: "none",
          cursor: "pointer",
        }}
      >
        {isSignUp ? "Already have an account? Login" : "Create an account"}
      </button>
      <button
        onClick={handlePasswordReset}
        style={{
          display: "block",
          width: "100%",
          backgroundColor: "#f0ad4e",
          color: "#fff",
          padding: "10px",
          border: "none",
          cursor: "pointer",
        }}
      >
        Reset Password
      </button>
    </div>
  );
};

export default LoginPage;
