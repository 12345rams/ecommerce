import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import CheckOutStep from './CheckOutStep'
import { Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import './Confirm.css'
function Confirm() {
    
    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);
   const navigate=useNavigate();
    const subtotal = cartItems.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
      );
      const proceedtopayment=()=>{
        const data = {
          subtotal,
          shippingCharge,
          GST,
          Total,
        };
    
        sessionStorage.setItem("orderInfo", JSON.stringify(data));
    
        navigate("/order/payment")
      }
      const shippingCharge=subtotal>=1000?200:0;
      const GST=subtotal*18/100;
      const Total=subtotal+shippingCharge+GST;
      const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;
               
   
    return (
       <Fragment>
        <div className="confirmMainContainer">
        <CheckOutStep activeStep={1}/>  
        
         <div className="confirmContainer">
        
            <div className="shippingInfoBox">
                 <div className="ShippingInfo">
                      <h1>Shipping Info</h1>
                      <div>
                      <p>Name:</p>
                      <span>{user.name}</span>
                      </div>
                 <div>
                 <p>Phone:</p>
                       <span>{user.phoneNo}</span>
                 </div>
                    <div>
                    <p>Address</p>
                       <span>{address}</span>
                    </div>
                  
                 </div>
                 <div className="yourcartItems">
                  <h2>Your Cart Items</h2>
                 {cartItems &&
                cartItems.map((item) => (
                  <div key={item.product}>
                    <img src={item.image} alt="Product" />
                    
                    <Link to={`/product/${item.product}`}>
                      {item.name}
                    </Link>
                    <span>
                      {item.quantity} X ₹{item.price} ={" "}
                      <b>₹{item.price * item.quantity}</b>
                    </span>
                  </div>
                ))}
                 </div>
            </div>
            <div className="orderSummary">
              <div>
              <p>Subtotal:</p>
              <span>{subtotal}</span>
              </div>
    <div>
    <p>ShippingCharge:</p>
        <span>{shippingCharge}</span>
    </div>
    <div>
    <p>GST:</p>
  <span>{GST}</span>
    </div>
 
  <div className="line"></div>
  <div>
  <p>Total:</p>
  <span>{Total}</span>
  </div>

  <Button variant='contained' onClick={proceedtopayment}>Proceed to payment</Button>
            </div>

         </div>
         </div>
       </Fragment>
    )
}

export default Confirm


