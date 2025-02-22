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
router.put('/updateTask/:taskId',isAuthenticated,updateTask);

router.get('/me',isAuthenticated,getMyProfile);

router.put('/updateProfile',isAuthenticated,updateProfile);
router.put('/updatePassword',isAuthenticated,updatePassword);

router.post('/forgotPassword',forgotPassword);
router.put('/resetPassword',resetPassword);




module.exports = router;



// import express from "express";
// import {
//   addTask,
//   forgetPassword,
//   getMyProfile,
//   login,
//   logout,
//   register,
//   removeTask,
//   resetPassword,
//   updatePassword,
//   updateProfile,
//   updateTask,
//   verify,
// } from "../controllers/User.js";
// import { isAuthenticated } from "../middleware/auth.js";
// import multer from "multer";

// const singleUpload = multer().single("avatar");

// const router = express.Router();

// router.route("/register").post(singleUpload, register);

// router.route("/verify").post(isAuthenticated, verify);

// router.route("/login").post(login);
// router.route("/logout").get(logout);

// router.route("/newtask").post(isAuthenticated, addTask);
// router.route("/me").get(isAuthenticated, getMyProfile);

// router
//   .route("/task/:taskId")
//   .get(isAuthenticated, updateTask)
//   .delete(isAuthenticated, removeTask);

// router.route("/updateprofile").put(isAuthenticated, updateProfile);
// router.route("/updatepassword").put(isAuthenticated, updatePassword);

// router.route("/forgetpassword").post(forgetPassword);
// router.route("/resetpassword").put(resetPassword);

// export default router;