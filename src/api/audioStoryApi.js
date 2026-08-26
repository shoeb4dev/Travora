import api from "./axios";

/*
 * Get all audio stories
 */
export const getAudioStories = async () => {
  const response = await api.get("/audio-stories");

  return response.data.audioStories || [];
};

/*
 * Get audio story by ID
 */
export const getAudioStoryById = async (id) => {
  const response = await api.get(
    `/audio-stories/${id}`
  );

  return response.data.audioStory;
};