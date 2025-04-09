const pool = require("../config/db");


const productModel = {

  // -----------------------------------------------------------------//
// -----------------------------------------------------------------//
  async createProduct(name, description, price, category, image, stock) {
    const query = `
      INSERT INTO products (name,  description, price , category , image , stock)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
    const values = [name, description, price, category, image, stock];
    const result = await pool.query(query, values);
    return result.rows;
  },

  // -----------------------------------------------------------------//
  // -----------------------------------------------------------------//
  async searchProduct(name) {
    const query = `SELECT * FROM products WHERE  name = $1 `;
    const value = [name];
    const result = await pool.query(query, value);
    return result.rows.slice(0, 4);
  },

  // -----------------------------------------------------------------//
  // -----------------------------------------------------------------//
  async updateProduct(name, description, price, category, image, stock, id) {
    const query = `
    UPDATE products
    SET name = $1, description = $2, price = $3, category = $4, image = $5, stock = $6
    WHERE id = $7
    RETURNING *;
    `;
    const values = [name, description, price, category, image, stock, id];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  // -----------------------------------------------------------------//
  // -----------------------------------------------------------------//
  async deleteProduct(id) {
    const query = `DELETE FROM products WHERE id = $1`;

    const result = await pool.query(query, [id]);
    return "product deleted";
  },

  // -----------------------------------------------------------------//
  // -----------------------------------------------------------------//

  async getAllProduct() {
    const result = await pool.query("SELECT * FROM products");
    return result.rows;
  },
  // -----------------------------------------------------------------//
// -----------------------------------------------------------------//
};

module.exports = productModel;
