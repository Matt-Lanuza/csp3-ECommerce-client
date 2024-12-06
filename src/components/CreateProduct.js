import { useState, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { Notyf } from 'notyf';

export default function CreateProduct({fetchData}) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const notyf = new Notyf();

  const { user } = useContext(UserContext);

  if (!user || !user.isAdmin) {
    return <Navigate to="/products" />;
  }

  const addProduct = (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    console.log(`${process.env.REACT_APP_API_BASE_URL}/products/`);
    console.log('Token', token);
    console.log(fetchData);

    fetch(`${process.env.REACT_APP_API_BASE_URL}/products/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: name,
        description: description,
        price: parseFloat(price),
        imageUrl: imageUrl
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("yeah", data)
        if (data) {
          setName('');
          setDescription('');
          setPrice('');
          setImageUrl('');

          fetchData((prevProducts) => [...prevProducts, data]);

          notyf.success("Product Created")
        }

      });
  };

  return (
    <>
    <Form onSubmit={addProduct}>
      <Form.Group className="mb-3 px-3">
        <Form.Label>Product Name</Form.Label>
        <Form.Control
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3 px-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3 px-3">
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3 px-3">
        <Form.Label>Image URL</Form.Label>
        <Form.Control
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          required
        />
      </Form.Group>
      <div className="mb-5 pb-5 px-3">
      <Button type="submit" variant="primary" onClick={addProduct}>
        Create
      </Button>
      </div>
    </Form>
    </>
  );
}