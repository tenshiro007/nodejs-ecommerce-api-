const Cart=require('../model/cart')
const Customer=require('../model/customer')
const mongoose=require('mongoose')

exports.showAllCarts=async(req,res)=>{
    try{
        const cart=await Cart.find({})
        res.status(200).send(cart)
    }catch(err){
        console.log(err);
    }
}

exports.addProductToCart=async(req,res)=>{
    try{
        const pid=req.params.pid
        const quantity=Number(req.body.quantity)
        if(!pid){
            res.status(400).send("Not found params id")
        }
        if(!quantity){
            res.status(400).send("Quantity of product is required")
        }
        if(req.user){
            var objectId = mongoose.Types.ObjectId(req.user.user_id);
            var objectPId = mongoose.Types.ObjectId(pid);
            const oldCart=await Cart.find({customer:objectId}).populate("products")

            // console.log(oldCart._id,objectPId,quantity);
            if(oldCart.length>0){
                
                var isMatch=false
                for(i of oldCart[0].products){
                    if(String(i.product._id)===pid){
                        isMatch=true
                    }
                }
                console.log(isMatch);
                if(isMatch){

                    Cart.deleteProduct(oldCart[0]._id,objectPId,function(err,result){
                        Cart.addProduct(oldCart[0]._id,objectPId,quantity,function(err,result){
    
                            res.status(200).send("Add product to cart successfully")
                        })
                        // if(err)console.log(err)
                        // res.send('delete')
                
                    })
                }else{
                    Cart.addProduct(oldCart[0]._id,objectPId,quantity,function(err,result){
    
                        res.status(200).send("Add product to cart successfully")
                    })

                }
                // res.status(200).send(oldCart)

            }else{
                const addnewCart=await Cart.create({
                    customer:objectId,
                })

                 Cart.addProduct(addnewCart._id,objectPId,quantity,function(err,result){

                     Customer.findByIdAndUpdate(objectId,{
                         cart:addnewCart._id
                     },function(err,result2){

                         res.status(200).send("Add product to cart successfully")
                     })
                 })


            }
        }
    }catch(err){
        console.log(err);
    }
}

exports.clearCart=async(req,res)=>{
    try{
        if(req.user){
            var objectId = mongoose.Types.ObjectId(req.user.user_id);
           
            const oldCart=await Cart.find({customer:objectId})

            if(oldCart.length>0){
                
                const deleteCart=await Cart.findByIdAndDelete(oldCart[0]._id)

                const deleteCartCustomer=await Customer.findByIdAndUpdate(objectId,{
                    $unset:{
                        cart:oldCart[0]._id
                    }
                })
                
                res.status(200).send("Remove cart successfully")
            }else{
                res.status(400).send("Not found any cart ,Add product to get cart")
            }
        }
    }catch(err){
        console.log(err);
    }
}

exports.getCartCustomer=async(req,res)=>{
    try{
        if(req.user){
            var objectId = mongoose.Types.ObjectId(req.user.user_id);
           
            const cart=await Cart.find({customer:objectId})

            if(cart.length>0){
                
                res.status(200).json({cart})
            }else{
                res.status(400).send("Not found any cart ,Add product to get cart")
            }
        }
    }catch(err){
        console.log(err);
    }
}