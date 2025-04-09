const pool = require("../config/db");

const cartModel = {
  // -----------------------------------------------------------------//
  // -----------------------------------------------------------------//

  async addToCart(userId, productId, quantity) {
    const query = `
      INSERT INTO cart_items (user_id, product_id, quantity)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const result = await pool.query(query, [userId, productId, quantity]);
    return result.rows[0];
  },

  // -----------------------------------------------------------------//
  // -----------------------------------------------------------------//

  async getCart(userId) {
    const query = `
      SELECT ci.*, p.name, p.price, p.image
      FROM cart_items ci
      JOIN products p ON ci.product_id = p.id
      WHERE ci.user_id = $1;
    `;
    const result = await pool.query(query, [userId]);
    return result.rows;
  },

  // -----------------------------------------------------------------//
  // -----------------------------------------------------------------//

  async removeFromCart(cartItemId, userId) {
    const query = `
      DELETE FROM cart_items
      WHERE id = $1 AND user_id = $2;
    `;
    await pool.query(query, [cartItemId, userId]);
    return { message: "Item removed from cart" };
  },

  // -----------------------------------------------------------------//
  // -----------------------------------------------------------------//

  async clearCart(userId) {
    await pool.query(`DELETE FROM cart_items WHERE user_id = $1;`, [userId]);
    return { message: "Cart cleared" };
  },
  // -----------------------------------------------------------------//
  // -----------------------------------------------------------------//
};

module.exports = cartModel;
