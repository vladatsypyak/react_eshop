// const express = require('express');
//
// const router = express.Router();
// const {registerUser, loginUser, forgotPassword, getUserProfile, deleteUserProfile, changeUserPassword} = require('../controllers/usersService');
// const {authMiddleware} = require('../middleware/authMiddleware');
//
// router.post('/auth/register', registerUser);
// router.post('/auth/login', loginUser);
// router.post('/auth/forgot_password', forgotPassword);
// router.get('/users/me', authMiddleware, getUserProfile);
// router.delete('/users/me', authMiddleware, deleteUserProfile);
// router.patch('/users/me/password', authMiddleware, changeUserPassword);
//
// module.exports = {
//     usersRouter: router,
// };
