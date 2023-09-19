const express = require('express');
const { deleteFromImages } = require('../controllers/imageController');
const router = express.Router();
const verifyToken = require('../utils/verifyToken');


//delete image from images => item_id, image_url
router.post('/delete', verifyToken, deleteFromImages);


module.exports = router