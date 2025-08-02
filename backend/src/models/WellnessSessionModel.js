const mongoose = require("mongoose");

const wellnessSessionSchema = new mongoose.Schema({
  // Updated schema name
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  tags: [String],
  jsonFileUrl: String,
  status: { type: String, enum: ["draft", "published"], default: "draft" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Session", wellnessSessionSchema); // Renamed model export to Session
