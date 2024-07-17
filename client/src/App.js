import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegistrationForm from './pages/Register';
import Login from './pages/Login';
import PageNotFound from './components/_404';


const App = () => {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
    </Router>
  );
};

export default App;
