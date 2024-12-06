import React, { useState, useEffect } from 'react';
import { Button, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Notyf } from 'notyf';

const notyf = new Notyf();

const SetUserAsAdmin = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    if (!currentUser || !currentUser.isAdmin) {
      navigate('/products');
    }

    console.log(currentUser);
    console.log(`${process.env.REACT_APP_API_BASE_URL}/users/${selectedUser}set-as-admin`  );

    fetch(`https://csp2-ecommerce-api-server.onrender.com/users/all-users`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched users:', data.users);
        setUsers(data.users); 
      })
      .catch((error) => {
        setErrorMessage('Failed to fetch users');
        notyf.error('Failed to fetch users');
      });
  }, [navigate, selectedUser]);

  const handleSetAdmin = () => {
    if (!selectedUser) {
      notyf.error('Please select a user to promote to admin.');
      setErrorMessage('Please select a user to promote to admin.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    fetch(`https://csp2-ecommerce-api-server.onrender.com/users/${selectedUser}/set-as-admin`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to promote user to admin');
        }
        return response.json();
      })
      .then((data) => {
        notyf.success(data.message || 'User promoted to admin successfully!');

        setUsers((prevUsers) => prevUsers.filter(user => user._id !== selectedUser));

        setIsLoading(false);
      })
      .catch((error) => {
        setErrorMessage(error.message || 'Something went wrong!');
        notyf.error(error.message || 'Something went wrong!');
        setIsLoading(false);
      });
  };

  return (
    <div className="container mt-5">
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

      <div className="mb-4">
        <select
          className="form-control"
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
        >
          <option value="">Select a user to promote</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.firstName} {user.lastName} - {user.email}
            </option>
          ))}
        </select>
      </div>

      <Button
        variant="success"
        onClick={handleSetAdmin}
        disabled={isLoading}
      >
        {isLoading ? (
          <Spinner animation="border" size="sm" />
        ) : (
          'Promote to Admin'
        )}
      </Button>
    </div>
  );
};

export default SetUserAsAdmin;
