const app=require('./app');
const dotenv=require('dotenv');
const cloudinary=require('cloudinary')
process.on("uncaughtException",(err)=>{
  console.log(`Error:${err.message}`);
  console.log(`Sutting  down the server due to uncaught error handle`);
  process.exit(1);
})

const connectDatabase=require('./config/database')
//config
dotenv.config({path:"backend/config/config.env"});
//connect to database
connectDatabase()

// 
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const server=app.listen(process.env.PORT,()=>{
    console.log(`server is working port:${process.env.PORT}`)
  })
  //unhandeld promises Rejection
 process.on("unhandledRejection",err=>{
  console.log(`Error:${err.message}`);
  console.log(`Sutting  down the server due to unhandled Promise Rejection`);
  server.close(()=>{
    process.exit(1);
  })
 })
  
