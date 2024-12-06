import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://csp2-ecommerce-api-server.onrender.com/products/active`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const getRandomProducts = (num) => {
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
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

  const featuredProducts = getRandomProducts(4);

  return (
    <div className="featured-products">
      <Row className="mb-5">
        {featuredProducts.map((product) => (
          <Col
            xs={12}
            lg={3}
            key={product._id}
            className="mb-4 d-flex justify-content-center"
          >
            <Card className="shadow border-0 circular-card">
              <div className="circular-image-container">
                <Link to={`/products/${product._id}`}>
                  <Card.Img
                    variant="top"
                    src={product.imageUrl || 'https://via.placeholder.com/150'}
                    alt={product.name}
                    className="img-fluid circular-image"
                  />
                </Link>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default FeaturedProducts;