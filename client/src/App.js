import React, { useState, useReducer, createContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/basic-pages/Landing';
import About from './components/basic-pages/About';
import Register from './components/basic-pages/Register';
import Login from './components/basic-pages/Login';
import Profile from './components/basic-pages/Profile';
import New from './components/new/New';
import Result from './components/result/Result';

import setAuthToken from './utils/setAuthToken';
import { AuthContext, PinContext } from './context';
import { authReducer } from './reducers/reducer';

import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
// export const AuthContext = createContext();
// export const PinContext = createContext();

const authInitialState = {
  isAuthenticated: false,
  token: localStorage.getItem('token'),
};

const App = () => {
  const [authState, dispatch] = useReducer(authReducer, authInitialState);
  const [pin, setPin] = useState(null);

  return (
    <div className='app'>
      <AuthContext.Provider
        value={{
          authState,
          dispatch,
        }}
      >
        <PinContext.Provider value={{ pin, setPin }}>
          <Router>
            <Navbar />
            <Route exact path='/' component={Landing} />
            <Switch>
              <Route exact path='/about' component={About} />
              <Route exact path='/register' component={Register} />

              <Route exact path='/login' component={Login} />
              <Route exact path='/profile' component={Profile} />
              <Route exact path='/new' component={New} />
              <Route exact path='/result' component={Result} />
            </Switch>
            <Footer />
          </Router>
        </PinContext.Provider>
      </AuthContext.Provider>
    </div>
  );
};

export default App;
