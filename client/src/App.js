import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegistrationForm from './pages/Register';
import Login from './pages/Login';
import PageNotFound from './components/_404';
import ProtectedInformation from './pages/ProtectedInformation';
import ProtectedRoute from "./custom-hooks/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/protected-info" element={
          <ProtectedRoute>
            <ProtectedInformation />
          </ProtectedRoute>} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
