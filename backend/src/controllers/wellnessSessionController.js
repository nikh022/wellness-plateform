const Session = require("../models/WellnessSessionModel");

// Function to save or update a draft session
exports.saveDraft = async (req, res) => {
  const { _id, title, tags, jsonFileUrl } = req.body;
  const userId = req.userId;

  try {
    let updatedSession;

    if (_id) {
      updatedSession = await Session.findOneAndUpdate(
        { _id, userId },
        {
          title,
          tags: tags.split(",").map((tag) => tag.trim()),
          jsonFileUrl,
          status: "draft",
          updatedAt: Date.now(),
        },
        { new: true }
      );
    } else {
      updatedSession = await Session.create({
        userId,
        title,
        tags: tags.split(",").map((tag) => tag.trim()),
        jsonFileUrl,
        status: "draft",
      });
    }

    if (!updatedSession) {
      return res
        .status(404)
        .json({ message: "Session not found or you don't have access." });
    }

    res.status(200).json(updatedSession);
  } catch (error) {
    console.error("Error saving draft:", error);
    res.status(500).json({ message: "Error saving draft." });
  }
};

// Function to publish a session
exports.publishSession = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;

  try {
    const session = await Session.findOneAndUpdate(
      { _id: id, userId, status: "draft" },
      { status: "published", updatedAt: Date.now() },
      { new: true }
    );

    if (!session) {
      return res
        .status(404)
        .json({ message: "Session not found or already published." });
    }

    res
      .status(200)
      .json({ message: "Session published successfully!", session });
  } catch (error) {
    console.error("Error publishing session:", error);
    res.status(500).json({ message: "Error publishing session." });
  }
};

// Function to get a single session by ID
exports.getSession = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;

  try {
    const session = await Session.findOne({ _id: id, userId });
    if (!session) {
      return res
        .status(404)
        .json({ message: "Session not found or you don't have access." });
    }
    res.status(200).json(session);
  } catch (error) {
    console.error("Error fetching session:", error);
    res.status(500).json({ message: "Error fetching session." });
  }
};

// Function to get all sessions for the logged-in user
exports.getMySessions = async (req, res) => {
  const userId = req.userId;

  try {
    const sessions = await Session.find({ userId });
    res.status(200).json(sessions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user sessions." });
  }
};

// Function to get all published sessions for the dashboard
exports.getPublicSessions = async (req, res) => {
  try {
    const sessions = await Session.find({ status: "published" });
    res.status(200).json(sessions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching public sessions." });
  }
};

exports.deleteSession = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;

  try {
    const session = await Session.findOneAndDelete({ _id: id, userId });

    if (!session) {
      return res.status(404).json({
        message: "Session not found or you don't have access to delete it.",
      });
    }

    res.status(200).json({ message: "Session deleted successfully!" });
  } catch (error) {
    console.error("Error deleting session:", error);
    res.status(500).json({ message: "Error deleting session." });
  }
};
