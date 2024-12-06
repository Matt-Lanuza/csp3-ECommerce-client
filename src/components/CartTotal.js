import { Alert } from 'react-bootstrap';

export default function CartTotal({ totalPrice }) {
  return (
    <Alert variant="success">
      <h4 className="text-end">Total Payment: &#8369; {totalPrice.toFixed(2)}</h4>
    </Alert>
  );
}
