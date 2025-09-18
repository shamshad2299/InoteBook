const connectToMongo = require("./dataBase");
require("dotenv").config();
//const passport = require("passport");
//const session = require("express-session");
const cors = require("cors");
const express = require("express");
const authRoutes = require("./Routes/auth.js");
const noteRoutes = require("./Routes/notesRoutes.js")
const serverless = require("serverless-http");

connectToMongo();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// app.use(session({
//   secret: process.env.SESSION_SECRET, // use a dedicated secret
//   resave: false,
//   saveUninitialized: false,
// }));

// app.use(passport.initialize());
// app.use(passport.session());

// Multer static files
app.use("/uploads", express.static("uploads"));

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from Express on Vercel!" });
});
// Routes

app.use("/api/auth", authRoutes);
app.use("/api/note", noteRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Server is running" });
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

module.exports = app;
module.exports.handler = serverless(app);