import { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import ProductCard from './ProductCard';

export default function UserView({ productsData }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const activeProducts = productsData.filter(product => product.isActive);
    setProducts(activeProducts);
  }, [productsData]);

  return (
     <Row className="g-4">
      <h1 className="products-title text-center my-5">PRODUCTS</h1>
      {products.map((product)  => (
        <Col lg={3} md={3} sm={12} key={product._id}>
        <ProductCard key={product._id} productProp={product} />
        </Col>
      ))}
    </Row>
  );
}
