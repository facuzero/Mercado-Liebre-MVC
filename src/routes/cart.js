// ************ Require's ************
const express = require('express');
const router = express.Router();

const {show} = require('../controllers/cartController');

router.get('/show', show); 

module.exports = router;


