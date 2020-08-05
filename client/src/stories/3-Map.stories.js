import React, { Fragment } from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

//COMPONENT IMPORTS
import Map from '../components/map/Map';
// import Search from '../components/map/Search';

const pins = [
  {
    id: 1,
    user_id: 1,
    name: 'Massey Hall',
    address: 'Massey Hall, Victoria Street, Toronto, ON, Canada',
    longitude: -79.379027,
    latitude: 43.653996,
    place_id: 'ChIJ_-6zojTL1IkRWYkSsbveKH8',
  },
  {
    id: 2,
    user_id: 2,
    name: 'Classic Martial Arts Centre',
    address: '1431 Yonge Street, Toronto, ON, Canada',
    longitude: -79.393737,
    latitude: 43.6877763,
    place_id: 'ChIJL79JzlozK4gRBB_sfZo4b8E',
  },
];

//STORIES
storiesOf('Map', module).add('Google Map', () => <Map pins={pins} />);
//   .add('Search', () => <Search />);
