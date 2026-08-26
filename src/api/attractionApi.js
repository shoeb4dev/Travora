import api from "./axios";

export const getAttractions = async (
  params = {}
) => {
  const response = await api.get(
    "/attractions",
    {
      params,
    }
  );

  return response.data.attractions || [];
};

export const getAttractionById = async (id) => {
  const response = await api.get(
    `/attractions/${id}`
  );

  return response.data.attraction;
};