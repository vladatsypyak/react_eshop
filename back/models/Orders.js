const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema(
    {
        userId: {
            type: String
        },
        items: {
            type: Array
        },
        logs: {
            type: {
                message: {
                    type: String
                },
                time: {
                    type: Date
                }
            }

        }
    },
    {timestamps: true},
);
const Order = mongoose.model('Order', OrderSchema);

module.exports = {
    Order,
};
