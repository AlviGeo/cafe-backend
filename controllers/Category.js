const Category = require("../models/Category");

module.exports = ({
  create: (req, res) => {
    Category
        .create({name: req.body.name,})
        .then((result) => res.json(result))
        .catch((err) => {
        throw (err);
        });
    },
    getAllCategory: (req, res) => {
        Category
        .find({})
        .then(result => res.json(result))
        .catch(err => {
            throw(err)
        })
    }
})
