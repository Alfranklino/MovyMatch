const jwt = require("jsonwebtoken")

const createToken = (user, secret, csrfToken) => {
  const payload = {
    userID: user.id,
    csrfToken,
    exp: Math.floor(Date.now() / 1000) + 2 * (60 * 60)
  }
  return jwt.sign(payload, secret)
}

module.exports = createToken
