const mongoose = require('mongoose');

const itemSchema = mongoose.Schema(
    {
        category: {
            type: String,
            required: true,
        },
        imageUrl: {
            type: String,
            required: true
        },
        rating: {
            type: String,
            required: true
        },
        isInStock: {
            type: Boolean,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        characteristics: {
            type: Array,
            required: true
        },
        price: {
            type: String,
            required: true
        },

        logs: {
            type : {
                message: {
                    type: String
                },
                time: {
                    type: String
                }
            }

        }
    },
    {timestamps: true},
);
const Item = mongoose.model('Item', itemSchema);

module.exports = {
    Item,
};
