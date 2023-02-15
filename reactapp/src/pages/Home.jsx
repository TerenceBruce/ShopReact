import {React} from 'react'
import { Card } from 'react-bootstrap';
// import ReadStorage from './ReadStorage'
// import TestProduct from './TestProduct'
import ProductList from '../components/ProductList'
import '../css/home.css';
export default function Home() {
    
  return (
    
    <div class="container">
      
      <ProductList/>
     

          

         
  <div class="row">

          <div class="col">

            <div class="box" >Prev
            </div>

          </div>

        <div class="col ">
        
            <div class="box">
                    Next
            </div>

        </div>

        <div class="col">
        
          <div class="box">
                   3
          </div>

        </div>
      <div class="col">
        
          <div class="box">
                   4
          </div>
    
      </div>
      <div class="col">
        
          <div class="box">
                   5
          </div>

        </div>
      
  </div>

</div>
  
    
  );
}
