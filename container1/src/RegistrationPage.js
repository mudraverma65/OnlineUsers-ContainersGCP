import React, { useState } from 'react';
import { db } from './firebaseConfig';
import 'bootstrap/dist/css/bootstrap.min.css';

function RegistrationForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState('');
  const [registrationStatus, setRegistrationStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Store the registration data in Firestore
    db.collection('Reg')
      .add({
        name,
        email,
        password,
        location,
      })
      .then(() => {
        // Registration successful
        setRegistrationStatus('success');
      })
      .catch((error) => {
        // Handle any errors
        console.error('Error registering user:', error);
      });
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
