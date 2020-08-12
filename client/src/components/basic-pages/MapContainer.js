import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  Fragment,
} from 'react';
// import MapContainer from '../map-container/MapContainer';
import Map from '../map/Map';
import Search from '../search/Search';
import Spinner from '../Spinner/Spinner';

import axios from 'axios';

const MapContainer = () => {
  const [loading, setLoading] = useState(true);

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
    setLoading(true);
    axios
      .get('/pins')
      .then((res) => {
        console.log('in MapContainer', res.data);
        setPins(res.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleLoading = () => {
    setLoading(false);
  };

  return (
    <Fragment>
      <div style={{ display: 'flex' }}>
        <Search panTo={panTo} />
        {/* {loading ? (
          <div style={{ display: 'flex' }}>
            <Spinner loading={handleLoading} />
          </div>
        ) : ( */}
        <Map onMapLoad={onMapLoad} pins={pins} chosen={chosen} panTo={panTo} />
        {/* )} */}
      </div>
    </Fragment>
  );
};

export default MapContainer;
