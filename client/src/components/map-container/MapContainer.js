import React from 'react';
import Search from '../search/Search';
import Map from '../map/Map';
// import Locate from '../basic-pages/Locate';

import './MapContainer.scss';

const MapContainer = ({ pins, onMapLoad, panTo, chosen }) => {
  return (
    <div className='map-container'>
      <Search panTo={panTo}/>
      <Map onMapLoad={onMapLoad} pins={pins} chosen={chosen} panTo={panTo}/>
    </div>
  );
};

export default MapContainer;
