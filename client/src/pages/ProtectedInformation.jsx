import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/auth/authSlice";

const ProtectedInformation = () => {

  // submit using state management
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = () => {
    try {
      dispatch(logout());
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return <div>
    <h1>protected routes</h1>
    <button className="btn btn-danger" onClick={handleSubmit}>Logout</button>
  </div>;
};

export default ProtectedInformation;
