const {CartItem} = require("../models/CartItems");
const {Item} = require("../models/Items");
const {getTokenPayload} = require("../helpers/helpers");

async function addToCart(req, res) {
    try {
        const tokenPayload = getTokenPayload(req);
        console.log(tokenPayload)
        const {itemId, quantity} = req.body
        const existingCartItem = await CartItem.findOne({userId: tokenPayload.userId, itemId});
        const item = await Item.findById(itemId)
        if (existingCartItem) {
            const updatedItem = await CartItem.findOneAndUpdate({
                userId: tokenPayload.userId,
                itemId
            }, {quantity: quantity});
        } else {
            const newCartItem = new CartItem({userId: tokenPayload.userId, itemId, quantity: quantity, item: item});
            await newCartItem.save();
        }
        res.send(
            {message: "added to cart"}
        )
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error')
    }


}


async function removeOneFromCart(req, res) {
    try {
        const tokenPayload = getTokenPayload(req);
        const {itemId} = req.body
        const cartItem = await CartItem.findOne({userId: tokenPayload.userId, itemId});
        const item = await Item.findById(itemId)
        const quantity = cartItem.quantity
        const updatedItem = await CartItem.findOneAndUpdate({
            userId: tokenPayload.userId,
            itemId
        }, {quantity: quantity - 1})
        res.send(
            {message: "removed from cart"}
        )

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error')
    }

}

async function deleteCartItem(req, res) {
    try {
        const tokenPayload = getTokenPayload(req);
        const {itemId} = req.body
        const cartItem = await CartItem.findOneAndDelete({userId: tokenPayload.userId, itemId});
        res.send(
            cartItem
        )
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }

}

async function clearCart(req, res) {
    try {
        const tokenPayload = getTokenPayload(req);
        const cartItem = await CartItem.deleteMany({userId: tokenPayload.userId});
        res.send(
            cartItem
        )
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }

}

async function getUserCartItems(req, res) {
    try {
        const tokenPayload = getTokenPayload(req);
        const cartItems = await CartItem.find({userId: tokenPayload.userId}).exec();
        res.send(cartItems);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
}

module.exports = {
    addToCart,
    getUserCartItems,
    clearCart,
    deleteCartItem,
    removeOneFromCart
};