const mongoose = require("mongoose"); // Fixed spelling

const presentationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // ADDED: A presentation must have an owner
    },
    slides: [
      {
        title: { type: String },
        content: [String], // Array of bullet points
        imagePrompt: { type: String },
        imageUrl: { type: String },
        slideOrder: { type: Number },
      },
    ],
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Presentation", presentationSchema);
