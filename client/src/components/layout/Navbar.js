import React from 'react';
import { Link, BrowserRouter as Router } from 'react-router-dom';

import './Navbar.scss';

const Navbar = () => {
  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'>Access for You</Link>
      </h1>
      <ul>
        <li>
          <Link to='/about'>About</Link>
        </li>
        <li>
          <Link to='/register'>Join Now</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
