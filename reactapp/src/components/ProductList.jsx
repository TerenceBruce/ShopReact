
import { useProducts } from "../contexts/ProductsContext";
import CurrencyFormat from "react-currency-format";
import {Link} from "react-router-dom";
import { Card, Col, Row, Spinner } from "react-bootstrap";
import { useState, useEffect } from "react";
import { db } from "../firebase";

const ProductsList = () => {
  const { products,getPrice } =
    useProducts();
    const [unitPrices, setUnitPrices] = useState({});
  const [loading, setLoading] = useState();
  const [error, setError] = useState(null);



  useEffect(() => {
    
    
  }, []);

   if (products.length===0) {
     return <p>Sold out</p>;
   }
  if (loading) {
    return <Spinner animation="border" variant="primary" />;
   
  }
  if (error) {
    return <p>An error occurred: {error.message}</p>;
  }
 

  return (
    
    <Row>
    {products.map((product) => {
       getPrice(product.id).then((unitAmounts) => {
        const unitPrice = String(unitAmounts);
        setUnitPrices((prevState) => ({ ...prevState, [product.id]: unitPrice }));
      });
     
    
  
      return (
        <Col sm={12} md={6} lg={4} key={product.id}>
          <Card>
         
            <Card.Img src={product.images} variant="top" alt={product.name} />
  
            <Card.Body>
              <Card.Title>
                <Link to={`/products/${product.id}`}>{product.name}</Link>
              </Card.Title>
              <Card.Text>
                {product.description}
                
                <br />
                <CurrencyFormat
                   renderText={(value) => <span>Order Total: {value}</span>}
                  decimalScale={2}
                  value={unitPrices[product.id]}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"£"}
                />
                <br />
                {/* <button
                  onClick={() => deleteProduct(product.id, product.images)}
                >
                  Delete
                </button> */}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      );
    })}
  </Row>
  

  );
};


 export default ProductsList;