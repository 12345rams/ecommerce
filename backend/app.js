const express=require('express');
const dotenv=require('dotenv')
dotenv.config({path:"backend/config/config.env"})
const errorMiddleware=require('./middleware/error')
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const app= express();
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())
  
//Route Import
const product =require("./routes/productRoute")
const user = require("./routes/userRoute");
const payment = require("./routes/paymentRoute");
app.use("/api/v1",product)
app.use("/api/v1", user);
app.use("/api/v1", payment);
//Middleware for error
app.use(errorMiddleware)
module.exports=app