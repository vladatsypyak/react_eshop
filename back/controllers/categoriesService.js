const {Category} = require("../models/Categories");

async function getCategories(req, res) {
    const searchBy = req.query.text || ""
    const categories = await Category.find({value: {$regex: searchBy, $options: "i"}})
    if (!categories) {
        res.status(500).send({
            message: "categories were not found"
        });
        return
    }
    res.send({
        count: categories?.length,
        categories,
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


async function getCategoryByType(req, res) {
    const {type} = req.params;
    const category = await Category.findOne({type: type})
    if (!category) {
        res.status(500).send({
            message: "category was not found"
        });
    }else {
        res.send({
            category,
        })
    }
}


module.exports = {
    getCategories,
    getCategoryByType,
    searchCategories

};