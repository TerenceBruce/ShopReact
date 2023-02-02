import React, { createContext,useContext, useState, 
    // useEffect 
} from "react";
import {db} from '../firebase';
import {collection, addDoc} from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext"
const BasketContext = createContext()

export function useBasket(){
    return useContext(BasketContext)
}

export function BasketProvider({ children }) {
    const { currentUser }=useAuth()
    const [error,setError]= useState(null)
    const [loading, setLoading] =useState(false)
    const uid = currentUser.uid
    async function addBasket(productId){
            console.log(uid)
            await addDoc(collection(db, "Basket/",{uid}), {
                ProductID: (productId),
                Quantity: (+1)
            })
        }
        
       
    
    function basketTotal(){
        // const total = basket.length;
        // console.log(basket.length)
        // return total
        

    }
    function viewBasket(){
        console.log("viewBasket")
        // const listItems = basket.map((number) => <li>{number}</li>);
        
    }
    // useEffect(() => {// in useEffect as only want to run when mount the component 
    // // const unsubscribe = auth.onAuthStateChanged(user => {
    // //            
    // //         setLoading(false)
    // //     })

    // //     return unsubscribe
    // }, [])
    
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
