import React, { useState, useEffect } from 'react';
import './map.scss';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';
import { formatRelative } from 'date-fns';
import mapStyles from './mapStyles';

const libraries = ['places'];
// const libraries = [];
const mapContainerStyle = {
  width: '100%',
  height: '88%',
};

const center = {
  lat: 43.653225,
  lng: -79.383186,
};

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

export default function Map({ pins }) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [markers, setMarkers] = React.useState([]);
  const [selected, setSelect] = React.useState(null);

  const mapRef = React.useRef();

  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  useEffect(() => {
    setMarkers(pins);
  }, [pins]);

  if (loadError) return 'Error Loading Maps';
  if (!isLoaded) return 'Loading Maps';

  console.log('this market', markers);
  return (
    <div className='map'>
      {markers.length > 0 ? (
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={8}
          center={center}
          options={options}
          // onLoad={getMarkers}
        >
          {/* {markers.length > 0 && getMarkers()} */}
          <Marker
            key={'123456'}
            position={{
              lat: 43.653225,
              lng: -79.383186,
            }}
          />
          {markers.length > 0
            ? markers.map((marker, i) => (
                <Marker
                  key={i}
                  position={{ lat: marker.latitude, lng: marker.longitude }}
                  icon={{
                    // url: <Room />,
                    url:
                      'https://cdn.bulbagarden.net/upload/b/b8/025Pikachu_LG.png',
                    origin: new window.google.maps.Point(0, 0),
                    anchor: new window.google.maps.Point(15, 15),
                    scaledSize: new window.google.maps.Size(30, 30),
                  }}
                  onClick={() => {
                    // setSelected(marker);
                  }}
                />
              ))
            : null}
          {/* {selected ? (<InfoWindow></InfoWindow>)} */}
        </GoogleMap>
      ) : (
        ''
      )}
    </div>
  );
}
