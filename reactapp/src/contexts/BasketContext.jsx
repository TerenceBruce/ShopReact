import React, { createContext,useContext, useState, useEffect } from "react";

const BasketContext = createContext()

export function useBasket(){
    return useContext(BasketContext)
}

export function BasketProvider({ children }) {
    const [loading, setLoading] =useState(false)
    const [basket,setBasket] = useState([null])
    function addBasket(productId){
        const checkBasket= basket.find((basket) => productId )
        console.log(checkBasket)
        // setBasket(productId)
        // console.log(basket)
    }
    // useEffect(() => {// in useEffect as only want to run when mount the component 
    // // const unsubscribe = auth.onAuthStateChanged(user => {
    // //            
    // //         setLoading(false)
    // //     })

    // //     return unsubscribe
    // }, [])
    
    const value ={
        addBasket
    
    }

    //passing in value then render the children and loading 
  return (
    <BasketContext.Provider value={value}>
        
        {!loading && children}
    </BasketContext.Provider>
  )
}
