const express = require('express');
const { addItem, 
        getItems, 
        getItem,
        deleteItem,
        EditItem,
    } = require('../controllers/itemController');
const verifyToken = require('../utils/verifyToken');


const router = express.Router();

//Get all the items
router.get('/', getItems)


//Get a single item
router.get('/:id',getItem);

//POST a new item
router.post('/',verifyToken, addItem)


//DELETE an Item
router.delete('/:id',verifyToken, deleteItem)

//EDIT an Item
router.put('/:id',verifyToken, EditItem)


module.exports = router