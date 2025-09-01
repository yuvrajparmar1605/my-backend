// routes/auth.js
import express from "express";
const router = express.Router();

// 🔑 Signup Route
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  console.log("Signup Request:", req.body);

  // ⚡ Save to DB or Firebase here
  res.json({ message: "User registered successfully" });
});

export default router;
