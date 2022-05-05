const mongoose=require('mongoose')
var cartSchema=mongoose.Schema({
    customer:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'customers' 
    },
    products:[{
        product:{type: mongoose.Schema.Types.ObjectId, ref: 'products'},
        quantity:Number
    }]
},{timestamps:true})

var Cart=module.exports=mongoose.model("carts",cartSchema)
module.exports.addProduct= function(id,pid,q,cb){
    Cart.findOneAndUpdate(
        {
            _id:id
        },{
            $push:{
                "products":{
                    product:pid,
                    quantity:q
                }
            }
        },{
            safe:true,
            upsert:true
        },cb
    )  
}

module.exports.deleteProduct=function(id,cid,cb){
    Cart.findOneAndUpdate( 
        { _id : id} , 
        { $pull : { "products":{
            product:cid
        }} },cb 
    )
}