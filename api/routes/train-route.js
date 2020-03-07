const express = require("express");
const { exec } = require("child_process");
const router = express.Router();

router.get("/", (req, res, next) => {
  console.log("Train model requested");

  exec("cd core && python3 train_main.py", function(error, stdout, stderr) {
    console.log(stdout);
    var responseList = stdout.split(/\r?\n/);

    var classes = -1,
      totalImages = -1,
      successful = false;
    responseList.forEach(function(consoleLine) {
      if (consoleLine.includes("Classes")) {
        classes = parseInt(consoleLine.replace("Classes: ", ""));
      }

      if (consoleLine.includes("Images")) {
        totalImages = parseInt(consoleLine.replace("Images: ", ""));
      }

      if (consoleLine.includes("Completed")) {
        successful = true;
      }
    });

    if (successful) {
      return res.status(200).json({
        statusCode: 200,
        statusMessage: "Model re-trained successfully",
        classes: classes,
        totalImages: totalImages
      });
    } else {
      return res.status(404).json({
        statusCode: 404,
        statusMessage: "Model training failed"
      });
    }
  });
});

module.exports = router;
