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

export const getOwnerParkingSpaces = async (userID) => {
  try {
    const { data } = await client.get(`/user/parkings/${userID}`);
    return data;
  } catch (err) {
    const { response } = err;
    if (response?.data) return response.data;

    return { error: err.message || err };
  }
};

export const getParkingSpaceData = async (parkingId) => {
  try {
    const { data } = await client.get(`/parking/show/${parkingId}`);
    return data;
  } catch (err) {
    const { response } = err;
    if (response?.data) return response.data;

    return { error: err.message || err };
  }
};
