// ************ Require's ************
const express = require('express');
const router = express.Router();

const {register,login, processLogin,logout, processRegister} = require('../controllers/usersController');

router.get('/login', login); 
router.get('/register', register); 

router.post('/login', processLogin); 
router.post('/register', processRegister); 
router.get('/logout', logout); 

module.exports = router;


