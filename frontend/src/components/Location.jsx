import { motion } from "framer-motion";
import { HiLocationMarker } from "react-icons/hi";

export default function Location() {
  return (
    <section className="bg-gradient-to-br from-[#FFF1F5] to-[#FDECEF] px-6 md:px-20 py-20">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-[cursive] text-[#9D174D]">
            Visit Our Salon
          </h2>
          <p className="mt-4 text-[#7C2D12] text-lg">
            We’re located in Taman Perling, Johor Bahru 🌸
          </p>
        </motion.div>

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-10 items-center">

          {/* Address Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/90 backdrop-blur-lg shadow-xl rounded-3xl p-8 border border-pink-100"
          >
            <div className="flex items-center gap-3 mb-4">
              <HiLocationMarker className="text-pink-500 text-3xl" />
              <h3 className="text-2xl font-semibold text-[#7C2D12]">
                Our Address
              </h3>
            </div>

            <p className="text-[#7C2D12] text-lg leading-relaxed">
              229, Jalan Simbang,<br />
              Taman Perling,<br />
              81200 Johor Bahru,<br />
              Johor Darul Ta'zim,<br />
              Malaysia
            </p>

            <a
              href="https://www.google.com/maps/search/?api=1&query=229+Jalan+Simbang+Taman+Perling+Johor+Bahru"
              target="_blank"
              rel="noreferrer"
              className="inline-block mt-6 px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-pink-400 text-white font-semibold shadow-lg hover:shadow-xl transition"
            >
              Open in Google Maps
            </a>
          </motion.div>

          {/* Google Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full h-[350px] rounded-3xl overflow-hidden shadow-2xl border border-pink-100"
          >
            <iframe
              title="Taman Perling Johor Bahru Location"
              src="https://www.google.com/maps?q=229+Jalan+Simbang+Taman+Perling+Johor+Bahru&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
