const {Order} = require("../models/Orders");

async function createOrder(req, res) {
    const {userId, items, price, userData} = req.body
    const order = new Order({userId, items, status: "New", price, userData});
    await order.save();

    res.send(
        {message: "added to favourite"}
    )
}

async function getUserOrders(req, res) {
    try {
        const {userId} = req.params;
        const orders = await Order.find({userId});


        res.send(orders);
    } catch (error) {
        // Обробка помилки, якщо є
        console.error(error);
        res.status(500).send('Помилка сервера');
    }
}

module.exports = {
    createOrder,
    getUserOrders

};