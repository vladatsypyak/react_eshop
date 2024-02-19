const express = require('express');
const {
    removeOneFromCart,
    getUserCartItems,
    addToCart,
    deleteCartItem,
    clearCart
} = require("../controllers/cartService");
const {authMiddleware} = require("../middleware/authMiddleware");
const router = express.Router();


/**
 * @swagger
 * paths:
 *   /api/cart:
 *     post:
 *       tags:
 *         - cart
 *       summary: Add item to cart
 *       security:
 *       - BearerAuth: []
 *       consumes:
 *         - application/json
 *       produces:
 *         - application/json
 *       parameters:
 *         - in: body
 *           name: item
 *           description: object with item
 *           required: true
 *           schema:
 *             type: object
 *             properties:
 *               itemId:
 *                 type: integer
 *                 description: ID of the item to add to cart.
 *                 example: 123
 *               quantity:
 *                 type: integer
 *                 description: number of items to add to cart
 *                 example: 2
 *       responses:
 *         200:
 *           description: Successfully added to cart
 *         401:
 *           description: Unauthorized. User is not authenticated.
 */
router.post('/', authMiddleware, addToCart);


/**
 * @swagger
 * paths:
 *   /api/cart/remove:
 *     post:
 *       tags:
 *         - cart
 *       summary: Remove one item from cart
 *       description: Remove one item from cart
 *       security:
 *         - BearerAuth: []
 *       consumes:
 *         - application/json
 *       produces:
 *         - application/json
 *       parameters:
 *         - in: body
 *           name: body
 *           description: Request body containing item ID to be removed from cart
 *           required: true
 *           schema:
 *             type: object
 *             properties:
 *               itemId:
 *                 type: integer
 *                 description: ID of the item to remove from cart.
 *                 example: 123
 *       responses:
 *         200:
 *           description: Successfully removed from cart
 *         401:
 *           description: Unauthorized. User is not authenticated.*/

router.post('/remove', authMiddleware,  removeOneFromCart);

/**
 * @swagger
 * /api/cart:
 *   get:
 *     tags:
 *       - cart
 *     summary: Get user cart items
 *     description: Get user cart items
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: array of user cart items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *       401:
 *         description: Unauthorized. User is not authenticated.
 */
router.get('/', authMiddleware,  getUserCartItems);

/**
 * @swagger
 * /api/cart:
 *   delete:
 *     tags:
 *       - cart
 *     summary: delete cart item
 *     description: delete cart item
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully deleted
 *       401:
 *         description: Unauthorized. User is not authenticated.
 */
router.delete('/', authMiddleware, deleteCartItem)

/**
 * @swagger
 * /api/cart/clear:
 *   delete:
 *     tags:
 *       - cart
 *     summary: clear cart
 *     description: clear cart
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully cleared
 *       401:
 *         description: Unauthorized. User is not authenticated.
 */
router.delete('/clear', authMiddleware,  clearCart);

module.exports = {
    cartRouter: router,
};
