require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

//app
const app=express();

//middleware

app.use(express.json());
connectDB()

// router
app.use('/api',require('./routes/authRoutes'))
app.use('/api/product',require('./routes/productRoutes'))
app.use('/api/midle',require('./routes/testRoutes'))
app.use('/api/cart',require('./routes/cartRoutes'))
// get server
app.get('/',(req,res)=>{
    res.send('Welcome to the API')
})

// port
const PORT=process.env.PORT

// server 
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})