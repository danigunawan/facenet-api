const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Student = require("../models/student");

router.post("/image", (req, res, next) => {
  console.log("Upload face requested");

  if (!req.files) {
    return res.status(400).json({
      statusCode: 400,
      statusMessage: "File not uploaded"
    });
  } else if (!req.body.name || !req.body.roll_no) {
    return res.status(400).json({
      statusCode: 400,
      statusMessage: "Name or Roll Number not specified"
    });
  } else {
    Student.findOne({
      roll_no: req.body.roll_no
    })
      .exec()
      .then(student => {
        var statusCode, statusMessage;

        if (student) {
          let photo = req.files.photo;
          let fileName = req.body.name + "_" + Date.now();
          photo.mv(
            "./core/train_img/" + req.body.name + "/" + fileName + ".jpg"
          );
          statusCode = 200;
          statusMessage = "File uploaded successfully";
        } else {
          statusCode = 404;
          statusMessage = "Student with given roll number does not exist";
        }

        return res.status(statusCode).json({
          statusCode: statusCode,
          statusMessage: statusMessage
        });
      })
      .catch(err => {
        console.log({
          error: err
        });
        return res.status(500).json({
          statusCode: 500,
          statusMessage: "Internal server error"
        });
      });
  }
});

router.post("/student", (req, res, next) => {
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
