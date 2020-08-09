import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  useCallback,
} from "react";
import { PinContext } from "../../context";
import Map from "../map/Map";
import Pin from "./Pin";
import Form from "../basic-pages/Form";
import axios from "axios";
import "./Result.scss";

const Result = () => {
  const [pins, setPins] = useState([]);
  const { pinInfo } = useContext(PinContext);

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(18);
  }, []);

  const mapRef = useRef();

  const [mapLoaded, setMapLoaded] = useState(false);

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
    setMapLoaded(true);
  }, []);

  useEffect(() => {
    if (pinInfo && mapLoaded) {
      console.log("pin in useEffect", pinInfo);
      console.log("pin info inside pin info", pinInfo.pin);
      panTo({ lat: pinInfo.pin.latitude, lng: pinInfo.pin.longitude });
    }
  }, [pinInfo, panTo, mapLoaded]);

  // useEffect(() => {
  //   axios
  //     .get("/pins")
  //     .then((res) => {
  //       setPins(res.data);
  //     })
  //     .catch((error) => console.log(error));
  // }, []);
  const showOptions = (ratings) => {
    const options = [];
    for (let i = 0; i < ratings.length; i++) {
      const option = ratings[i].replace(/_/g, " ");
      options.push(option);
    }
    return options.join(", ");
  };

  return (
    <div style={{ display: "flex" }}>
      <div className="search-result-details">
        <Pin pin={pinInfo ? pinInfo.pin : null} />
        <h3>Something to add?</h3>
        <p>Submit a new rating below:</p>
        <Form />
      </div>
      <Map
        pins={pins}
        onMapLoad={onMapLoad}
        chosenPin={pinInfo ? pinInfo.pin : null}
        panTo={panTo}
      />
    </div>
  );
};

export default Result;
