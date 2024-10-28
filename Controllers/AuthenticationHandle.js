import pool from "../Utils/db_connection.js";
import generateToken from "../Utils/generateToken.js";
import bcrypt from "bcrypt";
import { config } from "dotenv";

config();

export const handleSigup = async (req, res) => {

  const image =req.file;

  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(403).json({ message: "All fields must not be empty" });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Prepare the query and values
    const values = [username, email, hashedPassword,image.filename];
    
    const query = "INSERT INTO user (username, email, password,profile) VALUES (?,?,?,?)";

    // Execute the query
      pool.query(query, values, (error, result) => {
      if (error) {
        return res.status(500).json({ message: "Something went wrong in query" });
      }

      // Generate token and send response
      
      res.status(200).json({
        message: "Register success",
        token: generateToken({ username: username }),
      });
    });
  } 
  catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const handleLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(401).json({ message: "All fields must not be empty" });
  }

  try {
    const sql = `SELECT * FROM user WHERE email=?`;

    pool.query(sql, [email], async (error, row) => {
      if (error) {
        throw new Error("Database query error");
      }

      if (row.length === 0) {
        return res.status(404).json({ message: "Email not found" });
      }

      const user = row[0];
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ message: "Incorrect password" });
      }

      const token = generateToken({ username: user.username });

      res.status(200).json({
        message: "Login Success",
        token: token,
      });
    });
  } catch (err) {
    console.error(err.message); // Log error message for debugging
    return res.status(500).json({ message: "Server error, please try again later" });
  }
};
