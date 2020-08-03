import React from "react";
import { Link, Router } from "react-router-dom";

import "./Navbar.scss";

const Navbar = () => {
  return (
    <Router>
      <nav className="navbar bg-dark">
        <h1>
          Access for You
          {/* <Link to="/">Access for You</Link> */}
        </h1>
        <ul>
          <li>
            About
            {/* <Link to="/">About</Link> */}
          </li>
          <li>
            Join Now
            {/* <Link to="/">Join Now</Link> */}
          </li>
        </ul>
      </nav>
    </Router>
  );
};

export default Navbar;
