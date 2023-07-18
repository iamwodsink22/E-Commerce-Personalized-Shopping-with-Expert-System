const Product = require('../models/Product.js')

const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require('./verifyToken.js')

const router = require('express').Router();


router.post('/', verifyTokenAndAdmin, async(req,res) => {
    const newProduct = new Product(req.body)

    try{
        const savedProduct = await newProduct.save();
        return res.status(200).json(savedProduct)
    }
    catch(err){
        return res.status(500).json(err)
    }
})

router.put('/:id', verifyTokenAndAdmin, async(req,res) => {
    try{
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, {new : true})
        return res.status(200).json(updatedProduct)
    }
    catch(err){
        return res.status(500).json(err)
    }
   
})

router.delete('/:id', verifyTokenAndAdmin, async(req,res) => {
    try{
        await Product.findByIdAndDelete(req.params.id)
        return res.status(200).json("The product has been deleted")
    }
    catch(err){
        return res.status(500).json(err)
    }
})


router.get("/find/:id", async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json(err);
    }
  });



router.get('/', async(req,res) => {
    const qCategory = req.query.category;


    try{
        let products;
        if(qCategory){
            products = await Product.find({
                categories: {
                  $in: [qCategory],
                }
        })
    }
        else{
            products = await Product.find()
        }

        return res.status(200).json(products)
    }
    catch(error){
        return res.status(500).json(error)
    }

})
module.exports = router;
