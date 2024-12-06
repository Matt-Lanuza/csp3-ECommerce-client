import { useState, useEffect } from 'react';
import { Button, Table, Modal } from 'react-bootstrap';
import CreateProduct from './CreateProduct';
import UpdateProduct from './UpdateProduct';
import ArchiveProduct from './ArchiveProduct';
import { useNavigate } from 'react-router-dom';

export default function AdminView({ productsData, fetchData }) {
  const [products, setProducts] = useState([]);
  const [showCreateProductModal, setShowCreateProductModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setProducts(productsData);
  }, [productsData]);

  const toggleCreateProductModal = () => {
    setShowCreateProductModal(!showCreateProductModal);
  };

  const onClickAdminOrderHistory = () => {
    navigate('/admin-order-history')
  }


  return (
    <>
      <h1 className="admin-dashboard-title text-center my-5">Admin Dashboard</h1>

      <div className="d-flex justify-content-center mb-3">
        <Button variant="primary" onClick={toggleCreateProductModal} className="m-3">
          Create New Product
        </Button>
        <Button
              variant="success"
              className="m-3"
              onClick={onClickAdminOrderHistory}
            >
              Show User Orders
        </Button>
      </div>

      <Modal show={showCreateProductModal} onHide={toggleCreateProductModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create New Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateProduct fetchData={fetchData} />
        </Modal.Body>
      </Modal>

      <div className="table-container">
      <Table className="admin-dashboard mx-auto" striped bordered hover responsive>
        <thead>
          <tr className="text-center">
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Availability</th>
            <th colSpan="2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product._id}</td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td style={{ width: '90px' }}> &#8369; {product.price}</td>
              <td className={product.isActive ? 'text-success' : 'text-danger'}>
                {product.isActive ? 'Available' : 'Unavailable'}
              </td>
              <td className="text-center">
              <UpdateProduct 
                  product={product} 
                  fetchData={fetchData} 
                />
              </td>
              <td className="text-center">
              <ArchiveProduct 
                  product={product} 
                  fetchData={fetchData} 
                  isActive={product.isActive}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      </div>
    </>
  );
}