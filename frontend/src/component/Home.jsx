import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";

const Home = () => {
  const { auth, setAuth } = useAuth();

  const handleLogout = async () => {
    await axios.post("users/logout");
    setAuth(null);
  };

  return (
    <div>
    <h1>Welcome to the Home Page!</h1>
    {auth?.email ? (
      <>
        <p>You are logged in as <strong>{auth.email}</strong>.</p>
        <div>
          <Link to="/profile">
            <button>Go to Profile</button>
          </Link>
            <button onClick={handleLogout}>Logout</button>
        </div>
      </>
    ) : (
      <>
        <p>Choose an option to continue:</p>
        <div>
          <Link to="/login">
            <button>Login</button>
          </Link>
          <Link to="/register">
            <button>Sign up</button>
          </Link>
        </div>
      </>
    )}
  </div>
  );
};

export default Home;
