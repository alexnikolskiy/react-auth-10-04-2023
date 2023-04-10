import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Logo from './Logo.js';
import './styles/NavBar.css';

function NavBar() {
  const navigate = useNavigate();
  const { pathname } = useLocation()

  function signOut() {
    localStorage.removeItem('jwt');
    navigate('/login');
  }

  return (
    <div className="navbar">
      <div className="navbar__logo">
        <Logo/>
      </div>
      <ul className="navbar__nav">
        {pathname === '/my-profile' && <li><Link to="/ducks" className="navbar__link">Утки</Link></li>}
        {pathname === '/ducks' && <li><Link to="/my-profile" className="navbar__link">Мой профиль</Link></li>}
        <li>
          <button onClick={signOut} className="navbar__link navbar__button">Выйти</button>
        </li>
      </ul>
    </div>
  );
}

export default NavBar;
