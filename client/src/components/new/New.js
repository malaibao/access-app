import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  useCallback,
} from 'react';
import { PinContext } from '../../App';
import Map from '../map/Map';
import Form from '../basic-pages/Form';
import axios from 'axios';

const New = () => {
  const [pins, setPins] = useState([]);
  const { pin } = useContext(PinContext);

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(18);
  }, []);

  const mapRef = useRef();

  const [mapLoaded, setMapLoaded] = useState(false);

  const onMapLoad = useCallback((map) => {
    console.log('in onMapLoad 1234');
    mapRef.current = map;
    setMapLoaded(true);
  }, []);

  useEffect(() => {
    if (pin && mapLoaded) {
      panTo({ lat: pin.latitude, lng: pin.longitude });
    }
  }, [pin, panTo, mapLoaded]);

  useEffect(() => {
    axios
      .get('/pins')
      .then((res) => {
        setPins(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div style={{ display: 'flex' }}>
      {pin && console.log(pin)}
      <Form style={{ width: '30%' }} />

      <Map
        pins={pins}
        onMapLoad={onMapLoad}
        chosen={pin ? { lat: pin.latitude, lng: pin.longitude } : null}
        panTo={panTo}
      />
    </div>
  );
};

export default New;
