const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/auth");
const {addToCart,getCart ,removeFromCart,clearCart} = require("../controllers/cartController");

router.post("/add", authenticate, addToCart);

router.get("/", authenticate, getCart);

router.delete("/:cartItemId", authenticate, removeFromCart);

router.delete("/", authenticate, clearCart);

module.exports = router;
