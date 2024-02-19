
const express = require('express');
const router = express.Router();

const {getPriceRange} = require("../controllers/appService");


/**
 * @swagger
 * /api/filters/pricerange:
 *   get:
 *     tags:
 *       - filters
 *     summary: Get price range
 *     description: Get price range in specified filters
 *     parameters:
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
 */
router.get('/pricerange', getPriceRange); //змінила

module.exports = {
    filterRouter: router,
};
