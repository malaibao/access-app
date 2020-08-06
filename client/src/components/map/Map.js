import React, { useState, useEffect } from "react";
import "./map.scss";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';
// import { formatRelative } from 'date-fns';
import mapStyles from './mapStyles';

const libraries = ["places"];
// const libraries = [];
const mapContainerStyle = {
  width: "100%",
  height: "100%",
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

export default function Map({ pins, onMapLoad, chosen }) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [markers, setMarkers] = React.useState([]);
  const [selected, setSelected] = React.useState(null);


  useEffect(() => {
    setMarkers(pins);
  }, [pins]);

  if (loadError) return "Error Loading Maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <div className="map">
      {markers.length > 0 ? (
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
                    url:
                      "https://cdn.bulbagarden.net/upload/b/b8/025Pikachu_LG.png",
                    origin: new window.google.maps.Point(0, 0),
                    anchor: new window.google.maps.Point(15, 15),
                    scaledSize: new window.google.maps.Size(30, 30),
                  }}
                  onClick={() => {
                    setSelected(marker);
                  }}
                />
              ))
            : null}
                  {selected ? (<InfoWindow position={{lat: selected.latitude, lng: selected.longitude}} onCloseClick={() => {
                    setSelected(null);
                  }}>
                    <div>
                      {selected.name}
                      
                      {selected.address}
                    </div>
                  </InfoWindow>) : null}
                  {chosen !== null ? <Marker key={'1234'} position={chosen} icon={{
                    url:
                      'https://e7.pngegg.com/pngimages/72/948/png-clipart-bulbasaur-pokemon-diamond-and-pearl-pokemon-go-pokedex-ivysaur-bulbasaur-pixel-vertebrate-grass.png',
                    origin: new window.google.maps.Point(0, 0),
                    anchor: new window.google.maps.Point(15, 15),
                    scaledSize: new window.google.maps.Size(30, 30)
                  }}/>: null}
        </GoogleMap>
      ) : (
        ""
      )}
    </div>
  );
}
