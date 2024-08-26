"use client";
import React, { useState } from "react";
import { ChevronRight, Flame, Loader2 } from "lucide-react";

const SizzleMyX = () => {
  const [handle, setHandle] = useState("");
  const [roast, setRoast] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setRoast("");

    try {
      const response = await fetch("https://universe.lemme.cloud/api/roast", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: handle }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch roast");
      }

      const data = await response.json();
      setRoast(data.roast);
    } catch (err) {
      setError("Failed to get roast. Please try again.");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 to-red-600 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="bg-white rounded-lg shadow-xl p-4 sm:p-6 md:p-8 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-4 sm:mb-6 text-red-600 flex items-center justify-center">
          <Flame className="mr-2 animate-pulse w-6 h-6 sm:w-8 sm:h-8" />
          SizzleMyX
        </h1>
        <p className="text-gray-700 text-center mb-4 sm:mb-6 font-medium text-sm sm:text-base">
          Enter your X handle and get ready for a spicy roast! 🌶️🔥
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center bg-gray-100 rounded-md p-2 focus-within:ring-2 focus-within:ring-red-400 transition duration-300">
            <span className="text-gray-500 mr-2 font-bold">@</span>
            <input
              type="text"
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
              placeholder="YourXHandle"
              className="bg-transparent flex-grow focus:outline-none text-gray-800 placeholder-gray-400 font-medium text-sm sm:text-base"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 sm:py-3 px-4 rounded-md transition duration-300 ease-in-out flex items-center justify-center transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50 text-sm sm:text-base"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="animate-spin mr-2 w-4 h-4 sm:w-5 sm:h-5" />
            ) : (
              <Flame className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
            )}
            {loading ? "Sizzling..." : "Bring the Heat"}
          </button>
        </form>
        {error && (
          <p className="text-red-500 mt-4 text-center font-medium text-sm sm:text-base">
            {error}
          </p>
        )}
        {roast && (
          <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-gray-100 rounded-md animate-fade-in">
            <h2 className="font-bold text-base sm:text-lg mb-2 text-red-600">
              Your Sizzling Roast:
            </h2>
            <p className="text-gray-800 font-medium leading-relaxed text-sm sm:text-base">
              {roast}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SizzleMyX;
