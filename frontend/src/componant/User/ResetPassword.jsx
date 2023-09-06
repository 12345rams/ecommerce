import React, { Fragment, useEffect, useState } from 'react'
import Loader from '../layout/Loader/Loader'
import './ResetPassword.css'
import { Avatar, Button } from '@mui/material'
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import {clearErrors, resetPassword} from '../../actions/userAction'
import { useNavigate, useParams } from 'react-router-dom';
function ResetPassword() {
    const alert=useAlert();
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const { token} = useParams();
    const[password,setPassword]=useState("");
    const[confirmPassword,setConfirmPassword]=useState("");
    const { error, success, loading } = useSelector(
        (state) => state.forgotPassword
      );
  
   

   const  resetPasswordSubmit=(e)=>{
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("password", password);
    myForm.set("confirmPassword", confirmPassword);
    dispatch(resetPassword(token,myForm));
    }
    useEffect(()=>{
        if(error)
        alert.error(error);
        dispatch(clearErrors());

        if(success)
        {
         navigate("/login");
        }
     },[dispatch,error,success,navigate])
    return (
        <Fragment>
           {
        loading?(<Loader />):(
            <Fragment>
                <div className="resetPasswordContainer">
                    <div className="resetPasswordBox">
                        <form name='resetPasswordForm' onSubmit={resetPasswordSubmit}>
                            <Avatar    sx={{ width: 74, height: 74}}><LockOpenIcon ></LockOpenIcon></Avatar>
                            <h3>Reset Password</h3>

                           <h4>New Password</h4>
                          <input type="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                          <h4>Conform Password</h4>
                          <input type="password" name="confirmPassword" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>
                        
                          <Button variant='contained'  type="submit" size='large' >submit</Button>
                          
                        </form>
                    </div>
                </div>
            </Fragment>
         )
      }
        </Fragment>
    
    )
}

export default ResetPassword
