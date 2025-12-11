import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css"; // Import the CSS

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === "admin" && password === "admin") {
      navigate("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="login-page">
      {/* Header */}
     

      {/* Main login container */}
      <main className="login-main">
        <div className="login-container">
          <h2 className="login-title">Admin Login</h2>

          <input
            className="login-input"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            className="login-input"
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="login-button" onClick={handleLogin}>
            Login
          </button>
        </div>
      </main>

    
    </div>
  );
}
