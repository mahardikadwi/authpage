import React, { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthProvider";
import axios from "../api/axios";

const Login = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const ErrRef = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("users/login", {
        email: email,
        password,
      });
      const userData = response.data.user;
      setAuth(userData);
      navigate("/");
    } catch (error) {
      setErrMessage(
        error.response?.data?.message || "Login failed. Please try again."
      );
      ErrRef.current.focus();
    }
  };

  return (
    <section className="container">
      <div className="form-content">
        <p ref={ErrRef} className={errMessage ? "errMsg" : "offscreen"}>
          {errMessage}
        </p>
        <h2>Login</h2>
        <form className="form-fields" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" id="register-btn">
            Login
          </button>
          <button className="confirm-btn" onClick={(e) => {e.preventDefault(); navigate("/register")}}>
            Not registered yet? Click here
          </button>
        </form>
      </div>
    </section>
  );
};

export default Login;
