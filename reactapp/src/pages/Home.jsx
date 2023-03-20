import {React} from 'react'
import { Card } from 'react-bootstrap';
// import ReadStorage from './ReadStorage'
// import TestProduct from './TestProduct'
import ProductList from '../components/ProductList'

import '../css/home.css';
export default function Home() {
    
  return (
    
    <div className="container">
       <ActiveLink to="/Profile"> Profile</ActiveLink>
    </div>
  
    
  );
}
