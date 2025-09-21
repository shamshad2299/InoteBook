// backend/api/index.js
import express from "express";
import serverless from "serverless-http";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

// --- All routes go here ---
app.get("/api/test", (req, res) => {
  res.json({ msg: "Backend working!" });
});

// Auth routes
app.post("/api/auth/login", (req, res) => {
  res.json({ msg: "Login route" });
});

app.post("/api/auth/createuser", (req, res) => {
  res.json({ msg: "Signup route" });
});

// Notes routes
app.get("/api/note/usernote", (req, res) => {
  res.json({ msg: "User notes" });
});

app.post("/api/note", (req, res) => {
  res.json({ msg: "Note added" });
});

// etc. — merge all route files here

// --- Export as one serverless function ---
export default serverless(app);
