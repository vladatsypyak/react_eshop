const express = require('express');
const morgan = require('morgan');
const cors = require('cors')

const app = express();
const mongoose = require('mongoose');
const bp = require('body-parser');
const passport = require('passport');
const passportSetup = require("./passport")
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const swaggerDocument = require('./swagger.json');
const router = require('express').Router();

require('dotenv').config();



const frontendUrl = process.env.FRONTEND_URL;
const apiUrl = process.env.API_URL;
const port = process.env.PORT;
console.log("port" + port)

mongoose.connect('mongodb+srv://vladatsyupyak:Vladochka2002@eshop2.fsgyzpe.mongodb.net/?retryWrites=true&w=majority');

const {usersRouter} = require("./routers/usersRouter");
const {authRouter} = require("./routers/authRouter");
const {categoriesRouter} = require("./routers/categoriesRouter");
const {itemsRouter} = require("./routers/itemsRouter");
const {filterRouter} = require("./routers/filtersRouter");
const {favouriteRouter} = require("./routers/favouritesRouter");
const {cartRouter} = require("./routers/cartRouter");
const {ordersRouter} = require("./routers/ordersRouter");
const session = require("express-session");

app.use(express.json());
app.use(cors())
app.use(morgan('tiny'));

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

app.use('/api/users/', usersRouter);
app.use('/api/categories/', categoriesRouter);
app.use('/api/items/', itemsRouter);
app.use('/api/filters/', filterRouter);
app.use('/api/favourites/', favouriteRouter);
app.use('/api/carts/', cartRouter);
app.use('/api/orders/', ordersRouter);





const swaggerOptions = {
    swaggerDefinition:{
        info:{
            title: "Eshop API",
            version: "1.0.0"
        }
    },
    apis: ["./routers/*.js"]
}
const swaggerDocs = swaggerJsDoc(swaggerOptions)



app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

app.use(passport.initialize())
app.use(passport.session())
app.use(
    cors({
        origin: frontendUrl,
        methods: "GET,POST,PUT,DELETE",
        credentials: true
    })
)
app.use('/auth', authRouter);

app.use(session({
    secret: process.env.SESSION_SECRET || 'your-default-secret', // Provide your secret here or from an environment variable
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: false,
        secure: false,
        sameSite: 'None', // Necessary for cross-site cookies
    }
}));

// require("./auth")
// app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
//
// app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
//     //res.redirect('/');
//     res.end('Logged in!');
// })
const start = async () => {
    try {
        console.log( `listening on ${apiUrl} `);
        app.listen(process.env.PORT );

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
