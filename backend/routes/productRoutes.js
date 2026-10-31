const express = require("express");

console.log("✅ PRODUCT ROUTES LOADED");

const router = express.Router();

router.get("/", (req, res) => {
  res.json([
    {
      _id: "1",
      name: "Test Product",
      price: 1000,
      category: "Test"
    }
  ]);
});

module.exports = router;