const jwt =require('jsonwebtoken')
const secrete=process.env.TOKEN_KEY


const verifyToken=(req,res,next)=>{
    const token=req.body.token || req.query.token || req.headers['x-access-token']

    if(!token){
        return res.status(403).send("A token is required for authentication")
    }

    try {
        var decoded = jwt.verify(token,secrete);
        req.user=decoded
        console.log(req.user);
      } catch(err) {
        return res.status(401).send("Invalid Token")
      }
    return next()
}

const onlyAdmin=(req,res,next)=>{
    const token=req.body.token || req.query.token || req.headers['x-access-token']

    if(!token){
        return res.status(403).send("A token is required for authentication")
    }

    try {
        var decoded = jwt.verify(token,secrete);
        req.user=decoded
        
        console.log(req.user);
        if(req.user.role!=="admin"){
            return res.status(403).send("Required admin role")
        }
      } catch(err) {
        return res.status(401).send("Invalid Token")
      }
    return next()
}
const onlyCustomer=(req,res,next)=>{
    const token=req.body.token || req.query.token || req.headers['x-access-token']

    if(!token){
        return res.status(403).send("A token is required for authentication")
    }

    try {
        var decoded = jwt.verify(token,secrete);
        req.user=decoded
        
        console.log(req.user);
        if(req.user.role!=="customer"){
            return res.status(403).send("Required customer role")
        }
      } catch(err) {
        return res.status(401).send("Invalid Token")
      }
    return next()
}

module.exports={verifyToken,onlyAdmin,onlyCustomer}