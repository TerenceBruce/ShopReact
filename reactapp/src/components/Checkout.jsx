import React from 'react';
import { useBasket } from '../contexts/BasketContext';
import CurrencyFormat from 'react-currency-format';
import { Link } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from './PaymentForm';
import '../css/checkout.css';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY_TEST);

const Checkout = () => {
  const { viewBasket, basketTotalPrice } = useBasket();
  
  return (
    <div className="checkout">
      <h1>Checkout</h1>
      {viewBasket()}
      <CurrencyFormat
        renderText={(value) => <h3>Order Total: {value}</h3>}
        decimalScale={2}
        value={basketTotalPrice()}
        displayType={'text'}
        thousandSeparator={true}
        prefix={'£'}
      />
      <div className="payment">
        <Elements stripe={stripePromise}>
          <PaymentForm />
        </Elements>
      </div>
      <div className="col">
        <Link className="link" to="/Shop">Return to Shop</Link>
      </div>
    </div>
  );
};

export default Checkout;