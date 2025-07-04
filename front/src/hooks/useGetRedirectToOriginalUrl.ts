import { API_URL } from "@/constants";

export const useGetRedirectToOriginalUrl = () => {
  const getRedirectToOriginalUrl = async (shortUrl: string) => {
    try {
      const response = await fetch(`${API_URL}redirect/${shortUrl}`);
      if (!response.ok) {
        throw new Error("Réponse non valide");
      }
      const data = await response.json();
      return data.redirectToOriginalUrl;
    } catch (error) {
      return null;
    }
  };

  return { getRedirectToOriginalUrl };
};
