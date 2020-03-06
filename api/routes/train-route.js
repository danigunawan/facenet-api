const express = require("express");
const router = express.Router();

router.post("/image", (req, res, next) => {
  console.log("Train model requested");
});

module.exports = router;
