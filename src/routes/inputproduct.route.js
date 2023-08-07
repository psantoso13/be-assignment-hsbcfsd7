// src/route/user.route.js
const express = require('express')
const {create, hapusProduk, lihatProduk, updateProduk}= require('../controllers/inputproduct.controller')
const {verifyToken} = require ('../middleware/verifyToken')

const router = express.Router()     

router.post('/', verifyToken, create)   
router.get('/:ambilProduk', lihatProduk)
router.put('/:gantiProduk', verifyToken, updateProduk)
router.delete('/:namaProduk', verifyToken, hapusProduk)


module.exports = router;