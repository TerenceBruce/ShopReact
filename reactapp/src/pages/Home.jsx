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
       <ol className="list">
       <li className="list-item one">useState(Basket) delete on refresh</li>
       <li className="list-item two">viewBasket model</li>
       <li className="list-item three"></li>
       </ol>
      </Card>
      <Card>
        CSS:
        <ol className="list">
        <li className="list-item one">light and dark feature</li>
        <li className="list-item two" >Navigation styling with hover and cleaner look</li>
        </ol>
      </Card>
      <Card>
      <ol className="list">
        Extra Features:
        <li className="list-item one">Profile picture upload</li>
        <li className="list-item two">use diffrent than create react app possibly vite?</li>
        </ol>
      </Card>
    </div>
  );
}
