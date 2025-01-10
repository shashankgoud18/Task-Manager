const express = require('express');
const router = express.Router();
const {register,verify,login,logout,addTask,removeTask,updateTask,getMyProfile,updateProfile,updatePassword,forgotPassword,resetPassword} = require('../Controllers/User.Controller');
const isAuthenticated = require('../middleware/auth');


router.post('/register',register);

router.post('/verify',isAuthenticated,verify);

router.post('/login',login);
router.get('/logout',isAuthenticated,logout);

router.post('/newTask',isAuthenticated,addTask);

router.delete('/removeTask/:taskId',isAuthenticated,removeTask);
router.get('/updateTask/:taskId',isAuthenticated,updateTask);

router.get('/me',isAuthenticated,getMyProfile);

router.put('/updateProfile',isAuthenticated,updateProfile);
router.put('/updatePassword',isAuthenticated,updatePassword);

router.post('/forgotPassword',forgotPassword);
router.put('/resetPassword',resetPassword);




module.exports = router;