import { useState } from "react";
import authService from "../../../services/authService";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const payload = {
      email,
      password,
    };

    try {
      const result = await authService.login(payload);

      console.log("Login successful:", result);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>
        Login
      </button>
    </>
  );
};

export default Login;