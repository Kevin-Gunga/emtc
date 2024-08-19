const express = require("express");
const app = express();
const path = require("path");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
require("dotenv").config();


app.use(express.static(path.join(__dirname, "../")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host: process.env.database_host,
  user: process.env.database_user,
  password: process.env.database_password
});

db.connect((err) => {
  if (err) {
    console.log(err);
  }
  console.log("connected to MysQl, ID: ", db.threadId);

  const exieraCollege = `CREATE DATABASE IF NOT EXISTS exiera_college`;

  db.query(exieraCollege, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log("exiera_college database created successfully");

    db.changeUser({ database: "exiera_college" }, (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log("exiera_college database is in use");

      const user = `CREATE TABLE IF NOT EXISTS user 
                    (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
                    first_name VARCHAR(255) NOT NULL,
                    middle_name VARCHAR(255),
                    last_name VARCHAR(255) NOT NULL,
                    email VARCHAR(255) NOT NULL,
                    id_birth INT(255) NOT NULL,
                    gender VARCHAR(255) NOT NULL,
                    birth_date VARCHAR(255) NOT NULL,
                    county VARCHAR(255) NOT NULL,
                    year_examination INT(255) NOT NULL,
                    index_number INT(255) NOT NULL,
                    disabled_person VARCHAR(255),
                    attachments VARCHAR(255) NOT NULL,
                    postal_address INT(10) NOT NULL,
                    postal_code INT(10) NOT NULL,
                    town VARCHAR(10) NOT NULL,
                    phone_number_1 INT(15) NOT NULL,
                    phone_number_2 INT(15),
                    submitted_at DATETIME NOT NULL DEFAULT CURRENT_TIME
                    )`;

      db.query(user, (err, result) => {
        if (err) {
          console.log(err);
        }
        console.log("user table created successfully");
      });
    });
  });
});

app.get("/index", (req, res) => {
  res.redirect("/");
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../index.html"));
});

app.post("/admission", (req, res) => {
  const { name, email, message } = req.body;
  const query = `INSERT INTO user (name, email, message) VALUES (?, ?, ?)`;
  db.query(query, [name, email, message], (err, result) => {
    if (err) {
      console.log(err);
      // res.status(500).sendFile(path.join(__dirname, "500.html"));
    }
    console.log("information submitted successfully");
    // return res.redirect('/');
  });
});

app.get("/admission", (req, res) => {
  res.sendFile(path.join(__dirname, "../admission.html"));
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "../404.html"));
});

app.use((error, req, res, next) => {
  res.status(500).sendFile(path.join(__dirname, "../500.html"));
});

app.listen(4000, () => {
  console.log("Server is up and running on port: 4000");
});
