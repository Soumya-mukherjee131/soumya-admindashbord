const jwt = require('jsonwebtoken');
const User = require('../models/user-model')

const authMiddleware = async (req, res, next)=>{
    const token = req.header('Authorization');

    if(!token){
        return res.status(401).json({message: "Unauthorized HTTP, Token not provided"})
    }

    const jwToken = token.split(" ")[1];
    console.log('token from auth middleware', jwToken);

    try{
        const isVerified = jwt.verify(jwToken, process.env.JWT_SECRET_KEY);
        const userData = await User.findOne({email:isVerified.email}).select({password: 0,});
        console.log(userData);

        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }
        
        req.user = userData;
        req.token = token;
        req.userID = userData._id;
        next();
    }catch(error){
        return res.status(401).json({message: "Unauthorized HTTP, Token notprovided"})
    }
}


module.exports = authMiddleware;