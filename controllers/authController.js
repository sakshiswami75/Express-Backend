const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const signup = async(req,res)=>{
    try{
        const {username,email,password,role}=req.body
        const existingUser=await User.findOne({username})
        if(existingUser){
            return res.status(400).json({   
            message:"User already exists"
        })
    }
        const hashedPassword=await bcrypt.hash(password,10)
        const newUser=new User({username,password:hashedPassword,email,role})
        await newUser.save()
        res.status(201).json({
            message:"User created successfully",
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            message:"Server Error"
        })
    }
}

const login = async(req,res)=>{
    try{
        const {username,password}=req.body
        const user=await User.findOne({username})
        if(!user){
            return res.status(400).json({
                message:"User does not exist"
            })
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch) return res.status(400).json({
            message:'Invalid credentials'
        }) 
        const token = jwt.sign(
    { 
        id: user._id, 
        role: user.role 
    }, 
    process.env.JWT_SECRET, 
    { expiresIn: '1h' }
);
        
        res.status(200).json({
            token: token,
            message:"Login successful",
            user:{
                id:user._id,
                role:user.role,
                username:user.username,
                email:user.email
            }
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            message:"Server Error"
        })
    }
}



module.exports={
    signup,
    login
}