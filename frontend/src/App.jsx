import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css'
import Home from "../src/component/Home.jsx"
import Auth from "../src/component/AuthUser.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} /> 
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </Router>
  );
};

export default App;
