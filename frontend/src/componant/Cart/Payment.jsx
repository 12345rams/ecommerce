import React, { Fragment, useEffect, useRef,useState} from "react";
import CheckoutStep from "./CheckOutStep";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { Typography } from "@material-ui/core";
import { Button } from "@mui/material";
import { useAlert } from "react-alert";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import axios from "axios";
import "./payment.css";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import EventIcon from "@material-ui/icons/Event";
import VpnKeyIcon from "@material-ui/icons/VpnKey";

function Payment() {
    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

    const dispatch = useDispatch();
    const alert = useAlert();
    const stripe = useStripe();
    const elements = useElements();
    const payBtn = useRef(null);
  
    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);
 
    const paymentData = {
        amount: Math.round(100)
      };
      const order = {
        shippingInfo,
        orderItems: cartItems,
        itemsPrice: orderInfo.subtotal,
        taxPrice: orderInfo.tax,
        shippingPrice: orderInfo.shippingCharges,
        totalPrice: orderInfo.Total,
      };
    const submitHandler = async (e) => {
        e.preventDefault();
    
        payBtn.current.disabled = true;
    
        try {
          const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
          const { data } = await axios.post(
            "/api/v1/payment/process",
            paymentData,
            config
          );
    
          const client_secret = data.client_secret;
    
          if (!stripe || !elements) return;
    
          const result = await stripe.confirmCardPayment(client_secret, {
            payment_method: {
              card: elements.getElement(CardNumberElement),
              billing_details: {
                name: user.name,
                email: user.email,
                address: {
                  line1: shippingInfo.address,
                  city: shippingInfo.city,
                  state: shippingInfo.state,
                  postal_code: shippingInfo.pinCode,
                  country: shippingInfo.country,
                },
              },
            },
          });
    
          if (result.error) {
            payBtn.current.disabled = false;
    
            alert.error(result.error.message);
          } else {
            if (result.paymentIntent.status === "succeeded") {
              order.paymentInfo = {
                id: result.paymentIntent.id,
                status: result.paymentIntent.status,
              };
    
            
            } else {
              alert.error("There's some issue while processing payment ");
            }
          }
        } catch (error) {
          payBtn.current.disabled = false;
          alert.error(error.response.data.message);
        }
      };
    
  
    return (
        <Fragment>
            <div className="paymnetContainer">
            <CheckoutStep activeStep={2}/>
       <div className="paymentBox">
       <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
          <Typography>Payment Card Info</Typography>
          <div>
            <CreditCardIcon />
            <CardNumberElement className="paymentInput" />
          </div>
          <div>
            <EventIcon />
            <CardExpiryElement className="paymentInput" />
          </div>
          <div>
            <VpnKeyIcon />
            <CardCvcElement className="paymentInput" />
          </div>

          <Button
            type="submit"
            variant="contained"
            ref={payBtn}
            className="paymentFormBtn"
          >Pay - ₹{orderInfo && orderInfo.Total}</Button>
      
        </form>
        </div>
            </div>
     
        </Fragment>
    )
}

export default Payment
