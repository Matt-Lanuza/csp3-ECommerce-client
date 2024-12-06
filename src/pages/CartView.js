import { useState, useEffect } from 'react';
import { Table, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import CartItem from '../components/CartItem';
import CartTotal from '../components/CartTotal';
import ClearAllProductFromCart from '../components/ClearAllProductFromCart';
import { Notyf } from 'notyf';

const notyf = new Notyf();

export default function CartView() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  

  useEffect(() => {
    const fetchCartItems = () => {
      fetch(`https://csp2-ecommerce-api-server.onrender.com/cart/get-cart`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to load cart items.');
          }
          return response.json();
        })
        .then((data) => {
          const cartItems = data.cart.cartItems || [];
          const updatedCartItemsPromises = cartItems.map((item) =>
            fetch(`https://csp2-ecommerce-api-server.onrender.com/products/${item.productId}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            })
              .then((res) => res.json())
              .then((productData) => ({
                ...item,
                name: productData.name,
                price: productData.price,
              }))
              .catch(() => {
                notyf.error('Failed to fetch product data');
                return item;
              })
          );
          Promise.all(updatedCartItemsPromises)
            .then((updatedCartItems) => {
              setCartItems(updatedCartItems);
            })
            .catch(() => {
              setMessage('Failed to load product details.');
            });
        })
        .catch((error) => {
          setMessage(error.message);
        });
    };

    fetchCartItems();
  }, []);

  useEffect(() => {
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotalPrice(total);
  }, [cartItems]);

  // Update cart item quantity
  const updateQuantity = (productId, newQuantity) => {
    fetch(`https://csp2-ecommerce-api-server.onrender.com/cart/update-cart-quantity`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ productId, newQuantity }),
    })
      .then((res) => res.json())
      .then(() => {
        setCartItems((prevItems) =>
          prevItems.map((item) =>
            item.productId === productId
              ? { ...item, quantity: newQuantity }
              : item
          )
        );
      })
      .catch((error) => {
        setMessage(error.message);
      });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.productId !== productId));
  };

  const clearAllCart = () => {
    setCartItems([]);
    setTotalPrice(0);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      notyf.error("Your cart is empty', 'Please add items to your cart before checking out.");
      return;
    }

    fetch(`https://csp2-ecommerce-api-server.onrender.com/orders/checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Checkout failed.');
        }
        return response.json();
      })
      .then((data) => {
        notyf.success("Your order has been placed successfully!");
        clearAllCart();
        navigate('/user-order-history')
      })
      .catch((error) => {
        setMessage(error.message);
      });
  };


  return (
    <>
      <h2 className="cart-title text-center my-4">Your Shopping Cart</h2>
      
      {message && <Alert variant="danger">{message}</Alert>}

      <Table className="cart-table" striped bordered hover responsive>
        <thead>
          <tr className="text-center">
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <CartItem key={item.productId} item={item} updateQuantity={updateQuantity} removeFromCart={removeFromCart} />
          ))}
        </tbody>
      </Table>

      <div>
      <CartTotal totalPrice={totalPrice} />
      </div>

      <div className="text-center my-3">
        <Button variant="success" onClick={handleCheckout}>
          Proceed to Checkout
        </Button>
      </div>


      <div className="text-center my-5">
        <ClearAllProductFromCart clearAllCart={clearAllCart} />
      </div>
      <div className="text-center my-5">
        <Link to="/products" className="btn btn-link text-dark">
          <i className="fas fa-arrow-left me-2"></i>Back to Products
        </Link>
      </div>
    </>
  );
}