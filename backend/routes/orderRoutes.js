const express = require("express");
const mongoose = require("mongoose");
const Product = require("../models/Product");
const Order = require("../models/Order");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Create a new order
// POST /api/orders
router.post("/", protect, async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod } = req.body;

    if (
      !Array.isArray(items) ||
      items.length === 0 ||
      !shippingAddress ||
      typeof shippingAddress.fullName !== "string" ||
      !shippingAddress.fullName.trim() ||
      typeof shippingAddress.address !== "string" ||
      !shippingAddress.address.trim() ||
      typeof shippingAddress.city !== "string" ||
      !shippingAddress.city.trim()
    ) {
      return res.status(400).json({
        message: "Valid cart items and shipping details are required.",
      });
    }

    const orderItems = [];
    let totalAmount = 0;

    // Verify products and calculate prices on the server
    for (const item of items) {
      const productId = item.product || item._id || item.id;
      const quantity = Number(item.quantity);

      if (
        !productId ||
        !mongoose.isValidObjectId(productId) ||
        !Number.isInteger(quantity) ||
        quantity < 1
      ) {
        return res.status(400).json({
          message: "Invalid product or quantity in the order.",
        });
      }

      const product = await Product.findById(productId);

      if (!product) {
        return res.status(404).json({
          message: "One of the ordered products was not found.",
        });
      }

      if (product.stock < quantity) {
        return res.status(400).json({
          message: `Insufficient stock for ${product.name}.`,
        });
      }

      orderItems.push({
        product: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        quantity,
      });

      totalAmount += product.price * quantity;
    }

    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      shippingAddress: {
        fullName: shippingAddress.fullName.trim(),
        address: shippingAddress.address.trim(),
        city: shippingAddress.city.trim(),
        postalCode: shippingAddress.postalCode || "",
        phone: shippingAddress.phone || "",
      },
      paymentMethod:
        typeof paymentMethod === "string" && paymentMethod.trim()
          ? paymentMethod.trim()
          : "Cash on Delivery",
      totalAmount,
    });

    res.status(201).json({
      message: "Order placed successfully.",
      order,
    });
  } catch (error) {
    console.error("Create order error:", error.message);

    res.status(500).json({
      message: "Unable to place your order.",
    });
  }
});

// Get the logged-in user's order history
// GET /api/orders/myorders
router.get("/myorders", protect, async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user._id,
    })
      .populate("items.product", "name image")
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    console.error("Order history error:", error.message);

    res.status(500).json({
      message: "Unable to fetch order history.",
    });
  }
});

module.exports = router;