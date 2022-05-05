const express=require('express')
const router=express.Router()
const categoryController=require('../controller/category')

//get all category
router.get('/',categoryController.showAllCategory)

//get all product by category
router.get('/:id',categoryController.showAllProductByCategory)

// add category
router.post('/',categoryController.addCategory)

//update category
router.put('/:id',categoryController.updateCategory)

//delete category
router.delete('/:id',categoryController.deleteCategory)


module.exports=router