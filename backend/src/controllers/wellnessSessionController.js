const Session = require("../models/WellnessSessionModel"); // Updated model name

exports.getPublicSessions = async (req, res) => {
  try {
    const sessions = await Session.find({ status: "published" });
    res.status(200).json(sessions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching public sessions." });
  }
};

exports.getMySessions = async (req, res) => {
  try {
    const sessions = await Session.find({ userId: req.userId });
    res.status(200).json(sessions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user sessions." });
  }
};

exports.getSession = async (req, res) => {
  const { id } = req.params;
  try {
    const session = await Session.findOne({ _id: id, userId: req.userId });
    if (!session)
      return res.status(404).json({ message: "Session not found." });
    res.status(200).json(session);
  } catch (error) {
    res.status(500).json({ message: "Error fetching session." });
  }
};

exports.saveDraft = async (req, res) => {
  const { title, tags, jsonFileUrl } = req.body;
  try {
    const updatedSession = await Session.findOneAndUpdate(
      { _id: req.body._id, userId: req.userId },
      { title, tags, jsonFileUrl, status: "draft", updatedAt: Date.now() },
      { new: true, upsert: true }
    );
    res.status(200).json(updatedSession);
  } catch (error) {
    res.status(500).json({ message: "Error saving draft." });
  }
};

exports.publishSession = async (req, res) => {
  const { id } = req.params;
  try {
    const session = await Session.findOneAndUpdate(
      { _id: id, userId: req.userId },
      { status: "published", updatedAt: Date.now() },
      { new: true }
    );
    if (!session)
      return res.status(404).json({ message: "Session not found." });
    res.status(200).json(session);
  } catch (error) {
    res.status(500).json({ message: "Error publishing session." });
  }
};
