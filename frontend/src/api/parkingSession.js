import client from "./client";


export const recordEntry = async (entryData) => {
    try {
        const { data } = await client.post(`/parking/entry`, entryData);
        return data;
    } catch (err) {
        const { response } = err;
        if (response?.data) return response.data;

        return { error: err.message || err };
    }
}

export const recordExit = async (exitData) => {
    try {
        const { data } = await client.put(`/parking/exit`, exitData);
        return data;
    } catch (err) {
        const { response } = err;
        if (response?.data) return response.data;

        return { error: err.message || err };
    }
}

export const listAllParkedVehicles = async (parkingId) => {
    try {
        const { data } = await client.get(`/parking/parked-vehicles/${parkingId}`);
        return data;
    } catch (err) {
        const { response } = err;
        if (response?.data) return response.data;

        return { error: err.message || err };
    }

}