
import React from "react";
import {Container} from "react-bootstrap"
//components
import Home from "../pages/Home";
import SignUp from "./SignUp";
import Login from "./Login"
import Profile from "../pages/Profile"
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfile";
import NavigationBar from "./NavigationBar";
import Admin from "../pages/Admin";
import ProductPage from "./ProductPage";
//contexts
import { AuthProvider } from "../contexts/AuthContext"
import { ProductsProvider } from "../contexts/ProductsContext";
//routing 
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";



function App(){ 
  return (
    <Container
      className="d-flex align-items-center justify-cintent-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <AuthProvider>
          <ProductsProvider>
            <Router>
              <NavigationBar />

              <Routes>
                <Route path="/" element={<Home />} />

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
                <Route path="/products/:id" element={<ProductPage/>} />
              </Routes>
            </Router>
          </ProductsProvider>
        </AuthProvider>
      </div>
    </Container>
  );

  }


export default App;

