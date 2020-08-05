import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/basic-pages/Landing';
import About from './components/basic-pages/About';
import Register from './components/basic-pages/Register';
import Login from './components/basic-pages/Login';

import setAuthToken from './utils/setAuthToken';

import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <Router>
      <Navbar />
      <Route exact path='/' component={Landing} />

      {/* <div><MapContainer pins={pins} /></div> */}
      <Switch>
        <Route exact path='/about' component={About} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
