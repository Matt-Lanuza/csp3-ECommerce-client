import React, { useEffect, useState } from 'react';
import { Container, Table, Spinner, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Notyf } from 'notyf';

const notyf = new Notyf();

export default function UserOrderHistoryPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      notyf.error("Please log in to view your orders.");
      navigate('/login');
      return;
    }

    // Fetch the user's orders from the API
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/orders/my-orders`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const data = await response.json();
        setOrders(data.orders);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchOrders();
  }, [navigate]);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">
          <h4>Error: {error}</h4>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <h2 className="user-order-title text-center mb-4">Your Order History</h2>
      
      <Table className="user-order-table" striped bordered hover responsive>
        <thead>
          <tr>
            <th>Order #</th>
            <th>Total Price</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center">No orders found.</td>
            </tr>
          ) : (
            orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>&#8369; {order.totalPrice.toFixed(2)}</td>
                <td>{order.status}</td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </Container>
  );
}