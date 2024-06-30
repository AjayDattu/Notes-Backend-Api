const express = require('express')

const {singupUser ,loginUser} = require('../controllers/userControllers')


const router = express.Router()

router.post('/login',loginUser)


router.post('/singup',singupUser)


module.exports = router