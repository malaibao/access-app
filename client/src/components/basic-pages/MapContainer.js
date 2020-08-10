import React, { useState, useEffect, useRef, useCallback, Fragment } from 'react';
// import MapContainer from '../map-container/MapContainer';
import Map from '../map/Map';
import Search from '../search/Search';
import Spinner from '../Spinner/Spinner';

import axios from 'axios';

const MapContainer = () => {
  const [pins, setPins] = useState([]);
  const [chosen, setChosen] = useState(null);
  const [loading, setLoading] = useState(null);

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
        setPins(res.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

    const handleLoading = () => {
      setLoading(false)
    }

  return (
    <Fragment>
    <div style={{ display: 'flex' }}>
      <Search panTo={panTo} />
      { loading ? 
      <Fragment>
        <Spinner 
          loading={handleLoading}
        />
      </Fragment>
      :
      <Fragment>
        <Map onMapLoad={onMapLoad} pins={pins} chosen={chosen} panTo={panTo} />
      </Fragment>
      }
    </div>
    </Fragment>
  );
};

export default MapContainer;
