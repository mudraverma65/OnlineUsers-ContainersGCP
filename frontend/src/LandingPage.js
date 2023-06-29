import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {
  return (
    <div className="container mt-5">
      <h1>Welcome to the Home Page</h1>
      <div className="mt-4">
        <Link to="/login" className="btn btn-primary me-3">Login</Link>
        <Link to="/register" className="btn btn-primary">Registration</Link>
      </div>
    </div>
  );
}

export default Home;
