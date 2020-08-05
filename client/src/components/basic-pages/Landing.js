import React, { useState, useEffect } from 'react';
import MapContainer from '../map-container/MapContainer';

import axios from 'axios';

const Landing = () => {
  const [pins, setPins] = useState({});

  useEffect(() => {
    axios
      .get('/pins')
      .then((res) => setPins(res.data))
      .catch((error) => console.log(error));
  }, []);
  return (
    <div>
      <MapContainer pins={pins} />
    </div>
  );
};

export default Landing;
