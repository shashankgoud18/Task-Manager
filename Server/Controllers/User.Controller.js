
const User = require('../models/user.model');
const sendMail = require('../utils/sendMail');
const sendToken = require('../utils/sendToken');

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        let user = await User.findOne({ email }).select('+password');
        if (user) {
            return res.status(400).json({ success: false, error: 'User already exists' });
        }

        // Generate OTP and expiry
        const otp = Math.floor(100000 + Math.random() * 900000);
        const otp_expiry = new Date(Date.now() + Number(process.env.OTP_EXPIRY) * 60 * 1000); // Convert minutes to milliseconds
         console.log("Expires in (seconds):", Number(process.env.OTP_EXPIRY) * 60 * 1000)

        // Create new user
        user = await User.create({
            name,
            email,
            password,
            avatar: {
                public_id: '',
                url: ''
            },
            otp,
            otp_expiry
        });

        // Send OTP via email
        await sendMail(email, 'OTP for Verification', `Your OTP is ${otp}`);

        // Send token in response
        sendToken(res, user, 201, 'OTP sent successfully');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const verify = async (req, res) => {
    try {
        const otp = Number(req.body.otp);
         
        const user = await User.findById(req.user._id);

        if (user.otp !== otp || user.otp_expiry < Date.now()) {
            return res.status(400).json({ success: false, error: 'Invalid OTP or OTP has expired' });
        }

        user.isVerified = true;
        user.otp = null;
        user.otp_expiry = null;

        await user.save();
        sendToken(res, user, 200, 'User verified successfully');

    }catch (error) {
        res.status(500).json({ error: error.message });
    }
}


const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(400).json({ success: false, error: 'Invalid email or password' });
        }

        // Check if password is correct
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ success: false, error: 'Invalid email or password' });
        }

        // Send token in response
        sendToken(res, user, 200, 'Login successful');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { register, verify,login };