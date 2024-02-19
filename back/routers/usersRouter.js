const express = require('express');
//
const router = express.Router();
const passport = require("passport")
const {
    registerUser,
    loginUser,
    forgotPassword,
    getUserProfile,
    deleteUserProfile,
    changeUserPassword,
    editUserProfile
} = require('../controllers/usersService');
const {authMiddleware} = require('../middleware/authMiddleware');
//
router.post('/auth/register', registerUser);
router.post('/auth/login', loginUser);
router.post('/auth/forgot_password', forgotPassword);
router.get('/me', authMiddleware, getUserProfile);
router.delete('/me', authMiddleware, deleteUserProfile);
router.patch('/me/password', authMiddleware, changeUserPassword);
router.patch('/me/edit', authMiddleware, editUserProfile);


module.exports = {
    usersRouter: router,
};
