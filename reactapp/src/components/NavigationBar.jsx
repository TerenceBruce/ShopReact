import  React from 'react'
import { 
    Button,
     Container , 
    Form, 
    Nav , Navbar , 
    NavDropdown ,
    NavLink,
    Offcanvas } from 'react-bootstrap'
import { useAuth } from "../contexts/AuthContext"
import { useBasket } from '../contexts/BasketContext';
import Logout from './Logout';
import { useLocation, Link } from 'react-router-dom';
import '../css/navbar.css';


export default function TestNavbar() {

 
const { currentUser }=useAuth()
const { viewBasket, basketTotal } = useBasket();

    return ["xxxl"].map((expand) => (
      <Navbar
        fixed="top"
        key={expand}
        bg="dark"
        variant="dark"
        expand={expand}
        className="mb-3 navbar"
      >
        <Container fluid>
          <Navbar.Brand className="streetwear-nav-link" href="/">
            Terry's App
          </Navbar.Brand>
          <Button onClick={() => viewBasket()}>View Basket {basketTotal()}</Button>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${expand}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title
                id={`offcanvasNavbarLabel-expand-${expand}`}
              ></Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <ActiveLink className="streetwear-nav-link" to="/">
                  Home
                </ActiveLink>
                <CheckUser />
                <ActiveLink
                  className="streetwear-nav-link"
                  to="/Admin/AddProduct"
                >
                  Add Product
                </ActiveLink>
                <NavDropdown
                  title="Admin"
                  id={`offcanvasNavbarDropdown-expand-${expand}`}
                >
                  <NavDropdown.Item></NavDropdown.Item>
                  <NavDropdown.Item href="#action4">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action5">
                    Something else here
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
              </Form>{" "}
              SEARCH OPTION
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    ));
      
      
    function CheckUser(){

        if (currentUser!==null) { return (
          <>
            <ActiveLink to="/Profile"> Profile</ActiveLink>
            <ActiveLink to="/Admin/AddProduct">Admin</ActiveLink>
            <strong>Email: </strong>
            {currentUser.email}
            <div className="w-100 text-center mt-2">
              <Logout />
            </div>
          </>
        );}
              else{ return(
                <>
                <ActiveLink to="/Login"> Login</ActiveLink>
                <ActiveLink to="/SignUp"> SignUp</ActiveLink>               
                </>

    )}
              }
    function ActiveLink({ children, to }) {//https://ui.dev/react-router-custom-link
        const location = useLocation();
        const match = location.pathname === to;
      
        return (
          <div className={match ? "active" : ""}>
            {match ? "> " : ""}
            <Link to={to}>{children}</Link>
          </div>
        );
      }
    }

  



  
  
