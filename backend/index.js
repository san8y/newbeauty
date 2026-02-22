const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const appointmentRoutes = require("./routes/appointment.routes");

dotenv.config();

const app = express();

/* ✅ TRUST PROXY (important for Render/Vercel cookies & headers) */
app.set("trust proxy", 1);

/* 🔐 CORS */
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",   // 👈 ADD THIS
  "https://beautycabin-2.onrender.com" // your frontend
  
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow mobile apps / postman
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
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

/* 📌 Routes */
app.use("/auth", authRoutes);
app.use("/appointments", appointmentRoutes);

/* ✅ MongoDB */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Mongo Error:", err);
  });
