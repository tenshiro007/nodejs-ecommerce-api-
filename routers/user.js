const userController=require('../controller/user')
const express=require('express')
const router=express.Router()

//login get user, token
router.post('/login',userController.login)

//register get user ,token
router.post('/register',userController.register)


//get all user
router.get('/',userController.getAllUser)

//get all admin user
router.get('/admin',userController.getAllAdmin)

//update admin user
router.put('/admin/:id',userController.updateAdmin)

//get all customer user
router.get('/customer',userController.getAllCustomer)

//update customer user
router.put('/customer/:id',userController.updateCustomer)

module.exports=router