import api from "./client";

export const getAudioStories = async () => {
  const response = await api.get("/audio-stories");

  return response.data.audioStories || [];
};