import {React,useState} from 'react'
import CurrencyFormat from "react-currency-format";
import "../css/MyModal.css"
import { Modal,
  //  Button
   } from 'react-bootstrap';
import { useBasket } from '../contexts/BasketContext';
import { useAuth } from '../contexts/AuthContext';
import {  Link } from "react-router-dom";

export default function ViewBasket() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const { basketTotal,viewBasket,basketTotalPrice } = useBasket();
    const {currentUser} =useAuth();
    
    if (currentUser!==null) {
          

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
          <Modal.Body  >
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
          <Modal.Footer >
            <Link to="/Checkout">Checkout</Link>
  
            <button variant="secondary" onClick={handleClose}>
              Close
            </button>
          </Modal.Footer>
        </Modal>
      </>
    );}
}

