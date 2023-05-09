import React, { createContext,useContext, useState, useEffect } from "react";
import { useBasket } from '../contexts/BasketContext';
import { auth } from "../firebase"
import {createUserWithEmailAndPassword, 
        sendPasswordResetEmail, 
        signInWithEmailAndPassword, 
        //updateEmail, 
        updatePassword  } from "firebase/auth";
        

const AuthContext = createContext()

export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] =useState(true)

    function signup(email, password){
        return createUserWithEmailAndPassword(auth, email, password)//uses firebase sign up authentication

    }
    function login(email, password){
        return signInWithEmailAndPassword(auth,email,password)//uses firebase login authentication
 
    }
    function logout(){
        return auth.signOut()
    }
    function resetPassword(email){
        return sendPasswordResetEmail(auth, email)//firebase reset password authentication
    }
    // function updateUserEmail(newEmail){
    //     return updateEmail(auth,currentUser,newEmail)
    // }
    function updateUserPassword(password){
        return updatePassword(auth,currentUser,password)
    }
    useEffect(() => {// in useEffect as only want to run when mount the component 
    const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)    
            setLoading(false)
        })

        return unsubscribe
    }, [])
    

    const value ={
        currentUser,
        login,
        signup,
        logout,
        resetPassword,
        //updateUserEmail,
        updateUserPassword
       
    }

    //passing in value then render the children and loading 
  return (
    <AuthContext.Provider value={value}>
        
        {!loading && children}
    </AuthContext.Provider>
  )
}
