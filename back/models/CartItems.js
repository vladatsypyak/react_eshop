const mongoose = require('mongoose');

const CartItemSchema = mongoose.Schema(
    {
        userId: {
            type: String
        },
        itemId: {
            type: String
        },
        item:{
            type: Object
        },
        quantity: {
            type: Number
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
const CartItem = mongoose.model('CartItem', CartItemSchema);

module.exports = {
    CartItem,
};
