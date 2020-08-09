import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  useCallback,
} from "react";
import { PinContext } from "../../context";
import Map from "../map/Map";
import Form from "../basic-pages/Form";
import axios from "axios";

const New = () => {
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
      panTo({ lat: pinInfo.latitude, lng: pinInfo.longitude });
    }
  }, [pinInfo, panTo, mapLoaded]);

  useEffect(() => {
    axios
      .get("/pins")
      .then((res) => {
        setPins(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <Form pin={pinInfo ? pinInfo : null} style={{ width: "30%" }} />
      <Map
        pins={pins}
        onMapLoad={onMapLoad}
        chosenPin={pinInfo ? pinInfo : null}
        panTo={panTo}
      />
    </div>
  );
};

export default New;
