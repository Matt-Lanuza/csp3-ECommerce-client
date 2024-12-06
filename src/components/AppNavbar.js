import { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, Link } from 'react-router-dom';
import UserContext from '../context/UserContext';

export default function AppNavbar() {
  const { user } = useContext(UserContext);

  return (
    <Navbar expand="lg">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="logo-brand ms-4">
          <span className="d-none d-md-inline">STREETWEAR HUB</span>
          <span className="d-inline d-md-none">STRTWR</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/" exact="true">
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/products" exact="true">Products</Nav.Link>

            {(user.id !== null)?
              user.isAdmin 
                  ?
                  <>
                      <Nav.Link as={NavLink} to="/admin-order-history" exact="true">Orders</Nav.Link>
                      <Nav.Link as={NavLink} to="/profile" exact="true">{user.firstName}</Nav.Link>
                      <Nav.Link as={Link} to="/logout">Logout</Nav.Link>

                  </>
                  :
                  <>
                    <Nav.Link as={NavLink} to="/cart" exact="true">My Cart</Nav.Link>
                    <Nav.Link as={NavLink} to="/user-order-history" exact="true">My Orders</Nav.Link>
                    <Nav.Link as={NavLink} to="/profile" exact="true">{user.firstName}</Nav.Link>
                    <Nav.Link as={NavLink} to="/logout" exact="true">Logout</Nav.Link>
                  </>
              :
              <>
                <Nav.Link as={NavLink} to="/login" exact="true">Login</Nav.Link>
                <Nav.Link as={NavLink} to="/register" exact="true">Register</Nav.Link>
              </>
          }

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}