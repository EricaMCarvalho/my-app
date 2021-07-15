const jwt = require('jsonwebtoken');
const jwtDecode = require('jwt-decode');

const sendTokenResponse = (user, statusCode, res) => {
  const { firstName, lastName, email } = user;

  const userInfo = { firstName, lastName, email };

  const token = jwt.sign(
    {
      sub: user._id,
      email: user.email,
      iss: 'api.roma',
      aud: 'api.roma',
    },
    process.env.JWT_SECRET,
    {
      algorithm: 'HS256',
      expiresIn: '1h',
    }
  );

  const expiresAt = jwtDecode(token).exp;

  res.status(statusCode).json({
    success: true,
    userInfo,
    token,
    expiresAt,
  });
};

module.exports = sendTokenResponse;
