import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function RegistrationForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState('');
  const [registrationStatus, setRegistrationStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const registrationData = {
      name,
      password,
      email,
      location
    };

    try {
      // Make POST request to the backend microservice
      const response = await axios.post('http://127.0.0.1:5000/register', registrationData);
      console.log(response.data); // Registration success message or response from the backend
      setRegistrationStatus('success')
    } catch (error) {
      console.error(error);
      // Handle error response from the backend
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-5">
      <h3>Registration</h3>
      {registrationStatus === 'success' && (
        <div className="alert alert-success" role="alert">
          Registration successful!
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
        <input
          type="password"
          className="form-control"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
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
      {/* Rest of the form inputs */}
      <button type="submit" className="btn btn-primary">Register</button>
    </form>
  );
}

export default RegistrationForm;
