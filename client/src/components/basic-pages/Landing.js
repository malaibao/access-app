import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  useCallback,
} from 'react';
// import MapContainer from '../map-container/MapContainer';
import Map from '../map/Map';
import Search from '../search/Search';

import axios from 'axios';

const Landing = () => {
  const [pins, setPins] = useState([]);
  const [chosen, setChosen] = useState(null);

  const mapRef = useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(18);

    setChosen({ lat, lng });
  }, []);

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
      <Search panTo={panTo} />
      <Map onMapLoad={onMapLoad} pins={pins} chosen={chosen} panTo={panTo} />
    </div>
  );
};

export default Landing;
