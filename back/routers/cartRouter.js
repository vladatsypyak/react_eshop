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
 *   /api/carts/current/items/{itemId}:
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
 *         - in: path
 *           name: itemId
 *           schema:
 *             type: string
 *           required: true
 *           example: "123"
 *           description: id of the item to put in the cart
 *         - in: body
 *           name: quantity
 *           description: object with quantity
 *           required: true
 *           schema:
 *             type: object
 *             properties:
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
router.post('/current/items/:itemId', authMiddleware, addToCart);


/**
 * @swagger
 * paths:
 *   /api/carts/current/remove:
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
 * /api/carts/current/items:
 *   get:
 *     tags:
 *       - cart
 *     summary: Get user cart items
 *     description: Get user cart items
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: object with user cart items
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       401:
 *         description: Unauthorized. User is not authenticated.
 */
router.get('/current/items', authMiddleware,  getUserCartItems);

/**
 * @swagger
 * /api/carts/current/items/{itemId}:
 *   delete:
 *     tags:
 *       - cart
 *     summary: delete cart item
 *     description: delete cart item
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *         - in: path
 *           name: itemId
 *           schema:
 *             type: string
 *           required: true
 *           example: "123"
 *           description: id of the item to delete
 *     responses:
 *       200:
 *         description: Successfully deleted
 *       401:
 *         description: Unauthorized. User is not authenticated.
 */
router.delete('/current/items/:itemId', authMiddleware, deleteCartItem)

/**
 * @swagger
 * /api/carts/current:
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
router.delete('/current', authMiddleware,  clearCart);

module.exports = {
    cartRouter: router,
};
