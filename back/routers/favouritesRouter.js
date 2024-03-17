const express = require('express');
const {authMiddleware} = require("../middleware/authMiddleware");
const {addToFavourite, getUserFavourites, deleteFavourite} = require("../controllers/appService");

const router = express.Router();


/**
 * @swagger
 * paths:
 *   /api/favourites/{itemId}:
 *     post:
 *       tags:
 *         - favourites
 *       summary: Add user favourite
 *       description: Add an item to the user's favourites.
 *       security:
 *         - BearerAuth: []
 *       consumes:
 *         - application/json
 *       produces:
 *         - application/json
 *       parameters:
 *         - in: path
 *           name: itemId
 *           description: ID of the item to add to favourites.
 *           required: true
 *           example: 123
 *       responses:
 *         200:
 *           description: Successfully added to favourites
 *         401:
 *           description: Unauthorized. User is not authenticated.*/


router.post('/:itemId', authMiddleware, addToFavourite);

/**
 * @swagger
 * /api/favourites:
 *   get:
 *     tags:
 *       - favourites
 *     summary: Get user favourites
 *     description: Get user favourites
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: array of user favourites
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *       401:
 *         description: Unauthorized. User is not authenticated.
 */
router.get('/', authMiddleware, getUserFavourites);


/**
 * @swagger
 * /api/favourites/{itemId}:
 *   delete:
 *     tags:
 *       - favourites
 *     summary: delete user favourite
 *     description: delete user favourite
 *     parameters:
 *        - in: path
 *          name: itemId
 *          description: ID of the item to add to favourites.
 *          required: true
 *          example: 123
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully deleted
 *       401:
 *         description: Unauthorized. User is not authenticated.
 */
router.delete('/:itemId', authMiddleware, deleteFavourite);

module.exports = {
    favouriteRouter: router,
};
