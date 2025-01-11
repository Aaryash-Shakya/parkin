import client from "./client";

export const addNewParking = async (parkingData) => {
  try {
    const { data } = await client.post(`/parking/add`, parkingData);
    return data;
  } catch (err) {
    const { response } = err;
    if (response?.data) return response.data;

    return { error: err.message || err };
  }
};

export const searchNearByParking = async (location) => {
    try {
        const { data } = await client.get(`/parking/nearby`,
            {
                params: {
                    lat: location.lat,
                    long: location.lon,
                    radiusInKm: 0.5
                }
            }
        );
        return data;
    } catch (err) {
        const { response } = err;
        if (response?.data) return response.data;

        return { error: err.message || err };
    }
}

export const getParkingList = async () => {
    try {
        const { data } = await client.get(`/parking/list}`);
        return data;
    } catch (err) {
        const { response } = err;
        if (response?.data) return response.data;

        return { error: err.message || err };
    }
}

export const getParkingDetail = async (parkingId) => {
    try {
        const { data } = await client.get(`/parking/show/${parkingId}`);
        return data;
    } catch (err) {
        const { response } = err;
        if (response?.data) return response.data;

        return { error: err.message || err };
    }
}

export const listAllParking = async () => {
    try {
        const { data } = await client.get(`/parking/list`);
        return data;
    }
    catch (err) {
        const { response } = err;
        if (response?.data) return response.data;

        return { error: err.message || err };
    }
}
