import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Notyf } from 'notyf';

const notyf = new Notyf();

export default function ArchiveProduct({ product, isActive, fetchData }) {

  
  const [productId] = useState(product._id);

  // Archive product function
  const archiveToggle = () => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${productId}/archive`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Product archived successfully") {
          notyf.success("Product archived successfully");

          fetchData();
        } else {
          notyf.error("Failed to archive product");
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        notyf.error("Something went wrong, please try again later.")
      });
  };

  // Activate product function
  const activateToggle = () => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${productId}/activate`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Product activated successfully") {
          notyf.success("Product Activated Successfully");

          // Refresh product list after successful activation
          fetchData();
        } else {
          notyf.error("Failed to activate product");
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        notyf.error("Something went wrong, please try again later.")
      });
  };

  return (
    <>
      {isActive ? (
        <Button variant="danger" size="sm" onClick={archiveToggle}>
          Archive
        </Button>
      ) : (
        <Button variant="success" size="sm" onClick={activateToggle}>
          Activate
        </Button>
      )}
    </>
  );
}