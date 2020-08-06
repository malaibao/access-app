import React from 'react';

import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';

import './About.scss';

const About = () => {
  return (
    <div className='about'>
      {/* <h1>Our Mission</h1>
      <p>Access for You is </p> */}

      <Grid container justify='center'>
        <Grid item>
          <Link href='/' variant='body2'>
            SEARCH
          </Link>
        </Grid>
      </Grid>
    </div>
  );
};

export default About;
