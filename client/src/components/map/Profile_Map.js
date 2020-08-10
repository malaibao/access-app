import React, { useEffect } from 'react';
import Locate from './Locate';
import './map.scss';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';
import Button from '@material-ui/core/Button';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

const libraries = ['places'];
const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

const center = {
  lat: 43.653225,
  lng: -79.383186,
};

const options = {
  // styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

export default function Profile_Map({ pins, onMapLoad, chosenPin, panTo }) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [markers, setMarkers] = React.useState([]);
  const [selected, setSelected] = React.useState(null);

  useEffect(() => {
    // console.log('pins in Profofile_Map', pins);
    if (pins) {
      setMarkers(pins);
    }
  }, [pins, setMarkers]);

  if (loadError) return 'Error Loading Maps';
  if (!isLoaded) return 'Loading Maps';

  // const showOptions = (ratings) => {
  //   const options = [];
  //   for (let i = 0; i < ratings.length; i++) {
  //     const option = ratings[i].replace(/_/g, ' ');
  //     options.push(option);
  //   }
  //   return options.join(', ');
  // };

  const showOptions = (rating) => {
    const options = [];
    if (rating.accessible_parking) {
      options.push('accessible parking');
    }
    if (rating.accessible_washroom) {
      options.push('accessible washroom');
    }
    if (rating.alternative_entrance) {
      options.push('alternative entrance');
    }
    if (rating.automatic_door) {
      options.push('automatic door');
    }
    if (rating.elevator) {
      options.push('elevator');
    }
    if (rating.braille) {
      options.push('braille');
    }
    if (rating.gender_neutral_washroom) {
      options.push('gender neutral washroom');
    }
    if (rating.large_print) {
      options.push('large print');
    }
    if (rating.outdoor_access_only) {
      options.push('outdoor access only');
    }
    if (rating.quiet) {
      options.push('quiet');
    }
    if (rating.ramp) {
      options.push('ramp');
    }
    if (rating.scent_free) {
      options.push('scent free');
    }
    if (rating.service_animal_friendly) {
      options.push('service animal friendly');
    }
    if (rating.sign_language) {
      options.push('sign language');
    }
    if (rating.spacious) {
      options.push('spacious');
    }
    if (rating.stopgap_ramp) {
      options.push('stopgap ramp');
    }
    // console.log('options', options);
    return options.join(', ');
    // return options;
  };

  return (
    <div className='map'>
      <Locate panTo={panTo} />
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={13}
        center={center}
        options={options}
        onLoad={onMapLoad}
      >
        {markers.length > 0
          ? markers.map((marker, i) => (
              <Marker
                key={i}
                position={{ lat: marker.latitude, lng: marker.longitude }}
                icon={{
                  url: '/good.svg',
                  origin: new window.google.maps.Point(0, 0),
                  // anchor: new window.google.maps.Point(10, 14),
                  scaledSize: new window.google.maps.Size(20, 28),
                }}
                onMouseOver={() => {
                  setSelected(marker);
                  console.log('selected marker', selected);
                }}
                onClick={() => {
                  setSelected(marker);
                }}
              />
            ))
          : null}

        {chosenPin ? (
          <Marker
            key={'1234'}
            position={{ lat: chosenPin.latitude, lng: chosenPin.longitude }}
            icon={{
              url: '/selectedPin.svg',
              origin: new window.google.maps.Point(0, 0),
              // anchor: new window.google.maps.Point(16, 16),
              scaledSize: new window.google.maps.Size(35, 35),
            }}
            onClick={() => {
              setSelected(chosenPin);
            }}
            animation={1}
          />
        ) : null}
        {selected ? (
          <InfoWindow
            position={{ lat: selected.latitude, lng: selected.longitude }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div style={{ maxWidth: '25vw' }}>
              <p>
                <strong>{selected.name}</strong>
              </p>
              <p>{selected.address}</p>
              <p>Accessibility Options: {showOptions(selected)}</p>
              {/* {showOptions(selected).map((tag) => (
                <span style={{ marginRight: '1rem' }}>
                  <ThumbUpIcon style={{ color: '#3b5998' }} /> {tag}
                </span>
              ))} */}
              <br />
              <Button variant='outlined' color='primary' size='small'>
                DELETE
              </Button>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </div>
  );
}
