const User = require("../models/User.js")
const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require('./verifyToken.js')
const CryptoJS = require('crypto-js')

const router = require('express').Router()

router.put('/:id', verifyTokenAndAuthorization, async(req,res) => {
    if(req.body.password){
        req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString()
    }

    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {$set: req.body}, {new:true})


        return res.status(200).json(updatedUser)
    }
    catch(error){
        return res.status(500).json(error)
    }
})


router.delete('/:id', verifyTokenAndAdmin, async(req,res) => {
    try{
        await User.findByIdAndDelete(req.params.id)
        return res.status(200).json("User has been deleted")
    }
    catch(error){
        return res.status(500).json(error)
    }
})


router.get('/find/:id', verifyTokenAndAdmin, async(req,res) => {
    try{
        const user = await User.findById(req.params.id)
        const {password,...others} = user._doc;
        return res.status(200).json(others)
    }
    catch(error){
        return res.status(500).json(error)
    }
})


router.get('/',verifyTokenAndAdmin, async(req,res) => {
    try{
        const allUsers = await User.find();
        return res.status(200).json(allUsers)
    }
    catch(error){
        return res.status(500).json(error)
    }
})
module.exports = router;