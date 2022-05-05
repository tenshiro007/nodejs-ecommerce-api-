const mongoose=require('mongoose')

var userSchema=mongoose.Schema({
    first_name:{type:String,default:null},
    last_name:{type:String,default:null},
    email:{type:String,unique:true},
    password:{type:String},
    role:{type:String,default:"customer"}
})

var User=module.exports=mongoose.model("users",userSchema)

module.exports.updateUser=function(id,data,cb){
    User.findByIdAndUpdate(id,data,cb)
}