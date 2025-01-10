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
}

export const searchNearByParking = async (location) => {
    try {
        const { data } = await client.get(`/parking/nearby`,
            {
                params: {
                    lat: location.lat,
                    long: location.lng,
                    radiusKm: 0.5
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