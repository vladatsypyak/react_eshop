const express = require('express');
//
const router = express.Router();
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

/**
 * @swagger
 * paths:
 *   /api/users/auth/register:
 *     post:
 *       tags:
 *         - user
 *       summary: sign up
 *       description: Create a new user
 *       consumes:
 *         - application/json
 *       produces:
 *         - application/json
 *       parameters:
 *         - in: body
 *           name: body
 *           description: Request body containing user information
 *           required: true
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 required: true
 *               password:
 *                 type: string
 *                 required: true
 *               name:
 *                 type: string
 *               otherData:
 *                 type: string
 *                 description: other user data including surname, patronymic, address
 *       responses:
 *         200:
 *           description: User successfully created
 *         400:
 *           description: Server error.*/
router.post('/auth/register', registerUser);

/**
 * @swagger
 * paths:
 *   /api/users/auth/login:
 *     post:
 *       tags:
 *         - user
 *       summary: sign up
 *       description: Create a new user
 *       consumes:
 *         - application/json
 *       produces:
 *         - application/json
 *       parameters:
 *         - in: body
 *           name: body
 *           description: Request body containing login information
 *           required: true
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 required: true
 *               password:
 *                 type: string
 *                 required: true
 *       responses:
 *         200:
 *           description: successfully logged in
 *         400:
 *           description: not authorized.*/

router.post('/auth/login', loginUser);

/**
 * @swagger
 * paths:
 *   /api/users/auth/login:
 *     post:
 *       tags:
 *         - user
 *       summary: sign in
 *       description: user logs in
 *       consumes:
 *         - application/json
 *       produces:
 *         - application/json
 *       parameters:
 *         - in: body
 *           name: body
 *           description: Request body containing login information
 *           required: true
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 required: true
 *               password:
 *                 type: string
 *                 required: true
 *       responses:
 *         200:
 *           description: successfully logged in
 *         400:
 *           description: not authorized.*/

// router.post('/auth/forgot_password', forgotPassword);

/**
 * @swagger
 * /api/users/current:
 *   get:
 *     tags:
 *       - user
 *     summary: Get user profile
 *     description: Get user profile
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: user object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       401:
 *         description: Unauthorized. User is not authenticated.
 */

router.get('/', authMiddleware, getUserProfile);

/**
 * @swagger
 * /api/users/current:
 *   delete:
 *     tags:
 *       - user
 *     summary: delete user profile
 *     description: delete user profile
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: successfully deleted
 *       401:
 *         description: Unauthorized. User is not authenticated.
 */
router.delete('/', authMiddleware, deleteUserProfile);

/**
 * @swagger
 * paths:
 *   /api/users/current/password:
 *     patch:
 *       tags:
 *         - user
 *       summary: change password
 *       description: change password
 *       security:
 *       - BearerAuth: []
 *       consumes:
 *         - application/json
 *       produces:
 *         - application/json
 *       parameters:
 *         - in: body
 *           name: body
 *           description: Request body containing login information
 *           required: true
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *                 required: true
 *               newPassword:
 *                 type: string
 *                 required: true
 *       responses:
 *         200:
 *           description: successfully changed
 *         400:
 *           description: not authorized.*/

router.patch('/users/current/password', authMiddleware, changeUserPassword);

/**
 * @swagger
 * paths:
 *   /api/users/current:
 *     patch:
 *       tags:
 *         - user
 *       summary: edit user info
 *       description: edit user info
 *       security:
 *       - BearerAuth: []
 *       consumes:
 *         - application/json
 *       produces:
 *         - application/json
 *       parameters:
 *         - in: body
 *           name: body
 *           description: Request body containing user information to change
 *           required: true
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *       responses:
 *         200:
 *           description: successfully changed
 *         400:
 *           description: not authorized.*/
router.patch('/current', authMiddleware, editUserProfile);


module.exports = {
    usersRouter: router,
};
