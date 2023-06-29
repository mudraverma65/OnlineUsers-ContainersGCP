import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegistrationForm from './RegistrationPage';
import LoginForm from './LoginForm';
import Home from './LandingPage';
import OnlineUsers from './onlineusers';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/register" element={<RegistrationForm/>} />
        <Route exact path="/login" element={<LoginForm/>} />
        <Route exact path="/onlineusers" element={<OnlineUsers/>} />
      </Routes>
    </Router>

  );
};

export default App;