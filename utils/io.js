const UserController = require("../Controllers/user");
const ChatController = require("../Controllers/chat");

module.exports = function (io) {
  // io 관련 작업 (emit, on)
  io.on("connection", async (socket) => {
    console.log("client is connected", socket.id);

    socket.on("login", async ({ nickname, password }, callback) => {
      try {
        const user = await UserController.login(nickname, password, socket.id);
        callback({ ok: true, data: user }); // 비밀번호 오류인 경우 user 값은 null
      } catch (error) {
        callback({ ok: false, error: error.message });
      }
    });

    socket.on("sendMessage", async (message, callback) => {
      try {
        const user = await UserController.checkUser(socket.id);
        const newMessage = await ChatController.saveChat(message, user);
        io.emit("message", newMessage);
        callback({ ok: true });
      } catch (error) {
        callback({ ok: false, error: error.message });
      }
    });

    socket.on("disconnect", () => {
      console.log(`user(${socket.id}) is disconnected`);
    });
  });
};
