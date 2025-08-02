const express = require("express");
const {
  getPublicSessions,
  getMySessions,
  getSession,
  saveDraft,
  publishSession,
} = require("../controllers/wellnessSessionController");
const auth = require("../middleware/jwtAuth");

const router = express.Router();

router.get("/sessions", getPublicSessions);
router.get("/my-sessions", auth, getMySessions);
router.get("/my-sessions/:id", auth, getSession);
router.post("/my-sessions/save-draft", auth, saveDraft);
router.post("/my-sessions/publish/:id", auth, publishSession);

module.exports = router;
