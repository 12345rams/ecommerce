 import { Button } from '@mui/material'
 import SearchIcon from '@mui/icons-material/Search';
import React, { Fragment, useState} from 'react'
import './search.css'
import MetaData from "../layout/MetaData";
import { useNavigate } from 'react-router-dom';
 const Search=()=>{
  const navigate = useNavigate();
 const [keyword,setKeyword]=useState("");
 const searchSubmitHandler=(e)=>{
    e.preventDefault();
    if (keyword.trim()) {
        navigate(`/products/${keyword}`);
      } else {
        navigate("/products");
      }
 }
    return (
        <Fragment>
            <MetaData title="Search A Product -- ECOMMERCE" />
            <div className='search'>
                <form onSubmit={searchSubmitHandler}> 
                <Button variant="contained"><SearchIcon /></Button>
                <input
          type="text"
          placeholder="Search a Product ..."
          onChange={(e) => setKeyword(e.target.value)}
        />
                <Button variant="contained" type='submit'>search</Button>
                </form>
            
            </div>
        </Fragment>
    )
 }
 
 export default Search
 