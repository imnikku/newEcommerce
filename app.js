const express=require('express');
const app=express();

const errorMiddleware=require('./middleware/error')

// json configure 
app.use(express.json())


// import all router 
const productRoute=require('./routes/productRoute');


app.use('/api/v1',productRoute);




// middleware error ...................
app.use(errorMiddleware)




module.exports=app;