const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const userValidation = require('../validators/userValidator');


router.route('/')
.post(
    userValidation.createUserValidator,
    userController.createUser
)
.get(userController.getAllUsers);


router.route('/:id')
.get(
    userValidation.getUserValidator,
    userController.getUser
)
.patch(
    userValidation.updateUserValidator,
    userController.updateUser
)
.delete(
    // userValidation.deleteUserValidator,
    userController.deleteUser
);


module.exports = router;