const express = require('express');

const router = express.Router();
// const {authMiddleware} = require('../middleware/authMiddleware');
const {
     getItemsByCategory, getCategoryFilters, getFilterValues, getFilteredItems,
    addToFavourite, getFavourites, deleteFavourite, getItemById, getUserFavourites,
    getPriceRange
} = require("../controllers/appService");
const {searchCategories, getCategories, getCategoryByValue} = require("../controllers/categoriesService");
const {removeOneFromCart, getUserCartItems, addToCart, deleteCartItem, clearCart} = require("../controllers/cartService");
const {createOrder, getUserOrders} = require("../controllers/ordersService");


router.get('/app/categories/search', searchCategories);
router.get('/app/categories', getCategories);
router.get('/app/categories/:type', getCategoryByValue);

router.get('/app/items/filter', getFilteredItems);
router.get('/app/items/priceCount', getPriceRange);
router.get('/app/item/:id', getItemById);

router.get('/app/filters/:category', getCategoryFilters);
router.get('/app/filters/:category/:filter', getFilterValues);

router.post('/app/favourite', addToFavourite);
router.get('/app/favourite/:userId', getUserFavourites);
router.delete('/app/favourite', deleteFavourite);

router.post('/app/cart/remove', removeOneFromCart);
router.get('/app/cart/:userId', getUserCartItems);
router.post('/app/cart', addToCart);
router.delete('/app/cart', deleteCartItem)
router.delete('/app/cart/clear/:userId', clearCart);
;

router.post('/app/orders/add', createOrder);
router.get('/app/orders/:userId', getUserOrders);








module.exports = {
    appRouter: router,
};
