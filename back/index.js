const express = require('express');
const morgan = require('morgan');
const cors = require('cors')

const app = express();
const mongoose = require('mongoose');
const bp = require('body-parser');
const passport = require('passport');
const passportSetup = require("./passport")

// const cors = require('cors')

mongoose.connect('mongodb+srv://vladatsyupyak:Vladochka2002@eshop2.fsgyzpe.mongodb.net/?retryWrites=true&w=majority');

const { appRouter } = require('./routers/appRouter');
const {usersRouter} = require("./routers/usersRouter");
const {authRouter} = require("./routers/authRouter");

app.use(express.json());
app.use(cors())
app.use(morgan('tiny'));

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

app.use('/api/', appRouter);
app.use('/api/user/', usersRouter);

app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

app.use(passport.initialize())
app.use(passport.session())
app.use(
    cors({
        origin:"http://localhost:3000",
        methods: "GET,POST,PUT,DELETE",
        credentials: true
    })
)
app.use('/auth', authRouter);


// require("./auth")
// app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
//
// app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
//     //res.redirect('/');
//     res.end('Logged in!');
// })
const start = async () => {
    try {
        console.log('hi ');
        app.listen(8080);

    } catch (err) {
        console.error(`Error on server startup: ${err.message}`);
    }
};

start();

app.use(errorHandler);

function errorHandler(err, req, res, next) {
    console.error(err);
    res.status(500).send({ message: 'Server error' });
}
