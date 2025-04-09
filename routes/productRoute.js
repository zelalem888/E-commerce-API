const express = require('express')
const router = express.Router()
const {createProduct,allProducts,searchProduct} = require('../controllers/productController')

router.post('/newproduct', createProduct)

router.post('/search', searchProduct)

router.get('/products', allProducts)



module.exports = router