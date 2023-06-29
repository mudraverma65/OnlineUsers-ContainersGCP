import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = {
      email,
      password
    };

    try {
      const response = await axios.post('http://127.0.0.1:5000/login', loginData);
      console.log(response.data); 
      if (response.data.message === 'Login successful') {
        // Perform further actions, such as setting user session or redirecting to a dashboard
        // For example, set user session and redirect to the dashboard
        setLoginStatus('success');
        // history.push('/dashboard');
      }
    } catch (error) {
      console.error(error);
      // Handle error response from the backend
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-5">
      <h3>Login</h3>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email:
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password:
        </label>
        <input
          type="password"
          className="form-control"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary">Login</button>

      {loginStatus && (
        <div className="alert alert-success mt-3" role="alert">
          Login successful!
        </div>
      )}
    </form>
  );
}

export default LoginForm;
