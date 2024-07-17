
import React from "react";
import { useSelector } from "react-redux";
import Spinner from 'react-bootstrap/Spinner';

const LoadingSpinner = () => {
  const { isLoading } = useSelector((state) => state.auth);

  return isLoading ? (
    <div className="container-spinner">

      <Spinner animation="border" className="spinner" />
    </div>
  ) : (
    <></>
  );
};

export default LoadingSpinner;
