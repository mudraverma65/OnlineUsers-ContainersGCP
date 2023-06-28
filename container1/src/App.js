import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegistrationForm from './RegistrationPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<RegistrationForm/>} />
      </Routes>
    </Router>

  );
};

export default App;