import express from "express";
import cors from "cors";
import mysql from "mysql2";
import bodyParser from "body-parser";
require("dotenv").config();

const PORT = process.env.PORT || 8080;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Create a MySQL connection pool

const pool = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "apnacollege",
  database: "crud",
});

// Handle GET request to fetch data for the specified table
app.get("/", (req, res) => {
  const selectQuery = `SELECT * FROM Users`; // Replace with your actual table name

  pool.query(selectQuery, (err, result) => {
    if (err) {
      console.error("Error fetching data:", err);
      res.status(500).json({ error: "Error fetching data" });
    } else {
      res.status(200).json(result);
    }
  });
});

// delete
app.delete("/delete/:email", (req, res) => {
  const email = req.params.email;

  const selectQuery = `DELETE FROM Users WHERE Email = "${email}"`; // Replace with your actual table name

  pool.query(selectQuery, (err, result) => {
    if (err) {
      console.error("Error fetching data:", err);
      res.status(500).json({ error: "Error fetching data" });
    } else {
      res.status(200).json(result);
    }
  });
});

app.get("/get-one/:Email", (req, res) => {
  const Email = req.params.Email;

  const selectQuery = `SELECT * FROM Users WHERE Email = "${Email}"`; // Replace with your actual table name

  pool.query(selectQuery, (err, result) => {
    if (err) {
      console.error("Error fetching data:", err);
      res.status(500).json({ error: "Error fetching data" });
    } else {
      res.status(200).json(result);
    }
  });
});

app.put("/update/:Email", (req, res) => {
  const emailToUpdate = req.params.Email;
  const updatedData = req.body; // Assuming you send the updated data in the request body

  // Your SQL query to update the record
  const updateQuery = `
    UPDATE Users
    SET Name = "${updatedData.Name}" , MobileNumber = ${updatedData.MobileNumber}
    WHERE Email = "${emailToUpdate}";
  `;

  // Execute the query with the updated data
  pool.query(updateQuery, (err, result) => {
    if (err) {
      console.error("Error fetching data:", err);
      res.status(500).json({ error: "Error fetching data" });
    } else {
      res.status(200).json(result);
    }
  });
});

app.post("/add", (req, res) => {
  const { Name, Email, MobileNumber, DateOfBirth } = req.body; // Assuming you send the data in the request body

  // Your SQL query to insert the new record
  const insertQuery = `
    INSERT INTO Users (Name, Email, MobileNumber, DateOfBirth)
    VALUES (?, ?, ?, ?);
  `;

  // Execute the query with the provided data
  pool.query(
    insertQuery,
    [Name, Email, MobileNumber, DateOfBirth],
    (err, result) => {
      if (err) {
        console.error("Error inserting data:", err);
        res.status(500).json({ error: "Error inserting data" });
      } else {
        res.status(200).json({ message: "Data inserted successfully" });
      }
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
