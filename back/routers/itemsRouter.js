const express = require('express');
const {getFilteredItems, getItemById} = require("../controllers/appService");

const router = express.Router();


/**
 * @swagger
 * /api/items:
 *   get:
 *     tags:
 *       - items
 *     summary: Get filtered items
 *     description: Retrieve a list of items based on specified filters.
 *     parameters:
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         example: price
 *         description: Sort items by a specified field.
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *         example: "1"
 *         description: Page number for pagination.
 *       - in: query
 *         name: itemsPerPage
 *         schema:
 *           type: string
 *         example: "5"
 *         description: Number of items to display per page.
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         example: tea
 *         description: Filter items by category.
 *       - in: query
 *         name: priceMin
 *         schema:
 *           type: string
 *         example: "100"
 *         description: Filter items with a price greater than or equal to this value.
 *       - in: query
 *         name: filter
 *         schema:
 *           type: string
 *         example: brand=Stanley
 *         description: Additional filters in the format "key=value".
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *
 *       404:
 *         description: No items found matching the specified criteria.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: No items found matching the specified criteria.
 */

router.get('/', getFilteredItems);

/**
 * @swagger
 * /api/items/{id}:
 *   get:
 *       summary: Get an item by id
 *       tags:
 *         - items
 *       responses:
 *          200:
 *           description: item object
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: string
 *           required: true
 *           example: 654a21dd81cf89b949fea399
 *           description: id of the item to get
 */
router.get('/:id', getItemById);

module.exports = {
    itemsRouter: router,
};
