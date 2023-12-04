const {Category} = require('../models/Categories');


const jwt = require("jsonwebtoken");
const {now} = require("mongoose");
const {Item} = require("../models/Items");
const {Favourite} = require("../models/Favourites");
const {CartItem} = require("../models/CartItems");
const {Order} = require("../models/Orders");
require('dotenv').config();


function getTokenPayload(req) {
    const {authorization} = req.headers;
    const [, token] = authorization.split(' ');
    const tokenPayload = jwt.verify(token, process.env.SECRET_KEY);
    return tokenPayload;
}




async function getItemsByCategory(req, res) {
    const {category} = req.params;
    const items = await Item.find({category: category})
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
            let foundFilter = obj?.characteristics?.find((el) => el.name === filter)
            if (foundFilter) {
                return foundFilter.value
            }

        }
    )
    let uniqueFilterValues = [...new Set(filterValues.filter(el => el))]
    res.send(
        uniqueFilterValues,
    )
}

async function filterItems(req) {
    const allFilters = req.query;

    let filters = Object.fromEntries(
        Object.entries(allFilters).filter(([key]) => key !== "category" && key !== "sortBy" && key !== "priceMax" && key !== "priceMin" && key !== "page" && key !== "itemsPerPage" && key !== "title")
    );
    let query = [];
    console.log(filters)

    for (const key in filters) {
        if (filters.hasOwnProperty(key)) {
            const filterValue = filters[key];
            query = [...query, {
                "characteristics": {
                    $elemMatch: {
                        name: key,
                        value: Array.isArray(filterValue) ? {$in: filterValue} : filterValue
                    }
                }
            }]
        }
    }
    console.log(query)
    return query
}

async function getFilteredItems(req, res) {

    try {
        const {sortBy, priceMax = Infinity, priceMin = 0, category, page = 1, itemsPerPage = 4, title} = req.query;
        const sortProperty = sortBy.replace("DESC", "");
        const sortOrder = sortBy.includes("DESC") ? -1 : 1;
        const query = await filterItems(req);
        const skip = (page - 1) * itemsPerPage;
        console.log(title)
        console.log(query)
        const filterCriteria = {
            $and: [
                ...query,
                category ? {"category": category} : null,
                title ? { "title": { $regex: title, $options: "i" } } : null,
                {"price": {$lte: priceMax, $gte: priceMin}},
            ].filter(Boolean)
        };

        const countPromise = Item.countDocuments(filterCriteria);
        const itemsPromise = Item.find(filterCriteria)
            .limit(itemsPerPage)
            .skip(skip)
            .sort({[sortProperty]: sortOrder});

        const [count, items] = await Promise.all([countPromise, itemsPromise]);
        const pageCount = Math.ceil(count / itemsPerPage);
        console.log(items.length)
        if (items.length === 0) {
            res.status(200).send([]);
        } else {
            res.send({
                pagination: {count, pageCount},
                items,
            });
        }
    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).send("Internal Server Error");
    }


}

async function getItemsByTitle(req, res) {
    const {sortBy, title, page = 1, itemsPerPage = 4} = req.query;
    const skip = (page - 1) * itemsPerPage;

    const sortProperty = sortBy.replace("DESC", "")
    const sortOrder = sortBy.includes("DESC") ? -1 : 1
    const filterCriteria = {title: {$regex: title, $options: "i"}}

    const countPromise = Item.countDocuments(filterCriteria);
    const itemsPromise = Item.find(filterCriteria)
        .limit(itemsPerPage)
        .skip(skip)
        .sort({[sortProperty]: sortOrder});

    const [count, items] = await Promise.all([countPromise, itemsPromise]);
    const pageCount = Math.ceil(count / itemsPerPage);
    console.log(items.length)

    if (!items) {
        res.status(500).send({
            message: "no items"
        });
    }

    res.send({
        pagination: {count, pageCount},
        items,
    })

}

async function getPriceRange(req, res) {

    const allFilters = req.query;
    const sortBy = allFilters.sortBy
    const sortProperty = sortBy.replace("DESC", "")
    const sortOrder = sortBy.includes("DESC") ? -1 : 1
    const priceMax = allFilters.priceMax || Infinity
    const priceMin = allFilters.priceMin || 0
    let query = await filterItems(req);
    try {
        let filteredItems = await Item.find({
            $and: [
                ...query,
                {"category": allFilters.category},
                {price: {$lte: priceMax, $gte: priceMin}}
            ]
        }).sort({[sortProperty]: sortOrder});

        if (filteredItems.length !== 0) {
            let priceArr = filteredItems.map(el => el.price)
            res.send(
                [Math.min(...priceArr), Math.max(...priceArr)]
            )
        } else {
            res.send(
                [0, 0]
            )
        }

    } catch (error) {
        console.error("An error occurred:", error);
    }
}


async function addToFavourite(req, res) {
    const {userId, itemId} = req.body
    const favourite = new Favourite({userId, itemId});
    await favourite.save();
    res.send(
        {message: "added to favourite"}
    )
}

async function getFavourites(req, res) {
    const {userId} = req.params
    const favourites = await Favourite.find({userId});
    res.send(
        favourites
    )
}

async function getUserFavourites(req, res) {
    try {
        const {userId} = req.params;
        const favourites = await Favourite.find({userId}).exec();
        const itemIds = favourites.map((el) => el.itemId);
        const items = await Item.find({_id: {$in: itemIds}}).exec();
        res.send(items);
    } catch (error) {
        // Обробка помилки, якщо є
        console.error(error);
        res.status(500).send('Помилка сервера');
    }
}



async function deleteFavourite(req, res) {
    const {userId, itemId} = req.body
    const favourite = await Favourite.findOneAndDelete({userId, itemId});
    res.send(
        favourite
    )
}

async function getItemById(req, res) {
    const {id} = req.params
    const item = await Item.findById(id);
    res.send(
        item
    )
}



module.exports = {

    getItemsByCategory,
    getCategoryFilters,
    getFilterValues,
    getFilteredItems,
    getItemsByTitle,
    addToFavourite,
    getFavourites,
    deleteFavourite,
    getItemById,
    getUserFavourites,
    getPriceRange
};