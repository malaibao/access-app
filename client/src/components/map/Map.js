import React, { useEffect } from "react";
import Locate from "./Locate";
import "./map.scss";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import mapStyles from "./mapStyles";

const libraries = ["places"];
const mapContainerStyle = {
  width: "100%",
  height: "100%",
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

export default function Map({ pins, onMapLoad, chosenPin, panTo }) {
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

  const showOptions = (ratings) => {
    const options = [];
    for (let i = 0; i < ratings.length; i++) {
      const option = ratings[i].replace(/_/g, " ");
      options.push(option);
    }
    return <>{options.join(", ")}</>;
  };

  return (
    <div className="map">
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
                  url: "/pin.svg",
                  origin: new window.google.maps.Point(0, 0),
                  anchor: new window.google.maps.Point(14, 14),
                  scaledSize: new window.google.maps.Size(28, 28),
                }}
                onMouseOver={() => {
                  setSelected(marker);
                  console.log("selected marker", selected);
                }}
                onClick={() => {
                  setSelected(marker);
                }}
              />
            ))
          : null}

        {chosenPin ? (
          <Marker
            key={"1234"}
            position={{ lat: chosenPin.latitude, lng: chosenPin.longitude }}
            icon={{
              url: "/selectedPin.svg",
              origin: new window.google.maps.Point(0, 0),
              // anchor: new window.google.maps.Point(16, 16),
              scaledSize: new window.google.maps.Size(35, 35),
            }}
            onClick={() => {
              setSelected(chosenPin);
            }}
          />
        ) : null}
        {selected ? (
          <InfoWindow
            position={{ lat: selected.latitude, lng: selected.longitude }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div>
              <strong>{selected.name}</strong>
              <br />
              {selected.address}
              <br />
              Accessibility Options: {showOptions(selected.tags)}
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </div>
  );
}
