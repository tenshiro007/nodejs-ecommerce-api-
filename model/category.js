const mongoose=require('mongoose')
var categorySchema=mongoose.Schema({
    name:{type:String,default:null},
    admin:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'admins' 
    }
})
var Category=module.exports=mongoose.model("categories",categorySchema)
