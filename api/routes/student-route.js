const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Student = require("../models/student");

router.get("/", (req, res, next) => {
  Student.find()
    .select("-_id -__v")
    .then(result => {
      if (result.length > 0) {
        return res.status(200).json({
          statusCode: 200,
          statusMessage: "Sending entire students list",
          result
        });
      } else {
        return res.status(404).json({
          statusCode: 404,
          statusMessage: "No student records"
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        statusCode: 500,
        statusMessage: "Internal server error",
        error: err
      });
    });
});

router.post("/", (req, res, next) => {
  console.log("Upload new student requested");

  const newStudent = Student({
    _id: new mongoose.Types.ObjectId(),
    course_code: String(req.body.course_code).toLowerCase(),
    roll_no: req.body.roll_no,
    admin: String(req.body.name).includes("Harsh"),
    name: req.body.name
  });

  newStudent
    .save()
    .then(result => {
      console.log("New student with name " + req.body.email + " created");
      return res.status(201).json({
        statusCode: 201,
        statusMessage: "New student created"
      });
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json({
        statusCode: 500,
        error: err
      });
    });
});

module.exports = router;
