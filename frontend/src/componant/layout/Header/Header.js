import React from 'react'
import {ReactNavbar} from "overlay-navbar"
import logo from '../../Images/brandlogo.png'

import {MdAccountCircle } from "react-icons/md";
import {MdSearch } from "react-icons/md";
import {MdAddShoppingCart } from "react-icons/md";
const options={
burgerColorHover:"black",
  logo,
  logoWidth: "13vmax",
  navColor1: "white",
  logoHoverSize: "10px",
  logoHoverColor: "rgb(39, 140, 255)",
  link1Text: "Home",
  link2Text: "Products",
  link3Text: "Contact",
  link4Text: "About",
  link1Url: "/",
  link2Url: "/products",
  link3Url: "/contact",
  link4Url: "/about",
  link1Size: "1.3vmax",
  link1Color: "rgba(35, 35, 35,0.8)",
  nav1justifyContent: "flex-end",
  nav2justifyContent: "flex-end",
  nav3justifyContent: "flex-start",
  nav4justifyContent: "flex-start",
  link1ColorHover: "rgb(39, 140, 255)",
  link1Margin: "1vmax",
  profileIconUrl: "/login",
  profileIcon:true,
  profileIconColor: "rgba(35, 35, 35,0.8)",
  profileIconColorHover:"rgb(39, 140, 255)",
  ProfileIconElement: MdAccountCircle,
  profileIconMargin:"3vmax" ,
  searchIcon:true,
  searchIconColor: "rgba(35, 35, 35,0.8)",
  searchIconColorHover:"rgb(39, 140, 255)",
  searchIconMargin:"3vmax",
  SearchIconElement:MdSearch,
  cartIcon:true,
  cartIconColor: "rgba(35, 35, 35,0.8)",
  cartIconColorHover:"rgb(39, 140, 255)",
  CartIconElement:MdAddShoppingCart,
  cartIconMargin: "1vmax",
}
function Header() {
    return (
        <div>
    <ReactNavbar {...options} rofileIcon={true} />
        </div>
    )
}

export default Header
