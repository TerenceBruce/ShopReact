import { collection, getDocs, doc,where } from "firebase/firestore";
import { db } from "../firebase";
import React, { createContext, useState, useEffect, useContext } from "react";
import { getDownloadURL, ref, deleteObject } from "firebase/storage";
import { useAuth } from "./AuthContext";
const ProductsContext = createContext();

export function useProducts() {
  return useContext(ProductsContext);
}

export function ProductsProvider({ children }) {
  
  const [prices, setPrices] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [urls, setUrls] = useState({});
  const { currentUser }=useAuth()


  useEffect(() => {
    getDocs(collection(db, "Product"))
      .then((querySnapshot) => {
        const products = [];

        querySnapshot.forEach((doc) => {
          
          products.push({ id: doc.id, ...doc.data() });
         
          products.forEach((product) => {
            getPrice(product.id)     
    
       
          })
          
          
          
          
        });
        setProducts(products);
        setLoading(false);
        console.log(products)

      })
  
      
   
    }, []);
    
    function getPrice(productId){
      getDocs(collection(db, "Product",productId,"prices"))
      .then((querySnapshot) => {
        const prices = [];

        querySnapshot.forEach((doc) => {
          prices.push({ id: doc.id, ...doc.data() });
          
        });
        setPrices(prices);
        setLoading(false);
      

      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
      
  
    }
//   function deleteProduct(productId, imageName) {
//     deleteDoc(doc(db, "products", productId));
//     const imageRef = ref(storage, `products/${imageName}`);
//     if (currentUser){
//       const user = currentUser.uid
//       deleteDoc(doc(db, "Basket"), where("ProductID", "==", {productId}) );}

//     deleteObject(imageRef).then(() => {
//   // File deleted successfully
// }).catch((error) => {
//   // Uh-oh, an error occurred!
// });
//   }
  
  const value = {
    // deleteProduct,
    getPrice,
    prices,
    products,
    setProducts
  };
  return (
    <ProductsContext.Provider  value={value}>
      {error ? (
        <div>
          <p>An error occurred: {error.message}</p>
        </div>
      ) : (
        !loading && children
      )}
    </ProductsContext.Provider>
  );
}
