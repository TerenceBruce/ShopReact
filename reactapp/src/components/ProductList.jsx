
import { useProducts } from "../contexts/ProductsContext";
import CurrencyFormat from "react-currency-format";
import {Link} from "react-router-dom";
import { Card, Col, Row, Spinner } from "react-bootstrap";
import { useState, useEffect } from "react";
import { db } from "../firebase";

const ProductsList = () => {
  const { products,prices,getPrice } =
    useProducts();
  const [loading, setLoading] = useState();
  const [error, setError] = useState(null);
 

  useEffect(() => {
    products.forEach((product) => {
      getPrice(product.id)
    });
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
    
      {products.map((product) => (
        <Col sm={12} md={6} lg={4}>
          <Card >
              <Card.Img
              
                src={product.images}
                variant="top"
                alt={product.name}
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
                 value={price.unit_amount }
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