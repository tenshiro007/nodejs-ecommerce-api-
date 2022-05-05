const express=require('express')
const router=express.Router()
const productController=require('../controller/product')

//get all product
router.get('/',productController.showAllProduct)

//get product details
router.get('/:id',productController.getProductDetails)

//add product 
router.post('/',productController.addProduct)

//update product
router.put('/:id',productController.updateProduct)

// //delete product
router.delete('/:id',productController.deleteProduct)

module.exports=router

