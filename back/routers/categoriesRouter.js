const express = require('express');

const router = express.Router();

const { getCategories, getCategoryByType} = require("../controllers/categoriesService");
const {getCategoryFilters, getFilterValues} = require("../controllers/appService");


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


/**
 * @swagger
 * /api/categories/{category}/filters:
 *   get:
 *       summary: Get available category filters
 *       tags:
 *         - categories
 *       responses:
 *          200:
 *           description: filters array
 *       parameters:
 *         - in: path
 *           name: category
 *           schema:
 *             type: string
 *           required: true
 *           example: tea
 *           description: category name
 */
router.get('/:category/filters', getCategoryFilters); //categories/categoryID/filter-categories


/**
 * @swagger
 * /api/categories/{category}/filters/{filter}:
 *   get:
 *       summary: Get available filter values
 *       tags:
 *         - categories
 *       responses:
 *          200:
 *           description: filter values array
 *       parameters:
 *         - in: path
 *           name: category
 *           schema:
 *             type: string
 *           required: true
 *           example: tea
 *           description: category name
 *         - in: path
 *           name: filter
 *           schema:
 *             type: string
 *           required: true
 *           example: sort
 *           description: filter name
 */
router.get('/:category/filters/:filter', getFilterValues); //app/categories/categoryID/filter-categories/filter-categoryid


module.exports = {
   categoriesRouter: router,
};
