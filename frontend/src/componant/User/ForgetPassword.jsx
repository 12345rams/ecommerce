import React, { Fragment, useEffect, useState } from 'react'
import Loader from '../layout/Loader/Loader'
import './ForgetPassword.css'
import { Avatar, Button } from '@mui/material'
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import {forgetPassword,clearErrors} from '../../actions/userAction'

import SendIcon from '@mui/icons-material/Send';
function ForgetPassword() {
    const alert=useAlert();
    const dispatch=useDispatch();
    const[email,setEmail]=useState("");
    const { error, message, loading } = useSelector(
        (state) => state.forgotPassword
      );
  
   

   const  forgetPasswordSubmit=(e)=>{
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("email", email);
    dispatch(forgetPassword(myForm));
    }
    useEffect(()=>{
        if(error)
        alert.error(error);
        dispatch(clearErrors());

        if(message)
        {
         alert.success(message)
        }
     },[dispatch,error,message])
    return (
        <Fragment>
           {
        loading?(<Loader />):(
            <Fragment>
                <div className="forgetPasswordContainer">
                    <div className="forgetPasswordBox">
                        <form name='forgetPasswordForm' onSubmit={forgetPasswordSubmit}>
                            <Avatar    sx={{ width: 74, height: 74}}><LockOpenIcon ></LockOpenIcon></Avatar>
                            <h3>Forget Password</h3>

                           <h4>Email</h4>
                          <input type="text" name="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                        
                          <Button variant='contained'  type="submit" size='large' >Send <SendIcon /></Button>
                          
                        </form>
                    </div>
                </div>
            </Fragment>
         )
      }
        </Fragment>
    
    )
}

export default ForgetPassword
