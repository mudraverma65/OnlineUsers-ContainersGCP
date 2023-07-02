import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';

function RegistrationForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState('');
  const [registrationStatus, setRegistrationStatus] = useState(null);
  const [registrationResponse, setRegistrationResponse] = useState(null);
  const [registrationError, setRegistrationError] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const registrationData = {
      name,
      password,
      email,
      location
    };

    try {
      const response = await axios.post('https://a2-container1-fb74xf24fq-uc.a.run.app/register', registrationData);
      console.log(response.data); // Response from the backend
      if (response.data.message) {
        setRegistrationStatus('success');
        setRegistrationResponse(response.data.message); // Set the success message to be displayed
        setRegistrationError(null); // Clear any previous error
      } else {
        setRegistrationStatus('error');
        setRegistrationError(response.data.error); // Set the error message to be displayed
        setRegistrationResponse(null); // Clear any previous success message
      }
    } catch (error) {
      console.error(error);
      setRegistrationError(error.response.data.error); // Set the error message to be displayed
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-5">
      <h3>Registration</h3>
      {registrationStatus === 'success' && registrationResponse && (
        <div className="alert alert-success" role="alert">
          {registrationResponse}
        </div>
      )}
      {registrationStatus === 'error' && registrationError && (
        <div className="alert alert-danger" role="alert">
          {registrationError}
        </div>
      )}
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name:
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
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
        <div className="input-group">
          <input
            type={passwordVisible ? 'text' : 'password'}
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={togglePasswordVisibility}
          >
            <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
          </button>
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="location" className="form-label">
          Location:
        </label>
        <input
          type="text"
          className="form-control"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary">Register</button>
    </form>
  );
}

export default RegistrationForm;
