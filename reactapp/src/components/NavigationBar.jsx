import  React from 'react'
import { 
     Container , 
    // Form, 
    Nav , Navbar , 
    // NavDropdown ,
    // NavLink,
    Offcanvas,
  Alert } from 'react-bootstrap'
import { useAuth } from "../contexts/AuthContext"
import { useBasket } from '../contexts/BasketContext';
import Logout from './Logout';
import ActiveLink from './ActiveLink';
import '../css/navbar.css';
import ViewBasket from './ViewBasket';


export default function TestNavbar() {

 
const { currentUser }=useAuth()
const { success } = useBasket();

    return ["xxxl"].map((expand) => (
      <Navbar
        fixed="top"
        key={expand}
        bg="dark"
        variant="dark"
        expand={expand}
        className="mb-3 navbar"
        textDecoration="none"
      >
        <Container fluid>
          <Navbar.Brand  href="/">
            Terry's App
          </Navbar.Brand>
        
          
          <ViewBasket/>{success && <Alert variant="success">{success}</Alert>}
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${expand}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
            placement="end"
            className="streetwear-nav-link"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title
                id={`offcanvasNavbarLabel-expand-${expand}`}
              ></Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <ActiveLink to="/">
                  Home
                </ActiveLink>
                <CheckUser />          
          </Nav>
            </Offcanvas.Body> 
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
      
    ));
      
      
    function CheckUser(){

        if (currentUser!==null) {
          return (
          <>
            <ActiveLink to="/Profile"> Profile</ActiveLink>
            <ActiveLink to="/Admin/AddProduct">Admin</ActiveLink>
            <ActiveLink to="/Admin/AddProduct">Add Product</ActiveLink>
            <strong>Email: </strong>
            {currentUser.email}
            <div className="w-100 text-center mt-2">
              <Logout />
            </div>
            
          </>
          
        );
        }
              else{ return(
                <>
                <ActiveLink to="/Login"> Login</ActiveLink>
                <ActiveLink to="/SignUp"> SignUp</ActiveLink>               
                </>

    )}
              }
    
    }

  



  
  
