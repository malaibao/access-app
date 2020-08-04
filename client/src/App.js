import React from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Map from './components/map/Map';
import Search from './components/search/Search';
import MapContainer from './components/map-container/MapContainer';

import './App.css';

function App() {
  return (
    <div>
      <Navbar />
      {/* <div className='body'>
        <Search />
        <Map />
      </div> */}
      <MapContainer />
      <Footer />
    </div>
  );
}

export default App;
