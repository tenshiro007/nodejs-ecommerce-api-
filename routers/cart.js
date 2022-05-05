const express=require('express')
const router=express.Router()
const cartController=require('../controller/cart')

//get cart of that customer
router.get('/',cartController.getCartCustomer)

//delete cart of that customer
router.delete('/',cartController.clearCart)

//get all carts
router.get('/all',cartController.showAllCarts)

//add product to cart and update product quantity
router.post('/product/:pid',cartController.addProductToCart)


module.exports=router