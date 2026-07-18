const express = require('express')
const authMiddleware = require('../middleware/authMidleware')
const adminMiddleware = require('../middleware/adminMiddleware')

const router=express.Router()

router.get('/auth',authMiddleware,(req,res)=>{
    res.send('this page is for authorized person only')
}

)
router.get('/admin',authMiddleware,adminMiddleware,(req,res)=>{
    res.send('this page is for admin only')
}

)
module.exports = router