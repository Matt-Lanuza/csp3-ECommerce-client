import React, { useContext, useState, useEffect } from 'react';
import UserView from '../components/UserView';
import AdminView from '../components/AdminView';
import UserContext from '../context/UserContext';

export default function Products() {
  const { user } = useContext(UserContext);
  const [products, setProducts] = useState([]);

  const fetchData = () => {
    let fetchUrl = user.isAdmin === true ?`https://csp2-ecommerce-api-server.onrender.com/products/all` : `https://csp2-ecommerce-api-server.onrender.com/products/active` 
    fetch(fetchUrl, {
      headers: {
        Authorization: `Bearer ${ localStorage.getItem('token')}`
      }
    })
    .then(res => res.json())
    .then(data => {
      setProducts(data);
    })
  }

  useEffect(() => {
    fetchData()

    }, [user]);

  if (user.isAdmin) {
    return <AdminView productsData={products} fetchData={fetchData}/>;
  }

  return <UserView productsData={products}/>;

}