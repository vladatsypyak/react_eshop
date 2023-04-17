const mongoose = require('mongoose');

const categorySchema = mongoose.Schema(
    {
        value: {
            type: String,
            required: true,
        },
        imageUrl: {
            type: String,
            required: true
        },
        iconUrl: {
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
const Category = mongoose.model('Category', categorySchema);

module.exports = {
    Category,
};
