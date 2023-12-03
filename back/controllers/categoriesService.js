const {Category} = require("../models/Categories");

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

module.exports = {
    getCategories,
    getCategoryByValue,
    searchCategories

};