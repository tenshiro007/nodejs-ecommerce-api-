const mongoose=require('mongoose')
var customerSchema=mongoose.Schema({
    first_name:{type:String,default:null},
    last_name:{type:String,default:null},
    email:{type:String,unique:true},
    cart:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'carts' 
    },
    transaction:[{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'transactions' 
    }]
})
var Customer =module.exports=mongoose.model("customers",customerSchema)
module.exports.updateCustomer=function(id,data,cb){
    Customer.findByIdAndUpdate(id,data,cb)
}