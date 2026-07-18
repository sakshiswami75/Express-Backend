const mongoose = require('mongoose')
const products = require('./products')
const cartSchema=new mongoose.Schema({
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product',
        required:true
    },
    quantity:{
        type:Number,
        default:1
    }
})
const UserSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
            type:String,
            required:true,
            unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['admin','user']
        ,default:'user'
    },
    cart:[cartSchema]
    
},{timestamps:true})

module.exports=mongoose.model('User',UserSchema)