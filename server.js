const express = require("express");
const app = express();
const path = require("path");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const multer = require("multer");
require("dotenv").config();


app.use(express.static(path.join(__dirname, "/")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

// Set up storage for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // where you want to store the uploaded files
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// Initialize upload
const upload = multer({ storage: storage });

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
        return console.error("Error switching database:", err);
      }
      console.log("exiera_college database is in use");

      const user = `CREATE TABLE IF NOT EXISTS user 
                    (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
                    first_name VARCHAR(255) NOT NULL,
                    middle_name VARCHAR(255),
                    last_name VARCHAR(255) NOT NULL,
                    email VARCHAR(255) NOT NULL,
                    id_birth INT(11) NOT NULL,
                    gender VARCHAR(255) NOT NULL,
                    birth_date VARCHAR(255) NOT NULL,
                    county VARCHAR(255) NOT NULL,
                    year_examination VARCHAR(255) NOT NULL,
                    index_number INT(11) NOT NULL,
                    disabled_person VARCHAR(255),
                    attachments VARCHAR(255) NOT NULL,
                    postal_address VARCHAR(11) NOT NULL,
                    postal_code VARCHAR(11) NOT NULL,
                    town VARCHAR(10) NOT NULL,
                    phone_number_1 INT(11) NOT NULL,
                    phone_number_2 INT(11),
                    submitted_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
                    )`;

      db.query(user, (err, result) => {
        if (err) {
          return console.error("Error creating user table:", err);
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
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/admission", upload.single('attachments'), (req, res) => {
  const { first_name, middle_name , last_name ,email, id_birth, gender,
          birth_date, county, year_examination, index_number,
          postal_address, postal_code, town, phone_number_1, phone_number_2} = req.body;

    // Check which radio button is selected
  const disabled_person = req.body.disabled_person === 'yes' ? 'yes' : 'no';

  // const attachmentPath = req.file.path; // Path to the uploaded file
  const attachmentPath = req.file ? req.file.path : ''; // Handle the case where no file is uploaded

  const query = `INSERT INTO user (first_name, middle_name , last_name, email, id_birth, gender,
                birth_date, county, year_examination, index_number, disabled_person, attachments,
                postal_address, postal_code, town, phone_number_1, phone_number_2) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                 `;

  db.query(query, [first_name, middle_name , last_name, email, id_birth, gender,
                   birth_date, county, year_examination , index_number, disabled_person, 
                   attachmentPath, postal_address, postal_code, town, phone_number_1, phone_number_2], (err, result) => {
    if (err) {
      console.error("Error inserting data:", err);
      res.status(500).sendFile(path.join(__dirname, "500.html"));
    }
    // return console.log("Information submitted successfully.We will get back to you via email.");
    res.status(200).send("Information submitted successfully.We will get back to you via email.");
  });
});

app.get("/admission", (req, res) => {
  res.sendFile(path.join(__dirname, "admission.html"));
});

app.get("/academics", (req, res) => {
  res.sendFile(path.join(__dirname, "academics.html"));
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "404.html"));
});

app.use((error, req, res, next) => {
  res.status(500).sendFile(path.join(__dirname, "500.html"));
});

app.listen(4000, () => {
  console.log("Server is up and running on port: 4000");
});
