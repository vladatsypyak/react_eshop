const express = require('express');
//
const router = express.Router();
const {registerUser, loginUser, forgotPassword, getUserProfile, deleteUserProfile, changeUserPassword, editUserProfile} = require('../controllers/usersService');
const {authMiddleware} = require('../middleware/authMiddleware');
//
router.post('/auth/register', registerUser);
router.post('/auth/login', loginUser);
router.post('/auth/forgot_password', forgotPassword);
router.get('/users/me', authMiddleware, getUserProfile);
router.delete('/users/me', authMiddleware, deleteUserProfile);
router.patch('/users/me/password', authMiddleware, changeUserPassword);
router.patch('/users/me/edit', authMiddleware, editUserProfile);


module.exports = {
    usersRouter: router,
};
