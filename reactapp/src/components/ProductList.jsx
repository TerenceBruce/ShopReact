
import { useProducts } from "../contexts/ProductsContext";
import CurrencyFormat from "react-currency-format";
import {Link} from "react-router-dom";
import { Card, Col, Row, Spinner } from "react-bootstrap";
import { useState, useEffect } from "react";
import { db } from "../firebase";

const ProductsList = () => {
  const { products,prices,priceValue } =
    useProducts();
  const [loading, setLoading] = useState();
  const [error, setError] = useState(null);



  useEffect(() => {
    
    
  }, []);

   if (products.length===0) {
     return <p>No products found</p>;
   }
  if (loading) {
    return <Spinner animation="border" variant="primary" />;
   
  }
  if (error) {
    return <p>An error occurred: {error.message}</p>;
  }
 

  return (
    
    <Row>
    
      {products.map((product,index) => (//The map() method creates a new array with the result of calling a function for every array element.
          
        <Col sm={12} md={6} lg={4}>
          <Card >
              <Card.Img
              
                src={product.images}
                variant="top"
                alt={product.name}
                key={index}
              />
           
            <Card.Body>
              <Card.Title>
                <Link to={`/products/${product.id}`}>
                  {product.name}
                </Link>
              </Card.Title>
              <Card.Text>
              {prices.map((price) => (
                <CurrencyFormat
                 renderText={(value) => <>Order Total :{value}</>}
                 decimalScale={2}
                 value={priceValue([1])}
                 displayType={"text"}
                 thousandSeparator={true}
                 prefix={"£"}
                            />
                
              ))}
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
       
      ))}
    </Row>
  );
};


 export default ProductsList;