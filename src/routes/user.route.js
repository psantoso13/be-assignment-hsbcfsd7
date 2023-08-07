// src/route/user.route.js
const express = require('express')
const {create, login, update, deleteUser}= require('../controllers/user.controller')
const {verifyToken} = require ('../middleware/verifyToken')

const router = express.Router()     

router.post('/', create)    // saat mengakses alamat url akan diarahkan ke variable create (file user.controller.js)
router.post('/login', login)     //// saat mengakses alamat url /login akan diarahkan ke variable (function) login (file user.controller.js)
router.put('/update', verifyToken, update)
router.delete('/delete', verifyToken, deleteUser)


module.exports = router;