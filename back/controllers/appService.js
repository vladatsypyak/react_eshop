const {Category} = require('../models/Categories');
const jwt = require("jsonwebtoken");
const {Item} = require("../models/Items");
const {Favourite} = require("../models/Favourites");
const {User} = require("../models/Users");
require('dotenv').config();


function getTokenPayload(req) {
    const {authorization} = req.headers;
    const [, token] = authorization.split(' ');
    const tokenPayload = jwt.verify(token, "secret");
    return tokenPayload;
}


async function getCategoryFilters(req, res) {
    try {
        const {category} = req.params;
        const currentCategory = await Category.findOne({type: category});

        if (!currentCategory) {
            return res.status(404).send({
                message: "Category not found"
            });
        }

        const filters = currentCategory.filters;
        res.send(filters);
    } catch (error) {
        console.error("Error in getCategoryFilters:", error);
        res.status(500).send({
            message: "Internal Server Error"
        });
    }
}

async function getFilterValues(req, res) {
    try {
        const {category, filter} = req.params;
        const items = await Item.find({
            "category": category,
            "characteristics.name": filter,
        })
        let filterValues = items.map(obj => {
            let foundFilter = obj?.characteristics?.find((el) => el.name === filter);
            return foundFilter && foundFilter.value;
        });
        let uniqueFilterValues =  [...new Set(filterValues.filter(el => el))];
        res.send(uniqueFilterValues);
    } catch (error) {
        console.error("Error in getFilterValues:", error);
        res.status(500).send({
            message: "Internal Server Error"
        });
    }
}

async function filterItemsQuery(req) {
    try {
        const allFilters = req.query;

        const excludedKeys = ["category", "sortBy", "priceMax", "priceMin", "page", "itemsPerPage", "title"];
        const filters = Object.fromEntries(
            Object.entries(allFilters).filter(([key]) => !excludedKeys.includes(key))
        );
        let query = [];

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
        return query
    } catch (error) {
        console.error("Error in filterItemsQuery:", error);
        throw error;
    }
}

async function getFilterQuery(req) {
    const {priceMax = Infinity, priceMin = 0, category, title} = req.query;

    const query = await filterItemsQuery(req);
    return {
        $and: [
            ...query,
            category ? {"category": category} : null,
            title ? {"title": {$regex: title, $options: "i"}} : null,
            {"price": {$lte: priceMax, $gte: priceMin}},
        ].filter(Boolean)
    };
}

async function getFilteredItems(req, res) {

    try {
        const {sortBy, page = 1, itemsPerPage = 4} = req.query;
        const sortProperty = sortBy?.replace("DESC", "");
        const sortOrder = sortBy?.includes("DESC") ? -1 : 1;
        const skip = (page - 1) * itemsPerPage;
        const filterCriteria = await getFilterQuery(req);

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
        console.error("Error in getFilteredItems:", error);
        res.status(500).send("Internal Server Error");
    }


}

async function getPriceRange(req, res) {
    try {
        const filterCriteria = await getFilterQuery(req);
        let filteredItems = await Item.find(filterCriteria);
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
        console.error("Error in getPriceRange:", error);
        res.status(500).send("Internal Server Error");
    }
}

async function addToFavourite(req, res) {
    try {
        const tokenPayload = getTokenPayload(req);
        const { itemId } = req.params;
        const favourite = new Favourite({ userId: tokenPayload.userId, itemId });
        await favourite.save();
        res.send({ message: "Added to favorites" });
    } catch (error) {
        console.error("Error in addToFavourite:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
}

async function getUserFavourites(req, res) {
    try {
        const tokenPayload = getTokenPayload(req);
        const favourites = await Favourite.find({userId: tokenPayload.userId}).exec();
        const itemIds = favourites.map((el) => el.itemId);
        const items = await Item.find({_id: {$in: itemIds}}).exec();
        res.send(items);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

async function deleteFavourite(req, res) {
    try {
        const tokenPayload = getTokenPayload(req);
        const { itemId } = req.params;
        const favourite = await Favourite.findOneAndDelete({ userId: tokenPayload.userId, itemId });

        if (!favourite) {
            return res.status(404).send({ message: "Favourite not found" });
        }

        res.send(favourite);
    } catch (error) {
        console.error("Error in deleteFavourite:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
}

async function getItemById(req, res) {
    try {
        const { id } = req.params;
        const item = await Item.findById(id);

        if (!item) {
            return res.status(404).send({ message: "Item not found" });
        }

        res.send(item);
    } catch (error) {
        console.error("Error in getItemById:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
}



module.exports = {
    getCategoryFilters,
    getFilterValues,
    getFilteredItems,
    addToFavourite,
    deleteFavourite,
    getItemById,
    getUserFavourites,
    getPriceRange
};