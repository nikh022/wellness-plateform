import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API, { fetchMySessions } from "../api/api";

const MySessionsPage = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    getMySessions();
  }, []);

  const handleDelete = async (id) => {
    // IMPORTANT: Add a check to ensure the ID is valid before proceeding
    if (!id || id === "null") {
      console.error("Attempted to delete a session with an invalid ID.");
      return;
    }

    if (window.confirm("Are you sure you want to delete this session?")) {
      try {
        await API.delete(`/my-sessions/${id}`);
        // Refresh the sessions list after successful deletion
        await getMySessions();
      } catch (err) {
        console.error("Failed to delete session:", err);
        setError("Failed to delete the session. Please try again.");
      }
    }
  };

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
        {sessions.map(
          (session) =>
            // Add a conditional check to ensure session._id is valid before rendering
            session &&
            session._id && (
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
                <div className="flex justify-between items-center mt-4">
                  <Link
                    to={`/editor/${session._id}`}
                    className="text-blue-500 hover:text-blue-700 hover:underline transition duration-300"
                  >
                    Edit Session
                  </Link>
                  <button
                    onClick={() => handleDelete(session._id)}
                    className="text-red-500 hover:text-red-700 hover:underline transition duration-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default MySessionsPage;
