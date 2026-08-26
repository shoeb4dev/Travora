import api from "./axios";

/*
 * Like / Unlike Reel
 * POST /api/likes/:reelId
 */
export const likeReel = async (reelId) => {
  const response = await api.post(
    `/likes/${reelId}`
  );

  return response.data;
};

/*
 * Get Reel Likes
 * GET /api/likes/:reelId
 */
export const getReelLikes = async (reelId) => {
  const response = await api.get(
    `/likes/${reelId}`
  );

  return response.data;
};