const express = require('express');

const router = express.Router();
// const {authMiddleware} = require('../middleware/authMiddleware');
const {getCategories, getCategoryByValue, getItemsByCategory, getCategoryFilters, getFilterValues, getFilteredItems} = require("../controllers/appService");

router.get('/app/categories', getCategories);
router.get('/app/categories/:type', getCategoryByValue);
router.get('/app/items/filter', getFilteredItems);
router.get('/app/items/:category', getItemsByCategory);
router.get('/app/filters/:category', getCategoryFilters);
router.get('/app/filters/:category/:filter', getFilterValues);



module.exports = {
    appRouter: router,
};
