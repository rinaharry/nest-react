"use client";
import React, { useState } from "react";
import { useCreateShortUrl } from "../../hooks/useCreateShortUrl";

const Shortener = () => {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { createShortUrl } = useCreateShortUrl();

  const handleCreateShortener = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setShortUrl("");

    setLoading(true);
    try {
      const response = await createShortUrl(longUrl);
      const { shortUrl, shortCode } = response;
      setShortUrl(shortUrl);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 className="text-2xl font-bold mb-6 text-center">URL Shortener</h1>
      <form onSubmit={handleCreateShortener} className="space-y-4">
        <div>
          <label
            htmlFor="url"
            className="block text-sm font-medium text-gray-700"
          >
            Paste your long URL
          </label>
          <input
            type="url"
            id="url"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="https://example.com"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-indigo-300"
        >
          {loading ? "Shortening..." : "Shorten"}
        </button>
      </form>
      {shortUrl && (
        <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-md">
          <p>Shortened URL:</p>
          <a
            href={shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline break-all"
          >
            {shortUrl}
          </a>
        </div>
      )}

      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-800 rounded-md">
          {error}
        </div>
      )}
    </div>
  );
};

export default Shortener;
