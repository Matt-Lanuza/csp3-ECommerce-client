import { useState, useEffect } from 'react'
import { Button, Modal, Form } from 'react-bootstrap';
import { Notyf } from 'notyf';


export default function UpdateProduct({product, fetchData}){
  const [productId, setProductId] = useState(product._id);
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice]= useState(product.price);
  const [imageUrl, setImageUrl]= useState(product.imageUrl);
  const notyf = new Notyf();

  const [showEdit, setShowEdit]= useState(false);

  useEffect(() => {
    setProductId(product._id);
    setName(product.name);
    setDescription(product.description);
    setPrice(product.price);
    setImageUrl(product.imageUrl);
  }, [product]);

  const openEdit = () => {
    setShowEdit(true)
  }

  const closeEdit = () => {
    setShowEdit(false);
}
  const editProduct = (e, productId) => {
    e.preventDefault();

    

    fetch(`https://csp2-ecommerce-api-server.onrender.com/products/${productId}/update`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        name: name,
        description: description,
        price: price,
        imageUrl: imageUrl
      })
    })
    .then(res => res.json())
    .then(data => {
      if(data.success === true){
        notyf.success("Product Successfully Updated");

        closeEdit();
        fetchData();
        setImageUrl(data.imageUrl);
      } else {
        notyf.error("Error Updating Product");

        closeEdit();
        fetchData();
      }
    })
  }


  return(
    <>
      <Button variant="primary" size="sm" onClick={() => openEdit()}>Edit</Button>

      {/*EDIT MODAL*/}
            <Modal show={showEdit} onHide={closeEdit}>
                <Form onSubmit={e => editProduct(e, productId)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>    
                        <Form.Group controlId="productName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control 
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)} 
                            required/>
                        </Form.Group>
                        <Form.Group controlId="productDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control 
                            type="text"
                            value={description}
                            onChange={e => setDescription(e.target.value)} 
                            required/>
                        </Form.Group>
                        <Form.Group controlId="productPrice">
                            <Form.Label>Price</Form.Label>
                            <Form.Control 
                            type="number"
                            value={price}
                            onChange={e => setPrice(e.target.value)}  
                            required/>
                        </Form.Group>
                        <Form.Group controlId="productImageUrl">
                            <Form.Label>Image URL</Form.Label>
                            <Form.Control 
                            type="text"
                            value={imageUrl}
                            onChange={e => setImageUrl(e.target.value)}  
                            required/>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeEdit}>Close</Button>
                        <Button variant="success" type="submit">Submit</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
    </>
  )
}