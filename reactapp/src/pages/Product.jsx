import React, { useState, useEffect } from 'react';
import ProductPage from '../components/ProductPage';
import Loading from '../components/Loading';


const Product = () => {
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
      <div>
        <ProductPage/>
      </div>
    </div>
  )
};
export default Product;
