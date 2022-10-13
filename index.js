require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const DB_Connection = require("./DB/db");

const users = require("./routes/users");
const subjects = require("./routes/subject");
const teachers = require("./routes/teacher");
const groups = require("./routes/group");
const students = require("./routes/student");

DB_Connection();
const app = express();

 // middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true}))
app.use(express.raw());
app.use(cors());

app.use(bodyParser.urlencoded({extended: true }));
app.use(bodyParser.json())
app.use("/api/auth", require("./routes/auth"))
app.use("/api/users", users)
app.use("/api/subjects",subjects);
app.use("/api/teachers", teachers);
app.use("/api/groups", groups);
app.use("/api/students", students);
app.use("/api/enrolled", require("./routes/enrolledStudent"))

const port = process.env.PORT || 8080;

app.listen(3022, () => console.log(`server on post ${port} is runing`) )

