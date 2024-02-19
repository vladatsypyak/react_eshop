const express = require('express');

const router = express.Router();
// const {authMiddleware} = require('../middleware/authMiddleware');
const {
     getItemsByCategory, getCategoryFilters, getFilterValues, getFilteredItems,
    addToFavourite, getFavourites, deleteFavourite, getItemById, getUserFavourites,
    getPriceRange
} = require("../controllers/appService");
const {searchCategories, getCategories, getCategoryByType} = require("../controllers/categoriesService");
const {removeOneFromCart, getUserCartItems, addToCart, deleteCartItem, clearCart} = require("../controllers/cartService");
const {createOrder, getUserOrders, deleteUserOrder} = require("../controllers/ordersService");
const {authMiddleware} = require("../middleware/authMiddleware");





router.post('/app/favourite', authMiddleware, addToFavourite);
router.get('/app/favourite', authMiddleware, getUserFavourites);
router.delete('/app/favourite',authMiddleware, deleteFavourite);

router.post('/app/cart/remove', removeOneFromCart);
router.get('/app/cart/:userId', getUserCartItems);
router.post('/app/cart', addToCart);
router.delete('/app/cart', deleteCartItem)
router.delete('/app/cart/clear/:userId', clearCart);


router.post('/app/orders/add', authMiddleware, createOrder);
router.get('/app/orders/:userId', authMiddleware, getUserOrders);
router.delete('/app/orders', authMiddleware, deleteUserOrder)










module.exports = {
    appRouter: router,
};
