const mongoose=require('mongoose')
var adminSchema=mongoose.Schema({
    first_name:{type:String,default:null},
    last_name:{type:String,default:null},
    email:{type:String,unique:true},
    products:[{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'products' 
    }],
    categories:[{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'categories' 
    }]
})
const Admin =module.exports=mongoose.model("admins",adminSchema)
module.exports.addProduct=function(id,pid,cb){
    Admin.findOneAndUpdate(
        {
            _id:id
        },{
            $push:{
                "products":pid
            }
        },{
            safe:true,
            upsert:true
        },cb
    )  
}
module.exports.addCategory=function(id,pid,cb){
    Admin.findOneAndUpdate(
        {
            _id:id
        },{
            $push:{
                "categories":pid
            }
        },{
            safe:true,
            upsert:true
        },cb
    )  
}

module.exports.deleteCategory=function(id,cid,cb){
    Admin.findOneAndUpdate( 
        { _id : id} , 
        { $pull : { "categories":cid } },cb 
    )
}

module.exports.deleteProduct=function(id,cid,cb){
    Admin.findOneAndUpdate( 
        { _id : id} , 
        { $pull : { "products":cid } },cb 
    )
}

module.exports.updateAdmin=function(id,data,cb){
    Admin.findByIdAndUpdate(id,data,cb)
}
