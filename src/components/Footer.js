import { Container, Row, Col, ListGroup } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#343a40', color: '#fff', padding: '5px 0' }}>
      <Container>
        <Row className="text-center">
          <Col md={4} sm={12}>
            <h5>Contact Us</h5>
            <ListGroup variant="flush">
              <ListGroup.Item className="bg-transparent border-0 text-white">
                <strong>Email:</strong> streetwearhub@mail.com
              </ListGroup.Item>
              <ListGroup.Item className="bg-transparent border-0 text-white">
                <strong>Phone:</strong> +1 (987) 654-3210
              </ListGroup.Item>
            </ListGroup>
          </Col>

          <Col md={4} sm={12}>
            <h5>Quick Links</h5>
            <ListGroup variant="flush">
              <ListGroup.Item className="bg-transparent border-0">
                <a href="/quick-links" className="text-white">About Us</a>
              </ListGroup.Item>
              <ListGroup.Item className="bg-transparent border-0">
                <a href="/quick-links" className="text-white">Privacy Policy</a>
              </ListGroup.Item>
              <ListGroup.Item className="bg-transparent border-0">
                <a href="/quick-links" className="text-white">Terms & Conditions</a>
              </ListGroup.Item>
            </ListGroup>
          </Col>

          <Col md={4} sm={12}>
            <h5>Follow Us</h5>
            <ListGroup variant="flush">
              <ListGroup.Item className="bg-transparent border-0">
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-white">
                  Facebook
                </a>
              </ListGroup.Item>
              <ListGroup.Item className="bg-transparent border-0">
                <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-white">
                  Twitter
                </a>
              </ListGroup.Item>
              <ListGroup.Item className="bg-transparent border-0">
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-white">
                  Instagram
                </a>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>

        <Row className="text-center mt-4">
          <Col>
            <p>&copy; {new Date().getFullYear()} StreetWear Hub. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
