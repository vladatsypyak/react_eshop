const {Category} = require('../models/Categories');


const jwt = require("jsonwebtoken");
const {now} = require("mongoose");
require('dotenv').config();



function getTokenPayload(req) {
    const {authorization} = req.headers;
    const [, token] = authorization.split(' ');
    const tokenPayload = jwt.verify(token, process.env.SECRET_KEY);
    return tokenPayload;
}

function createLoad(req, res, next) {
    const {name, payload, pickup_address, delivery_address, dimensions} = req.body;
    console.log(dimensions)
    const user = getTokenPayload(req);
    const load = new Load({
        created_by: user.userId,
        name,
        payload,
        pickup_address,
        delivery_address,
        dimensions,
        assigned_to: null,
        status: "NEW"
    });
    console.log(load)
    Load.create(load)
        .then(() => res.json({"message": "Truck created successfully"}))
        .catch((err) => {
            console.log(err)
            next(err);
        });
}

async function getCategories(req, res) {
    const categories = await Category.find()
    // const log = new Log({reqBody: trucks[0]._id, function: "getTrucksInfo"}
    // )
    // await log.save()
    if (!categories) {
        res.status(500).send({
            message: "trucks were not found"
        });
    }
    res.send({
        count: await Category.count(),
        categories,
    })
}
module.exports = {
    createLoad,
    getCategories
};