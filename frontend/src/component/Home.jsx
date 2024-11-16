import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Home Page!</h1>
      <p>Choose an option to continue:</p>   
      <div>
        <Link to="/auth">
          <button>Login / Sign up</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
