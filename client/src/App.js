import React from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Map from './components/map/Map';
import Search from './components/search/Search';

import './App.css';

function App() {
  return (
    <div>
      <Navbar />
      <div className='body'>
        <Search />
        <Map />
      </div>
      <Footer />
    </div>
  );
}

export default App;
