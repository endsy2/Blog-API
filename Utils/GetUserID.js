import pool from "./db_connection.js";

export const getUserID = (req, res, next) => {
    const query = 'SELECT id FROM user WHERE username = ?';
    const username = req.user;
  
    pool.query(query, [username], (error, result) => {
      if (error) {
        return res.status(400).json({ message: "Something went wrong" });
      }
      if (result.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }
  
      req.userID = result[0].id; // Attach user ID to the request
      next(); // Move to the next middleware
    });
}