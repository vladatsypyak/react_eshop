const {Category} = require('../models/Categories');


const jwt = require("jsonwebtoken");
const {now} = require("mongoose");
const {Item} = require("../models/Items");
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

async function getCategoryByValue(req, res) {
    console.log(req.params)
    const {type} = req.params;

    const category = await Category.findOne({type: type})
    console.log(category)
    if (!category) {
        res.status(500).send({
            message: "category was not found"
        });
    }
    res.send({
        category,
    })
}

async function getItemsByCategory(req, res) {
    console.log(req.params)
    const {category} = req.params;

    const items = await Item.find({category: category})
    console.log("here" + items)
    if (!items) {
        res.status(500).send({
            message: "category was not found"
        });
    }
    res.send({
        items,
    })
}

async function getCategoryFilters(req, res) {
    const {category} = req.params;
    const currentCategory = await Category.findOne({type: category})
    console.log(currentCategory)
    const filters = currentCategory.filters;
    if (!currentCategory) {
        res.status(500).send({
            message: "currentCategory was not found"
        });
    }
    res.send(
        filters
    )
}

async function getFilterValues(req, res) {
    const {category, filter} = req.params;
    const items = await Item.find({category: category})
    let filterValues = items.map(obj => {
            return obj.characteristics.find((el) => el.name === filter).value
        }
    )
    let uniqueFilterValues = [...new Set(filterValues)]
    if (!items) {
        res.status(500).send({
            message: "category was not found"
        });
    }
    res.send(
        uniqueFilterValues,
    )
}

async function getFilteredItems(req, res) {
    const allFilters = req.query;

    const items = await Item.find({category: allFilters.category})
    let filters = {}
    for (const key in allFilters) {
        if(key !== "category"){
            filters[key] = allFilters[key]
        }
    }
    console.log(filters)

    // let filteredItems = items.filter(item => {
    //     let isValid = true
    //     for (const key in filters) {
    //         let found = false
    //         item.characteristics.forEach(el=>{
    //             if(el.name === key && el.value === filters[key]){
    //               found = true
    //             }
    //         })
    //         if(!found){
    //             isValid = false
    //         }
    //     }
    //     return isValid
    // })
    let filteredItems = items.filter(item =>
        Object.keys(filters).every(key =>
            item.characteristics.some(el =>
                el.name === key && el.value === filters[key]
            )
        )
    );

    console.log("result")
    console.log(filteredItems)

    if (!filteredItems) {
        res.status(500).send({
            message: "no items"
        });
    }
    res.send(
        filteredItems
    )
}

module.exports = {
    createLoad,
    getCategories,
    getCategoryByValue,
    getItemsByCategory,
    getCategoryFilters,
    getFilterValues,
    getFilteredItems
};