import React from 'react';
// import { MDBCol, MDBContainer, MDBRow, MDBFooter } from 'mdbreact';

import GitHubIcon from '@material-ui/icons/GitHub';
import './Footer.scss';

const Footer = () => {
  return (
    <footer>
      <div id='footer-container'>
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
    // <MDBFooter color='blue' className='font-small pt-4 mt-4'>
    //   <MDBContainer fluid className='text-center text-md-left'>
    /* <MDBRow>
          <MDBCol md='6'>
            <h5 className='title'>Footer Content</h5>
            <p>
              Here you can use rows and columns here to organize your footer
              content.
            </p>
          </MDBCol>
          <MDBCol md='6'>
            <h5 className='title'>Links</h5>
            <ul>
              <li className='list-unstyled'>
                <a href='#!'>Link 1</a>
              </li>
              <li className='list-unstyled'>
                <a href='#!'>Link 2</a>
              </li>
              <li className='list-unstyled'>
                <a href='#!'>Link 3</a>
              </li>
              <li className='list-unstyled'>
                <a href='#!'>Link 4</a>
              </li>
            </ul>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className='footer-copyright text-center py-3'>
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright:{' '}
          <a href='https://www.mdbootstrap.com'> MDBootstrap.com </a>
        </MDBContainer>
      </div>
    </MDBFooter> */
  );
};

export default Footer;
