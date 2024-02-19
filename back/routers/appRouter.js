const express = require('express');

const router = express.Router();
const {createOrder, getUserOrders, deleteUserOrder} = require("../controllers/ordersService");
const {authMiddleware} = require("../middleware/authMiddleware");





module.exports = {
    appRouter: router,
};
