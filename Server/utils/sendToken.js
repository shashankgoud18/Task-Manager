const sendToken = (res,user,statusCode,message) => {

    const token = user.getJwtToken()
    const options = {
        httpOnly:true,
        expires:new Date(Date.now() + Number( process.env.JWT_COOKIE_EXPIRE * 60 * 60 * 1000)),
    }


    const userData = {
        _id:user._id,
        name:user.name,
        email:user.email,
        avatar:user.avatar,
        tasks:user.tasks,
        verified:user.verified
    }
    
    res.status(statusCode)
    .cookie('token',token,options)
       .json({
        success:true,
        message,
        user:userData
    }) 
}

module.exports = sendToken