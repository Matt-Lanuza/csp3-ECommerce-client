import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card, Button, Spinner, Row, Col, Badge } from 'react-bootstrap';
import { Notyf } from 'notyf';
import { Link, useNavigate } from 'react-router-dom';

const notyf = new Notyf();

export default function ProductDetailsPage() {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  

  useEffect(() => {
    fetch(`https://csp2-ecommerce-api-server.onrender.com/products/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`, 
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch product details');
        }
        return response.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message); 
        setLoading(false);
        notyf.error(`Error: ${err.message}. Please try again later.`);
      });
  }, [id]);

  const handleAddToCart = () => {
    const token = localStorage.getItem('token');

    if (!token) {
      notyf.error("To add this product to your cart, please log in first. It only takes a moment!");

      navigate('/login');
      return;
    }

    const user = JSON.parse(localStorage.getItem('user'));
      if (user?.isAdmin) {
        notyf.error("Admin users cannot add products to the cart.");

        navigate('/products');
        return;
      }


    const quantity = product.quantity || 1; 
    const subtotal = product.price * quantity;


  fetch(`https://csp2-ecommerce-api-server.onrender.com/cart/add-to-cart`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({
      productId: product._id,
      quantity: quantity,
      subtotal: subtotal
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to add product to cart');
      }
      return response.json();
    })
    .then((result) => {
      notyf.success(`${product.name} has been added to your cart.`)

      navigate('/cart');
    })
    .catch((err) => {
      notyf.error(`Error: ${err.message}. Please try again later.`);
    });
};

  if (loading) {
    return (
      <div className="text-center">
        <Spinner animation="border" />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <Container className="mt-5">
      <Row>
        <Col md={8} lg={6} className="mx-auto">
          {/* Product Card */}
          <Card className="shadow-lg border-0 rounded-lg">
            {/* Product Header Section */}
            <Card.Header className="bg-dark text-white text-center py-4">
              <h3>{product.name}</h3>
            </Card.Header>

            {/* Product Body Section */}
            <Card.Body>
              <Row>
                {/* Product Image Section */}
                <Col md={12} className="text-center mb-4">
                  <img
                    src={product.imageUrl || 'https://via.placeholder.com/150'}
                    alt={product.name}
                    className="img-fluid rounded-lg shadow-sm"
                    style={{ maxHeight: '400px', objectFit: 'cover' }} 
                  />
                </Col>

                {/* Product Information Section */}
                <Col md={12} className="mb-4">
                  <Card.Text>
                    <strong className="text-muted">Description:</strong> {product.description}
                  </Card.Text>
                  <Card.Text>
                    <strong className="text-muted">Price:</strong> &#8369; {product.price.toFixed(2)}
                  </Card.Text>
                </Col>

                {/* Product Status */}
                <Row className="mt-3">
                  <Col>
                    <Card.Text>
                      <strong>Status:</strong>{' '}
                      {product.isActive ? (
                        <Badge pill bg="success">
                          Available
                        </Badge>
                      ) : (
                        <Badge pill bg="danger">
                          Unavailable
                        </Badge>
                      )}
                    </Card.Text>
                  </Col>
                </Row>

                {/* Add to Cart Button */}
                <Row className="mt-4">
                  <Col className="text-center">
                    <Button
                      variant="primary"
                      size="lg"
                      className="w-75 py-3"
                      onClick={handleAddToCart}
                    >
                      Add to Cart
                    </Button>
                  </Col>
                </Row>
              </Row>
            </Card.Body>
          </Card>

          {/* Back to Products Link */}
          <div className="text-center mt-5">
            <Link to="/products" className="btn btn-link text-dark">
              <i className="fas fa-arrow-left me-2"></i>Back to Products
            </Link>
          </div>
        </Col>
      </Row>
    </Container>

  );
}