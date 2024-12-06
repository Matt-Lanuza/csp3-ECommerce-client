import { Button, Alert, Modal } from 'react-bootstrap';
import { useState } from 'react';

export default function ClearAllCartButton({ clearAllCart }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);  
  const handleCloseModal = () => setShowModal(false);


  const handleClearAll = () => {
    setLoading(true);
    setError('');
    
    fetch(`https://csp2-ecommerce-api-server.onrender.com/cart/clear-cart`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`, 
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to clear all items from cart');
        }
        return response.json();
      })
      .then(() => {
        clearAllCart();
        setLoading(false);
        handleCloseModal();
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
        handleCloseModal();
      });
  };

  return (
    <div className="text-center my-5">
      <Button variant="dark" onClick={handleShowModal} disabled={loading}>
        {loading ? 'Clearing...' : 'Clear All Items'}
      </Button>

      {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

      {/* Confirmation Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Once you confirm, this action cannot be undone, and you'll need to add them back manually.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleClearAll} disabled={loading}>
            {loading ? 'Clearing...' : 'Clear All Items'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}