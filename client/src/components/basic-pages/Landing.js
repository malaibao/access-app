import React, { useState, useEffect, useContext, useRef, useCallback } from "react";
import MapContainer from "../map-container/MapContainer";

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

  useEffect(() => {
    axios
      .get("/pins")
      .then((res) => {
        setPins(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return <div>{<MapContainer pins={pins} onMapLoad={onMapLoad} panTo={panTo} chosen={chosen}/>}</div>;
};

export default Landing;
