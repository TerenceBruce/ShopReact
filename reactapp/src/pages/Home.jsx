import React, { useState, useEffect } from 'react';

import {  Link } from "react-router-dom";
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';

//Bootstrap...elements individualy to avoid installing full BS packages
import Button  from 'react-bootstrap/Button'; 
import "bootstrap/dist/css/bootstrap.min.css";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
// import ReadStorage from './ReadStorage'
// import TestProduct from './TestProduct'
import Loading from '../components/Loading';

import '../css/home.css';

const Home = () => {
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const delay = 500; // Simulated delay for demonstration purposes
  
      setTimeout(() => {
        setLoading(false);
      }, delay);
    }, []);
  
    const handleLinkClick = () => {
      setLoading(true);
    };
    
  return (
    <div>
      {loading && (
        <div>
          <Loading />
        </div>
      )}
      <header>
        <NavigationBar/>
      </header>
      <div className='row'>
        <Button variant="outline-primary">
            <Link to="/TEST">TEST</Link>
        </Button> 
      </div>
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
            </Col>
            <Col sm={5}>
              <h2 className="font-weight-light">TagLine</h2>
              <p className="mt-5"> Template Text</p>
              <Button variant="outline-primary">
                <Link to="/Shop">Shop</Link>
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="https://picsum.photos/id/210/320/200" />
                <Card.Body>
                  <Card.Title>Card Title</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="https://picsum.photos/id/220/320/200" />
                <Card.Body>
                  <Card.Title>Card Title</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="https://picsum.photos/id/230/320/200" />
                <Card.Body>
                  <Card.Title>Card Title</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </main>

      <Footer/>
    </div>
  );
};

export default Home;
