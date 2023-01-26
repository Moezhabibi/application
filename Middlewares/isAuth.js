const User = require('../Models/User')
var jwt = require('jsonwebtoken')


const isAuth =async(req,res,next)=>{
try {
   
    const token =  req.header('Authorized')

    var decoded = jwt.verify(token,process.env.privatekey)

    if (!decoded){
        return res.status(400).send({errors : [{Msg : "Token invalid"}]})
    }

    const Found = await User.findById(decoded.id)
    console.log(Found)
    req.user = Found
    next()
    

} catch (error) {
    res.status(500).send({errors : [{Msg:"No authorized"}]})
}
}

module.exports = isAuth