import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthProvider";

const Home = () => {
  const { auth } = useContext(AuthContext);

  return (
    <div>
      <h1>Welcome to the Home Page!</h1>
      <p>Choose an option to continue:</p>
      <div>
        {auth ? (
          <p>Hello, {auth?.username}! Welcome to App!</p>
        ) : (
          <Link to="/auth">
            <button>Login / Sign up</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Home;
