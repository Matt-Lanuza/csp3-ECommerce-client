import { useState, useEffect, useContext } from 'react';
import { Container, Card, Spinner, Row, Col } from 'react-bootstrap';
import { Notyf } from 'notyf';
import UserContext from '../context/UserContext';
import ResetPassword from '../components/ResetPassword';
import UpdateProfile from '../components/UpdateProfile';
import SetUserAsAdmin from '../components/SetUserAsAdmin';

const notyf = new Notyf();

export default function Profile() {
  const { setUser } = useContext(UserContext);
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/users/details`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch user details');
        }
        return res.json();
      })
      .then((data) => {
        if (data && data.user) {
          setDetails(data.user);
          setUser({ id: data.user._id, email: data.user.email, firstName: data.user.firstName, isAdmin: data.user.isAdmin });
        } else {
          notyf.error("User not found. Please try again.")
        }
      })
      .catch((error) => {
        notyf.error("Something went wrong. Contact your system admin.")
      })
      .finally(() => {
        setLoading(false);
      });
  }, [setUser]); 


  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p>Loading user details...</p>
      </div>
    );
  }

  const handleProfileUpdate = (updatedUserData) => {
    setUser(updatedUserData);
    setDetails(updatedUserData);
  };


  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        {/* Profile Card */}
        <Card.Title style={{ fontSize: '3rem', fontWeight: 'bold', textAlign: 'center' }}>My Profile</Card.Title>
        <Col md={6}>
          <Card className="profile-card p-4 shadow-lg">
            <Card.Body>
              <Card.Subtitle className="profile-name text-muted text-center mb-3">
                {details.firstName} {details.lastName}
              </Card.Subtitle>
                <div className="p-3">
                  <strong>Email:</strong> {details.email || 'N/A'}
                </div>

                <div>
                  <strong>Mobile No:</strong> {details.mobileNo || 'N/A'}
                </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="justify-content-center mt-5">
        <Col md={6}>
          <Card className="update-profile-card p-4 shadow-lg">
            <Card.Body>
              <h4 className="text-center">Update Profile</h4>
              <UpdateProfile onUpdate={handleProfileUpdate}/>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Reset Password Section */}
      <Row className="justify-content-center my-5">
        <Col md={6}>
          <Card className="reset-password-card p-4 shadow-lg">
            <Card.Body>
              <h4 className="text-center mb-4">Reset Password</h4>
              <ResetPassword />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Render SetUserAsAdmin Component Only for Admin Users */}
      {details.isAdmin && (
        <Row className="justify-content-center my-5">
          <Col md={6}>
            <Card className="promote-user-to-admin p-4 shadow-lg">
              <Card.Body>
                <h4 className="text-center">Promote User to Admin</h4>
                <SetUserAsAdmin /> {/* Show the SetUserAsAdmin component */}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
}