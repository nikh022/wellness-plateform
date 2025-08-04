import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { saveDraft, publishSession, fetchSession } from "../api/api";
import debounce from "lodash.debounce";
import SessionForm from "../components/SessionForm";

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
      if (id && id !== "null") {
        try {
          const { data } = await fetchSession(id);
          setSession({
            ...data,
            tags: data.tags.join(", "),
          });
        } catch (err) {
          console.error("Failed to fetch session", err);
          setError(
            "Failed to load session data. It might not exist or you don't have access."
          );
        } finally {
          setLoading(false);
        }
      } else {
        setSession({
          title: "",
          tags: "",
          jsonFileUrl: "",
          status: "draft",
        });
        setLoading(false);
      }
    };
    getSessionData();
  }, [id]);

  const debouncedSaveDraft = useCallback(
    debounce(async (updatedSession) => {
      setIsSaving(true);
      try {
        const payload = {
          title: updatedSession.title,
          tags: updatedSession.tags,
          jsonFileUrl: updatedSession.jsonFileUrl,
        };
        if (id && id !== "null") {
          payload._id = id;
        }
        await saveDraft(payload);
        console.log("Auto-saved!");
      } catch (error) {
        console.error("Auto-save failed", error);
      } finally {
        setIsSaving(false);
      }
    }, 5000),
    [id]
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
      const payload = {
        title: session.title,
        tags: session.tags,
        jsonFileUrl: session.jsonFileUrl,
      };
      if (id && id !== "null") {
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
      let sessionIdToPublish;

      const payload = {
        title: session.title,
        tags: session.tags,
        jsonFileUrl: session.jsonFileUrl,
      };

      if (id && id !== "null") {
        await saveDraft({ ...payload, _id: id });
        sessionIdToPublish = id;
      } else {
        const { data } = await saveDraft(payload);
        sessionIdToPublish = data._id;
      }

      await publishSession(sessionIdToPublish);

      navigate("/my-sessions");
    } catch (error) {
      console.error("Failed to publish session", error);
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
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          {id && id !== "null" ? "Edit Session" : "Create New Session"}
        </h2>
        <SessionForm
          session={session}
          handleChange={handleChange}
          handleManualSaveDraft={handleManualSaveDraft}
          handlePublish={handlePublish}
          isSaving={isSaving}
        />
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
