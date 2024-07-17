import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { FaLock } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../redux/auth/authSlice';
import {useDispatch, useSelector} from "react-redux";
import LoadingSpinner from '../components/LoadingSpinner';

const Login = () => {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // submit using state management
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {error} = useSelector((state)=>state.auth);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(login({ email:formData.email,password: formData.password }))
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
          <h2>Sign In</h2>
          <div className='user-logo'><FaUser /></div>
        </div>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formEmail" className={`form-group ${formData.email.length > 0 ? 'filled' : ''}`}>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="custom-form-control"
              autoComplete="email"
              required
            />
            <Form.Label className='form-label'><FaUser /> | Username</Form.Label>
          </Form.Group>

          <Form.Group controlId="formPassword" className={`form-group ${formData.password.length > 0 ? 'filled' : ''}`}>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="custom-form-control"
              autoComplete="current-password"
              required
            />
            <Form.Label className='form-label'><FaLock /> | Password</Form.Label>
          </Form.Group>
          <Container className="align-items-center">
            <Form.Check
              type="checkbox"
              id="rememberMe"
              name="rememberMe"
              label="Remember me"
              checked={formData.rememberMe}
              onChange={handleChange}
            />

            <Link to="/forgot-password">Forgot Your Password?</Link>
          </Container>
          {<Form.Text className='m-auto text-danger shadow' >{error}</Form.Text>}
          <Button variant="primary" type="submit">
            LOGIN
          </Button>
          <Form.Text className='m-auto link-next-form'>If you don't have an account? <Link to={"/register"}>Sign Up</Link></Form.Text>
        </Form>
      </Container>
      <LoadingSpinner/>
      <div className='custom-shadow'></div>
    </div>
  );
};

export default Login;
