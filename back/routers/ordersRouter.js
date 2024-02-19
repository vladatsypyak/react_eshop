const express = require('express');
const {authMiddleware} = require("../middleware/authMiddleware");
const {createOrder, getUserOrders, deleteUserOrder} = require("../controllers/ordersService");
const router = express.Router();

/**
 * @swagger
 * paths:
 *   /api/orders:
 *     post:
 *       tags:
 *         - orders
 *       summary: Create new order
 *       description: Create a new order
 *       security:
 *         - BearerAuth: []
 *       consumes:
 *         - application/json
 *       produces:
 *         - application/json
 *       parameters:
 *         - in: body
 *           name: body
 *           description: Request body containing order information
 *           required: true
 *           schema:
 *             type: object
 *             properties:
 *               items:
 *                 type: array
 *                 description: Array of items
 *               price:
 *                 type: string
 *                 description: Total price of order
 *               userData:
 *                 type: object
 *                 description: User data including phone, email
 *       responses:
 *         200:
 *           description: Order successfully created
 *         401:
 *           description: Unauthorized. User is not authenticated.*/


router.post('/', authMiddleware, createOrder);



/**
 * @swagger
 * /api/orders:
 *   get:
 *     tags:
 *       - orders
 *     summary: Get user orders
 *     description: Get user orders
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: array of user orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *       401:
 *         description: Unauthorized. User is not authenticated.
 */
router.get('/', authMiddleware, getUserOrders);



/**
 * @swagger
 * /api/orders:
 *   delete:
 *     tags:
 *       - orders
 *     summary: delete user order
 *     description: delete user order
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully deleted
 *       401:
 *         description: Unauthorized. User is not authenticated.
 */
router.delete('/', authMiddleware, deleteUserOrder)


module.exports = {
   ordersRouter: router,
};
