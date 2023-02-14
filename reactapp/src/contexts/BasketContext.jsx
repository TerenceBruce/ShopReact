import React, { createContext,useContext, useState, 
   useEffect 
} from "react";
import {db} from '../firebase';
import {addDoc, collection, setDoc,getDocs, where,query } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext"
import { useProducts } from "../contexts/ProductsContext"
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
        
       
    
    function basketTotal(){
        const total = basket.length;
        return total
        

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
    
      const totalPrice = groupedItems.reduce((total, { product, quantity }) => {

        return total + (product.ProductPrice * quantity);
      }, 0);
    
      return (
        <div>
          <ul>
            {groupedItems.map(({ product, quantity }) => (
              <li key={product.id}>
                {product.ProductName} - £{product.ProductPrice} x {quantity}
              </li>
            ))}
          </ul>
          <p>Total Price: £{totalPrice}</p>
        </div>
      );
    }
    useEffect(() => {// in useEffect as only want to run when mount the component 
        
        getBasket()
    },[])
    
    const value = {
      addBasket,
      viewBasket,
      basketTotal
    };

    //passing in value then render the children and loading 
  return (
    <BasketContext.Provider value={value}>
        
        {!loading && children}
    </BasketContext.Provider>
  )
}
