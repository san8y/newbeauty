const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path"); // ✅ needed for static file serving

const authRoutes = require("./routes/auth.routes");
const appointmentRoutes = require("./routes/appointment.routes");

dotenv.config();

const app = express();

/* ✅ TRUST PROXY */
app.set("trust proxy", 1);

/* 🔐 CORS */
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
  "https://beautycabin-2.onrender.com"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // allow Postman/mobile
      if (allowedOrigins.includes(origin)) return callback(null, true);
      else return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

/* 📦 Middleware */
app.use(express.json());

/* 🩺 Health Check */
app.get("/", (req, res) => {
  res.json({ status: "Backend running 🚀" });
});
app.get("/db-check", (req, res) => {
  res.json({ ok: true, message: "Backend is live" });
});

/* 📌 API Routes */
app.use("/auth", authRoutes);
app.use("/appointments", appointmentRoutes);

/* 📂 Serve React Frontend */
// Serve static files from frontend build
app.use(express.static(path.join(__dirname, "../frontend/build")));

// Catch-all route to serve React index.html for client-side routing
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});

/* ✅ MongoDB + Start Server */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error("❌ Mongo Error:", err));
