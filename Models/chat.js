const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    content: String,
    user: {
      id: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
      nickname: String,
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model("Chat", chatSchema);
