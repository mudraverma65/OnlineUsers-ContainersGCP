import React, { useState } from 'react';
import { db } from './firebaseConfig';
import 'bootstrap/dist/css/bootstrap.min.css';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    // Check if the provided email and password match the stored data in Firestore
    db.collection('Reg')
      .where('email', '==', email)
      .where('password', '==', password)
      .get()
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          // Login successful, update the user state in Firestore
          const userRef = db.collection('state').doc(email);
          userRef.set({
            online: true,
            offline: false,
            timestamp: new Date().toISOString(),
          });

          // Set login success state to true
          setLoginSuccess(true);
        } else {
          // Invalid email or password
          console.error('Invalid email or password');
        }
      })
      .catch((error) => {
        // Handle any errors
        console.error('Error logging in:', error);
      });
  };

  return (
    <form onSubmit={handleLogin} className="container mt-5">
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

      {loginSuccess && (
        <div className="alert alert-success mt-3" role="alert">
          Login successful!
        </div>
      )}
    </form>
  );
}

export default LoginForm;
