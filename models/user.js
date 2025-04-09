const pool = require("../config/db");

const UserModel = {
  // -----------------------------------------------------------------//
// -----------------------------------------------------------------//
  async createUser(name, email, password) {
    const query = `
      INSERT INTO users (name, email ,password)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const values = [name, email, password];
    const result = await pool.query(query, values);
    return result.rows;
  },

  // -----------------------------------------------------------------//
// -----------------------------------------------------------------//
  
  async createAdmin(name, email, password) {
    const query = `
      INSERT INTO users (name, email , password, role)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const values = [name, email, password, "admin"];
    const result = await pool.query(query, values);
    return result.rows;
  },


  // -----------------------------------------------------------------//
// -----------------------------------------------------------------//

  async getAllUsers() {
    const result = await pool.query("SELECT * FROM users");
    return result.rows;
  },


  // -----------------------------------------------------------------//
// -----------------------------------------------------------------//

  async login(email) {
    
    try {      
      const result = await pool.query(
        "SELECT * FROM users WHERE email = $1" ,[email]
      );
      const user = result.rows[0];
      return user;
    } catch (err) {
      return { status: 500, message: "Server error" };
    }
  },

  // -----------------------------------------------------------------//
// -----------------------------------------------------------------//

};

module.exports = UserModel;
