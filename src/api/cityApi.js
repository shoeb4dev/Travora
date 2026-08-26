import api from "./axios";

export const getCities = async () => {
  const response = await api.get("/cities");

  return response.data.cities || [];
};

export const getCityById = async (id) => {
  const response = await api.get(
    `/cities/${id}`
  );

  return response.data.city;
};