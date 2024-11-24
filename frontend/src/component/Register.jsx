import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useFormValidation from "../hooks/FormValidation.jsx";
import axios from "../api/axios";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Register = () => {
  const navigate = useNavigate();
  const ErrRef = useRef();

  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState("");
  const [userFocus, setUserFocus] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);
  const [errMessage, setErrMessage] = useState("");

  const { validName, validEmail, validPassword, validMatch } =
    useFormValidation(user, email, password, passwordMatch);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validName || !validEmail || !validPassword || !validMatch) {
      setErrMessage("Invalid input");
      return;
    }
    try {
      await axios.post("users/register", { username: user, email, password });
      navigate("/login");
    } catch (error) {
      setErrMessage(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
      ErrRef.current.focus();
    }
  };

  return (
    <section className="container">
      <div className="form-content">
        <p
          ref={ErrRef}
          className={errMessage ? "errMsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMessage}
        </p>
        <h2>Register</h2>
        <form className="form-fields" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">
              Username
              <span className={validName ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validName || !user ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type="text"
              id="username"
              className="input-field"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              placeholder="Enter your username"
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
              required
            />
            <p
              id="uidnote"
              className={
                userFocus && user && !validName ? "instruction" : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />4 to 24 characters. Must
              start with a letter. Letters, numbers, underscores, hyphens
              allowed.
            </p>
          </div>
          <div>
            <label htmlFor="email">
              Email
              <span className={validEmail ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validEmail || !email ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type="email"
              id="email"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
              required
            />
            <p
              id="emailnote"
              className={
                emailFocus && email && !validEmail ? "instruction" : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Enter a valid email address.
            </p>
          </div>
          <div>
            <label htmlFor="password">
              Password
              <span className={validPassword ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validPassword || !password ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type="password"
              id="password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              onFocus={() => setPasswordFocus(true)}
              onBlur={() => setPasswordFocus(false)}
              required
            />
            <p
              id="passwordnote"
              className={
                passwordFocus && password && !validPassword
                  ? "instruction"
                  : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />8 to 24 characters. Must
              include uppercase, lowercase, a number, and a special character
              (!@#$%).
            </p>
          </div>
          <div>
            <label htmlFor="confPassword">
              Confirm Password
              <span className={validMatch && passwordMatch ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span
                className={validMatch || !passwordMatch ? "hide" : "invalid"}
              >
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type="password"
              id="confPassword"
              className="input-field"
              value={passwordMatch}
              onChange={(e) => setPasswordMatch(e.target.value)}
              placeholder="Reenter your password"
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
              required
            />
            <p
              id="confirmnote"
              className={
                matchFocus && passwordMatch && !validMatch
                  ? "instruction"
                  : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Passwords must match.
            </p>
          </div>
          <button
            type="submit"
            id="register-btn"
            disabled={
              !validName || !validEmail || !validPassword || !validMatch
            }
          >
            Register
          </button>
          <button className="confirm-btn" onClick={() => navigate("/login")}>
            Already have an account? Login
          </button>
        </form>
      </div>
    </section>
  );
};

export default Register;
