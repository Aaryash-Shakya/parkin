import client from "./client";

export const createUser = async (userInfo) => {
  try {
    const { data } = await client.post("/create-route-here", userInfo);
    return data;
  } catch (err) {
    const { response } = err;
    if (response?.data) return response.data;

    return { error: err.message || err };
  }
};

export const signInUser = async (userInfo) => {
  try {
    const { data } = await client.post("/signin-route-here", userInfo);
    return data;
  } catch (err) {
    const { response } = err;
    if (response?.data) return response.data;

    return { error: err.message || err };
  }
};

export const getIsAuth = async (token) => {
  try {
    const { data } = await client.get("/isAuth-route-here", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    return data;
  } catch (err) {
    const { response } = err;
    if (response?.data) return response.data;

    return { error: err.message || err };
  }
};
