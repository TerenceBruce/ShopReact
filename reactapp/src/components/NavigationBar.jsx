import  React from 'react'
import { 
     Container , 
    // Form,  
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

//BootStrap
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function TestNavbar() {

const { currentUser }=useAuth()
const { success } = useBasket();

  return ["xxxl"].map((expand) => (
    //OG NavBar
    <Navbar
      key={expand}
      bg="#eb8334"
      variant="dark"
      expand={expand}
    >
      <Container fluid>
        <Navbar.Brand  href="/">
          Terry's App
        </Navbar.Brand>
        <ViewBasket/>  {success && <Alert variant="success">{success}</Alert>}
        <UserProfileShortcut/>
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
              <UserNavbarLinks />          
            </Nav>
          </Offcanvas.Body> 
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
    // <Navbar bg="dark" variant="dark" expand="lg">
    //   <Container>
    //     <Navbar.Brand  href="/">
    //       Terry's App
    //     </Navbar.Brand> 
    //     <UserProfileShortcut/>
    //     <Navbar.Toggle aria-controls="basic-navbar-nav" />
    //     <Navbar.Collapse id="basic-navbar-nav">
    //       <Nav className="me-auto">
    //         <Nav.Link href="#home">Home</Nav.Link>
    //         <Nav.Link href="#link">Link</Nav.Link>
    //         <NavDropdown title="Dropdown" id="basic-nav-dropdown">
    //           <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
    //           <NavDropdown.Item href="#action/3.2">
    //             Another action
    //           </NavDropdown.Item>
    //           <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
    //           <NavDropdown.Divider />
    //           <NavDropdown.Item href="#action/3.4">
    //             Separated link
    //           </NavDropdown.Item>
    //         </NavDropdown>
    //       </Nav>
    //     </Navbar.Collapse>
    //   </Container>
    // </Navbar>
  ));
    
  function CheckUser(){
    if (currentUser!==null) { return true }
    else{ return false }
  }
  function UserProfileShortcut() {
    if (currentUser!==null) { return (
      <>
        <Navbar.Text>
          Signed in as:<ActiveLink to="/Profile">{currentUser.email}</ActiveLink>
        </Navbar.Text>
      </>
    ) }
    else{ return(<></>) }
  }
  function UserNavbarLinks(){
    if (currentUser!==null) { return (
      <>
        <ActiveLink to="/Profile">Profile</ActiveLink>
        <ActiveLink to="/Admin/AddProduct">Admin</ActiveLink>
        <ActiveLink to="/Admin/AddProduct">Add Product</ActiveLink>
        <strong>Email: </strong> {currentUser.email}
        <div className="w-100 text-center mt-2">
          <Logout />
        </div>
      </>
      );}
    else{ return(
      <>
      <ActiveLink to="/Login">Login</ActiveLink>
      <ActiveLink to="/SignUp">Sign Up</ActiveLink>               
      </>
    )}
  }
};