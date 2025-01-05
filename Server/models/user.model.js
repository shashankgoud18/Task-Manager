const mongoose = require('mongoose');
const { type } = require('os');

const UserSchema = new mongoose.Schema({
    name:{
        typw: String,
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
    avatar:{
        public_id: String,
        url:{
            type: String
        },
    },
    CreatedAt:{
        type: Date,
        default: Date.now
    },
    task:{
        type:String,
        description: String,
        completed:Boolean
    },
    otp:Number,
    otp_expiry:Date
})

module.exports = mongoose.model('User', UserSchema);