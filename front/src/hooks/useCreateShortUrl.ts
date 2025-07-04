"use client";
import { API_URL } from "../constants";
export const useCreateShortUrl = () => {
  const createShortUrl = async (url: string) => {
    try {
      const response = await fetch(`${API_URL}api/url`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ originalUrl: url }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };
  return { createShortUrl };
};
