import { useState, useEffect } from 'react';
import { UserProvider } from './context/UserContext';
import AppNavbar from './components/AppNavbar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Register from './pages/Register';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import CartView from './pages/CartView';
import AdminOrderHistory from './pages/AdminOrderHistory';
import UserOrderHistory from './pages/UserOrderHistory';
import QuickLinksContent from './pages/QuickLinksContent';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  // Initialize user state from localStorage or set defaults
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : { id: null, isAdmin: null };
  });
  const [loading, setLoading] = useState(true);

  // Synchronize user state with localStorage
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  // Fetch user details if a token exists
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      fetch(`${process.env.REACT_APP_API_BASE_URL}/users/details`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => {
          if (!res.ok) {
            localStorage.clear();
            setUser({ id: null, isAdmin: null });
            throw new Error('Failed to fetch user details. Please log in again.');
          }
          return res.json();
        })
        .then((data) => {
          if (data._id) {
            const userData = { id: data._id, isAdmin: data.isAdmin };
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
          }
        })
        .catch((err) => {
          console.error(err.message);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  // Function to unset user (log out)
  const unsetUser = () => {
    localStorage.clear();
    setUser({ id: null, isAdmin: null });
  };

  // Show a loading message while fetching user details
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <UserProvider value={{ user, setUser, unsetUser }}>
      <Router>
        <AppNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/products" element={<Products />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<CartView />} />
          <Route path="/admin-order-history" element={<AdminOrderHistory />} />
          <Route path="/user-order-history" element={<UserOrderHistory />} />
          <Route path="/quick-links" element={<QuickLinksContent />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;