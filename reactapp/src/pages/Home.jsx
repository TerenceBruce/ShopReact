import {React} from 'react'

import {  Link } from "react-router-dom";

//Bootstrap...elements individualy to avoid installing full BS packages
import Button  from 'react-bootstrap/Button'; 
import "bootstrap/dist/css/bootstrap.min.css";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Image from 'react-bootstrap/Image';

// import ReadStorage from './ReadStorage'
// import TestProduct from './TestProduct'

import '../css/home.css';
export default function Home() {
    
  return (
    <body>
      <header>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#link">Link</Nav.Link>
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
      <main>
        <Container>
          <Row className='px-4 my-5'>
            <Col sm={7}>
              <Image
                src="https://dummyimage.com/900x400/000/fff"
                className=''
                fluid
                rounded
              />
              <div className="box mt-5">Still Fresh
              </div>
            </Col>
            <Col sm={5}>
              <h2 class="font-weight-light">TagLine</h2>
              <p class="mt-5"> Template Text</p>
              <Button variant="outline-primary">
                <Link to="/Shop">Shop</Link>
              </Button>
            </Col>
          </Row>
        </Container>
      </main>
    </body>
  );
}
