import React, { Fragment, useEffect } from 'react'
import Product from './productCard'
import {Mouse} from '@mui/icons-material'
import {White} from '@mui/material/colors';
import MetaData from "../layout/MetaData";
import {clearErrors, getProduct} from '../../actions/productAction'
import { UseSelector,useDispatch, useSelector} from 'react-redux';
import './Home.css'
import Loader from '../layout/Loader/Loader.js'
import ProductCard from './productCard.js';
import {useAlert} from 'react-alert'
function Home() {
  const alert=useAlert();
  const dispatch=useDispatch();
  const {loading,error,products,productsCount} =useSelector(state=>state.products)
  useEffect(()=>
  {
    if(error){
      alert.error(error);
      dispatch(clearErrors);
    }
    dispatch(getProduct());
  },[dispatch,error]
)
    return (
      <Fragment>
        {loading?
        (<Loader />):(
      <Fragment>
         <MetaData title="Alpha-Ecommerse"/>
        <div className="banner">
            <h1>Welcome to Alpha-Ecommerse</h1>
            <p>Find Amazing Products Below</p>
            <a href="#container">
            <button ><Mouse/></button>
         </a>
            
        </div>
        <h2 className='homeHeading'>Feature Products</h2>
        <div className="container" id="container">
        {products &&
              products.map((product) => (
                <ProductCard  product={product} />
              ))}
         </div>
         </Fragment>)
}
       
       </Fragment>
    )
}

export default Home

