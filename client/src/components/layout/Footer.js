import React from 'react';
import GitHubIcon from '@material-ui/icons/GitHub';
import './Footer.scss';

const Footer = () => {
  return (
    <footer id='footer-container'>
      <div class='footer'>
        <div className='contact'>
          <h5>Contact Us</h5>
          <p>
            Access For You
            <br />
            123 Access Lane Main, Ontario
            <br />
            123-456-7890
          </p>
        </div>

        <div id='credit'>
          Access For You by Maribelle Leong, Erica Sun, and Bobby Brice
        </div>

        <div className='contact-icon'>
          <a
            href='https://github.com/malaibao/access-app'
            target='_blank'
            rel='noopener noreferrer'
          >
            <GitHubIcon />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
