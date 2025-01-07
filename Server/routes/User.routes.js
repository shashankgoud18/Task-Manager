const express = require('express');
const router = express.Router();
const {register} = require('../Controllers/User.Controller');
const {verify} = require('../Controllers/User.Controller');
const isAuthenticated = require('../middleware/auth');
const {login} = require('../Controllers/User.Controller');
const {logout} = require('../Controllers/User.Controller');
const {addTask} = require('../Controllers/User.Controller');
const {removeTask} = require('../Controllers/User.Controller');
const {updateTask} = require('../Controllers/User.Controller');



router.post('/register',register);

router.post('/verify',isAuthenticated,verify);

router.post('/login',login);
router.get('/logout',isAuthenticated,logout);

router.post('/newTask',isAuthenticated,addTask);

router.delete('/removeTask/:taskId',isAuthenticated,removeTask);
router.get('/updateTask/:taskId',isAuthenticated,updateTask);


module.exports = router;