const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        googleId:{
            type: String,
            unique: true,
        },
        password: {
            type: String,
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
