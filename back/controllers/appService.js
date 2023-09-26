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

async function searchCategories(req, res) {
    const text = req.query.text;
    const categories = await Category.find({value: {$regex: text, $options: "i"}})
    if (!categories) {
        res.status(500).send({
            message: "no items"
        });
    }
    res.send(
        categories
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
    const sortBy = allFilters.sortBy
    const sortProperty = sortBy.replace("DESC", "")
    const sortOrder = sortBy.includes("DESC") ? -1 : 1
    const priceMax = allFilters.priceMax || Infinity
    const priceMin = allFilters.priceMin || 0

    let filters = Object.fromEntries(
        Object.entries(allFilters).filter(([key]) => key !== "category" && key !== "sortBy" && key !== "priceMax" && key !== "priceMin")
    );
    const query = {};

    for (const key in filters) {
        if (filters.hasOwnProperty(key)) {
            const filterValue = filters[key];
            query["characteristics"] = {
                $elemMatch: {
                    name: key,
                    value: Array.isArray(filterValue) ? {$in: filterValue} : filterValue
                }
            };
        }
    }

    let filteredItems = await Item.find({
        ...query,
        "category": allFilters.category,
        price: {$lte: priceMax, $gte: priceMin}
    }).sort({[sortProperty]: sortOrder});
    console.log(filteredItems.length)
    return filteredItems;
}

async function getFilteredItems(req, res) {
    let filteredItems = await filterItems(req);

    if (filteredItems.length === 0) {
        console.log("300")
        res.status(200).send([]);
    } else {
        res.send(
            filteredItems
        )
    }

}

async function getPriceRange(req, res) {
    let filteredItems = await filterItems(req);
    let priceArr = filteredItems.map(el => el.price)
    res.send(
        [Math.min(...priceArr), Math.max(...priceArr)]
    )
}

async function getItemsByTitle(req, res) {
    const sortBy = req.query.sortBy
    const title = req.query.title;
    const sortProperty = sortBy.replace("DESC", "")
    const sortOrder = sortBy.includes("DESC") ? -1 : 1
    const items = await Item.find({title: {$regex: title, $options: "i"}}).sort({[sortProperty]: sortOrder})
    if (!items) {
        res.status(500).send({
            message: "no items"
        });
    }
    res.send(
        items
    )
}


async function addToFavourite(req, res) {
    const {userId, itemId} = req.body
    console.log(userId)
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
        console.log(items);

        res.send(items);
    } catch (error) {
        // Обробка помилки, якщо є
        console.error(error);
        res.status(500).send('Помилка сервера');
    }
}

async function addToCart(req, res) {
    const {userId, itemId, quantity} = req.body
    const existingCartItem = await CartItem.findOne({userId, itemId});
    const item = await Item.findById(itemId)
    console.log(item)
    if (existingCartItem) {
        const updatedItem = await CartItem.findOneAndUpdate({userId, itemId}, {quantity: quantity});

    } else {
        const newCartItem = new CartItem({userId, itemId, quantity: quantity, item: item});
        await newCartItem.save();
    }
    res.send(
        {message: "added to cart"}
    )
}

async function removeOneFromCart(req, res) {
    const {userId, itemId} = req.body
    const cartItem = await CartItem.findOne({userId, itemId});
    const item = await Item.findById(itemId)
    console.log(item)

    const quantity = cartItem.quantity
    const updatedItem = await CartItem.findOneAndUpdate({userId, itemId}, {quantity: quantity - 1});


    res.send(
        {message: "removed from cart"}
    )
}

async function deleteCartItem(req, res) {
    const {userId, itemId} = req.body
    const cartItem = await CartItem.findOneAndDelete({userId, itemId});
    res.send(
        cartItem
    )
}

async function clearCart(req, res) {
    const {userId} = req.params
    const cartItem = await CartItem.deleteMany({userId});
    res.send(
        cartItem
    )
}

async function getUserCartItems(req, res) {
    try {
        const {userId} = req.params;
        const cartItems = await CartItem.find({userId}).exec();
        // const itemIds = cartItems.map((el) => el.itemId);
        // const items = await Item.find({_id: {$in: itemIds}}).exec();

        res.send(cartItems);
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

async function createOrder(req, res) {
    const {userId, items, price, userData} = req.body
    console.log(userId)
    const order = new Order({userId, items, status: "New", price, userData});
    await order.save();

    res.send(
        {message: "added to favourite"}
    )
}

async function getUserOrders(req, res) {
    try {
        const {userId} = req.params;
        const orders = await Order.find({userId});


        res.send(orders);
    } catch (error) {
        // Обробка помилки, якщо є
        console.error(error);
        res.status(500).send('Помилка сервера');
    }
}

module.exports = {
    getCategories,
    getCategoryByValue,
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
    addToCart,
    getUserCartItems,
    removeOneFromCart,
    deleteCartItem,
    clearCart,
    searchCategories,
    createOrder,
    getUserOrders,
    getPriceRange
};