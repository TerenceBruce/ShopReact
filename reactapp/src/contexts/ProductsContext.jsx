import { collection, getDocs} from "firebase/firestore";
import { db } from "../firebase";
import React, { createContext, useState, useEffect, useContext } from "react";

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
  const { currentUser }=useAuth()
  const [priceValue,setPriceValue] =useState([]);

  useEffect(() => {
    getDocs(collection(db, "Product"))
      .then((querySnapshot) => {
        const products = [];
        querySnapshot.forEach((doc) => {
          
          products.push({ id: doc.id, ...doc.data() });
     
        });
        setProducts(products);
        setLoading(false);
        // console.log(products)

      })
 
    }, []);
    
    async function getPrice(productId) {
      try {
        const querySnapshot = await getDocs(collection(db, "Product", productId, "prices"));
        const unitAmounts = [];
    
        querySnapshot.forEach((doc) => {
          const price = doc.data();
          unitAmounts.push(price.unit_amount);
        });
    
        return unitAmounts;
      } catch (error) {
        return Promise.reject(new Error("Failed to fetch prices for product: " + error.message));
      }
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
