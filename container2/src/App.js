import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './LoginForm';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LoginForm/>} />
      </Routes>
    </Router>

  );
};

export default App;