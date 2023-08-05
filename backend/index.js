const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const authRoute = require('./routes/auth.js')
const productRoute = require('./routes/product.js')
const userRoute = require('./routes/user.js')
const loading_into_db = require('./utils/loading_into_db.js')

const app = express();


dotenv.config()


mongoose.connect(process.env.MONGO_CONNECTION).then(() => {
    console.log("Connection To DB successful")
    loading_into_db()
  
}).catch(error => {
    console.log("Error Connecting To DB")
    console.log(error)
})


// app.use(cors())
app.use(express.json())
app.use('/api/auth', authRoute)
app.use('/api/products', productRoute)
app.use('/api/users', userRoute)
app.listen(process.env.PORT || 8000, () => {
    console.log("Listening to port 8000")
})