const pool = require('../config/db');

const productModel = {


  async createProduct(name, description, price , category , image , stock) {
    const query = `
      INSERT INTO users (name,  description, price , category , image , stock)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
    const values = [name,  description, price , category , image , stock];
    const result = await pool.query(query, values);
    return result.rows;
  },

  async getAllProduct() {
    const result = await pool.query('SELECT * FROM products');
    return result.rows

    
  }
};

module.exports = productModel;
