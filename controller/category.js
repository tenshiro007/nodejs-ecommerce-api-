const Category = require("../model/category");
const Product=require('../model/product')
const Admin =require('../model/admin')
const mongoose = require("mongoose");


exports.addCategory = async (req, res) => {
  const { name } = req.body;

  if(!name){
    res.status(400).send("Name category is required")
  }

  try {
    if (req.user) {
      const oldCategory = await Category.findOne({ name: name });

      if (oldCategory) {
        return res.status(409).send("Category already exist.");
      }

      var objectId = mongoose.Types.ObjectId(req.user.user_id);
      const category = await Category.create({
        name: name,
        admin:objectId
      });

      Admin.addCategory(objectId,category._id,function(err,result){
          if(err) console.log(err);

          if(result){
            //   console.log(result);
              res.status(200).send("Category add successfully");
          }
      })
    
    }else{
        res.status(400).send("Please verify yourself");
    }
  } catch (err) {
    console.log(err);
  }
};

exports.showAllCategory = async (req, res) => {
  if (req.user) {
    Category.find({}, function (err, category) {
      if (err) console.log(err);
      if (category) {
        res.status(200).json({ category });
      } else {
        res.status(400).send("Not found any category");
      }
    });
  }else{
    res.status(400).send("Please verify yourself");
  }
};

exports.updateCategory=async(req,res)=>{
    try{
        const {name}=req.body
        const cid=req.params.id
    
        if(!cid){
            res.status(400).send("Not found params id")
        }
    
        if(!name){
            res.status(400).send("All input is required")
        }

        const update=await Category.findOneAndUpdate({_id:cid},{name:name})

        res.status(200).send("Update category successfully")
    }catch(err){
        console.log(err);
    }
}

exports.showAllProductByCategory=async(req,res)=>{
    try{
        const cid=req.params.id
    
        if(!cid){
            res.status(400).send("Not found params id")
        }

        const category=await Category.find({_id:cid})

        const name=category[0].name
        const product=await Product.find({category:name})

        res.status(200).json({product})
    }catch(err){
        console.log(err);
    }
}

exports.deleteCategory=async(req,res)=>{
    try{
        const cid=req.params.id
    
        if(!cid){
            res.status(400).send("Not found params id")
        }

        const deleteCategory=await Category.findByIdAndRemove(cid)

        var objectId = mongoose.Types.ObjectId(req.user.user_id);
        Admin.deleteCategory(objectId,cid,function(err,result){
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
