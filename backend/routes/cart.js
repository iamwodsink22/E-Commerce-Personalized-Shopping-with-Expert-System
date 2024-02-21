const Cart = require("../models/Cart.js");
const Product=require("../models/Product.js")


const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken.js");

const router = require("express").Router();

router.post('/addtocart',async(req,res)=>{

    const presentCart=await Cart.find({email:req.body.email})
    if(presentCart.length==0){
        
    const newProduct=new Cart(req.body)
    try{
    const cart=await newProduct.save()
    return res.status(200).json(cart)
    }
    catch(error){
        console.log(error)
    }
}
if(presentCart.length!=0){
    
    try{
        const productArr=presentCart[0].products
        
        productArr.push(req.body.products[0])
        
        const newCart={'email':req.body.email,'products':productArr}
        
        await Cart.findOneAndUpdate({email:req.body.email},newCart)
    }
    catch(error){
        console.log(error)
    }
}
})

router.get('/getcart/:email',async(req,res)=>{
    product_id_arr=[]
    fullProducts=[]
    const allProduct= await Cart.find({email:req.params.email})
    product_ids=allProduct[0].products
    for(i=0;i<product_ids.length;i++){
        
     product_id_arr.push(product_ids[i].product_id)
    }

    for(i=0;i<product_ids.length;i++){
    const fullProduct= await Product.find({product_id:product_id_arr[i]})
    fullProducts.push(fullProduct)
    
    }
    
    return res.status(200).json(fullProducts)
})

router.delete('/removefromcart',(req,res)=>{
     Cart.findOneAndDelete(email=req.body.email,product_id=req.body.product_id)
     return res.status(200)
})
module.exports=router