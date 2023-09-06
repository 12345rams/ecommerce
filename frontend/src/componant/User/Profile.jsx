import React, { Fragment } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import profile from '../Images/profileimageofman.jpg'
import './Profile.css'
import { Button } from '@mui/material';
import Loader from '../layout/Loader/Loader';
import { useEffect } from 'react';
function Profile() {
    const { user, loading,isAuthentication } = useSelector((state) => state.user);
    
    const navigate=useNavigate();
    useEffect(() => {
        if (isAuthentication == false) {
          navigate("/login");
        }
      }, [navigate, isAuthentication]);
    return (
        <Fragment>{
            loading?(<Loader/>):( 
            <Fragment>
               <div className="profileContainer">
                 <div className="imageBox">
                  <h1>My Profile</h1>
                  <img src={profile}alt="" srcset="" />
                  <Link to="/me/update"> <Button variant="contained" size='large'>update</Button></Link>
                 </div>
                 <div className="details">
                 <div>
                     <h4>Full Name</h4>
                     <p>{user.name}</p>
                   </div>
                   <div>
                     <h4>Email</h4>
                     <p>{user.email}</p>
                   </div>
                   <div>
                     <h4>Joined On</h4>
                     <p>{String(user.createdAt).substr(0, 10)}</p>
                   </div>
     
                   <div>
                     <div>
                     <Link to="/orders"><Button variant="contained"color="secondary">Order</Button></Link>
                     <Link to="/password/update"><Button variant="outlined"color="secondary">change Password</Button></Link>
                     </div>
             
                   </div>
     
                 </div>
               </div>
            </Fragment>)
            }

</Fragment>
    )
}

export default Profile
