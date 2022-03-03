// ************ Require's ************
const express = require('express');
const router = express.Router();

const {show,add} = require('../controllers/cartController');

router.get('/show', show); 
router.post('/:id',add)

module.exports = router;


