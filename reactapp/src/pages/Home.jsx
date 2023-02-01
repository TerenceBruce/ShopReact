import {React} from 'react'
import { Card } from 'react-bootstrap';
// import ReadStorage from './ReadStorage'
// import TestProduct from './TestProduct'
import ProductList from '../components/ProductList'
import '../css/home.css';
export default function Home() {
    
  return (
    <div>
      <ProductList />
      <Card>
       Priorty:
       <ol class="list">
       <li class="list-item one">useState(Basket) delete on refresh</li>
       <li class="list-item two">viewBasket model</li>
       <li class="list-item three"></li>
       </ol>
      </Card>
      <Card>
        CSS:
        <ol class="list">
        <li class="list-item one">light and dark feature</li>
        <li class="list-item two" >Navigation styling with hover and cleaner look</li>
        </ol>
      </Card>
      <Card>
      <ol class="list">
        Extra Features:
        <li class="list-item one">Profile picture upload</li>
        <li class="list-item two">use diffrent than create react app possibly vite?</li>
        </ol>
      </Card>
    </div>
  );
}
