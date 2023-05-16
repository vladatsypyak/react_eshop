const mongoose = require('mongoose');

const favouriteSchema = mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        itemId: {
            type: String,
            required: true,
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
const Favourite = mongoose.model('Favourite', favouriteSchema);

module.exports = {
    Favourite,
};
