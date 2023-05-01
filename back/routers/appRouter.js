const express = require('express');

const router = express.Router();
// const {authMiddleware} = require('../middleware/authMiddleware');
const {getCategories, getCategoryByValue, getItemsByCategory} = require("../controllers/appService");

router.get('/app/categories', getCategories);
router.get('/app/categories/:type', getCategoryByValue);
router.get('/app/items/:category', getItemsByCategory);


module.exports = {
    appRouter: router,
};
