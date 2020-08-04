import React, { Fragment } from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

//COMPONENT IMPORTS
import Map from '../components/map/Map';
// import Search from '../components/map/Search';

//STORIES
storiesOf('Map', module).add('Google Map', () => <Map />);
//   .add('Search', () => <Search />);
