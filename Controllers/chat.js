const Chat = require("../Models/chat");
const chatController = {};

chatController.saveChat = async (message, user) => {
  const newMessage = new Chat({
    content: message,
    user: {
      id: user._id,
      nickname: user.nickname,
    },
  });
  await newMessage.save();
  return newMessage;
};

module.exports = chatController;
