const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
    },
    redirectUrl: {
      type: String,
      required: true,
    },
    visitedHistory: {
      type: [{ timestamp: { type: Number } }],
      default: [{ timestamp: Date.now }],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  {
    timestamps: true,
  }
);

const url = new mongoose.model("url", urlSchema);

module.exports = url;
