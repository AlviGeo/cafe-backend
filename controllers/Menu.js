const MenuSchema = require("../models/Menu");
const CategorySchema = require('../models/Category');

module.exports = {
  create: (req, res) => {
    MenuSchema.create({
      name: req.body.name,
      detail: req.body.detail,
      price: req.body.price,
      category: req.body.category,
      imageUrl: req.file && req.file.path,
    })
      .then((result) => res.json(result))
      .catch((err) => {
        throw (err);
      });
  },
  getAllData: (req, res) => {
    MenuSchema
        .find({}).populate('category')
        .then((result) => res.json(result))
        .catch((err) => {
          throw (err);
        });
    },
  };
