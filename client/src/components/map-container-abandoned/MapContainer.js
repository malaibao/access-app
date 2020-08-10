import React from 'react';
import Map from '../map/Map';


import './MapContainer.scss';

const MapContainer = ({ pins, onMapLoad, panTo, chosen }) => {
  return (
    <Map onMapLoad={onMapLoad} pins={pins} chosen={chosen} panTo={panTo} />
  );
};

export default MapContainer;
