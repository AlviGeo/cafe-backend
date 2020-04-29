const User = require("../models/User");
const Bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config;

module.exports = {
  register: (req, res) => {
    User.findOne({ email: req.body.email }).then((result) => {
      if (result) {
        return res.status(400).json({ email: "Email already exist" });
      } else {
        const newUser = new User({
          fullname: req.body.fullname,
          email: req.body.email,
          phone: req.body.phone,
          password: req.body.password,
        });
        Bycrypt.genSalt(10, (err, salt) => {
          Bycrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then((result) => res.json(result))
              .catch((err) => res.json(err));
          });
        });
      }
    });
  },

  login: (req, res) => {
    User.findOne({ email: req.body.email }).then((user) => {
      if (!user) {
        return res.status(404).json({ email: "Email not found" });
      }
      Bycrypt.compare(req.body.password, user.password).then((isMatch) => {
        if (isMatch) {
          const payload = {
            id: user._id,
            fullname: user.fullname,
          };
          jwt.sign(
            payload,
            process.env.DB_CONNECTION,
            {
              expiresIn: "1d",
            },
            (err, token) => {
              res.json({
                sucess: true,
                token: "Bearer" + token,
                id: user._id,
              });
            }
          );
        } else {
          return res.status(400).json("Password Incorrect");
        }
      });
    });
  },
  getAllUser: (req, res) => {
    User.find({})
      .then((result) => res.json(result))
      .catch((err) => {
        throw err;
      });
  },
};
