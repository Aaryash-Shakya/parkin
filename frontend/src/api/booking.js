import client from "./client";

// userId,
// parkingId,
// vehicleType,
// registrationNumber,
// startTime,
// endTime,

export const createBooking = async (bookingData) => {
    try {
        const { data } = await client.post(`/user/booking`, bookingData);
        return data;
    } catch (err) {
        const { response } = err;
        if (response?.data) return response.data;

        return { error: err.message || err };
    }
}

export const getBookings = async (userId) => {
    try {
        const { data } = await client.get(`/user/bookings/${userId}`);
        return data;
    } catch (err) {
        const { response } = err;
        if (response?.data) return response.data;

        return { error: err.message || err };
    }
}