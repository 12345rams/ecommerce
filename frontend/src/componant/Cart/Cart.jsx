import React, { Fragment, useEffect } from 'react'
import Loader from '../layout/Loader/Loader'
import './Cart.css'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { addItemToCart,removeItemsFromCart} from '../../actions/cartActions'
import { Typography } from "@material-ui/core";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { Link, Navigate, useNavigate } from "react-router-dom";
import CartItemCard from './CartItemCard.jsx'
import Button from '@mui/material/Button';
function Cart() {
  const alert = useAlert();
 const navigate=useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(addItemToCart(id, newQty));
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addItemToCart(id, newQty));
  };
  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
  };
  const checkoutHandler = () => {
    navigate("/login?redirect=shipping");
  };
  useEffect(() => {

  }, [])
  return (
    <Fragment>

      {cartItems.length === 0 ? (
        <div className="emptyCart">
          <RemoveShoppingCartIcon />

          <Typography>No Product in Your Cart</Typography>
          <Link to="/products"><Button variant="outlined">View Products</Button></Link>
        </div>
      )
        : (
          <Fragment>
            <div className="cartPage">
              <div className="cartHeading">
                <p>Product</p>
                <p>Quantity</p>
                <p>Amount</p>
              </div>

              {cartItems &&
                cartItems.map((item) => (
                  <div>

         <div className="cartContainer">
                      <div className="cartColumn-1">
                        <CartItemCard item={item} deleteCartItems={deleteCartItems}/>
                      </div>
                  <div className="cartColumn-2">
                        <p>{item.quantity}</p>
                        <button  onClick={() =>
                        decreaseQuantity(item.product, item.quantity)
                      }>-</button>
                        <input type="text" name="" id="" value={item.quantity} readOnly />
                        <button  onClick={() =>
                        increaseQuantity(item.product, item.quantity)
                      }>+</button>


                    </div>
                    <div className="cartColumn-3">
                        ₹{item.quantity * item.price}
                     </div>
                    </div>
                         </div>
                



                  


                ))}
                 <div className="grossTotalBox">
                      <div></div>
                      <div>
                        <div className="horizontalLine"></div>
                        <div className="GrossTotal">
                        <p>{`₹${cartItems.reduce(
                  (acc, item) => acc + item.quantity * item.price,
                  0
                )}`}</p>
                     
                

                          <Button variant='contained' size='large' onClick={checkoutHandler}>check Out</Button>
                        </div>
                      </div>
                    </div>
               
            </div>
          </Fragment>
        )}
    </Fragment>
  )
}

export default Cart

