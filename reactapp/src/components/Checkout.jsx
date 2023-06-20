import {React ,useState,useEffect} from 'react';
import { useBasket } from '../contexts/BasketContext';
import CurrencyFormat from 'react-currency-format';
import { Link } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from './PaymentForm';
import '../css/checkout.css';
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY_TEST);

const Checkout = () => {
  const [error, setError] = useState(null);
  const { basket = [], viewBasket, basketTotalPrice, getBasket } = useBasket();
  const { currentUser } = useAuth();
 
  useEffect(() => {
   
    console.log("Basket Contents:");
    basket.forEach((item, index) => {
      console.log(`Item ${index + 1}:`, item);
    });
  }, []);
 
  
  const handleCheckout = async () => {
    try {
      
      // Fetch the checkout session from your Firebase function
      const response = await axios.post(
        `https://europe-west1-reactapp-d41d0.cloudfunctions.net/customers/${currentUser.uid}/checkout_sessions`,
        {
          items: basket.map((item) => ({ id: item.id })),
        }
      );

      if (response.status === 200) {
        const sessionId = response.data.id;

        // Redirect the user to the Stripe Checkout page using the session ID
        const stripe = await stripePromise;
        const { error: stripeError } = await stripe.redirectToCheckout({
          sessionId,
        });

        // If `redirectToCheckout` fails due to a browser or network
        // error, display the localized error message to your customer
        // using `error.message`.
        if (stripeError) {
          setError(stripeError.message);
        }
      } else {
        setError("There was an error creating the checkout session.");
      }
    } catch (error) {
      setError(error.message);
    }
  };

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
      <button onClick={handleCheckout}>Checkout</button>
      {/* Display errors if any */}
      {error && <div>{error}</div>}
      </div>
      <div className="col">
        <Link className="link" to="/Shop">Return to Shop</Link>
      </div>
    </div>
  );
};

export default Checkout;