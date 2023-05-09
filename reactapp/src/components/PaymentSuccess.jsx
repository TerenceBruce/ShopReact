import { React,useEffect } from 'react';
import { useBasket } from '../contexts/BasketContext';

const PaymentSuccess = () => {
  const { emptyBasket } = useBasket();

  useEffect(() => {
    emptyBasket();
  }, [emptyBasket]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <h2>SUCCESSFUL PAYMENT</h2>
    </div>
  );
};

export default PaymentSuccess;