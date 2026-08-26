import api from "./axios";

export const getCountries = async () => {
  const response = await api.get("/countries");

  return response.data.countries || [];
};

export const getCountryById = async (id) => {
  const response = await api.get(
    `/countries/${id}`
  );

  return response.data.country;
};