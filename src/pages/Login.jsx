import React, { useState } from 'react';
import { Container, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../context/UserContext";


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { userLogin } = UserData();
    const navigate = useNavigate();
  
    const submitHandler = async (e) => {
      e.preventDefault();
      await userLogin(email, password, navigate);
    };

    return (
      <div className='login-background'>
        <Container className="no-gap"> {/* Adjusted margin here */}
          <h2 className="mt-4 text-warning">Login to Easy Shop</h2>
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className='text-colour'>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className='text-colour'>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button type="submit">Login</Button> <br />
            <br />
            <Link to="/register" className="text-colour">Don't have an account? Click Here To Register</Link>
          </Form>
        </Container>
      </div>
    );
};

export default Login;
