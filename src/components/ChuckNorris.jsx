import React, { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";

const ChuckNorris = ({ token, setToken }) => {
  const [fact, setFact] = useState("");
  const [fetchAnother, setFetchAnother] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getFact = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:3333/fact", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setFact(data.fact);
      } else {
        console.error("Error fetching fact:", data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [isLoading]);
  useEffect(() => {
    getFact();
  }, [token]);

  const handleSignout = () => {
    setToken("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="absolute top-4 right-4">
        <button
          onClick={handleSignout}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Sign Out
        </button>
      </div>
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm text-center">
        <h2 className="text-2xl mb-6">Chuck Norris Fact</h2>
        {isLoading ? <LoadingSpinner /> : <p>{fact}</p>}
        <button
          onClick={getFact}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Fetch more
        </button>
      </div>
    </div>
  );
};

export default ChuckNorris;
