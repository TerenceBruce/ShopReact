import {React} from 'react'
import { Button } from 'react-bootstrap';
// import ReadStorage from './ReadStorage'
// import TestProduct from './TestProduct'

import {  Link } from "react-router-dom";

import '../css/home.css';

export default function Home() {
    
  return (
    <div className="container">
      <div className="row">
        <div className="col">Still Fresh</div>
        <div className="col">
          <Link to="/Shop">Enter Shop</Link>
        </div>
        <div className="col">
          <button>About </button>
        </div>
      
      </div>
    </div>
  );
}
