
import React, { useState, useEffect } from 'react';
import {Container} from "react-bootstrap"
//components
import Home from "../pages/Home";
import Shop from "../pages/ShopPage"
import SignUp from "./SignUp";
import Login from "./Login"
import Profile from "../pages/Profile"
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfile";
import Checkout from "./Checkout";
import PaymentSuccess from "./PaymentSuccess";
import TestButton from "./TestButton";
import Loading from './Loading';
// import NavigationBar from "./NavigationBar";
import Admin from "../pages/Admin";
import Product from "../pages/Product";
// hello
//contexts
import { AuthProvider } from "../contexts/AuthContext"
import { ProductsProvider } from "../contexts/ProductsContext";
import { BasketProvider } from "../contexts/BasketContext";
//routing 
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate 
} from "react-router-dom";
//stripe payment
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js";



const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleLoaded = () => {
      setLoading(false);
    };

    handleLoaded(); // Simulating component load for demonstration purposes
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="d-flex align-items-center justify-cintent-center">
      <div className="w-100">
        <AuthProvider>
          <ProductsProvider>
            <BasketProvider>
              <Router>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/Shop" element={<Shop />} />
                  <Route
                    path="/Checkout"
                    element={
                      <PrivateRoute>
                        {" "}
                        <Checkout />{" "}
                       
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/PaymentSuccess"
                    element={
                      <PrivateRoute>
                        {" "}
                        <PaymentSuccess />{" "}
                       
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/UpdateProfile"
                    element={
                      <PrivateRoute>
                        {" "}
                        <UpdateProfile />{" "}
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/Profile"
                    element={
                      <PrivateRoute>
                        {" "}
                        <Profile />{" "}
                      </PrivateRoute>
                    }
                  />
                  <Route path="/SignUp" element={<SignUp />} />
                  <Route path="/Login" element={<Login />} />
                  <Route path="/ForgotPassword" element={<ForgotPassword />} />
                  <Route path="/Admin/AddProduct" element={<Admin />} />
                  <Route path="/Product/:id" element={<Product/>} />
                  <Route path="/TEST" element={<TestButton />} />
                </Routes>
              </Router>
            </BasketProvider>
          </ProductsProvider>
        </AuthProvider>
      </div>
    </div>
  );

  }


export default App;

