const express = require("express");
const mongoose = require("mongoose");
const Product = require("../models/Product");
const User = require("../models/User");
const Order = require("../models/Order");
const {
  protect,
  adminOnly,
} = require("../middleware/authMiddleware");

const router = express.Router();

// Require administrator access for all routes in this file
router.use(protect, adminOnly);

// GET /api/admin/stats
// Get dashboard statistics
router.get("/stats", async (req, res) => {
  try {
    const [
      totalProducts,
      totalOrders,
      totalCustomers,
      revenueResult,
    ] = await Promise.all([
      Product.countDocuments(),
      Order.countDocuments(),
      User.countDocuments({ role: "user" }),
      Order.aggregate([
        { $match: { status: { $ne: "Cancelled" } } },
        {
          $group: {
            _id: null,
            totalRevenue: { $sum: "$totalAmount" },
          },
        },
      ]),
    ]);

    res.status(200).json({
      totalProducts,
      totalOrders,
      totalCustomers,
      totalRevenue: revenueResult[0]?.totalRevenue || 0,
    });
  } catch (error) {
    console.error("Admin statistics error:", error.message);

    res.status(500).json({
      message: "Unable to fetch dashboard statistics.",
    });
  }
});

// GET /api/admin/products
// Get all products for administration
router.get("/products", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      message: "Unable to fetch products.",
    });
  }
});

// POST /api/admin/products
// Add a new product
router.post("/products", async (req, res) => {
  try {
    const { name, description, price, category, image, stock, featured } =
      req.body;

    if (
      typeof name !== "string" ||
      !name.trim() ||
      typeof category !== "string" ||
      !category.trim() ||
      price === undefined ||
      !Number.isFinite(Number(price)) ||
      Number(price) < 0
    ) {
      return res.status(400).json({
        message: "Valid product name, category, and price are required.",
      });
    }

    if (
      stock !== undefined &&
      (!Number.isInteger(Number(stock)) || Number(stock) < 0)
    ) {
      return res.status(400).json({
        message: "Stock must be a non-negative integer.",
      });
    }

    const product = await Product.create({
      name: name.trim(),
      description: description || "",
      price: Number(price),
      category: category.trim(),
      image: image || "",
      stock: stock === undefined ? 0 : Number(stock),
      featured: Boolean(featured),
    });

    res.status(201).json({
      message: "Product created successfully.",
      product,
    });
  } catch (error) {
    console.error("Create product error:", error.message);

    res.status(500).json({
      message: "Unable to create product.",
    });
  }
});

// PUT /api/admin/products/:id
// Update a product
router.put("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid product ID.",
      });
    }

    const updates = {};
    const allowedFields = [
      "name",
      "description",
      "price",
      "category",
      "image",
      "stock",
      "featured",
    ];

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    if (
      updates.name !== undefined &&
      (typeof updates.name !== "string" || !updates.name.trim())
    ) {
      return res.status(400).json({
        message: "Product name cannot be empty.",
      });
    }

    if (
      updates.category !== undefined &&
      (typeof updates.category !== "string" ||
        !updates.category.trim())
    ) {
      return res.status(400).json({
        message: "Product category cannot be empty.",
      });
    }

    if (updates.price !== undefined) {
      if (
        !Number.isFinite(Number(updates.price)) ||
        Number(updates.price) < 0
      ) {
        return res.status(400).json({
          message: "Invalid product price.",
        });
      }

      updates.price = Number(updates.price);
    }

    if (updates.stock !== undefined) {
      if (
        !Number.isInteger(Number(updates.stock)) ||
        Number(updates.stock) < 0
      ) {
        return res.status(400).json({
          message: "Stock must be a non-negative integer.",
        });
      }

      updates.stock = Number(updates.stock);
    }

    if (updates.name !== undefined) {
      updates.name = updates.name.trim();
    }

    if (updates.category !== undefined) {
      updates.category = updates.category.trim();
    }

    const product = await Product.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found.",
      });
    }

    res.status(200).json({
      message: "Product updated successfully.",
      product,
    });
  } catch (error) {
    console.error("Update product error:", error.message);

    res.status(500).json({
      message: "Unable to update product.",
    });
  }
});

// DELETE /api/admin/products/:id
// Delete a product
router.delete("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid product ID.",
      });
    }

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found.",
      });
    }

    res.status(200).json({
      message: "Product deleted successfully.",
    });
  } catch (error) {
    console.error("Delete product error:", error.message);

    res.status(500).json({
      message: "Unable to delete product.",
    });
  }
});

// GET /api/admin/orders
// Get all customer orders
router.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    console.error("Admin orders error:", error.message);

    res.status(500).json({
      message: "Unable to fetch orders.",
    });
  }
});

// PUT /api/admin/orders/:id/status
// Update an order's status
router.put("/orders/:id/status", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = [
      "Pending",
      "Processing",
      "Shipped",
      "Delivered",
      "Cancelled",
    ];

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid order ID.",
      });
    }

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid order status.",
      });
    }

    const order = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(404).json({
        message: "Order not found.",
      });
    }

    res.status(200).json({
      message: "Order status updated successfully.",
      order,
    });
  } catch (error) {
    console.error("Update order status error:", error.message);

    res.status(500).json({
      message: "Unable to update order status.",
    });
  }
});

module.exports = router;