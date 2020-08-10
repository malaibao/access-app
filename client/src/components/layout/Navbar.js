import React, { useContext } from 'react';
import { AuthContext, PinContext } from '../../context';
import { LOGOUT } from '../../reducers/action-types';

import { Link } from 'react-router-dom';
import PersonPinIcon from '@material-ui/icons/PersonPin';

import './Navbar.scss';

const Navbar = () => {
  const { authState, dispatch } = useContext(AuthContext);
  const { setPinInfo } = useContext(PinContext);

  const guestLink = (
    <ul>
      <li>
        <Link to='/map'>Map</Link>
      </li>
      <li>
        <Link to='/login'>Sign In</Link>
      </li>
    </ul>
  );

  const authLink = (
    <ul>
      <li>
        <Link to='/map'>Map</Link>
      </li>
      <li>
        <Link to='/profile'>Profile</Link>
      </li>
      <li>
        <Link to='/' onClick={() => dispatch({ type: LOGOUT })}>
          Sign Out
        </Link>
      </li>
    </ul>
  );
  return (
    <nav className='navbar bg-dark'>
      <div className='logo'>
        <h1>
          <Link to='/' onClick={() => setPinInfo(null)}>
            Access for You
            <PersonPinIcon fontSize='large' style={{ paddingTop: 10 }} />
          </Link>
        </h1>
      </div>
      {authState.isAuthenticated ? authLink : guestLink}
    </nav>
  );
};

export default Navbar;
