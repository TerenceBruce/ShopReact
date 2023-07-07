import React, { useEffect, useState } from 'react';
import Loading from './Loading';
import { useBasket } from '../contexts/BasketContext';

const BasketItems = () => {
  const { basket } = useBasket();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [CheckoutBasket,setCheckoutBasket]=useState(true);
  
  useEffect(() => {
    setCheckoutBasket= basket;
   fetch('https://us-central1-reactapp-d41d0.cloudfunctions.net/helloWorld')
   .then((response) => {
       response.text().then(text => {
        console.log(text);
        setLoading(false);
        });
      })
      .catch((error) => {
        console.error('Error:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loading/>
  }

  return (
    <div>
      <h1>Basket Items</h1>
      {items.length > 0 ? (
        items.map((item, index) => (
          <div key={index}>
            <h2>{item.name}</h2>
            {/* Add more fields as necessary */}
          </div>
        ))
      ) : (
        <p>No items in basket.</p>
      )}
      {/* <div><body>
    <div className="logo">
     <span className="logoText">
     <img src={InitialLogo} alt="Logo" />
     </span>
   </div>
 </body>
 </div> */}
    </div>
  );
};

export default BasketItems;