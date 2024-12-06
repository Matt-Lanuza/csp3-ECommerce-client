import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import UserContext from '../context/UserContext';
import Highlights from '../components/Highlights';
import FeaturedProducts from '../components/FeaturedProducts';
import Footer from '../components/Footer';

export default function Home() {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (user && user._id && !user.firstName) {
      fetch(`https://csp2-ecommerce-api-server.onrender.com/users/details`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('User data:', data);
          if (data.user) {
            console.log('User:', data.user);
            console.log('User firstName:', data.user.firstName);

            if (data.user && data.user.firstName) {
              setUser(prevUser => ({
                ...prevUser,
                firstName: data.user.firstName,
                isAdmin: data.user.isAdmin,
              }));
            }
          }
        })
        .catch((error) => console.error('Error fetching user details:', error));
    }
  }, [user, setUser]);

  return (
    <Row>
      <Col xs={10} className="pt-5 text-center mx-auto my-5">
        <h1>
          Welcome to StreetWear Hub
          {user && user.firstName ? (
            <span className="user-name">
              , {user.firstName}!
            </span>
          ) : '!'}
        </h1>
        {!user && <p>Shop the latest products and enjoy great deals!</p>}
        {user && !user.isAdmin && <p>Shop the latest products and enjoy great deals!</p>}
        {user && user.isAdmin && <p>Manage the store, view orders, and update products.</p>}
        {!user && <Link className="btn btn-primary" to="/products">Find Your Fit</Link>}
        {user && !user.isAdmin && <Link className="btn btn-danger" to="/products" >Find Your Fit</Link>}
        {user && user.isAdmin && <Link className="btn btn-danger" to="/products">Go to Admin Dashboard</Link>}
      </Col>
      
      <div className="my-5 p-5">
      <FeaturedProducts />
      </div>
      
      <Highlights />

      <div className="mt-5 pt-5">
      <Footer />
      </div>
    </Row>
  );
}