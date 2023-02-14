import { collection, getDocs, deleteDoc, doc,where } from "firebase/firestore";
import { db, storage } from "../firebase";
import React, { createContext, useState, useEffect, useContext } from "react";
import { getDownloadURL, ref, deleteObject } from "firebase/storage";
import { useAuth } from "./AuthContext";
const ProductsContext = createContext();

export function useProducts() {
  return useContext(ProductsContext);
}

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [urls, setUrls] = useState({});
  const { currentUser }=useAuth()

  function deleteProduct(productId, imageName) {
    deleteDoc(doc(db, "Product", productId));
    const imageRef = ref(storage, `Product/${imageName}`);
    if (currentUser){
      const user = currentUser.uid
      deleteDoc(doc(db, user), where("ProductID", "==", {productId}) );}

    deleteObject(imageRef).then(() => {
  // File deleted successfully
}).catch((error) => {
  // Uh-oh, an error occurred!
});
  }

  useEffect(() => {
    getDocs(collection(db, "Product"))
      .then((querySnapshot) => {
        const products = [];

        querySnapshot.forEach((doc) => {
          products.push({ id: doc.id, ...doc.data() });
        });
        setProducts(products);
        setLoading(false);

        products.forEach((product) => {
          const imageRef = ref(storage, `Product/${product.ProductImage}`);
          getDownloadURL(imageRef)
            .then((url) => {
              setUrls((prevUrls) => ({
                ...prevUrls,
                [product.id]: url,
              }));
            })
            .catch((error) => {
              console.log(error);
            });
        });
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);
  const value = {
    deleteProduct,
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
