const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const Appointment = require("./models/Appointment");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ Mongo Error:", err));

// Health check
app.get("/db-check", (req, res) => {
  res.json({ ok: true });
});

// CREATE appointment (Customer)
app.post("/appointments", async (req, res) => {
  try {
    const appointment = await Appointment.create(req.body);
    res.status(201).json(appointment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ appointments (Admin)
app.get("/appointments", async (req, res) => {
  const data = await Appointment.find().sort({ createdAt: -1 });
  res.json(data);
});

// CONFIRM appointment
app.patch("/appointments/:id/confirm", async (req, res) => {
  await Appointment.findByIdAndUpdate(req.params.id, {
    status: "Confirmed",
  });
  res.json({ success: true });
});

// DELETE appointment
app.delete("/appointments/:id", async (req, res) => {
  await Appointment.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);
