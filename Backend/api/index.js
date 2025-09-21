const connectToMongo = require("../dataBase");
require("dotenv").config();
const cors = require("cors");
const express = require("express");

connectToMongo();
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());


app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from Express on Vercel!" });
});
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

module.exports = app;

