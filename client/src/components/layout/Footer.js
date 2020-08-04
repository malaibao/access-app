import React from 'react';
import GitHubIcon from '@material-ui/icons/GitHub';
import './Footer.scss';

const Footer = () => {
  return (
    <footer>
      <div id='footer-container'>
        {process.env.REACT_APP_RANDOM}
        <div className='contact'>
          <h5>Contact</h5>
          <p>Access For You</p>
          <p>123 Access Lane</p>
          <p>Main, ON</p>
          <p>123-456-7890</p>
        </div>

        <div className='contact-icon'>
          <a href='https://github.com/malaibao/access-app' target='_blank'>
            <GitHubIcon />
          </a>
        </div>
      </div>
      <div id='credit'>
        Access For You by Maribelle Leong, Erica Sun, and Bobby Brice
      </div>
    </footer>
  );
};

export default Footer;
