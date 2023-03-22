
import { useProducts } from "../contexts/ProductsContext";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import {Link} from "react-router-dom";
import { Card, Col, Row, Spinner } from "react-bootstrap";
import { useState, useEffect } from "react";


const ProductsList = () => {
  const { products, deleteProduct } =
    useProducts();
  const [urls, setUrls] = useState({});
  const [loading, setLoading] = useState();
  const [error, setError] = useState(null);
  const storage = getStorage();

  useEffect(() => {
    setLoading(true);
    if (products) {
      products.forEach((product) => {
        const imageRef = ref(storage, `Product/${product.ProductImage}`);
        getDownloadURL(imageRef)
          .then((url) => {
            setUrls((prevUrls) => ({
              ...prevUrls,
              [product.id]: url,
            }));
            setLoading(false);
          })
          .catch((error) => {
            setError(error);
            setLoading(false);
            
          });
      });
    }
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
            {urls[product.id] && (
              <Card.Img
                src={urls[product.id]}
                variant="top"
                alt={product.ProductName}
              />
            )}
            <Card.Body>
              <Card.Title>
                <Link to={`/Product/${product.id}`}>
                  {product.ProductName}
                </Link>
              </Card.Title>
              <Card.Text>
                £{product.ProductPrice}
                <br />
                <button
                  onClick={() => deleteProduct(product.id, product.ProductImage)}
                >
                  Delete
                </button>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default ProductsList;