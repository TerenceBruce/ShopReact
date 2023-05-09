import React, { createContext,useContext, useState, 
   useEffect 
} from "react";
import {db} from '../firebase';
import {
  addDoc,
  collection,
  doc,
  setDoc,
  getDocs,
  where,
  query,
  deleteDoc,
} from "firebase/firestore";

import "../css/basketlist.css"
import { useAuth } from "./AuthContext"
import { useProducts } from "./ProductsContext"
import { getStorage, ref, getDownloadURL } from "firebase/storage";
const BasketContext = createContext()

export function useBasket(){
    return useContext(BasketContext)
}

export function BasketProvider({ children }) {
    const { currentUser }=useAuth()
    const { products,getPrice,getProductName } = useProducts();
    const [error,setError]= useState(null)
    const [success,setSuccess]= useState(null)
    const [loading, setLoading] =useState(false)
    const [basket,setBasket] =useState([])
    const [quantity, setQuantity] = useState({});
    

    

    async function getBasket() {
     
          if (!currentUser) {
            throw new Error('No user logged in');
          }
      
          const userId = currentUser.uid;
          setLoading(true);
        setBasket([]);
        
        getDocs(collection(db, "Basket"))
        .then((querySnapshot) => {
          const basket = [];
          querySnapshot.forEach((doc) => {
            
            basket.push({ id: doc.id, ...doc.data() });
      
          });
          setBasket(basket);
          setLoading(false);
        
       
        })
    }
   async function addBasket(productId,unitAmount){//Adds products to a basket (BASKET/USERID/PRODUCTID) WHERE USERID IN BASKET LIST ALL PRODUCTS
            try{
             
                if(currentUser){
                const user = currentUser.uid
                console.log(user);
                console.log(productId);
                const q = query(collection(db, "Basket"), where("ProductID", "==", {productId}));
                const querySnapshot = await getDocs(q);
                await addDoc(collection(db,"Basket"), {
                    ProductID:{productId},
                    User:{user},
                    Price:{unitAmount}

                })
                getBasket()
            }else{
                setError("Log in for basket")}

          
            setSuccess("Added to Basket")
            } catch(error){
                console.log("ERROR:",error)
                
            }
            
            
        }
        
  function basketTotalPrice(){
    const groupedItems = basket.reduce((groupedItems, item) => {
      const { Price } = item;
      const groupedItem = groupedItems.find((groupedItem) => groupedItem.Price === Price);

        groupedItems.push({ Price});
        return groupedItems;
    }, []);

  const prices = groupedItems.map((item) => item.Price);
  let totalPrice=0;
  
  prices.forEach((price) => {

      let unitAmount = parseInt(price.unitAmount)
      totalPrice += unitAmount
            
    });
    
    return totalPrice
  }
    

    function basketTotal(){
        const total = basket.length;
        return total
        

    }
    async function deleteItem(productId) {
      try {
        if (currentUser) {
    
          const user = currentUser.uid;
     
          const q = query(
            collection(db, "Basket"),
            where("ProductID", "==", { productId })
          );
          const querySnapshot = await getDocs(q);
    
          // Add a counter to keep track of deleted items
          let deletedItems = 0;
    
          querySnapshot.forEach((doc) => {
            // Check if we haven't deleted any items yet
            if (deletedItems === 0) {
              deleteDoc(doc.ref); // and not doc.data()
              deletedItems++; // Increment the counter
            }
          });
          getBasket();
        } else {
          setError("Log in for basket");
        }
    
        setSuccess("Deleted one item from basket");
      } catch (error) {
        console.log("ERROR:", error);
      }
    }
      function viewBasket() {
        // Reduce the basket array into an array of objects with each product ID and its quantity
        const groupedItems = basket.reduce((groupedItems, item) => {
          const { ProductID } = item; // Destructure the productId property from the current item
          const groupedItem = groupedItems.find((groupedItem) => groupedItem.productId === ProductID); // Find the grouped item with a matching product ID from the groupedItems array
      
          // If a matching grouped item is found, increment its quantity by 1
          // Otherwise, push a new object with the current product and a quantity of 1 to the groupedItems array
          if (groupedItem) {
            groupedItem.quantity++;
          } else {
            groupedItems.push({ ProductID, quantity: 1 });
          }
         
          return groupedItems;
        }, []);
      
        // Render a list of products with their quantities
        return (
          <div>
            <ul className="item-list">
              {groupedItems.map(({ ProductID, quantity }, index) => (
                <li key={`${ProductID?.productId}-${index}`}>
                  {ProductID && (
                    <>
                      {/* Render the product name, price, and quantity */}
                      <p>{getProductName(ProductID.productId)}</p>
                      {/* <p>- £{product.ProductPrice} x {quantity}</p> */}
                      <button className="delete-btn" onClick={() => deleteItem(ProductID.productId)}>
                        Delete
                      </button>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        );
      }
    useEffect(() => {// in useEffect as only want to run when mount the component 
        
        getBasket()
    },[])
    
    const value = {
      addBasket,
      viewBasket,
      basketTotal,
      basketTotalPrice,
      getBasket
    };

    //passing in value then render the children and loading 
  return (
    <BasketContext.Provider value={value}>
        
        {!loading && children}
    </BasketContext.Provider>
  )
}
