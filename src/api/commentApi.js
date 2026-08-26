import api from "./axios";

/*
 * Get all comments for a reel
 * GET /api/comments/:reelId
 */
export const getComments = async (reelId) => {
  const response = await api.get(
    `/comments/${reelId}`
  );

  return response.data.comments || [];
};

/*
 * Add comment
 * POST /api/comments/:reelId
 */
export const addComment = async (reelId, text) => {
  const response = await api.post(
    `/comments/${reelId}`,
    {
      text,
    }
  );

  return response.data;
};

/*
 * Update comment
 * PUT /api/comments/:commentId
 */
export const updateComment = async (
  commentId,
  text
) => {
  const response = await api.put(
    `/comments/${commentId}`,
    {
      text,
    }
  );

  return response.data;
};

/*
 * Delete comment
 * DELETE /api/comments/:commentId
 */
export const deleteComment = async (commentId) => {
  const response = await api.delete(
    `/comments/${commentId}`
  );

  return response.data;
};