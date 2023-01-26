const express = require('express')
const router = express.Router()

const { register, login, logout } = require('../controllers/authController')
const { getAllUsers, getSingleUser, showCurrentUser, updateUser } = require('../controllers/userController')
const { authenticateUser } = require('../middleware/authentication')

router.route('/account').post(register).get(authenticateUser, getAllUsers)
router.route('/account/:id').get(authenticateUser, getSingleUser).put(authenticateUser, updateUser)
router.route('/authenticate').post(login).delete(authenticateUser, logout).get(authenticateUser, showCurrentUser)
module.exports = router
