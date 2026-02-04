import axios from "axios";

const API_URL = "https://my-project-m156.onrender.com";

export const createAppointment = async (data) => {
  const res = await axios.post(
    `${API_URL}/appointments`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return res.data;
};

export const getAppointments = async () => {
  const res = await axios.get(`${API_URL}/appointments`);
  return res.data;
};
