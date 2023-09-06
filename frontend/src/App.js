import Header from './componant/layout/Header/Header.js'
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WebFont from "webfontloader";
import Home from "./componant/Home/Home.jsx"
import React from 'react'

import Footer from "./componant/layout/footer/footer"
import ProductDetails from './componant/product/productDetails'
import Products from './componant/product/products.js'
import Search from './componant/product/Search.js';
import LoginSignup from './componant/User/loginSignup.jsx';
import store from "./Store";
import { loadUser } from './actions/userAction.js';
import { useSelector } from 'react-redux';
import UserOptions from './componant/layout/Header/UserOptions.jsx';
import ForgetPassword from './componant/User/ForgetPassword.jsx'
import ResetPassword from './componant/User/ResetPassword.jsx'
import Profile from './componant/User/Profile.jsx'
import Cart from './componant/Cart/Cart'
import Shipping from './componant/Cart/Shipping.jsx'
import Confirm from './componant/Cart/Confirm.jsx'
import Payment from './componant/Cart/Payment.jsx'
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from 'axios';

function App() {
  const { isAuthentication, user } = useSelector((state) => state.user);
  const stripApikey = "pk_test_51Nd54LSAlyqpThaEHcSb52043XuQzXfAXKrCvTIDi5Y8gJOCM6qzu9uNY0j72U9XvbaToFtF55brk42dnj5tDRPq00xlN1QHze";
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());
  }, [])
  return (
    <Router >
      <Header />
      {isAuthentication && <UserOptions />}
      <Routes>
        <Route path="/profile" element={isAuthentication && <Profile />} />
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/Search" element={<Search />} />
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/forgetPassword" element={<ForgetPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route path="/product/cart" element={<Cart />} />
        <Route path="/login/shipping" element={<Shipping />} />
        <Route path="/order/confirm" element={<Confirm />} />
        <Route
          path="/order/payment"
          element={

            <Elements stripe={loadStripe(stripApikey)}>
              <Payment />
            </Elements>

          }
        />

      </Routes>





      <Footer />
    </Router>



  );
}

export default App;
