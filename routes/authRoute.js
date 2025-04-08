const express = require('express');
const router = express.Router();
const {createUser , allUser , createAdmin, logIn} = require('../controllers/authController')

router.get('/users', allUser)

router.post('/login', logIn)

router.post('/register', createUser);

router.post('/admin', createAdmin );


module.exports = router;
