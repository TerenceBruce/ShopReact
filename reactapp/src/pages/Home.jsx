import {React} from 'react'
import { Card } from 'react-bootstrap';
// import ReadStorage from './ReadStorage'
// import TestProduct from './TestProduct'
import ProductList from '../components/ProductList'

export default function Home() {
    
  return (
    <div>
      <ProductList />
      <Card>
        Todo List:
        <li>
          useContext
          https://www.youtube.com/watch?v=5LrDIWkK_Bc&t=606s&ab_channel=WebDevSimplified
          error with ProductContext line:14-16
          https://firebase.google.com/docs/firestore/manage-data/add-data?hl=en#add_a_document
        </li>
        <li>light and dark feature</li>
        <li>Navigation styling with hover and cleaner look</li>
        <li>Profile picture upload</li>
        <li>use diffrent than create react app possibly vite?</li>
        <li>create product plus pages</li>
      </Card>
    </div>
  );
}
