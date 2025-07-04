import { API_URL } from "@/constants";

export const useGetStatShortUrl = () => {
  const getStatShortUrl = async (shortCode: string) => {
    try {
      const response = await fetch(`${API_URL}api/stats/${shortCode}`);
      if (!response.ok) {
        throw new Error("Réponse non valide");
      }
      const data = await response.json();
      return data.redirectToOriginalUrl;
    } catch (error) {
      return null;
    }
  };

  return { getStatShortUrl };
};
