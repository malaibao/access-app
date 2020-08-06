import React, { useState, useEffect, useContext, useRef, useCallback } from "react";
import MapContainer from "../map-container/MapContainer";
import './Landing.scss';
import axios from "axios";

const Landing = () => {
  const [pins, setPins] = useState([]);
  const [chosen, setChosen] = useState(null);

  const mapRef = useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = useCallback(({lat, lng}) => {
    mapRef.current.panTo({lat, lng});
    mapRef.current.setZoom(20);
    // mapRef.current.setChosen({lat,lng})

    setChosen({lat,lng})
  }, [])

  function Locate({panTo}) {
    return (
      <button className="location" onClick={() => {
        navigator.geolocation.getCurrentPosition((position) => {
          panTo({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
        }, () => null)
      }}>
      <img src="compass.png" alt="compass locate me" />
      </button>
    )
  }

  useEffect(() => {
    axios
      .get("/pins")
      .then((res) => {
        setPins(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return <div>{<MapContainer pins={pins} onMapLoad={onMapLoad} panTo={panTo} chosen={chosen} Locate={panTo}/>}</div>;
};

export default Landing;
