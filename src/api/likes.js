import api from "./client";

export const toggleLike = async (reelId) => {
  const response = await api.post(`/likes/${reelId}`);

  return response.data;
};

export const getReelLikes = async (reelId) => {
  const response = await api.get(`/likes/${reelId}`);

  return response.data;
};