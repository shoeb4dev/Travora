import api from "./axios";

export const getReels = async (params = {}) => {
  const response = await api.get(
    "/reels",
    {
      params,
    }
  );

  return response.data;
};

export const getReelById = async (id) => {
  const response = await api.get(
    `/reels/${id}`
  );

  return response.data;
};

export const getReelsByAttraction = async (
  attractionId
) => {
  const response = await api.get(
    `/reels/attraction/${attractionId}`
  );

  return response.data;
};

export const createReel = async (reelData) => {
  const response = await api.post(
    "/reels",
    reelData
  );

  return response.data;
};

export const updateReel = async (
  id,
  reelData
) => {
  const response = await api.put(
    `/reels/${id}`,
    reelData
  );

  return response.data;
};

export const deleteReel = async (id) => {
  const response = await api.delete(
    `/reels/${id}`
  );

  return response.data;
};