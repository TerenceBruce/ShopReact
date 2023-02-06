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
                console.log(q)
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
