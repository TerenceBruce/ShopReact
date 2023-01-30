import React, { createContext,useContext, useState, 
    // useEffect 
} from "react";

const BasketContext = createContext()

export function useBasket(){
    return useContext(BasketContext)
}

export function BasketProvider({ children }) {
    const [error,setError]= useState(null)
    const [loading, setLoading] =useState(false)
    const [basket,setBasket] = useState([])
    function addBasket(productId){
        if (basket.includes(productId)){
            setError("This Product is already in the basket")
            console.log("dup")
        }
        else{
            setBasket((basket) => [...basket, productId]);
            console.log(basket)
        }
       
    }
    function basketTotal(){
        const total = basket.length;
        console.log(basket.length)
        return total
        

    }
    function viewBasket(){
        console.log("viewBasket")
        const listItems = basket.map((number) => <li>{number}</li>);
        
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
