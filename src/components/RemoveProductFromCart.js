import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Notyf } from 'notyf';

export default function RemoveFromCartButton({ productId, removeFromCart }) {
  const [showModal, setShowModal] = useState(false);
  const notyf = new Notyf();


  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleRemove = () => {
    setShowModal(false);

    fetch(`${process.env.REACT_APP_API_BASE_URL}/cart/${productId}/remove-from-cart`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to remove item from cart');
        }
        return response.json();
      })
      .then(() => {
        notyf.success('The item has been removed from your cart.');
        removeFromCart(productId);
      })
      .catch((error) => {
        notyf.error('Something went wrong, please try again later.');
      });
  };

  return (
    <>
      <Button variant="danger" onClick={handleShow}>
        Remove
      </Button>

      {/* Modal for confirmation */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Remove Item?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to remove this item from your cart?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleRemove}>
            Yes, remove it!
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
