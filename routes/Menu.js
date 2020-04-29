const express = require("express");
const router = express.Router();
const multer = require("multer");
const MenuController = require("../controllers/Menu");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "./public/images/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

const upload = multer({
  storage: storage,
});

router.post("/create", upload.single("imageUrl"), MenuController.create);
router.get("/show", MenuController.getAllData);

module.exports = router;
