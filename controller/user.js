const bcryptjs = require('bcryptjs')
const User=require('../model/user')
const Admin=require('../model/admin')
const Customer=require('../model/customer')
var jwt = require('jsonwebtoken');

exports.register=async(req,res)=>{
    
    try{
        const {first_name,last_name,email,password,role}=req.body
        
        if(!(email && password && first_name && last_name && role)){
            res.status(400).send("All input is required")
        }
        
        const oldUser=await User.findOne({email:email})

        if(oldUser){
            return res.status(409).send("User already exist. Please Login")
        }

        const encryptPassword=await bcryptjs.hashSync(password,10)

        const user=await User.create({
            first_name:first_name,
            last_name:last_name,
            email:email.toLowerCase(),
            password:encryptPassword,
            role:role
        })

        if(user.role.toLowerCase()==="customer"){
            const newCustomer=await Customer.create({
                first_name:first_name,
                last_name:last_name,
                email:email.toLowerCase(),
            })

            const token=jwt.sign({user_id:newCustomer._id,email,role},
                process.env.TOKEN_KEY,
                {
                    expiresIn:"2h"
                })
    
           return  res.status(200).json({user,token})
        }

        if(user.role.toLowerCase()==="admin"){
            const newAdmin=await Admin.create({
                first_name:first_name,
                last_name:last_name,
                email:email.toLowerCase(),
            })
            const token=jwt.sign({user_id:newAdmin._id,email,role},
                process.env.TOKEN_KEY,
                {
                    expiresIn:"2h"
                })
    
           return res.status(200).json({user,token})
        }

    }catch(err){
        console.log(err);
    }
}

exports.login=async(req,res)=>{
    const {email,password}=req.body

    try{
        const user=await User.findOne({email:email})
    
        if(user && (await bcryptjs.compare(password,user.password))){
            const role=user.role

            if(role==="admin"){
                const admin=await Admin.findOne({email:email})

                const id=admin._id
                const token=jwt.sign({user_id:id,email,role},
                    process.env.TOKEN_KEY,
                    {
                        expiresIn:"1h"
                    })
                 return res.status(200).json({user,token})
            }

            if(role==="customer"){
                const customer=await Customer.findOne({email:email})

                const id=customer._id
                console.log(id);
                const token=jwt.sign({user_id:id,email,role},
                    process.env.TOKEN_KEY,
                    {
                        expiresIn:"1h"
                    })
                 return res.status(200).json({user,token})
            }
        }else{
            res.status(400).send("Invalid Credentials")
        }


    }catch(err){
        console.log(err);
    }

}

exports.updateAdmin=async(req,res)=>{
    try{
        const {first_name,last_name,email,password,role}=req.body

        if(!(first_name ||last_name)){
            return res.status(400).send("Please add some field to change like first_name,last_name")
        }
        if(email || password){
            return res.status(400).send("Can not change email-password")
        }

        if(role){
            return res.status(400).send("Can not change role")
        }

        const uid=req.params.id
    
        if(!uid){
            res.status(400).send("Not found params id")
        }

        Admin.updateAdmin(uid,{first_name,last_name},function(err,result){
            if(err){
                console.log(err);
            }
            
            if(result){
                User.findOneAndUpdate({email:result.email},{first_name,last_name},function(err,result2){
                    if(err)console.log(err)
                    res.status(200).send("Update Admin successfully")
                })
            }else{
                res.status(400).send("Not found admin id")
            }
        })


    }catch(err){
        console.log(err);
    }
}
exports.updateCustomer=async(req,res)=>{
    try{
        const {first_name,last_name,email,password,role}=req.body

        if(!(first_name ||last_name)){
            return res.status(400).send("Please add some field to change like first_name,last_name")
        }
        if(email || password){
            return res.status(400).send("Can not change email-password")
        }

        if(role){
            return res.status(400).send("Can not change role")
        }

        const uid=req.params.id
    
        if(!uid){
            res.status(400).send("Not found params id")
        }

        Customer.updateCustomer(uid,{first_name,last_name},function(err,result){

            if(err){
                console.log(err);
            }
            if(result){
                User.findOneAndUpdate({email:result.email},{first_name,last_name},function(err,result2){
                    
                    if(err)console.log(err)
                    res.status(200).send("Update Customer successfully")
                })
            }else{
                 res.status(400).send("Not found cutomer id")
            }
        })

    }catch(err){
        console.log(err);
    }
}

exports.getAllUser=async(req,res)=>{
    try{
        const user=await User.find({},{ '_id': 0})

        res.status(200).json({user});
    }catch(err){
        console.log(err);
    }
}
exports.getAllCustomer=async(req,res)=>{
    try{
        const user=await Customer.find({})

        res.status(200).json({user});
    }catch(err){
        console.log(err);
    }
}
exports.getAllAdmin=async(req,res)=>{
    try{
        const user=await Admin.find({}).populate('products categories')

        res.status(200).json({user});
    }catch(err){
        console.log(err);
    }
}