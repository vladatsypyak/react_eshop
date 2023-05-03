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
    console.log("here" +items)
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
    const filters =  currentCategory.filters;
    console.log(filters)

  // let test =  filters.map( el => {
  //     console.log(el.value)
  //     Item.find({category: el.value}).
  //     then(res => console.log(res))
  //
  //       // const filterValues = items.map(item=> item[el.value])
  //       return
  //   })
  //   console.log(test)

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
    console.log(req.params)
    const {category, filter} = req.params;
    const items = await Item.find({category: category})
    console.log(items)
   let filterValues = items.map(obj=> {
           return obj.characteristics.find((el)=> el.name === filter).value

       }
   )
    let uniqueFilterValues =[...new Set(filterValues)]

    console.log(filterValues)
    if (!items) {
        res.status(500).send({
            message: "category was not found"
        });
    }
    res.send(
        uniqueFilterValues,
    )
}
module.exports = {
    createLoad,
    getCategories,
    getCategoryByValue,
    getItemsByCategory,
    getCategoryFilters,
    getFilterValues
};