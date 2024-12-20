import { useState, useEffect, useContext } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { Notyf } from 'notyf';

export default function Login() {
  const { user, setUser } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isActive, setIsActive] = useState(false);
  const notyf = new Notyf();

  function authenticate(e) {
    e.preventDefault();



    fetch(`${process.env.REACT_APP_API_BASE_URL}/users/login`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.access !== undefined) {
        localStorage.setItem('token', data.access);
        retrieveUserDetails(data.access);

        notyf.success("You're all set!. Start exploring our products.");
      } else {
        notyf.error("Please double-check your email and password and try again.");
      }
    });

    setEmail('');
    setPassword('');
  }

  const retrieveUserDetails = (token) => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/users/details`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => res.json())
    .then(data => {
      console.log(data.user.isAdmin);

      setUser({
        id: data.user._id,
        firstName: data.user.firstName,
        isAdmin: data.user.isAdmin
      });


    });
  };

  useEffect(() => {
    setIsActive(email !== '' && password !== '');
  }, [email, password]);

  return (

    (user.id !== null) ?
            <Navigate to="/products" />
            :

    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6} lg={4}>
          <div className="text-center mb-4">
            <h2>Login</h2>
          </div>
          <Form onSubmit={authenticate}>
            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPassword" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            {isActive ? 
              <Button variant="primary" type="submit" id="loginBtn">
                Login
              </Button>
              :
              <Button variant="danger" type="submit" id="loginBtn" disabled>
                Login
              </Button>
            }
          </Form>
          <div className="text-center mt-3">
            <p>
              Don't have an account? <a href="/register">Register here</a>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}