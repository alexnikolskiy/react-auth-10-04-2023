import React, { useState } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Login from './Login.js';
import Register from './Register.js';
import Ducks from './Ducks.js';
import MyProfile from './MyProfile.js';
import { ProtectedRoute } from './ProtectedRoute'
import './styles/App.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [userData, setUserData] = useState({ username: '', email: '' })

  const handleLogin = ({ username, email }) => {
    setLoggedIn(true)
    setUserData({ username, email })
  }

  return (
    <Routes>
      <Route path="/ducks" element={<ProtectedRoute element={Ducks} loggedIn={loggedIn} />}/>
      <Route path="/my-profile" element={<ProtectedRoute element={MyProfile} loggedIn={loggedIn} userData={userData} />}/>
      <Route path="/login" element={
        <div className="loginContainer">
          <Login handleLogin={handleLogin}/>
        </div>}/>
      <Route path="/register" element={
        <div className="registerContainer">
          <Register/>
        </div>}/>
      <Route path="/" element={loggedIn ? <Navigate to="/ducks" replace /> : <Navigate to="/login" replace />} />
      <Route path="*" element={<h1>NOT FOUND</h1>} />
    </Routes>
  );
}

export default App;
