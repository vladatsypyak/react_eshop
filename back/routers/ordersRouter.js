const express = require('express');
const {authMiddleware} = require("../middleware/authMiddleware");
const {createOrder, getUserOrders, deleteUserOrder} = require("../controllers/ordersService");
const router = express.Router();

router.post('/app/orders/add', authMiddleware, createOrder);
router.get('/app/orders/:userId', authMiddleware, getUserOrders);
router.delete('/app/orders', authMiddleware, deleteUserOrder)


module.exports = {
   ordersRouter: router,
};
