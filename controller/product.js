const Product=require('../model/product')
const Admin=require('../model/admin')
const Category=require('../model/category')
const mongoose=require('mongoose')

exports.addProduct=async(req,res)=>{
    const {name,detail,image,price,category}=req.body

    if(!(name && detail && image && price && category )){
        res.status(400).send("All input is required")
    }

    const categoryCheck=await Category.find({name:category})

    console.log(categoryCheck.length);
    if(!(categoryCheck.length>0)){
        return res.status(400).send("Not found category");
    }
    
    try{
        if(req.user){
            var objectId = mongoose.Types.ObjectId(req.user.user_id);
    
            const product=await Product.create({
                name:name,
                detail,detail,
                image:image,
                price:price,
                category:category,
                admin:objectId
            })

            Admin.addProduct(objectId,product._id,function(err,result){
                if(err) console.log(err);
      
                if(result){
                    // console.log(result);
                    res.status(200).send("Product add successfully");
                }
            })
    
        }else{
            res.status(400).send("Please verify yourself");
        }
    }catch(err){
        console.log(err)
    }
}
exports.showAllProduct=async(req,res)=>{
    try{
        const product =await Product.find({})
        console.log(product);
        res.status(200).json({product})

    }catch(err){
        console.log(err);
    }
}


exports.updateProduct=async(req,res)=>{
    try{
        const {name,detail,image,price,category}=req.body
        const pid=req.params.id
    
        if(!pid){
            res.status(400).send("Not found params id")
        }

         Product.updateProduct(pid,{name,detail,image,price,category},function(err,result){
             console.log(result);
             res.status(200).send("Update Product successfully")
         })

    
    }catch(err){
        console.log(err);
    }
}

exports.getProductDetails=async(req,res)=>{
    try{
        const pid=req.params.id
    
        if(!pid){
            res.status(400).send("Not found params id")
        }

        const product=await Product.findOne({_id:pid})

        res.status(200).json({product})
    
    }catch(err){
        console.log(err);
    }
}

exports.deleteProduct=async(req,res)=>{
    try{
        const pid=req.params.id
    
        if(!pid){
            res.status(400).send("Not found params id")
        }

        const deleteProduct=await Product.findByIdAndRemove(pid)

        var objectId = mongoose.Types.ObjectId(req.user.user_id);
        Admin.deleteProduct(objectId,pid,function(err,result){
            if(err) console.log(err);
  
            if(result){
                // console.log(result);
                res.status(200).send("Delete successfully")
            }
        })
        
    }catch(err){
        console.log(err);
    }
}