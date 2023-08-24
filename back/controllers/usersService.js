const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {User} = require('../models/Users');
require('dotenv').config();
const nodemailer = require('nodejs-nodemailer-outlook')

const registerUser = async (req, res, next) => {
    console.log(req.body)
    const {email, password, name, surname, birthdate, patronymic, gender} = req.body;
    const user = new User({
        email,
        password: await bcrypt.hash(password, 10),
        name,
        surname,
        birthdate,
        patronymic,
        gender

    });
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    user.save()
        .then(() => res.status(200).json({
            message: 'Success',
            user: user
        }))
        .catch((err) => {
            res.status(400).json({
                message: err,
            })
        });
};

const loginUser = async (req, res) => {
    const user = await User.findOne({email: req.body.email});
    if (user && await bcrypt.compare(String(req.body.password), String(user.password))) {
        const payload = {email: user.email, userId: user._id};
        const jwtToken = jwt.sign(payload, "secret");
        return res.json({
            message: 'Success',
            jwt_token: jwtToken,
        });
    }
    return res.status(400).json({message: 'Not authorized'});
};

const forgotPassword = async (req, res) => {

    const user = await User.findOne({email: req.body.email});
    console.log('user is this' + user)
    if(user){
        nodemailer.sendEmail({
                auth: {
                    user: "vladatss@outlook.com",
                    pass: "sobakaenot123"
                },
                from: 'vladatss@outlook.com',
                to: 'vladatsyupyak@gmail.com',
                subject: 'Hey you, awesome!',
                html: '<b>This is bold text</b>',
                text: 'This is text version!',
                replyTo: 'vladatsyupyak@gmail.com',
                attachments: [],
                onError: (e) => console.log(e),
                onSuccess: (i) => console.log(i)
            }
        );
        return res.json({
            message: 'Success',
        });
    }
    return res.status(400).json({
        message: 'No user with such email',
    })



};



function getTokenPayload(req) {
    const { authorization } = req.headers;
    const [, token] = authorization.split(' ');
    // const tokenPayload = jwt.verify(token, process.env.SECRET_KEY);
    return jwt.verify(token, "secret");
}

const getUserProfile = async (req, res) => {
    console.log(7)
    const tokenPayload = getTokenPayload(req);
    const user = await User.findById(tokenPayload.userId);
    return res.status(200).send({
        // user: {
        //     _id: user._id,
        //     email: user.email,
        //     createdAt: user.createdAt,
        //     name: user.name,
        //     surname: user.surname,
        //     birthdate: user.birthdate,
        //     patronymic: user.patronymic,
        //     gender:  user.gender
        // },
        user
    });
};
const deleteUserProfile = async (req, res) => {
    const tokenPayload = getTokenPayload(req);
    const user = await User.findOneAndDelete({ email: tokenPayload.email });
    return res.status(200).send({
        message: `success delete ${user}`,
    });
};
const changeUserPassword = async (req, res) => {
    const tokenPayload = getTokenPayload(req);
    const user = await User.findOne({ email: tokenPayload.email });
    console.log(user)
    if(!user){
        return  res.status(401).send('user is not found');

    }
    if (user && await bcrypt.compare(String(req.body.oldPassword), String(user.password))) {
        await bcrypt.hash(req.body.newPassword, 10);
        await User.updateOne(
            { email: tokenPayload.email },
            { password: await bcrypt.hash(req.body.newPassword, 10) },
        );
        await user.save();
    } else {
       return  res.status(401).send('password are not the same');
    }
    res.send({ message: 'Success' });
};
const editUserProfile = async (req, res) => {
    let newData = req.body
    const tokenPayload = getTokenPayload(req);
    console.log(tokenPayload.userId)
    const user = await User.findById( tokenPayload.userId);
    console.log(user)
    if(!user){
        return  res.status(401).send('user is not found');
    }
    const changedData = await User.findByIdAndUpdate(user._id,newData )


    res.send({ message: 'Success' });
};
module.exports = {
    loginUser,
    registerUser,
    forgotPassword,
    getUserProfile,
    deleteUserProfile,
    changeUserPassword,
    editUserProfile
};