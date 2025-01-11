import client from "./client";

export const createBooking = async (payload) => {
  try {
    const { data } = await client.post("/parking/add", payload);
    return data;
  } catch (err) {
    const { response } = err;
    if (response?.data) return response.data;

    return { error: err.message || err };
  }
};
