const express = require("express");
const router = express.Router();

const Student = require("../models/student").Student;

router.post("/", (req, res, next) => {
  console.log("Identify face requested");

  var statusCode, statusMessage;

  if (!req.files) {
    statusCode = 400;
    statusMessage = "File not uploaded";
  } else if (!req.body.name) {
    statusCode = 400;
    statusMessage = "Name not specified";
  } else {
    let photo = req.files.photo;
    let fileName = req.body.name + "_" + Date.now();

    photo.mv("./train_img/" + req.body.name + "/" + fileName + ".jpg");

    (statusCode = 200), (statusMessage = "File uploaded successfully");
  }

  return res.status(400).json({
    statusCode: statusCode,
    statusMessage: statusMessage
  });
});

router.delete("/", (req, res, next) => {});

module.exports = router;
