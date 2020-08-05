import React, { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import MapContainer from './components/map-container/MapContainer';
import axios from 'axios';

import './App.css';

function App() {
  const [pins, setPins] = useState({});

  useEffect(() => {
    axios
      .get('/pins')
      .then((res) => setPins(res.data))
      .catch((error) => console.log(error));
  }, []); // eventually change to include newly created pins (not just on page load)

  return (
    <div>
      <Navbar />
      <MapContainer pins={pins} />
      <Footer />
    </div>
  );
}

export default App;
