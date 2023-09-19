const express = require('express');
const {getCategories,getOneCategoryById, addCategory, updateCategory,deleteCategory} = require('../controllers/categoryController');
const router = express.Router();
const verifyToken = require('../utils/verifyToken');

//Get all the categories
router.get('/', getCategories);

//Get all the categories
router.get('/:id', getOneCategoryById);

//Add a category
router.post('/', verifyToken, addCategory);

//update category
router.put('/:id', verifyToken, updateCategory);

//delete category
router.delete('/:id', verifyToken, deleteCategory);


module.exports = router