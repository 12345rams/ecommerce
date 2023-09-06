import React from 'react'
import { Rating } from '@mui/material';
import profile from '.././Images/profileimageofman.jpg'
import {Avatar} from '@mui/material';
function ReviewCard({review}) {
    const options = {
        value: review.ratings,
        readOnly: true,
        precision: 0.5,
      };
    return (
        <div className='reviewCard'>
           
         <Avatar src={profile} alt="user"  />
             <h3>{review.name}</h3>
            <Rating {...options}></Rating>
           <span>{review.comment}</span>
        </div>
    )
}

export default ReviewCard


