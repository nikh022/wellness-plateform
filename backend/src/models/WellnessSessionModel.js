const mongoose = require("mongoose");

const wellnessSessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true, // Added trim to remove leading/trailing whitespace
    },
    tags: [
      {
        type: String,
        trim: true, // Added trim for individual tags
      },
    ],
    jsonFileUrl: {
      type: String,
      // Consider adding 'required: true' here if a JSON file URL is always mandatory for a session
      // required: true,
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
  },
  {
    timestamps: true, // This automatically adds createdAt and updatedAt fields
    // and updates updatedAt on every save.
    // You can remove the explicit createdAt and updatedAt fields above if you use this.
  }
);

// Export the model with the name "Session" as you currently have it
module.exports = mongoose.model("Session", wellnessSessionSchema);
