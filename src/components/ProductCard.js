import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function ProductCard({ productProp, isAdmin }) {
  const { _id, name, imageUrl } = productProp;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://csp2-ecommerce-api-server.onrender.com/products/${_id}`); 
        if (response.ok) {
          const data = await response.json();
          setProduct(data);
        } else {
          console.error('Failed to fetch product data');
        }
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProduct();
  }, [_id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="product-card mb-4 mx-3 p-3">
      <Card.Body>
        <Card.Img
          className="card-img my-5 img-fluid"
          variant="top"
          src={imageUrl || "default-image-url"} 
          alt={name}
        />
        {isAdmin ? (
          <>
            <Link to={`/products/edit/${_id}`} className="btn btn-warning">
              Edit
            </Link>
            <Button variant="danger" className="ms-2">
              Delete
            </Button>
          </>
        ) : (
          // User view: Simple View Details button
          <Link to={`/products/${_id}`} className="btn btn-primary">
            View Details
          </Link>
        )}
      </Card.Body>
    </Card>
  );
}
