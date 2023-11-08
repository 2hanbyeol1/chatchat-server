module.exports = function (io) {
  // io 관련 작업 (emit, on)
  io.on("connection", async (socket) => {
    console.log("client is connected", socket.id);

    socket.on("disconnect", () => {
      console.log(`user(${socket.id}) is disconnected`);
    });
  });
};
