import React, { useState, useRef, useEffect, useContext } from "react";
import AuthContext from "../context/AuthProvider";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Auth = () => {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const UserRef = useRef();
  const ErrRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [passwordMatch, setPasswordMatch] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMessage, setErrMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(false);

  // hooks yang digunakan untuk mengatur fokus komponen
  useEffect(() => {
    UserRef.current.focus();
  }, [isLoginMode]);

  // hooks yang digunakan untuk testing
  // apakah username yang diinput pada form cocok dengan pola regex
  // dan hook ini akan berjalan jika value "user" berubah
  useEffect(() => {
    const result = USER_REGEX.test(user);
    console.log(result);
    console.log(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    console.log(result);
    console.log(email);
    setValidEmail(result);
  }, [email]);

  // apakah password yang diinput cocok dengan pola regex
  // hanya berjalan jika value "password" dan "passwordMatch" berubah
  useEffect(() => {
    const result = PWD_REGEX.test(password);
    console.log(result);
    console.log(password);
    setValidPassword(result);
    const match = password === passwordMatch;
    setValidMatch(match);
  }, [password, passwordMatch]);

  // error handling
  useEffect(() => {
    setErrMessage("");
  }, [user, password, passwordMatch]);

  const resetForm = () => {
    setUser("");
    setEmail("");
    setPassword("");
    setPasswordMatch("");

    setValidName(false);
    setValidEmail(false);
    setValidPassword(false);
    setValidMatch(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // added security measures
    const userTest = USER_REGEX.test(user);
    const emailTest = EMAIL_REGEX.test(email);
    const pwdTest = PWD_REGEX.test(password);

    if (!userTest || !emailTest || !pwdTest) {
      setErrMessage("Not Allowed");
      return;
    }

    if (!isLoginMode) {
      try {
        await axios.post("users/register", { username: user, email, password });
        setSuccess(true);
      } catch (error) {
        setErrMessage(
          error.response?.data?.message || "Error occured during registration"
        );
        setSuccess(false);
      }
    } else {
      try {
        const response = await axios.post("users/login", { username: user, email, password });
        const userData = response.data.user;
        setAuth(userData); 
        setSuccess(true);
      } catch (error) {
        if (!error?.response) {
          setErrMessage("No server response!");
        } else if (error.response?.status === 400) {
          setErrMessage("Missing user data");
        } else if (error.response?.status === 401) {
          setErrMessage("Unauthorized");
        } else {
          setErrMessage("login failed");
        }
        ErrRef.current.focus();
      }
    }
  };

  const handleRedirect = () => {
    setSuccess(false);
    resetForm();

    if (isLoginMode) {
      navigate("/");
    } else {
      setIsLoginMode(true);
      navigate("/auth");
    }
  };

  return (
    <section className="container">
      <div className="form-content">
        {success ? (
          <>
            <h1>Success!</h1>
            <p>{isLoginMode ? "login success" : "registration successful"}</p>
            <button className="confirm-btn" onClick={handleRedirect}>
              {isLoginMode ? "Go to homepage" : "Go to Login"}
            </button>
          </>
        ) : (
          <>
            <p
              ref={ErrRef}
              className={errMessage ? "errMsg" : "offscreen"}
              aria-live="assertive"
            >
              {errMessage}
            </p>
            <h2>{isLoginMode ? "Login" : "Register"}</h2>
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
                  name="username"
                  ref={UserRef}
                  autoComplete="off"
                  onChange={(e) => setUser(e.target.value)}
                  aria-invalid={validName ? "false" : "true"}
                  aria-describedby="uidnote"
                  placeholder="Enter your username"
                  onFocus={() => setUserFocus(true)}
                  onBlur={() => setUserFocus(false)}
                  required
                />
                <p
                  id="uidnote"
                  className={
                    userFocus && user && !validName
                      ? "instruction"
                      : "offscreen"
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  4 to 24 characters. <br />
                  Must begin with a letter. <br />
                  Letters, numbers, underscores, hyphens allowed.
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
                  ref={UserRef}
                  autoComplete="off"
                  onChange={(e) => setEmail(e.target.value)}
                  aria-invalid={validEmail ? "false" : "true"}
                  aria-describedby="emailnote"
                  onFocus={() => setEmailFocus(true)}
                  onBlur={() => setEmailFocus(false)}
                  name="email"
                  placeholder="Enter your Email"
                  required
                />
                <p
                  id="emailnote"
                  className={
                    emailFocus && email && !validEmail
                      ? "instruction"
                      : "offscreen"
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  Email is invalid
                </p>
              </div>
              <div>
                <label htmlFor="password">
                  Password
                  <span className={validPassword ? "valid" : "hide"}>
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                  <span
                    className={validPassword || !password ? "hide" : "invalid"}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </span>
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter your Password"
                  onChange={(e) => setPassword(e.target.value)}
                  aria-invalid={validPassword ? "false" : "true"}
                  aria-describedby="passwordnote"
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
                  <FontAwesomeIcon icon={faInfoCircle} />
                  8 to 24 characters. <br />
                  Must include lowercase and uppercase letters, a number, and a
                  special character. <br />
                  Allowed special characters:{" "}
                  <span aria-label="exclamation mark">!</span>
                  <span aria-label="at symbol">@</span>
                  <span aria-label="hashtag">#</span>
                  <span aria-label="dollar sign">$</span>
                  <span aria-label="percentage symbol">%</span>
                </p>
              </div>
              <div>
                <label htmlFor="confPassword">
                  Confirm Password
                  <span
                    className={validMatch && passwordMatch ? "valid" : "hide"}
                  >
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                  <span
                    className={
                      validMatch || !passwordMatch ? "hide" : "invalid"
                    }
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </span>
                </label>
                <input
                  type="password"
                  id="confPassword"
                  name="password"
                  placeholder="Reenter your Password"
                  onChange={(e) => setPasswordMatch(e.target.value)}
                  aria-invalid={passwordMatch ? "false" : "true"}
                  aria-describedby="confirmnote"
                  onFocus={() => setMatchFocus(true)}
                  onBlur={() => setMatchFocus(false)}
                  required
                />
                <p
                  id="confirmnote"
                  className={
                    matchFocus && !validMatch ? "instruction" : "offscreen"
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  Password doesn't match
                </p>
              </div>
              <button
                type="submit"
                id="register-btn"
                disabled={
                  !validName || !validEmail || !validPassword || !validMatch
                }
              >
                {isLoginMode ? "Login" : "Register"}
              </button>
              <button
                onClick={() => setIsLoginMode(!isLoginMode)}
                className="confirm-btn"
              >
                {isLoginMode
                  ? "Don't have an account? Register"
                  : "Already have an account? Login"}
              </button>
            </form>
          </>
        )}
      </div>
    </section>
  );
};

export default Auth;
