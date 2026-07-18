const express = require('express')
const { addCart, getCart, removeCart } = require('../controllers/cartController')
const authMiddleware = require('../middleware/authMidleware')

const router = express.Router()
router.post('/addcart',authMiddleware,addCart)
router.get('/getcart',authMiddleware,getCart)
router.delete('/removeCart',authMiddleware,removeCart)
module.exports=router