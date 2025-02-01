import React from "react";
import '../styles/Nav.css';

function Navbar() {
  return (
    <div className="navbar">
      <ul>
        <li><a href="#">Dashboard</a></li>
        <li><a href="#">FAQ</a></li>
        {/* Add more sections here */}
      </ul>
    </div>
  );
}

export default Navbar;
