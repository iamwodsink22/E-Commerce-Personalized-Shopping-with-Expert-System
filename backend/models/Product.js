const mongoose=  require('mongoose')

const productSchema = new mongoose.Schema({
    title : {type : String, required : true, unique : true},
    desc : {type : String, default : ""},
    img : {type : String, default : ""},
    categories : {type : String, default : ""},
    size : {type : String, default : ""},
    color : {type : String, default : ""},
    price : {type : String, default : "0"}
}, {timestamps : true})

module.exports = mongoose.model("Product", productSchema)
