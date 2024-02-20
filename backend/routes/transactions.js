const Transaction=require('../models/Transaction')
const Product=require('../models/Product.js')
const router=require("express").Router()

router.get(`/history/:id`,async(req,res)=>{
var productids=[]
var products=[]
console.log(req.params.id)
userId=Number(req.params.id)
console.log(typeof(userId))
const history=await Transaction.find({user_id:userId})
history.forEach((item,index)=>{
    productids.push(item.product_id)
})
console.log(productids)
var products=[]
for(const item of productids ){
    const product=await Product.findOne({product_id:item})
    
    products.push(product)
}
 
  return res.status(200).json(products)
})

router.delete('/clear/:id',async(req,res)=>{
    try{
    id=req.params.id
    console.log('cleared')
    await Transaction.deleteMany({user_id:id})
    console.log('del')
    return res.status(200)
    }
    catch(err){
        console.log(err)
        res.status(500)
    }
})
module.exports=router