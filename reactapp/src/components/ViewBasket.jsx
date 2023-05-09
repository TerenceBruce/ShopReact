import {React,useState} from 'react'
import CurrencyFormat from "react-currency-format";
import "../css/MyModal.css"
import { Modal,
  //  Button
   } from 'react-bootstrap';
import { useBasket } from '../contexts/BasketContext';
import { useAuth } from '../contexts/AuthContext';
import {  Link } from "react-router-dom";
import { getFunctions, httpsCallable } from "firebase/functions";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY_TEST);

export default function ViewBasket() {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const { basketTotal,viewBasket,basketTotalPrice,basket } = useBasket();
    const {currentUser} =useAuth();

    
    if (currentUser!==null) {
      
      const handleButton = async () => {
        // // Call the createCheckoutSession Cloud Function
        const functions = getFunctions();
        const createCheckoutSession = httpsCallable(functions, "createCheckoutSession");
        const { data } = await createCheckoutSession({ items: basket });
        const sessionId = data.sessionId;
    
        // Redirect the user to the Stripe Checkout page using the session ID
        const stripe = await stripePromise;
        stripe.redirectToCheckout({ sessionId });
      }

    return (
      <>
        <button variant="primary" onClick={handleShow}>
          View basket: 
        
          {basketTotal()}
        </button>

        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header>
            <Modal.Title>Basket</Modal.Title>
          </Modal.Header>
          <Modal.Body >
            
            {viewBasket()}
            <CurrencyFormat
              renderText={(value) => <h3>Order Total :{value}</h3>}
              decimalScale={2}
              value={basketTotalPrice()}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"£"}
            />
            {/* <form action="/create-checkout-session" method="post">
            <button type="submit" id="checkout-button" class="btn btn-primary">Checkout</button>
            </form> */}
          </Modal.Body>
          <Modal.Footer>
            <Link to="/Checkout">Checkout</Link>
            <button onClick={handleButton}>Say Hello</button>
            <button variant="secondary" onClick={handleClose}>
              Close
            </button>
          </Modal.Footer>
        </Modal>
      </>
    );}
}

