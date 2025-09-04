// server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// ✅ Routes
import authRoutes from "./routes/auth.js";     // signup/login
import userRoutes from "./routes/user.js";     // user management

// ========================
// 🔹 Environment Config
// ========================
dotenv.config();
const app = express();

// ========================
// 🔹 Middleware
// ========================
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173","https://webnxior.com","https://webnxior-beb5d.web.app" ,"http://localhost:5174" , "https://fir-connection-71eee.web.app"],// ✅ allow your Vite frontend
    credentials: true,
  })
);

// ========================
// 🔹 Database
// ========================
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// ========================
// 🔹 Models
// ========================
const messageSchema = new mongoose.Schema({
  name: String,
  email: String,
  department: String,
  message: String,
  createdAt: { type: Date, default: Date.now },
});
mongoose.model("Message", messageSchema); // register once

// ========================
// 🔹 Routes
// ========================
app.use("/api/auth", authRoutes);   // signup, login, etc.
app.use("/api/users", userRoutes);  // optional, if you have it

// 📩 Contact form
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, department, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const Message = mongoose.model("Message");
    await new Message({ name, email, department, message }).save();

    res.json({ success: true, msg: "Message saved successfully" });
  } catch (err) {
    console.error("Save error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ========================
// 🔹 Start Server
// ========================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
