// Tạo Token và lưu vào cookie

const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();

  // Tạo options cho cookie
  const options = {
    // Get unix milliseconds at current time plus number of days
    // 1000 is milliseconds in each second
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
};

module.exports = sendToken;
