import api from "./client";

export const getReels = async () => {
  const response = await api.get("/reels");

  return response.data.reels || [];
};

export const getReelById = async (id) => {
  const response = await api.get(`/reels/${id}`);

  return response.data.reel;
};

export const getReelsByAttraction = async (attractionId) => {
  const response = await api.get(
    `/reels/attraction/${attractionId}`
  );

  return response.data.reels || [];
};