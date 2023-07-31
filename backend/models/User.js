const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username : {type : String, required: true, unique : true},
    email : {type : String, required : true, unique : true},
    password : {type : String, required: true},
    isAdmin : {
        type : Boolean,
        default : false
    },
    role : {
        type : String,
        default : "buyer",
        required : false
    },
    image : {
        type : String,
        required : false,
        default : ""
    }

},{timestamps : true})

module.exports = mongoose.model("User", userSchema)