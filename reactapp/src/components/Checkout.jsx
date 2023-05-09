import React from 'react';
import { useBasket } from '../contexts/BasketContext';
import CurrencyFormat from 'react-currency-format';
import { Link } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from './PaymentForm';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY_TEST);

const Checkout = () => {
  const { viewBasket, basketTotalPrice } = useBasket();

  return (
    <div>
      Checkout:
      {viewBasket()}
      <CurrencyFormat
        renderText={(value) => <h3>Order Total: {value}</h3>}
        decimalScale={2}
        value={basketTotalPrice()}
        displayType={'text'}
        thousandSeparator={true}
        prefix={'£'}
      />
      <Elements stripe={stripePromise}>
        <PaymentForm />
      </Elements>
      <div className='col'>
        <Link to='/Shop'>Return to Shop</Link>
      </div>
    </div>
  );
};

export default Checkout;