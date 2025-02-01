import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./App.css";
import { useState } from 'react';

import Home from "./components/Homepage.js";
import AdminDash from "./components/AdminPortal.js"


import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminDash />} /> 
      </Routes>
      
      <ToastContainer/>
    </Router>
  );
}

export default App;