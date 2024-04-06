const express = require("express");
const router = express.Router();
const userControllers=require('../controllers/usersContrller')



// router.route('/').get(userControllers.getAllUsers).post(userControllers.createNewUsers).patch(userControllers.updateUsers).delete(userControllers.deleteUsers)
router.route('/').get(userControllers.getAllUser).delete(userControllers.deleteUser).post(userControllers.createNewUser).patch(userControllers.updateUser)

module.exports=router