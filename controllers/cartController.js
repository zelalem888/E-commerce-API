const cartModel = require("../models/cart");


// -----------------------------------------------------------------//
// -----------------------------------------------------------------//

const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id; 

  try {
    const item = await cartModel.addToCart(userId, productId, quantity);
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ error: "Failed to add to cart" });
  }
};

// -----------------------------------------------------------------//
// -----------------------------------------------------------------//

const getCart = async (req, res) => {
  const userId = req.user.id;
  try {
    const items = await cartModel.getCart(userId);
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ error: "Failed to get cart items" });
  }
};

// -----------------------------------------------------------------//
// -----------------------------------------------------------------//

const removeFromCart = async (req, res) => {
  const { cartItemId } = req.params;
  const userId = req.user.id;

  try {
    const result = await cartModel.removeFromCart(cartItemId, userId);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to remove item from cart" });
  }
};

// -----------------------------------------------------------------//
// -----------------------------------------------------------------//

const clearCart = async (req, res) => {
  const userId = req.user.id;
  try {
    const result = await cartModel.clearCart(userId);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to clear cart" });
  }
  
};

// -----------------------------------------------------------------//
// -----------------------------------------------------------------//

module.exports = { addToCart, getCart, removeFromCart, clearCart };
