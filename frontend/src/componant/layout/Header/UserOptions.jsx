
import React from 'react'
import { Fragment } from 'react'
import SpeedDial from '@mui/material/SpeedDial';
import { Badge, SpeedDialAction } from '@mui/material';
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { STATES } from 'mongoose';
import { logout } from '../../../actions/userAction';
import { useAlert } from 'react-alert';


function UserOptions({user}) {
    const navigate=useNavigate();
    const dispatch=useDispatch();
const alert =useAlert();
const {cartItems}=useSelector((state)=>
  state.cart
)
    const options = [
        { icon: <ListAltIcon />, name: "Orders", func: orders },
        { icon: <PersonIcon />, name: "Profile", func: account },
        {
          icon: (
            <Badge badgeContent={cartItems.length} color="secondary" size="small">
                    <ShoppingCartIcon
              style={{ color: cartItems.length > 0 ? "rgb(39, 140, 255)" : "unset" }}
            />
            </Badge>
          
          ),
          name: `Cart(${cartItems.length})`,
          func: cart,
        },
        { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
      ];
      if (true) {
        options.unshift({
          icon: <DashboardIcon />,
          name: "Dashboard",
          func: dashboard,
        });
      }
      function dashboard(){
        navigate("/dashboard")
 }
    function orders(){
           navigate("/order")
    }
    function account(){
           navigate("/profile")
    }
    function cart(){
           navigate("/product/cart")
    }
    function logoutUser(){
        dispatch(logout());
        alert.success("Logout Successfully");
      
    }
    return (
      <Fragment>
     <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', top: 16, right: 16 }}
        direction="down"
        icon={<PersonIcon />}
      >
           {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
          />
        ))}
 </SpeedDial>
      </Fragment>
    )
}

export default UserOptions

