import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

export default function UpdateProfile() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    fetch(`https://csp2-ecommerce-api-server.onrender.com/users/update-password`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ newPassword:password }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update password.');
        }
        return response.json();
      })
      .then((data) => {
        setMessage('Your password has been updated.');
        setError('');
        setPassword('');
        setConfirmPassword('');
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className="update-profile-container">

      {error && <Alert variant="danger">{error}</Alert>}
      {message && <Alert variant="success">{message}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="password" className="mb-3">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="confirmPassword" className="mb-3">
          <Form.Label>Confirm New Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="success" type="submit" style={{ textTransform: 'none' }}>
          Reset
        </Button>
      </Form>
    </div>
  );
}
