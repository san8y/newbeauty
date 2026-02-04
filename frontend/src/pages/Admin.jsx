import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AdminLogin from "./AdminLogin";
import api from "../api/axios";

export default function Admin() {
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem("token"));
  const [appointments, setAppointments] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔄 Fetch appointments
  const fetchAppointments = async () => {
    setLoading(true);

    try {
      const res = await api.get("/appointments");

      // 🔐 HARD SAFE CHECK
      if (Array.isArray(res.data)) {
        setAppointments(res.data);
      } else {
        setAppointments([]);
      }

    } catch (err) {
      console.error(err);
      toast.error("Failed to load appointments");

      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        setIsAuth(false);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuth) fetchAppointments();
  }, [isAuth]);

  if (!isAuth) return <AdminLogin onSuccess={() => setIsAuth(true)} />;

  // 🔍 Filter safely
  const filtered = appointments.filter(
    (a) =>
      a?.name?.toLowerCase().includes(search.toLowerCase()) ||
      a?.phone?.includes(search)
  );

  // ✅ Confirm
  const confirmBooking = async (id) => {
    try {
      await api.patch(`/appointments/${id}/confirm`);
      toast.success("Confirmed");
      fetchAppointments();
    } catch {
      toast.error("Confirm failed");
    }
  };

  // ❌ Delete
  const deleteBooking = async (id) => {
    if (!window.confirm("Delete?")) return;

    try {
      await api.delete(`/appointments/${id}`);
      toast.success("Deleted");
      fetchAppointments();
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-pink-50 p-6">



<div className="flex justify-center mt-6">
  <button
    onClick={() => {
      localStorage.removeItem("token");
      setIsAuth(false);
      toast.success("Logged out 👋");
    }}
    className="px-8 py-3 rounded-2xl font-semibold text-white 
    bg-gradient-to-r from-red-500 to-pink-500
    shadow-lg hover:scale-105 transition-all duration-300"
  >
    🚪 Logout
  </button>
</div>





      <h1 className="text-3xl text-center mt-6">Beauty Cabin Admin 🌸</h1>

      <input
        placeholder="Search"
        className="block mx-auto mt-4 p-3 border rounded-xl"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading ? (
        <p className="text-center mt-10">Loading...</p>
      ) : filtered.length === 0 ? (
        <p className="text-center mt-10">No bookings</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6 mt-6">
          {filtered.map((a) => (
            <div key={a._id} className="bg-white p-4 rounded-xl shadow">
              <h2>{a.name}</h2>
              <p>{a.phone}</p>
              <p>{a.service}</p>

              <div className="flex gap-2 mt-3">
                {a.status !== "Confirmed" && (
                  <button
                    onClick={() => confirmBooking(a._id)}
                    className="flex-1 bg-green-500 text-white py-2 rounded"
                  >
                    Confirm
                  </button>
                )}

                <button
                  onClick={() => deleteBooking(a._id)}
                  className="flex-1 bg-pink-500 text-white py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
