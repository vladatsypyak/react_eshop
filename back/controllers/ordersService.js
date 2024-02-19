const {Order} = require("../models/Orders");
const {getTokenPayload} = require("../helpers/helpers");

async function createOrder(req, res) {
    try{
        const tokenPayload = getTokenPayload(req);
        console.log(tokenPayload)
        const { items, price, userData} = req.body
        const order = new Order({userId: tokenPayload.userId, items, status: "New", price, userData});
        console.log(order)
        await order.save();
        res.send(
            {message: "added to orders"}
        )
    } catch (error){
        console.error(error);
        res.status(500).send('Internal server error')
    }
}

async function getUserOrders(req, res) {
    try {
        const tokenPayload = getTokenPayload(req);
        const orders = await Order.find({userId: tokenPayload.userId});
        res.send(orders);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
}
async function deleteUserOrder(req, res) {
    try {
        const { orderId } = req.body;
        const order = await Order.findByIdAndDelete(orderId);
        if (!order) {
            return res.status(404).send({ message: "order not found" });
        }

        res.send(order);
    } catch (error) {
        console.error("Error in deleteOrder:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
}

module.exports = {
    createOrder,
    getUserOrders,
    deleteUserOrder
};