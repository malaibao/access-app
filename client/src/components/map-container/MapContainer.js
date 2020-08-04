import React from 'react';
import Search from '../search/Search';
import Map from '../map/Map';
import './MapContainer.scss';

const MapContainer = () => {
  return (
    <div className='map-container'>
      <Search />
      <Map />
    </div>
  );
};

export default MapContainer;
