import React, { useState } from 'react';
import './map.scss';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';
import { formatRelative } from 'date-fns';
import mapStyles from './mapStyles';
import RoomIcon from '@material-ui/icons/Room';

const libraries = ['places'];
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
  console.log('pin in Map', pins);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  //   const [markers, setMarkers] = useState(pins);
  const [markers, setMarkers] = React.useState(pins);

  //   const mapRef = React.useRef();

  //   const onMapLoad = React.useCallback((map) => {
  //     mapRef.current = map;
  //   }, []);

  if (loadError) return 'Error Loading Maps';
  if (!isLoaded && !markers) return 'Loading Maps';

  const getMarkers = () => {
    return markers.map((m) => {
      console.log('m is ', m.latitude, m.longitude);
      return <Marker position={{ lat: m.latitude, lng: m.longitude }} />;
    });
  };

  return (
    <div className='map' className='map'>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={13}
        center={center}
        options={options}
        // onLoad={getMarkers}
      >
        {markers.length > 0 && getMarkers()}
        <Marker
          key={'123456'}
          position={{
            lat: 43.653225,
            lng: -79.383186,
          }}
        />
        {markers.length > 0 &&
          markers.map((marker) => (
            <>
              {console.log('inside marker', marker.latitude, marker.longitude)}
              <Marker
                key={marker.place_id}
                position={{ lat: marker.latitude, lng: marker.longitude }}
                icon={{
                  // url: <Room />,
                  url:
                    'https://cdn.bulbagarden.net/upload/b/b8/025Pikachu_LG.png',
                  origin: new window.google.maps.Point(0, 0),
                  anchor: new window.google.maps.Point(15, 15),
                  scaledSize: new window.google.maps.Size(30, 30),
                }}
              />
            </>
          ))}
      </GoogleMap>
    </div>
  );
}
