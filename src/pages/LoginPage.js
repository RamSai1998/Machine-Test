import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validatePassword(password)) {
      setError('Password must be at least 8 characters, include 1 uppercase letter, 1 number, and 1 symbol.');
      return;
    }
    navigate('/home');
  };

  return (
    <Container className="login-container">
      <div className="login-card">
        <h3 className="login-title">Sign In</h3>
        <Form onSubmit={handleSubmit} className="login-form">
          <Form.Control
            type="email"
            placeholder="Username or email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="login-actions">
            <Form.Check type="checkbox" label="Keep me signed in" />
          </div>
          {error && <p className="text-danger mt-2">{error}</p>}
          <Button type="submit" className="w-100 mt-3 btn-primary">Sign In</Button>
          <div className="login-footer">
            <p>Or Sign In With</p>
            <div className="social-icons">
              <i className="fab fa-facebook"></i>
              <i className="fab fa-google"></i>
              <i className="fab fa-linkedin"></i>
              <i className="fab fa-twitter"></i>
            </div>
          </div>
        </Form>
      </div>
    </Container>
  );
}

export default LoginPage;
