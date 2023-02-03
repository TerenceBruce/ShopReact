import React, { createContext,useContext, useState, 
   useEffect 
} from "react";
import {db} from '../firebase';
import {addDoc, collection, setDoc,getDocs, where,query } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext"
const BasketContext = createContext()

export function useBasket(){
    return useContext(BasketContext)
}

export function BasketProvider({ children }) {
    const { currentUser }=useAuth()
    const [error,setError]= useState(null)
    const [success,setSuccess]= useState(null)
    const [loading, setLoading] =useState(false)
    const [basket,setBasket] =useState([])
    const user = currentUser.uid

    

    async function getBasket(){
        setLoading(true)
        setBasket([])
       
        const q = query(collection(db, "UserBasket"), where("user", "==", {user}));
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    const productid=doc.data().ProductID
                    setBasket(prevArray  => [...prevArray ,productid]);
                });
                setLoading(false)
   
}
    async function addBasket(productId){
            try{
                await addDoc(collection(db, "UserBasket/"), {
                    user:{user},
                    ProductID:{productId},
                })
                getBasket()

          
            setSuccess("Added to Basket")
            } catch(error){
                console.log("ERROR:",error)
                console.log(user)
            }
            
            
        }
        
       
    
    function basketTotal(){
        const total = basket.length;
        return total
        

    }
    function viewBasket(){
       
        
    }
    useEffect(() => {// in useEffect as only want to run when mount the component 
        
        getBasket()
    }, [])
    
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
