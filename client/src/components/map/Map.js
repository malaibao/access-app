import React from 'react';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';
import { formatRelative } from 'date-fns';
/*
import usePlacesAutoComplete, {
  getGeoCode,
  getLatLng,
} from 'use-places-autocomplete';
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from '@reach/combobox';
*/

const libraries = ['places'];
const mapContainerStyle = {
  width: '80vw',
  height: '80vh',
};

const center = {
  lat: 43.653225,
  lng: -79.383186,
};

console.log(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);

export default function Map() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyBMZ5I_ijMsmsovyqas60L0nxUzZHIA4NM',
    libraries,
  });

  if (loadError) return 'Error Loading Maps';
  if (!isLoaded) return 'Loading Maps';

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={center}
      ></GoogleMap>
    </div>
  );
}
