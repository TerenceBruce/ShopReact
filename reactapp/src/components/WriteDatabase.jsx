import  React, {useState,useRef} from 'react';
import { storage} from "../firebase"; 
import {collection, addDoc} from "firebase/firestore";
import { Button,Alert, Card,Form, CardImg} from 'react-bootstrap';
import {db} from '../firebase';
import { ref, uploadBytes} from "firebase/storage";
import {v4} from "uuid";

export default function WriteDatabase() {
    const [error,setError] = useState("")
    const [success, setSuccess] = useState('')
    const [productImage,SetProductImage] =useState(null)
    const productName =useRef()
    
    const productPrice =useRef()
    const types = ['image/png', 'image/jpeg']; // image types

    const productImgHandler = (e) => {
        let selectedFile = e.target.files[0];
        if (selectedFile && types.includes(selectedFile.type)) {
          SetProductImage(selectedFile);
            setError('')
        }
        else {
          SetProductImage(null);
            setError('Please select a valid image type (jpg or png)');
        }
    }
     
// This function adds a product to a database and. First it creates an array of promises, productPromises, which will be used to store promises for uploading an image and adding a document to a "Product" collection in a database.
    // If a value for the productImage input is provided, the code uses the ref function to create a reference for the image, which is then added to the productPromises array by calling the uploadBytes function.
    // Next, if values for the productName and productDescription inputs are provided, the code creates a new document object containing the values for these inputs and adds it to the "Product" collection using the addDoc function. This promise is also added to the productPromises array.
    // Finally, the code uses Promise.all to wait for all of the promises in the productPromises array to be resolved. If all promises resolve successfully, a message is displayed indicating that the product was created successfully. If any of the promises are rejected, an error message is displayed.
    function AddProduct(e) {
      e.preventDefault()

    const productPromises =[]
     
      if(productImage!= null && productName.current.value!=null && productPrice.current.value!=null  ){
        const productImageID = productImage + v4()
        const imageRef = ref(storage, `Product/${productImageID}`);
        productPromises.push(uploadBytes(imageRef,productImage))
      

        
    
        productPromises.push(addDoc(collection(db, "Product"), {
          ProductName: (productName.current.value),
          ProductImage: (productImageID),
          ProductPrice: (productPrice.current.value)
      }));
      }
      Promise.all(productPromises).then(() => {
        setSuccess("Created Product");
      }).catch(() => {
        setError("Error adding document: ")
     })
    
       
    }
    
  return (
    <div>
      <Card>
        <Card.Body>
          {/* <Card.Img variant="top" src={productName} /> */}
          <h2 className="text-center mb-4">Add product</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          <Form onSubmit={AddProduct}>
            <Form.Group id="ProductName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" ref={productName} required />
            </Form.Group>
            <Form.Group id="ProductImage">
              <Form.Label> Image</Form.Label>
              <Form.Control type="file" onChange={productImgHandler} required />
            </Form.Group>
            <Form.Group id="ProductPrice">
              <Form.Label> Price</Form.Label>
              <Form.Control type="number" step="0.01" ref={productPrice} required />
            </Form.Group>
            <Button className="w-100 text-center mt-2" type="submit">
              Add Product
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

