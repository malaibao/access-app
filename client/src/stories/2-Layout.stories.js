import React, { Fragment } from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

//COMPONENT IMPORTS
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

//STORIES
storiesOf('Navbar', module)
  .add('Navbar', () => <Navbar />)
  .add('Footer', () => <Footer />);
