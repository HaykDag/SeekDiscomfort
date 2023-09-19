const express = require('express');
const { addIntoBasket, deleteFrombasket } = require('../controllers/basketController');
const router = express.Router();
const verifyToken = require('../utils/verifyToken');


//Add item into basket => item_id, user_id
router.post('/', verifyToken, addIntoBasket);

//delete item from basket => item_id, user_id
router.delete('/:id', verifyToken, deleteFrombasket);


module.exports = router