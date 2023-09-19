const express = require("express");
const {
    getOrders,
    getOneOrderById,
    addOrder,
    updateOrder,
    deleteOrder,
} = require("../controllers/orderController");
const router = express.Router();
const verifyToken = require("../utils/verifyToken");

//Get all the categories
router.get("/", getOrders);

//Get all the categories
router.get("/:id", getOneOrderById);

//Add an order
router.post("/", addOrder);

//update order
router.put("/:id", updateOrder);

//delete order
router.delete("/:id", verifyToken, deleteOrder);

module.exports = router;
