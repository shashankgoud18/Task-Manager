const mongoose = require('mongoose');
const { type } = require('os');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        required: true,
        type: String,
        minLength: [6, 'Password must be at least 6 characters'],
        select: false
    },
    // avatar:{
    //     public_id: String,
    //     url:{
    //         type: String
    //     },
    // },
    CreatedAt:{
        type: Date,
        default: Date.now
    },
    tasks:[
        {
            title:String,
            description: String,
            completed:Boolean
        },
    ],
    otp:Number,
    otp_expiry:Date,
    resetPasswordOtp:Number,
    resetPasswordOtpExpiry:Date,
})


UserSchema.pre('save', async function(next){
    if(!this.isModified('password')){
      return  next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
    next()
})

UserSchema.methods.getJwtToken = function () {
    const expiresIn = Number(process.env.JWT_COOKIE_EXPIRE) * 24 * 60 * 60;

    console.log("Expires in (seconds):", expiresIn);
    console.log("Expires in (days):", process.env.JWT_COOKIE_EXPIRE);

    return jwt.sign(
        { id: this._id },
        process.env.JWT_SECRET,
        { expiresIn }
    );
};

UserSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password)
}


//UserSchema.index({otp_expiry:1},{expireAfterSeconds:0})

module.exports = mongoose.model('User', UserSchema);