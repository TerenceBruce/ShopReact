import React, { useState, useEffect } from 'react';

// import {  } from 'react-bootstrap';
// import ReadStorage from './ReadStorage'
// import TestProduct from './TestProduct'
import ProductList from '../components/ProductList'
import '../css/home.css';
import NavigationBar from "../components/NavigationBar";
import Footer from '../components/Footer';
import Container from 'react-bootstrap/Container';
import Loading from '../components/Loading';

const ShopPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const delay = 500; // Simulated delay for demonstration purposes

    setTimeout(() => {
      setLoading(false);
    }, delay);
  }, []);

  const handleLinkClick = () => {
    setLoading(true);
  };

    
  return (
    <div>
       {loading && (
        <div>
          <Loading />
        </div>
      )}
      <header>
        <NavigationBar/>
      </header>
      <main>
        <Container>
        
          <div className="row">
           
          
            <ProductList />
            
          </div>
        </Container>
      </main>
      <Footer/>
    </div>
  );
};
export default ShopPage;
