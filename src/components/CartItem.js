import { Button, Form } from 'react-bootstrap';
import RemoveProductFromCart from '../components/RemoveProductFromCart';

export default function CartItem({ item, updateQuantity, removeFromCart }) {
  const validPrice = !isNaN(item.price) ? item.price : 0;
  const validQuantity = !isNaN(item.quantity) && item.quantity > 0 ? item.quantity : 1; 


  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    if (newQuantity > 0) {
      updateQuantity(item.productId, newQuantity);
    }
  };

  const totalPrice = (validPrice * validQuantity).toFixed(2);


  const handleIncrease = () => {
    updateQuantity(item.productId, validQuantity + 1);
  };

  const handleDecrease = () => {
    if (validQuantity > 1) {
      updateQuantity(item.productId, validQuantity - 1);
    }

  };


  return (
    <tr className="text-center">
      <td>{item.name}</td>
      <td>&#8369; {validPrice.toFixed(2)}</td>
      <td>
        <div className="d-flex align-items-center justify-content-center">
          <Button variant="success" onClick={handleIncrease} className="me-2">
            +
          </Button>
          <Form.Control
            value={validQuantity}
            onChange={handleQuantityChange}
            className="w-25 text-center"
          />
          <Button variant="warning" onClick={handleDecrease} className="ms-2">
            -
          </Button>
        </div>
      </td>
      <td>&#8369; {totalPrice}</td>
      <td>
      <RemoveProductFromCart
          productId={item.productId}
          removeFromCart={removeFromCart}
        />
      </td>
    </tr>
  );
}
