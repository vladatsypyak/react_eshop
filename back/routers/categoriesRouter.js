const express = require('express');

const router = express.Router();

const { getCategories, getCategoryByType} = require("../controllers/categoriesService");


/**
 * @swagger
 * /api/categories:
 *   get:
 *     description: Get categories
 *     responses:
 *       200:
 *         description: Array of categories
 *
 */
router.get('/', getCategories);

/**
 * @swagger
 * /api/categories/{type}:
 *   get:
 *       summary: Get a category by type
 *       tags:
 *         - categories
 *       responses:
 *          200:
 *           description: category object
 *       parameters:
 *         - in: path
 *           name: type
 *           schema:
 *             type: string
 *           required: true
 *           example: tea
 *           description: string of the category type to get
 */

router.get('/:type', getCategoryByType);


module.exports = {
   categoriesRouter: router,
};
