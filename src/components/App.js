import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './Login.js';
import Register from './Register.js';
import Ducks from './Ducks.js';
import MyProfile from './MyProfile.js';
import * as duckAuth from '../duckAuth.js';
import './styles/App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Routes>
        <Route path="/ducks" element={<Ducks/>} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/login" element={
          <div className="loginContainer">
            <Login  />
          </div>} />
        <Route path="/register" element={
          <div className="registerContainer">
            <Register />
          </div>} />
      </Routes>
    );
  }
}

export default App;
