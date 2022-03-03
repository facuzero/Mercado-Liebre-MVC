<<<<<<< HEAD
// ************ Require's ************
const express = require('express');
const router = express.Router();

const {show,add} = require('../controllers/cartController');

router.get('/show', show); 
router.post('/:id',add)

module.exports = router;


=======
const express = require('express');
const router = express.Router();

const {show, add} = require('../controllers/cartController');

// api/cart
router
    .get('/show', show)
    .post('/:id',add)

module.exports = router;
>>>>>>> f054dced792a758fe68767fe79a5717cf8231466
