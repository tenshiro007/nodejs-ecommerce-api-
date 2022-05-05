const express=require('express')
const router=express.Router()
const transactionController=require('../controller/transaction')

router.post('/',transactionController.addProductToCart)
module.exports=router