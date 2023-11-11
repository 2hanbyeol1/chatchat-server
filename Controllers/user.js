const User = require("../Models/user");

const userController = {};

/**
 * 로그인 겸 회원 가입
 */
userController.login = async (nickname, password, socketId) => {
  let user = await User.findOne({ nickname: nickname });
  // 닉네임이 존재하지 않을 때 => 회원 가입
  if (!user) {
    user = new User({
      nickname: nickname,
      password: password,
      token: socketId,
      online: true,
    });
  }
  // 이미 존재하는 닉네임일 때 => 비밀번호 체크
  else {
    if (password !== user.password) {
      return null;
    }
    // 비밀번호가 일치하다면 token / online 정보 수정
    user.token = socketId;
    user.online = true;
  }

  await user.save();
  return user;
};

module.exports = userController;
