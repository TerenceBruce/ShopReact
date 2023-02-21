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
    const { products } = useProducts();
    const [error,setError]= useState(null)
    const [success,setSuccess]= useState(null)
    const [loading, setLoading] =useState(false)
    const [basket,setBasket] =useState([])
    const [quantity, setQuantity] = useState({});

    

    async function getBasket(){
        setLoading(true)
        setBasket([])
        try{
        if(currentUser){
        const user = currentUser.uid
        const q = query(collection(db, user));
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    const productid=doc.data().ProductID
                    setBasket(prevArray  => [...prevArray ,productid]);
                    
                });
                setLoading(false)
                
                
            }
            else{
                setError("Log in for basket")}
                setLoading(false)
          
            setSuccess("Added to Basket")
            } catch(error){
                console.log("ERROR:",error)
                setLoading(false)
                
            }
   
}
    async function addBasket(productId){
            try{
                if(currentUser){
                const user = currentUser.uid
                const q = query(collection(db, user), where("ProductID", "==", {productId}));
                const querySnapshot = await getDocs(q);
                await addDoc(collection(db, user), {
                    ProductID:{productId},
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
        const { productId } = item;
        const product = products.find((product) => product.id === productId);
        const groupedItem = groupedItems.find((groupedItem) => groupedItem.product.id === productId);
        
        if (groupedItem) {
          groupedItem.quantity++;
        } else {
          groupedItems.push({ product, quantity: 1 });
        }
        
        
        return groupedItems;
      }, []);
      const totalPrice = groupedItems.reduce((total, { product, quantity }) => {

        return total + (product.ProductPrice * quantity);
      }, 0);
      return totalPrice
    
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
            await deleteDoc(doc(db, user), {
              ProductID: { productId },
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
    function viewBasket(){
      const groupedItems = basket.reduce((groupedItems, item) => {
        const { productId } = item;
        const product = products.find((product) => product.id === productId);
        const groupedItem = groupedItems.find((groupedItem) => groupedItem.product.id === productId);
        
        if (groupedItem) {
          groupedItem.quantity++;
        } else {
          groupedItems.push({ product, quantity: 1 });
        }
        
        
        return groupedItems;
      }, []);
    
     
      return (
        <div>
          <ul>
            {groupedItems.map(({ product, quantity }) => (
              <li key={product.id}>
                {product.ProductName} - £{product.ProductPrice} x {quantity}
                <button onClick={() => deleteItem(product.id)}>
                 Delete
                </button>
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
