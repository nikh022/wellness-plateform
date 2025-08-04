import React from "react";

const SessionForm = ({
  session,
  handleChange,
  handleManualSaveDraft,
  handlePublish,
  isSaving,
}) => {
  return (
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
              <div className="animate-spin -ml-1 mr-3 h-5 w-5 rounded-full border-2 border-white border-t-transparent"></div>
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
  );
};

export default SessionForm;
