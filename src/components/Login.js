import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Logo from './Logo.js';
import * as duckAuth from '../duckAuth.js';
import './styles/Login.css';

function Login({ handleLogin }) {
  const [formValue, setFormValue] = useState({
    username: '',
    password: '',
  })
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()
  const location = useLocation()

  const tokenCheck = () => {
    const jwt = localStorage.getItem('jwt')
    if (!jwt) {
      return
    }
    duckAuth.getContent(jwt)
      .then(res => {
        if (res) {
          handleLogin(res)
          const url = location.state?.returnUrl || '/ducks'
          navigate(url)
        }
      })
  }

  useEffect(() => {
    tokenCheck()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formValue.password || !formValue.username) {
      setErrorMessage('Username or password are empty')
      return
    }

    duckAuth.authorize(formValue.username, formValue.password)
      .then(data => {
        if (data.jwt) {
          localStorage.setItem('jwt', data.jwt)
          handleLogin(data.user)
          const url = location.state?.returnUrl || '/ducks'
          navigate(url)
        }
      })
  }

  return (
    <div onSubmit={handleSubmit} className="login">
      <Logo title={'CryptoDucks'}/>
      <p className="login__welcome">
        Это приложение содержит конфиденциальную информацию.
        Пожалуйста, войдите или зарегистрируйтесь, чтобы получить доступ к CryptoDucks.
      </p>
      <p className="login__error">
        {errorMessage}
      </p>
      <form className="login__form">
        <label htmlFor="username">
          Логин:
        </label>
        <input id="username" required name="username" type="text" autoComplete="login" value={formValue.username}
               onChange={handleChange}/>
        <label htmlFor="password">
          Пароль:
        </label>
        <input id="password" required name="password" type="password" autoComplete="current-password"
               value={formValue.password} onChange={handleChange}/>
        <div className="login__button-container">
          <button type="submit" className="login__link">Войти</button>
        </div>
      </form>

      <div className="login__signup">
        <p>Ещё не зарегистрированы?</p>
        <Link to="/register" className="signup__link">Зарегистрироваться</Link>
      </div>
    </div>
  );
}

export default Login;
