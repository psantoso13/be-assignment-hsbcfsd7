const express = require('express');
const {allProducts, productById}= require('../controllers/product.controller');
const {verifyToken}= require('../middleware/verifyToken');

const router = express.Router();   

router.get('/', allProducts);     
router.get('/:productId', productById)     

module.exports = router;