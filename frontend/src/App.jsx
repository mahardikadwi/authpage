import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "../src/component/Home.jsx";
import Login from "./component/Login.jsx";
import Register from "./component/Register.jsx";
import Profiles from "./pages/Profiles.jsx";
import Layout from "./component/Layout.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="profile" element={<Profiles />} />
      </Route>
    </Routes>
  );
};

export default App;
