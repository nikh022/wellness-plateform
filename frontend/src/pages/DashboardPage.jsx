import React, { useState, useEffect } from "react";
import { fetchPublicSessions } from "../api/api";

const DashboardPage = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getSessions = async () => {
      try {
        const { data } = await fetchPublicSessions();
        setSessions(data);
      } catch (err) {
        setError("Failed to fetch public sessions.");
      } finally {
        setLoading(false);
      }
    };
    getSessions();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl font-semibold text-gray-700">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl font-semibold text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Public Wellness Sessions
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sessions.map((session) => (
          <div
            key={session._id}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {session.title}
            </h3>
            <p className="text-gray-600">
              <span className="font-medium">Tags:</span>{" "}
              {session.tags.join(", ")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
