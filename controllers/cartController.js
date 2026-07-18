const products = require("../models/products");
const User = require("../models/User");

const addCart = async(req,res)=>{
    const userId = req.user.id;
    const {productId,quantity}=req.body
    const qty=Number(quantity)
    try{
        const user = await User.findById(userId).populate('cart.product')

        const product = await products.findById(productId)
        if(!product) return res.status(404).json({
            msg:`product not found`
        })

        const exsistingItem = user.cart.find(item => item.product._id.toString()=== productId)
        if(exsistingItem){
            exsistingItem.quantity+=qty;
        }else{
            user.cart.push({product:productId,quantity:qty})
        }
        await user.save()
        res.status(201).json({
            msg:'product added to cart',
            cart:user.cart
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            message:"Server Error"
        })
    }
}

const getCart=async(req,res)=>{
    const userId = req.user.id
    try{
        const user = await User.findById(userId).populate('cart.product')
        res.status(200).json({
            cart:user.cart
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            message:"Server Error"
        })
    }
}
const removeCart=async(req,res)=>{
    const userId=req.user.id
    const {productId}=req.body
    try{
        const user=await User.findById(userId)
        user.cart=user.cart.filter(item=>item.product.toString()!==productId)
        await user.save()
        res.status(201).json({
            msg:"Product removed from cart",
            cart:user.cart
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            message:"Server Error"
        })
    }
}

module.exports={addCart,getCart,removeCart}