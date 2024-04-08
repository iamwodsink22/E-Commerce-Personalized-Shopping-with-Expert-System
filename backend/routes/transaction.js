const Transaction=require('../models/Transaction.js')
const Product=require('../models/Product.js')
const router=require("express").Router()

router.get(`/history/:id`,async(req,res)=>{
var productids=[]
var products=[]

userId=Number(req.params.id)

const history=await Transaction.find({user_id:userId})
history.forEach((item,index)=>{
    productids.push(item.product_id)
})

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

    await Transaction.deleteMany({user_id:id})

    return res.status(200)
    }
    catch(err){
        console.log(err)
        res.status(500)
    }
})
module.exports=router