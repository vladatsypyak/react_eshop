const express = require('express');

const router = express.Router();
// const {authMiddleware} = require('../middleware/authMiddleware');
const {getCategories, getCategoryByValue, getItemsByCategory, getCategoryFilters, getFilterValues, getFilteredItems,
    getItemsByTitle, addToFavourite, getFavourites, deleteFavourite
} = require("../controllers/appService");

router.get('/app/categories', getCategories);
router.get('/app/categories/:type', getCategoryByValue);
router.get('/app/items/filter', getFilteredItems);
router.get('/app/items/search', getItemsByTitle);

router.get('/app/items/:category', getItemsByCategory);
router.get('/app/filters/:category', getCategoryFilters);
router.get('/app/filters/:category/:filter', getFilterValues);

router.post('/app/favourite', addToFavourite);
router.get('/app/favourite/:userId', getFavourites);
router.delete('/app/favourite', deleteFavourite);




module.exports = {
    appRouter: router,
};
