import React, { useEffect, useState } from "react";
import CurrencyFormat from "react-currency-format";
import { useParams } from "react-router-dom";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { useProducts } from "../contexts/ProductsContext";
import { useBasket } from "../contexts/BasketContext";
import "../css/productpage.css";
import { Card, Col, Row, Spinner } from "react-bootstrap";
import NavigationBar from "./NavigationBar"

const ProductPage = () => {
  const { id } = useParams();
  const { products, getPrice } = useProducts();
  const { addBasket } = useBasket();
  const storage = getStorage();
  const [url, setUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [unitPrices, setUnitPrices] = useState({});
  const product = products.find((product) => product.id === id);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const unitAmounts = await getPrice(product.id);
        const unitPrice = String(unitAmounts);
        setUnitPrices((prevState) => ({ ...prevState, [product.id]: unitPrice }));
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    if (product) {
      fetchPrice();
    }
  }, [product, storage, getPrice]);

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
    <Row className="productpage">
      <NavigationBar />
      <Col sm={12} md={6} lg={4}>
        <Card className="card">
          <Card.Img
            src={product.images}
            variant="top"
            alt={product.name}
            className="cardImg"
          />
          <Card.Body className="cardBody">
            <Card.Title className="cardTitle">{product.name}</Card.Title>
            <Card.Text className="cardText">
              <CurrencyFormat
                renderText={(value) => <span>Order Total: {value}</span>}
                decimalScale={2}
                value={unitPrices[product.id]}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"£"}
              />
              <br />
              {product.description}

              <button
                className="addButton"
                onClick={() => addBasket(product.id, unitPrices[product.id])}
              >
                Add to basket
              </button>
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default ProductPage;
