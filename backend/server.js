const express = require('express')
const app = express();
const port = 6969
const mongoose = require('mongoose')
require('dotenv').config();
const connection = async()=>{
    try {
   await mongoose.connect(process.env.MONGODB)
   console.log('db is connected...')
    } catch (error) {
        console.error(error);
    }
}

app.listen(port,() =>{
console.log(`server is running on port ${port}`)
})