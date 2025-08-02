import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchMySessions } from "../api/api";

const MySessionsPage = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMySessions = async () => {
      try {
        const { data } = await fetchMySessions();
        setSessions(data);
      } catch (err) {
        setError("Failed to fetch your sessions.");
      } finally {
        setLoading(false);
      }
    };
    getMySessions();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl font-semibold text-gray-700">
          Loading your sessions...
        </div>
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">My Sessions</h1>
        <Link
          to="/editor"
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Create New Session
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sessions.map((session) => (
          <div
            key={session._id}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {session.title}{" "}
              <span className="text-sm font-normal text-gray-500">
                ({session.status})
              </span>
            </h3>
            <p className="text-gray-600 mb-4">
              <span className="font-medium">Tags:</span>{" "}
              {session.tags.join(", ")}
            </p>
            <Link
              to={`/editor/${session._id}`}
              className="text-blue-500 hover:text-blue-700 hover:underline transition duration-300"
            >
              Edit Session
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MySessionsPage;
