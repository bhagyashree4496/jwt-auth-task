const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const app = express();
app.use(cors());

app.use(express.json());

app.get("/", (req, res) => res.send("Hello World!"));
app.use("/api/auth", require("./routes/userRoute"));
mongoose.connect(process.env.MONGO_URI, console.log("Connected to MongoDB"));
app.listen(5000, console.log("Server is running on port 5000"));
