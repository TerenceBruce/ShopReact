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


import { useAuth } from "./AuthContext"
import { useProducts } from "./ProductsContext"
import { getStorage, ref, getDownloadURL } from "firebase/storage";
const BasketContext = createContext()

export function useBasket(){
    return useContext(BasketContext)
}

export function BasketProvider({ children }) {
    const { currentUser }=useAuth()
    const { products,getPrice } = useProducts();
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
          console.log(basket)
       
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
      console.log(price);
      totalPrice =+price
    });
  }
    

    function basketTotal(){
        const total = basket.length;
        return total
        

    }
      async function deleteItem(productId) {
        try {
          if (currentUser) {
            console.log(productId)
            const user = currentUser.uid;
           
            const q = query(
              collection(db, user),
              where("ProductID", "==", { productId })
            );
            const querySnapshot = await getDocs(q);
             querySnapshot.forEach((doc) => {
               deleteDoc(doc.ref); // and not doc.data()
             });
            getBasket();
          } else {
            setError("Log in for basket");
          }

          setSuccess("Deleted from basket");
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
          console.log(groupedItems)
          return groupedItems;
        }, []);
      
        // Render a list of products with their quantities
        return (
          <div>
            <ul>
              {groupedItems.map(({ product, quantity }) => (
                <li key={product?.id}>
                  {product && (
                    <>
                      {/* Render the product name, price, and quantity */}
                      <p>{product.name}  </p>
                      {/* <p>- £{product.ProductPrice} x {quantity}</p> */}
                      <button onClick={() => deleteItem(product.id)}>Delete</button>
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
