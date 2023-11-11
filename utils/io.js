const UserController = require("../Controllers/user");

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

    socket.on("disconnect", () => {
      console.log(`user(${socket.id}) is disconnected`);
    });
  });
};
