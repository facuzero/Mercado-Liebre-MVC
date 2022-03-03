const express = require('express');
const router = express.Router();

const {show, add} = require('../controllers/cartController');

// api/cart
router
    .get('/show', show)
    .post('/:id',add)

module.exports = router;
