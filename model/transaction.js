const mongoose=require('mongoose')

var transactionSchema=mongoose.Schema({
    customer:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'customers' 
    },
    products:[{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'products' 
    }]
},{timestamps:true})

module.exports=mongoose.model("transactions",transactionSchema)