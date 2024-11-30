import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth.jsx";
import axios from "../api/axios";

const Login = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const userRef = useRef();
  const ErrRef = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrMessage] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMessage("");
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("users/login", {
        email: email,
        password,
      });
      const accessToken = response?.data?.accessToken;
      setAuth({ email, password, accessToken });
      navigate("/");
    } catch (error) {
      setErrMessage(
        error.response?.data?.message || "Login failed. Please try again."
      );
      ErrRef.current.focus();
    }
  };

  return (
    <section>
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
              ref={userRef}
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
          <p
            className="confirm-btn"
            onClick={(e) => {
              e.preventDefault();
              navigate("/register");
            }}
          >
            Not registered yet? Click here
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
