import React, { useState } from "react";
import { Container, Table } from 'react-bootstrap';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { user_info } from "../assets/constant/RandomInfomation.js";
import UserInformation from "../components/UserInformation.jsx";
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

// static pagination

  const [currentPage,setCurrentPage] = useState(0);
  const totalPage = Math.ceil(user_info.length / 5);
  const pageNumber = [];
  for (let i = 0; i < totalPage; i++) {
    pageNumber.push(i + 1);
  }
  
  const staticPagination = user_info.slice(currentPage * 5, (currentPage + 1) * 5);


  const handleIncrease = ()=>{
    setCurrentPage((val)=>++val);
  }
  const handleDecrease = ()=>{
    setCurrentPage((val)=>--val);
  }

  return <>
    <div className="d-flex flex-wrap justify-content-between p-1 bg-warning">
      <h2>Protected Information</h2>
      <button className="btn btn-danger px-5" onClick={handleSubmit}>Logout</button>
    </div>
    <Container className="user_infomartion mt-5">
      <Table bordered={false} hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Date Created</th>
            <th>Role</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>

          {
            staticPagination.map((user) => (
              <tr key={user.id}>
                <UserInformation user={user} />
              </tr>
            ))
          }

        </tbody>
      </Table>
      <Container className="d-flex justify-content-end">
        <button className={`${currentPage === 0?"disable":"arrow-btn"}`} onClick={handleDecrease} disabled={currentPage <= 0}>Previous</button>
        {
          pageNumber.map((val) => (
            <button className={`btn btn-${currentPage === (val - 1) ? 'primary' : 'outline-primary'}`}>{val}</button>
          ))
        }
        <button className={`${currentPage === totalPage-1?"disable":"arrow-btn"}`} onClick={handleIncrease} disabled={currentPage === totalPage-1}>Next</button>
      </Container>
    </Container>


  </>;
};

export default ProtectedInformation;
