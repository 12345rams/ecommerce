import React, { Fragment, useEffect } from 'react'
import Loader from '../layout/Loader/Loader'

import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { useState } from 'react';
function Cart() {
    const alert=useAlert();
    const [email,setEmail]=useState();
    const dispatch=useDispatch();
    let loading=false;
    const {} =useSelector(state=>state.product)
    useEffect(()=>{

    },[])
    return (
        <Fragment>
            {loading?(<Loader />):(
                <Fragment>
 heloow
                </Fragment>
            )}
        </Fragment>
    )
}

export default Cart
