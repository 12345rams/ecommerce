import React, { Fragment, useEffect, useState } from 'react'
import Carousel from 'react-material-ui-carousel'
import './productDetails.css'
import {useSelector,useDispatch} from 'react-redux'
import {clearErrors, getProductDetails} from '../../actions/productAction'
import { useAlert } from "react-alert";
import { useParams } from 'react-router-dom';
import { Rating } from '@mui/material'
import ReviewCard from './ReviewCard.js'
import Loader from '../../componant/layout/Loader/Loader'
import { addItemToCart } from '../../actions/cartActions'
const ProductDetails=()=> {
    const { id } = useParams();
    const dispatch = useDispatch();

    const alert = useAlert();
    const [quantity,setquantity]=useState(1);
useEffect(()=>{
  if(error){
    alert.error(error);
    dispatch(clearErrors);
  }
    dispatch(getProductDetails(id));
},[dispatch])
    const { product, loading, error} = useSelector(
      state => state.productDetails
    );
    const options = {
      value: 3,
      readOnly: true,
      precision: 0.5,
    };
 
    const incrementQuantity=(e)=>{
      if(quantity>=product.Stock) return ;
              const quat=quantity+1;
              setquantity(quat);
    }
    const decrementQuantity=(e)=>{
      if(quantity<=1) return ;
      const quat=quantity-1;
      setquantity(quat);
}
  const addToCartHandler = () => {
    dispatch(addItemToCart(id, quantity));
    alert.success("Item Added To Cart");
  };
    return (
      <Fragment>
        {loading?(<Loader />):(
        <Fragment>
        <div class="ProductDetails">
        <div>
                <Carousel>
                        {product.images &&
                          product.images.map((item, i) => (
                          <>
                          <img src={item.url} alt="" id="img"/></>
                          ))}
                      
                  </Carousel>
        </div>
        <div>
        <div className='detailsBlock-1'>
                                <h2>{product.name}</h2>
                                <p>product _id{product.id}</p>
                      </div>
                      <div className='detailsBlock-2'>
                            <Rating {...options}></Rating>
                      </div>
                      <div className='detailsBlock-3'>
                                  <h2>Price:₹{product.price}</h2>
                      </div>
                      <div className='detailsBlock-3-1'>
                        <div className='detailsBlock-3-1-1'>
                      <button onClick={decrementQuantity}>-</button>
                      <input type="number" name="" id="" value={quantity} readOnly />
                      <button onClick={incrementQuantity}>+</button>
                      </div>
                    
                        <button onClick={addToCartHandler}>Add to Cart</button>
                        </div>
                        <div className='detailsBlock-4'>
                              <p>
                            Status:
                            <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                              {product.Stock < 1 ? "OutOfStock" : "InStock"}
                            </b>
                          </p>
                          </div>
                      

                        <div className="detailsBlock-5">
                          Description : <p>{product.description}</p>
                        </div>

                        <button  className="submitReview">
                          Submit Review
                        </button>        
        
         </div>
    
     </div>
     <h2 className='reviewHeading'>Reviews</h2>
     {product.reviews &&product.reviews[0]?(
      <div className='reviews'>
      
         {product.reviews&&product.reviews.map((review)=><ReviewCard review={review}/>)}
      </div>
     ):(<p className='noReviews'>No Reviews Yet</p>)}
       </Fragment>)}
       
       </Fragment>
    )
}

export default ProductDetails

