import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";

export default function Book() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    service: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {

      
     await axios.post("https://beautycabin-1.onrender.com/appointments", form);



      toast.success("Appointment booked successfully 🌸");

      setForm({
        name: "",
        phone: "",
        date: "",
        time: "",
        service: "",
      });
    } catch (err) {
      toast.error(err.response?.data?.error || "Booking failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="book"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FDECEF] to-[#FFF1F5] px-4"
    >
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/90 backdrop-blur-lg shadow-xl rounded-3xl p-8 w-full max-w-md space-y-5 border border-pink-100"
      >
        <h2 className="text-3xl font-bold text-center text-[#7C2D12]">
          Book Appointment
        </h2>

        <p className="text-center text-[#9D174D] text-sm">
          Pamper yourself with our beauty services 🌸
        </p>

        {["name", "phone", "date", "time"].map((f) => (
          <motion.input
            key={f}
            whileFocus={{ scale: 1.02 }}
            type={
              f === "phone"
                ? "tel"
                : f === "date"
                ? "date"
                : f === "time"
                ? "time"
                : "text"
            }
            name={f}
            placeholder={f.charAt(0).toUpperCase() + f.slice(1)}
            value={form[f]}
            onChange={handleChange}
            required
            className="w-full border border-pink-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        ))}

        <motion.select
          name="service"
          value={form.service}
          onChange={handleChange}
          required
          className="w-full border border-pink-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
        >
          <option value="">Select Service</option>
          <option>Hair & Scalp Treatment</option>
          <option>Facial Treatment</option>
          <option>Bridal Make Up</option>
          <option>Hair Coloring</option>
          <option>Manicure & Pedicure</option>
          <option>Waxing</option>
          <option>Henna Arts</option>
        </motion.select>

        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full py-3 bg-gradient-to-r from-[#EC4899] to-[#F472B6] text-white font-semibold rounded-xl shadow-lg"
        >
          {loading ? "Booking..." : "Confirm Appointment"}
        </motion.button>
      </motion.form>
    </section>
  );
}
