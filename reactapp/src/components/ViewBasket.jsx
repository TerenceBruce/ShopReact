import {React,useState} from 'react'
import "../css/MyModal.css"
import { Modal, Button } from 'react-bootstrap';
import { useBasket } from '../contexts/BasketContext';

export default function ViewBasket() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const { basketTotal,viewBasket } = useBasket();
    
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
          <Modal.Body>
            {viewBasket()}
          </Modal.Body>
          <Modal.Footer>
            <button variant="secondary" onClick={handleClose}>
              Close
            </button>
          </Modal.Footer>
        </Modal>
      </>
    );
}

