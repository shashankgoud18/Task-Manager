const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const isAuthenticated = async (req, res, next) => {
    try{
        const {token } = req.cookies;
        if(!token){
            return res.status(401).json({success:false,message:"Please login first"})
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        next();
    }catch(err){
        return res.status(401).json({success:false,message:"Please login first"})
    }
}

module.exports = isAuthenticated;