const mongoose=require('mongoose')
var productSchema=mongoose.Schema({
    name:{type:String},
    detail:{type:String},
    price:{type:String},
    image:{type:String},
    category:{type:String},
    admin:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'admins'
    } 
})
var Product=module.exports=mongoose.model("products",productSchema)
module.exports.updateProduct=function(id,data,cb){
    Product.findByIdAndUpdate(id,data,cb)
}