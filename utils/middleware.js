const jwt = require('jsonwebtoken')
const verifyToken = (req,res,next) =>{
    try{
        const token = req.headers.authorization.split(' ')[1]
        // console.log(token)
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_KEY)
        next()
    }
    catch(err){
        return res.status(400).json({
            message:"Session Expired",
            data:err
        })
    }
}
module.exports = verifyToken