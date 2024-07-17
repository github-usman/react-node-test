import axios from 'axios';
import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { FaLock } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const uri = process.env.REACT_APP_SERVER_BASE_URL;

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${uri}/login`, formData);
      console.log('Registration successful:', response.data);
    } catch (error) {
      console.error('Registration failed:', error);
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
          <Button variant="primary" type="submit">
            LOGIN
          </Button>
          <Form.Text className='m-auto link-next-form'>If you don't have an account? <Link to={"/register"}>Sign Up</Link></Form.Text>
        </Form>
      </Container>
      <div className='shadow'></div>
    </div>
  );
};

export default Login;
