import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { saveDraft, publishSession, fetchSession } from "../api/api";
import debounce from "lodash.debounce"; // Ensure lodash.debounce is installed

const SessionEditorPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [session, setSession] = useState({
    title: "",
    tags: "",
    jsonFileUrl: "",
    status: "draft",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getSessionData = async () => {
      if (id) {
        try {
          const { data } = await fetchSession(id);
          setSession({
            ...data,
            tags: data.tags.join(", "), // Convert array to comma-separated string for input
          });
        } catch (err) {
          console.error("Failed to fetch session", err);
          setError("Failed to load session data.");
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false); // No ID, so it's a new session, no loading needed
      }
    };
    getSessionData();
  }, [id]);

  // Debounce logic for auto-save (Bonus Feature)
  const debouncedSaveDraft = useCallback(
    debounce(async (updatedSession) => {
      setIsSaving(true);
      try {
        // Ensure the session has an _id if it's an existing session
        const payload = { ...updatedSession };
        if (id) {
          payload._id = id;
        }
        await saveDraft(payload);
        console.log("Auto-saved!");
      } catch (error) {
        console.error("Auto-save failed", error);
        // Optionally, show a temporary error message to the user
      } finally {
        setIsSaving(false);
      }
    }, 5000), // 5 seconds of inactivity
    [id] // Recreate debounce function if ID changes (e.g., creating new vs. editing existing)
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedSession = { ...session, [name]: value };
    setSession(updatedSession);
    debouncedSaveDraft(updatedSession);
  };

  const handleManualSaveDraft = async () => {
    setIsSaving(true);
    try {
      const payload = { ...session };
      if (id) {
        payload._id = id;
      }
      await saveDraft(payload);
      console.log("Draft saved manually!");
    } catch (error) {
      console.error("Manual save failed", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublish = async (e) => {
    e.preventDefault();
    try {
      // Ensure the session is saved as a draft first if it's new
      if (!id) {
        const { data } = await saveDraft({ ...session, status: "draft" });
        // Use the ID from the newly created draft for publishing
        await publishSession(data._id);
      } else {
        await publishSession(id);
      }
      navigate("/my-sessions");
    } catch (error) {
      console.error("Failed to publish session", error);
      // Optionally, show an error message to the user
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl font-semibold text-gray-700">
          Loading session editor...
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
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-gray-100 p-4">
      {" "}
      {/* Adjusted min-h-screen to account for header height */}
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          {id ? "Edit Session" : "Create New Session"}
        </h2>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              name="title"
              value={session.title}
              onChange={handleChange}
              placeholder="Enter session title"
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
          </div>
          <div>
            <label
              htmlFor="tags"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Tags (comma-separated)
            </label>
            <input
              id="tags"
              type="text"
              name="tags"
              value={session.tags}
              onChange={handleChange}
              placeholder="e.g., yoga, meditation, mindfulness"
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
          </div>
          <div>
            <label
              htmlFor="jsonFileUrl"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              JSON File URL
            </label>
            <input
              id="jsonFileUrl"
              type="text"
              name="jsonFileUrl"
              value={session.jsonFileUrl}
              onChange={handleChange}
              placeholder="URL to your session's JSON content"
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
          </div>
          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={handleManualSaveDraft}
              className="bg-gray-500 text-white py-2 px-6 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-300 flex items-center justify-center"
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Saving...
                </>
              ) : (
                "Save as Draft"
              )}
            </button>
            <button
              type="button"
              onClick={handlePublish}
              className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            >
              Publish
            </button>
          </div>
        </form>
        {isSaving && (
          <p className="text-center text-sm text-gray-500 mt-4">
            Auto-saving...
          </p>
        )}
      </div>
    </div>
  );
};

export default SessionEditorPage;
