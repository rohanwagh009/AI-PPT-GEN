const express = require("express");
const {
  generatePresentation,
  getUserPresentations,
  savePresentation,
  deletePresentation,
} = require("../controllers/presentationController");
const router = express.Router();

router.post("/generate", generatePresentation);
router.get("/history/:userId", getUserPresentations);
router.post("/save", savePresentation);
router.delete("/:id", deletePresentation);

module.exports = router;
