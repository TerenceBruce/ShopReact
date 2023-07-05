import React, { useEffect, useState } from 'react';

const BasketItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://us-central1-reactapp-d41d0.cloudfunctions.net/getAllBasketItems')
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
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
    </div>
  );
};

export default BasketItems;