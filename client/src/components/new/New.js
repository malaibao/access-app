import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  useCallback,
} from 'react';
import Map from '../map/Map';
import Form from '../basic-pages/Form';
import axios from 'axios';

const New = () => {
  const [pins, setPins] = useState([]);

  const mapRef = useRef();
  const onMapLoad = React.useCallback((map) => {
    console.log('in onMapLoad 1234');
    mapRef.current = map;
    panTo({ lat: 43.6382956, lng: -79.4210971 });
  }, []);

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(18);
  }, []);

  useEffect(() => {
    axios
      .get('/pins')
      .then((res) => {
        setPins(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  // panTo({ lat: 43.6382956, lng: -79.4210971 });
  return (
    <div style={{ display: 'flex' }}>
      <Form />

      <Map pins={pins} onMapLoad={onMapLoad} chosen={null} panTo={panTo} />

      {/* {
        <MapContainer
          pins={pins}
          onMapLoad={onMapLoad}
          panTo={panTo}
          chosen={chosen}
        />
      } */}
    </div>
  );
};

export default New;
