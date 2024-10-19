import React, { useState } from 'react';
import { Container, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from '../context/UserContext';

const Register = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    
    const { registerUser } = UserData();
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        await registerUser(name, email, password, navigate);
      };
    return (
      <div className='sigin-background'>
        <Container className="mt-4">
     
        <h2 className="mt-4 text-warning">Register to Easy shop</h2>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label className='si-name'>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className='si-name'>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className='si-name'>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Button type="submit">Register</Button> <br />
          <br />
           <Link to="/login" className=" si-name pt-2">Already Registered ? Click Here To Login</Link> 
        </Form>
       
      </Container>
      </div>
    );
};

export default Register;