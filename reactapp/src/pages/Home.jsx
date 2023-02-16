import {React} from 'react'
import { Card } from 'react-bootstrap';
// import ReadStorage from './ReadStorage'
// import TestProduct from './TestProduct'
import ProductList from '../components/ProductList'
import '../css/home.css';
export default function Home() {
    
  return (
    
    <div className="container">
      
      <ProductList/>
     

          

         
  <div className="row">

          <div className="col">

            <div className="box" >Prev
            </div>

          </div>

        <div className="col ">
        
            <div className="box">
                    Next
            </div>

        </div>

        <div className="col">
        
          <div className="box">
                   3
          </div>

        </div>
      <div className="col">
        
          <div className="box">
                   4
          </div>
    
      </div>
      <div className="col">
        
          <div className="box">
                   5
          </div>

        </div>
      
  </div>

</div>
  
    
  );
}
