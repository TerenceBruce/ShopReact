import {React} from 'react'
// import {  } from 'react-bootstrap';
// import ReadStorage from './ReadStorage'
// import TestProduct from './TestProduct'
import ProductList from '../components/ProductList'
import '../css/home.css';
import NavigationBar from "../components/NavigationBar";
import Footer from '../components/Footer';
import Container from 'react-bootstrap/Container';

export default function ShopPage() {

    
  return (
    <div>
      <header>
        <NavigationBar/>
      </header>
      <main>
        <Container>
          <div className="row">
            <div className="col">
              <div className="box">1</div>
            </div>
            <ProductList />
            <div className="col">
              <div className="box">3</div>
            </div>
            <div className="col">
              <div className="box">4</div>
            </div>
            <div className="col">
              <div className="box">5</div>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <div className="box">6</div>
            </div>

            <div className="col ">
              <div className="box">7</div>
            </div>

            <div className="col">
              <div className="box">8</div>
            </div>
            <div className="col">
              <div className="box">9</div>
            </div>
            <div className="col">
              <div className="box">10</div>
            </div>
          </div>
        </Container>
      </main>
      <Footer/>
    </div>
  );
}
