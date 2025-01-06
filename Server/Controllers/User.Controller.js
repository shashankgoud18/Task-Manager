const User = require('../models/user.model');
const sendMail = require('../utils/sendMail');
const sendToken = require('../utils/sendToken');

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
       // const {avatar} = req.files;
     
        let user = await User.findOne({ email });

        if(user){
            return res.status(400).json({success:false, error: 'User already exists' });
        }

        const otp = Math.floor(100000 + Math.random() * 900000);
        const otp_expiry = Date.now() + process.env.OTP_EXPIRY * 60 * 1000;


         user = await User.create({
            name,
            email,
            password,
            //avatar,
            otp,
            otp_expiry
        });

        await sendMail(email, 'OTP for Verification', `Your OTP is ${otp}`);
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { register };