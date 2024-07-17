import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProtectedRoute from "./custom-hooks/ProtectedRoute";

const RegistrationForm = lazy(() => import('./pages/Register'));
const Login = lazy(() => import('./pages/Login'));
const PageNotFound = lazy(() => import('./components/_404'));
const ProtectedInformation = lazy(() => import('./pages/ProtectedInformation'));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/protected-info" element={
            <ProtectedRoute>
              <ProtectedInformation />
            </ProtectedRoute>} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
