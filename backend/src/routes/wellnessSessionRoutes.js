const express = require("express");
const router = express.Router();
const jwtAuth = require("../middleware/jwtAuth");

const {
  saveDraft,
  publishSession,
  getMySessions,
  getSession,
  getPublicSessions,
  deleteSession,
} = require("../controllers/wellnessSessionController");

// Public route to get all published sessions
router.get("/sessions", getPublicSessions);

// Protected routes for a logged-in user
router.get("/my-sessions", jwtAuth, getMySessions);
router.get("/my-sessions/:id", jwtAuth, getSession);
router.post("/my-sessions/save-draft", jwtAuth, saveDraft);
router.post("/my-sessions/publish/:id", jwtAuth, publishSession);
router.delete("/my-sessions/:id", jwtAuth, deleteSession); // <-- New route for deleting a session

module.exports = router;
