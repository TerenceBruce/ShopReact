import {React} from 'react'

import {  Link } from "react-router-dom";
// import ReadStorage from './ReadStorage'
// import TestProduct from './TestProduct'

import '../css/home.css';
export default function Home() {
    
  return (
    
    <div className="container">
    <div className="row">
      <div className="col">
        <div className="box">Still Fresh
        </div>
      </div>

      <div className="col ">
        <div className="box"><Link to="/Shop">Shop</Link>
        </div>
      </div>

      </div>
  </div>
  
    
  );
}
