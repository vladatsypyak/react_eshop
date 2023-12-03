const {Order} = require("../models/Orders");
const {CartItem} = require("../models/CartItems");
const {Item} = require("../models/Items");

async function addToCart(req, res) {
    const {userId, itemId, quantity} = req.body
    const existingCartItem = await CartItem.findOne({userId, itemId});
    const item = await Item.findById(itemId)
    if (existingCartItem) {
        const updatedItem = await CartItem.findOneAndUpdate({userId, itemId}, {quantity: quantity});

    } else {
        const newCartItem = new CartItem({userId, itemId, quantity: quantity, item: item});
        await newCartItem.save();
    }
    res.send(
        {message: "added to cart"}
    )
}

async function removeOneFromCart(req, res) {
    const {userId, itemId} = req.body
    const cartItem = await CartItem.findOne({userId, itemId});
    const item = await Item.findById(itemId)
    const quantity = cartItem.quantity
    const updatedItem = await CartItem.findOneAndUpdate({userId, itemId}, {quantity: quantity - 1});
    res.send(
        {message: "removed from cart"}
    )
}

async function deleteCartItem(req, res) {
    const {userId, itemId} = req.body
    const cartItem = await CartItem.findOneAndDelete({userId, itemId});
    res.send(
        cartItem
    )
}

async function clearCart(req, res) {
    const {userId} = req.params
    const cartItem = await CartItem.deleteMany({userId});
    res.send(
        cartItem
    )
}

async function getUserCartItems(req, res) {
    try {
        const {userId} = req.params;
        const cartItems = await CartItem.find({userId}).exec();
        res.send(cartItems);
    } catch (error) {
        // Обробка помилки, якщо є
        console.error(error);
        res.status(500).send('Помилка сервера');
    }
}

module.exports = {
    addToCart,
    getUserCartItems,
    clearCart,
    deleteCartItem,
    removeOneFromCart

};