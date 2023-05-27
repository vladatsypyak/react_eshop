const express = require('express');

const router = express.Router();
// const {authMiddleware} = require('../middleware/authMiddleware');
const {
    getCategories, getCategoryByValue, getItemsByCategory, getCategoryFilters, getFilterValues, getFilteredItems,
    getItemsByTitle, addToFavourite, getFavourites, deleteFavourite, getItemById, getUserFavourites, addToCart,
    getUserCartItems
} = require("../controllers/appService");

router.get('/app/categories', getCategories);
router.get('/app/categories/:type', getCategoryByValue);
router.get('/app/items/filter', getFilteredItems);
router.get('/app/items/search', getItemsByTitle);

router.get('/app/item/:id', getItemById);


router.get('/app/items/:category', getItemsByCategory);
router.get('/app/filters/:category', getCategoryFilters);
router.get('/app/filters/:category/:filter', getFilterValues);

router.post('/app/favourite', addToFavourite);
router.get('/app/favourite/:userId', getFavourites);
router.get('/app/favouriteTest/:userId', getUserFavourites);
router.delete('/app/favourite', deleteFavourite);

router.get('/app/cart/:userId', getUserCartItems);
router.post('/app/cart', addToCart);





module.exports = {
    appRouter: router,
};
