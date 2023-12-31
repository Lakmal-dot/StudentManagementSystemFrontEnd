import React, { useState } from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';
import { createBrowserHistory } from 'history';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const history = createBrowserHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Add your login logic here
    if (username === 'admin' && password === 'password') {
      // Successful login
      setErrorMessage('');
      console.log('Login successful');
      navigate('/home');
    } else {
      // Invalid credentials
      setErrorMessage('Invalid username or password');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;