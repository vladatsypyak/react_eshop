const express = require('express');

const router = express.Router();
// const {authMiddleware} = require('../middleware/authMiddleware');
const {
    getCategories, getCategoryByValue, getItemsByCategory, getCategoryFilters, getFilterValues, getFilteredItems,
    getItemsByTitle, addToFavourite, getFavourites, deleteFavourite, getItemById, getUserFavourites, addToCart,
    getUserCartItems, removeOneFromCart, deleteCartItem, searchCategories, createOrder
} = require("../controllers/appService");


router.get('/app/categories/search', searchCategories);
router.get('/app/categories', getCategories);

router.get('/app/categories/:type', getCategoryByValue);
router.get('/app/items/filter', getFilteredItems);
router.get('/app/items/search', getItemsByTitle);

router.get('/app/item/:id', getItemById);


router.get('/app/items/:category', getItemsByCategory);
router.get('/app/filters/:category', getCategoryFilters);
router.get('/app/filters/:category/:filter', getFilterValues);

router.post('/app/favourite', addToFavourite);
router.get('/app/favourite/:userId', getUserFavourites);
router.delete('/app/favourite', deleteFavourite);

router.post('/app/cart/remove', removeOneFromCart);
router.get('/app/cart/:userId', getUserCartItems);
router.post('/app/cart', addToCart);
router.delete('/app/cart', deleteCartItem);

router.post('/app/order/add', createOrder);







module.exports = {
    appRouter: router,
};
