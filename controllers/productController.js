const products = require("../models/products")
const User = require("../models/User")

const addProduct = async(req,res)=>{
    try{
        const {name,brand,description,price,stockQuantity}=req.body
        const exsistingProduct=await products.findOne({name})
        if(exsistingProduct){
            return res.status(400).json({
                msg:'product already exist'
            })
        }

        const newProduct = new products({
            name,
            description,
            price,
            stockQuantity,
            brand,
            uploadedBy:req.user.id
        })

        await newProduct.save()
        res.status(201).json({
            msg:`product added successfully`,
            data:newProduct
        })

    }catch(err){
        console.log(err)
        res.status(500).json({
            message:"Server Error"
        })
    }
}

const getProducts = async (req,res)=>{
    try{
        const product = await products.find().sort({createdAt:-1})
        res.status(200).json({
            msg:'successfully getting products',
            products:product
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            message:"Server Error"
        })
    }
}


const deleteProduct = async(req,res)=>{
    try{
        const product = await products.findByIdAndDelete(req.params.id)
        if(!product) return res.status(400).json({
            msg:"product not found"
        })
        res.status(200).json({
            msg:'successfully deleted product'
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            message:"Server Error"
        })
    }
}


const updateProduct= async(req,res)=>{
    try{
        const productid=req.params.id
        const {name,brand,description,price,stockQuantity}=req.body
        const findProduct = await products.findOne({_id:productid})
        if(!findProduct){
            return res.status(404).json({
                msg:`product not found`
            })
        }
        const updatedFields={}
        if(name) updatedFields.name=brand
        if(brand) updatedFields.brand=brand
        if(stockQuantity) updatedFields.stockQuantity=stockQuantity
        if(price) updatedFields.price=price
        if(description) updatedFields.description=description
        const updateProduct=await products.findByIdAndUpdate(
            productid,
            {
                set:updatedFields
            },
            {
                new:true
            }
        )

        if(!updateProduct){
            return res.status(404).json({
                msg:"invalid Product id is incorrect"
            })
        }
        res.status(201).json({
            msg:`successfully updated Product`,
            updated_details:updateProduct
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            message:"Server Error"
        })
    }
}


module.exports= {addProduct,getProducts,deleteProduct,updateProduct}