import React, { Fragment } from 'react'
import { addItemToCart } from '../../actions/cartActions'
import { Link } from 'react-router-dom'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Button from '@mui/material/Button';
function CartItemCard({item,deleteCartItems}) {
    return (
        <Fragment>
            <div className="cartItemCardBox">
                <div>
                <img src={item.image} alt="" srcset="" />
                </div>
       <div>
       <Link to={`/product/${item.product}`}>{item.name}</Link>
        <span>{`Price: ₹${item.price}`}</span>
      
         <Button variant="outlined" color="error" onClick={() => deleteCartItems(item.product)}><DeleteForeverIcon /></Button>
       </div>

       
            </div>
        </Fragment>
    )
}

export default CartItemCard
