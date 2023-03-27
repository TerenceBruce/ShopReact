import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { useProducts } from "../contexts/ProductsContext";
import { useBasket } from "../contexts/BasketContext";

import { Card, Col, Row, Spinner} from "react-bootstrap";

const ProductPage = () => {
  const { id } = useParams();
  const { products } = useProducts();
  const {addBasket} = useBasket();
  const storage = getStorage();
  const [url, setUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const product = products.find((product) => product.id === id);

  useEffect(() => {
    setLoading(false)
  }, [product, storage]);

  if (loading) {
    return <Spinner animation="border" variant="primary" />;
  }
  if (error) {
    return <div>An error occurred: {error.message}</div>;
  }
  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <Row>
      <Col sm={12} md={6} lg={4}>
        <Card >

            <Card.Img src={product.images} variant="top" alt={product.name} />
        
          <Card.Body>
            <Card.Title>{product.name}</Card.Title>
            <Card.Text>
              {/* £{product.ProductPrice} */}
              <br />
              {product.description}
              <button onClick={() => addBasket(id)}>Add to basket</button>
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default ProductPage;