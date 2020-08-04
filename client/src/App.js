import React from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Map from './components/map/Map';

import './App.css';

function App() {
  return (
    <>
      <Navbar />
      <Map />

      <Footer />
    </>
  );
}

export default App;
