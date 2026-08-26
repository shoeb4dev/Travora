import api from "./client";

export const getCities = async () => {
  const response = await api.get("/cities");

  return response.data.cities || [];
};

export const getCityById = async (id) => {
  const response = await api.get(`/cities/${id}`);

  return response.data.city;
};

export const getCitiesByCountry = async (countryId) => {
  const response = await api.get(`/cities?country=${countryId}`);

  return response.data.cities || [];
};