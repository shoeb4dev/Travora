import api from "./client";

export const getComments = async (reelId) => {
  const response = await api.get(`/comments/${reelId}`);

  return response.data.comments || [];
};

export const addComment = async (reelId, text) => {
  const response = await api.post(`/comments/${reelId}`, {
    text,
  });

  return response.data.comment;
};

export const updateComment = async (commentId, text) => {
  const response = await api.put(
    `/comments/${commentId}`,
    {
      text,
    }
  );

  return response.data.comment;
};

export const deleteComment = async (commentId) => {
  const response = await api.delete(
    `/comments/${commentId}`
  );

  return response.data;
};