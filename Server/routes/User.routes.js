const express = require('express');
const router = express.Router();
const {register} = require('../Controllers/User.Controller');
const {verify} = require('../Controllers/User.Controller');
const isAuthenticated = require('../middleware/auth');
const {login} = require('../Controllers/User.Controller');


router.post('/register',register);
router.post('/verify',isAuthenticated,verify);
router.post('/login',login);


module.exports = router;