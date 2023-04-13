const express = require('express');
const morgan = require('morgan');
const cors = require('cors')

const app = express();
const mongoose = require('mongoose');
const bp = require('body-parser');
// const cors = require('cors')

mongoose.connect('mongodb+srv://vladatsyupyak:Vladochka2002@eshop2.fsgyzpe.mongodb.net/?retryWrites=true&w=majority');

const { appRouter } = require('./routers/appRouter');



app.use(express.json());
app.use(cors())
app.use(morgan('tiny'));


app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

app.use('/api/', appRouter);





const start = async () => {
    try {
        console.log('hi ');

        app.listen(8080);
    } catch (err) {
        console.error(`Error on server startup: ${err.message}`);
    }
};

start();

// ERROR HANDLER
app.use(errorHandler);

function errorHandler(err, req, res, next) {
    console.error(err);
    res.status(500).send({ message: 'Server error' });
}
