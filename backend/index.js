const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const authRoute = require('./routes/auth.js')
const productRoute = require('./routes/product.js')

const app = express();


dotenv.config()


mongoose.connect(process.env.MONGO_CONNECTION).then(() => {
    console.log("Connection To DB successful")
}).catch(error => {
    console.log("Error Connecting To DB")
    console.log(error)
})


// app.use(cors())
app.use(express.json())
app.use('/api/auth', authRoute)
app.use('/api/products', productRoute)

app.listen(process.env.PORT || 8000, () => {
    console.log("Listening to port 8000")
})