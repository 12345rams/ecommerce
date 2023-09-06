import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@mui/material";

const ProductCard = ({ product }) => {
  const options = {
    value: 3,
    readOnly: true,
    precision: 0.5,
  };
  return (
    
    <Link className="productCard" to={`/product/${product._id}`}>
      <img src="https://source.unsplash.com/A0mSSCEVh9A" alt={product.name} />
      <p>{product.name}</p>
      <h3> ₹{product.price}</h3>
      <div>
        <Rating {...options}  size="small" />{" "} 
        <span className="productCardSpan">
          {" "}
          ({product.numOfReviews} Reviews)
        </span>
      </div>
     
    </Link>

  );
};

export default ProductCard;