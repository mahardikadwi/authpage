import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Home Page!</h1>
      <p>Choose an option to continue:</p>
      <div>
        <Link to="/login">
          <button>Login</button>
        </Link>
        <Link to="/register">
          <button>Sign up</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
