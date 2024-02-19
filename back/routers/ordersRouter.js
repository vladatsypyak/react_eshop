const express = require('express');
const {authMiddleware} = require("../middleware/authMiddleware");
const {createOrder, getUserOrders, deleteUserOrder} = require("../controllers/ordersService");
const router = express.Router();

/**
 * @swagger
 * /api/orders:
 *   post:
 *     tags:
 *       - orders
 *     summary: Create new order
 *     description: Create a new order
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               items:
 *                 type: array
 *                 description: array of items
 *               price:
 *                 type: string
 *                 description: total price of order
 *               userData:
 *                 type: object
 *                 description: user data including phone, email
 *     responses:
 *       200:
 *         description: Order successfully created
 *       401:
 *         description: Unauthorized. User is not authenticated.
 */


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
