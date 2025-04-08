const pool = require("../config/db");

const UserModel = {
  async createUser(name, username, password) {
    const query = `
      INSERT INTO users (name, username ,password)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const values = [name, username, password];
    const result = await pool.query(query, values);
    return result.rows;
  },
  async createAdmin(name, username, password) {
    const query = `
      INSERT INTO users (name, username , password, role)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const values = [name, username, password, "admin"];
    const result = await pool.query(query, values);
    return result.rows;
  },

  async getAllUsers() {
    const result = await pool.query("SELECT * FROM users");
    return result.rows;
  },

  async login(username) {
    
    try {      
      const result = await pool.query(
        "SELECT * FROM users WHERE username = $1" ,[username]
      );
      const user = result.rows[0];
      return user;
    } catch (err) {
      return { status: 500, message: "Server error" };
    }
  },
};

module.exports = UserModel;
