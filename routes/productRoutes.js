const express = require('express')
const { addProduct, getProducts, deleteProduct, updateProduct } = require('../controllers/productController')
const authMiddleware = require('../middleware/authMidleware')
const adminMiddleware = require('../middleware/adminMiddleware')

const router=express.Router()

router.post('/addproducts',authMiddleware,adminMiddleware,addProduct)
router.get('/getall',getProducts)
router.delete('/delete/:id',deleteProduct)
router.put('/update/:id',updateProduct)
module.exports=router