const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        name:{
            type: String
        },
        surname:{
            type: String
        },
        patronymic:{
            type: String
        },
        gender: {
            type:String
        },
        birthdate: {
            type: String
        },
        phone: {
            type: String
        }
    },
    { timestamps: true },
);
const User = mongoose.model('User', userSchema);

module.exports = {
    User,
};
