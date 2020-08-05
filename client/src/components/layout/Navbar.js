import React from 'react';
import { Link } from 'react-router-dom';
import PersonPinIcon from '@material-ui/icons/PersonPin';

import './Navbar.scss';

const Navbar = () => {
  return (
    <nav className='navbar bg-dark'>
      <div classNmae='logo'>
        <h1>
          <Link to='/'>Access for You</Link>
        </h1>
        <PersonPinIcon fontSize='large' />
      </div>
      <ul>
        <li>
          <Link to='/about'>About</Link>
        </li>
        <li>
          <Link to='/register'>Sign Up</Link>
        </li>
        <li>
          <Link to='/login'>Sign In</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
