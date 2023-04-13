const express = require('express');

const router = express.Router();
// const {authMiddleware} = require('../middleware/authMiddleware');
const {getCategories} = require("../controllers/appService");

router.get('/app/categories', getCategories);

module.exports = {
    appRouter: router,
};
