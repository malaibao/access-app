import React, { useState, useReducer, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import MapContainer from './components/basic-pages/MapContainer';
import Landing from './components/basic-pages/Landing';
import Register from './components/basic-pages/Register';
import Login from './components/basic-pages/Login';
import Profile from './components/basic-pages/Profile';
import New from './components/new/New';
import Result from './components/result/Result';

import setAuthToken from './utils/setAuthToken';
import { AuthContext, PinContext } from './context';
import { authReducer } from './reducers/reducer';

import './App.css';
import { LOGIN } from './reducers/action-types';

const authInitialState = {
  isAuthenticated: false,
  token: localStorage.getItem('token'),
};

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  const [authState, dispatch] = useReducer(authReducer, authInitialState);
  const [pinInfo, setPinInfo] = useState(null);

  // useEffect(() => {
  //   if (localStorage.token) {
  //     setAuthToken(localStorage.token); // Set headers token
  //     dispatch({ type: LOGIN, payload: localStorage.token });
  //   }
  // }, [setAuthToken, dispatch]);

  return (
    <div className='app'>
      <AuthContext.Provider
        value={{
          authState,
          dispatch,
        }}
      >
        <PinContext.Provider value={{ pinInfo, setPinInfo }}>
          <Router>
            <Navbar />
            <Route exact path='/' component={Landing} />
            <Switch>
              <Route exact path='/map' component={MapContainer} />
              <Route exact path='/register' component={Register} />

              <Route exact path='/login' component={Login} />
              <Route exact path='/profile' component={Profile} />
              <Route exact path='/new' component={New} />
              <Route exact path='/result' component={Result} />
            </Switch>
            {/* <Footer /> */}
          </Router>
        </PinContext.Provider>
      </AuthContext.Provider>
    </div>
  );
};

export default App;
