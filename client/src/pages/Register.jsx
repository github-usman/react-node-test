import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { FaCalendar, FaLock } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../redux/auth/authSlice';
import LoadingSpinner from '../components/LoadingSpinner';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    date_of_birth: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };


  // submit using state management
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {error} = useSelector((state)=>state.auth);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(register({name:formData.name,date_of_birth:formData.date_of_birth, email:formData.email,password: formData.password }))
        .unwrap()
        .then(() => {
          navigate('/protected-info');
        })
        .catch(() => {});
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className="register__page__form-container">
      <Container className="body-container">
        <div className='title'>
          <h2>Sign UP</h2>
          <div className='user-logo'><FaUser /></div>
        </div>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formName" className={`form-group ${formData.name.length>0?'filled':''}`}>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="custom-form-control"
              autoComplete="off"
              required
            />
            <Form.Label className='form-label'><FaUser/> | name</Form.Label>
          </Form.Group>

          <Form.Group controlId="formDateOfBirth" className={`form-group ${formData.date_of_birth.length>0?'filled':''}`}>
            <Form.Control
              type="date"
              name="date_of_birth"
              value={formData.date_of_birth}
              onChange={handleChange}
              className="custom-form-control"
              autoComplete="off"
              required
            />
          <Form.Label className='form-label'><FaCalendar/> | Date of Birth</Form.Label>
          </Form.Group>

          <Form.Group controlId="formEmail" className={`form-group ${formData.email.length>0?'filled':''}`}>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="custom-form-control"
              autoComplete="off"
              required
            />
          <Form.Label className='form-label'><MdEmail/> | Email</Form.Label>
          </Form.Group>

          <Form.Group controlId="formPassword" className={`form-group ${formData.password.length>0?'filled':''}`}>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="custom-form-control"
              autoComplete="off"
              required
            />
          <Form.Label className='form-label'><FaLock/> | Password</Form.Label>
          </Form.Group>
          {<Form.Text className='m-auto mt-1 text-danger shadow' >{error}</Form.Text>}
          <Button variant="primary" type="submit">
            Register
          </Button>
          <Form.Text className='m-auto link-next-form'>If you have an account? <Link to={"/"}>Sign In</Link></Form.Text>
        </Form>
      </Container>
      <LoadingSpinner/>
      <div className='custom-shadow'></div>
    </div>
  );
};

export default RegistrationForm;
