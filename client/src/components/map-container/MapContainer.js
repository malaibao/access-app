import React from 'react';
import Search from '../search/Search';
import Map from '../map/Map';
import './MapContainer.scss';

const MapContainer = ({ pins }) => {
  return (
    <div className='map-container'>
      <Search />
      <Map pins={pins} />
    </div>
  );
};

export default MapContainer;
