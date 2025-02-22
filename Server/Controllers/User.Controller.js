
const User = require('../models/user.model');
const sendMail = require('../utils/sendMail');
const sendToken = require('../utils/sendToken');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
// const otp = require('.env')
// const otp_expiry = require('.env')

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        //  const avatar = req.files.avatar;
        //  console.log('Avatar:', avatar);



        // Check if user already exists
        let user = await User.findOne({ email }).select('+password');
        if (user) {
            return res.status(400).json({ success: false, error: 'User already exists' });
        }

        // Upload avatar to cloudinary
    //     const myCloud = await cloudinary.uploader.upload(avatar.tempFilePath,{
    //         folder:"todo-app"
    //     }
    // )

       
 
        // Generate OTP and expiry
        const otp = Math.floor(100000 + Math.random() * 900000);
        const otp_expiry = new Date(Date.now() + Number(process.env.OTP_EXPIRE) * 60 * 1000); // Convert minutes to milliseconds
        console.log("Expires in (seconds):", Number(process.env.OTP_EXPIRE) * 60 * 1000)

      //  fs.rmSync("./temp",{ recursive:true});

        // Create new user
        user = await User.create({
            name,
            email,
            password,
            // avatar: {
            //     public_id: myCloud.public_id,
            //     url: myCloud.secure_url
            // },
            otp,
            otp_expiry
        });

        await sendMail(email,"Verify your account",`Your OTP is ${otp}`);
        // Send token in response
        sendToken(res, user, 201, 'OTP sent successfully');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const verify = async (req, res) => {
    try {
        const otp = Number(req.body.otp);
        console.log("Received OTP:", otp);

        const user = await User.findById(req.user._id);
        console.log("User OTP:", user.otp);
        console.log("OTP Expiry:", user.otp_expiry);
        console.log("Current time:", new Date());

        if (user.otp !== otp || user.otp_expiry < Date.now()) {
            console.log("OTP match:", user.otp === otp);
            console.log("Expiry valid:", user.otp_expiry > Date.now());
            return res.status(400).json({ success: false, error: 'Invalid OTP or OTP has expired' });
        }

        user.isVerified = true;
        user.otp = null;
        user.otp_expiry = null;

        await user.save();
        sendToken(res, user, 200, 'User verified successfully');

    } catch (error) {
        console.error("Verification error:", error);
        res.status(500).json({ error: error.message });
    }
}
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email }).select('+password');

        console.log(user)

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

const logout = async (req, res) => {
    try {
        res.cookie('token', null, {
            expires: new Date(Date.now()),
            httpOnly: true
        });

        res.status(200).json({ success: true, message: 'Logged out successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


const addTask = async (req, res) => {
    const { task, description } = req.body;

    try {
        const user = await User.findById(req.user._id);
        user.tasks.push({
            task,
            description,
            completed: false,
            createdAt: Date.now()
        });
        await user.save();
        res.status(200).json({ success: true, message: 'Task added successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


const removeTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const user = await User.findById(req.user._id);
        user.tasks = user.tasks.filter((task) => task._id.toString() !== taskId.toString());
        await user.save();
        res.status(200).json({ success: true, message: 'Task removed successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const user = await User.findById(req.user._id);
        const task = user.tasks.find((task) => task._id.toString() === taskId.toString());

        if (!task) {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }

        // Toggle the completed status of the task
        task.completed = !task.completed;

        await user.save();
        res.status(200).json({ success: true, message: 'Task updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });

    }
}

const getMyProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        res.status(200).json({ success: true, user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateProfile = async (req, res) => {
    try {
        const { name } = req.body;
        const avatar = req.files.avatar;

        console.log(avatar)

        const user = await User.findById(req.user._id);
        user.name = name;
   

        if(avatar){
          //  await cloudinary.uploader.destroy(user.avatar.public_id);
            const myCloud = await cloudinary.uploader.upload(avatar.tempFilePath,{
                folder:"todo-app"
            }
        );
      //  fs.rmSync("./tmp",{recursive:true});


        user.avatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url
        }


        await user.save();
        res.status(200).json({ success: true, message: 'Profile updated successfully' });
    }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updatePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const user = await User.findById(req.user._id).select('+password');

        // Check if current password is correct
        const isMatch = await user.comparePassword(currentPassword);
        if (!isMatch) {
            return res.status(400).json({ success: false, error: 'Current password is incorrect' });
        }

        // Update password
        user.password = newPassword;
        await user.save();
        sendToken(res, user, 200, 'Password updated successfully');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        const otp = Math.floor(100000 + Math.random() * 900000);

        user.resetPasswordOtp = otp;
        user.resetPasswordOtpExpiry = new Date(Date.now() + Number(process.env.OTP_EXPIRE) * 60 * 1000);

        await user.save();

        const message = `Your OTP for resetting password is ${otp} if you did not request this please ignore this email.`;
        // Send OTP to user's email
        // await sendEmail(user.email, otp, 'Reset Password OTP');
        await sendMail(email, 'OTP for Resetting Password', message);



        res.status(200).json({ success: true, message: 'OTP sent to your email' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


const resetPassword = async (req, res) => {
    try {
        const { otp, newPassword } = req.body;
        console.log('OTP:', otp);
        console.log('New Password:', newPassword);

        const user = await User.findOne({
            resetPasswordOtp: otp,
            resetPasswordOtpExpiry: { $gt: Date.now() }
        });

        console.log('User:', user);

        if (!user) {
            return res.status(400).json({ success: false, error: 'Invalid OTP or OTP has expired' });
        }

        user.password = newPassword;
        user.resetPasswordOtp = undefined;
        user.resetPasswordOtpExpiry = undefined;
        await user.save();

        res.status(200).json({ success: true, message: 'Password reset successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}




module.exports = {
    register,
    verify,
    login,
    logout,
    addTask,
    removeTask,
    updateTask,
    getMyProfile,
    updateProfile,
    updatePassword,
    forgotPassword,
    resetPassword
}; 