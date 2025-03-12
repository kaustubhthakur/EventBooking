const express = require('express')
const app = express();
const port = 6969
const cors = require('cors')
const cookieparser = require('cookie-parser')
const mongoose = require('mongoose')
const eventrouter = require('./routes/events')
require('dotenv').config();
app.use(cors());
app.use(express.json());
app.use(cookieparser());
const connection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB)
        console.log('db is connected...')
    } catch (error) {
        console.error(error);
    }
}
connection();

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})
